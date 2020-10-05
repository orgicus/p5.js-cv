p5.cv.TrackingColorMode = {
  TRACK_COLOR_RGB: 0,
  TRACK_COLOR_HSV: 1,
  TRACK_COLOR_H: 2,
  TRACK_COLOR_HS: 3,
};

class ContourFinder {
  constructor() {
    this.hsvBuffer = new cv.Mat();
    this.thresh = new cv.Mat();

    this.autoThreshold = true;
    this.invert = false;
    this.simplify = true;

    this.thresholdValue = 128;
    this.thresholdValueMax = 255;

    this.useTargetColor = false;
    this.trackingColorMode = p5.cv.TrackingColorMode.TRACK_COLOR_HSV;
    this.targetColor = color(0);

    this.minArea = 0;
    this.maxArea = Number.POSITIVE_INFINITY;

    this.minAreaNorm = false;
    this.maxAreaNorm = false;
    // FIXME check of this needs will work as [] or Mat
    this.contours = [];
    this.polylines = [];

    this.tracker = new RectTracker();
    this.boundingRects = [];
    this.holes = [];

    this.contourFindingMode = cv.RETR_EXTERNAL;
    this.sortBySize = false;

    this.resetMinArea();
    this.resetMaxArea();
  }

  findContours(sourceMat) {
    // threshold the image using a tracked color or just binary grayscale
    if (this.useTargetColor) {
      // Scalar is equivalent to [0, 0, 0, 0]
      let offset = [
        this.thresholdValue,
        this.thresholdValue,
        this.thresholdValue,
        0,
      ];
      let base = p5.cv.colorToCvScalar(this.targetColor);
      if (this.trackingColorMode === p5.cv.TrackingColorMode.TRACK_COLOR_RGB) {
        //inRange(img, base - offset, base + offset, thresh);
        // cv.inRange(
        //   sourceMat,
        //   cv.Scalar.sub(base, offset),
        //   cv.Scalar.add(base + offset),
        //   this.thresh
        // );
        let lowerb = new cv.Mat(
          sourceMat.rows,
          sourceMat.cols,
          sourceMat.type(),
          cv.Scalar.sub(base, offset)
        );
        let upperb = new cv.Mat(
          sourceMat.rows,
          sourceMat.cols,
          sourceMat.type(),
          cv.Scalar.add(base, offset)
        );
        cv.inRange(sourceMat, lowerb, upperb, this.thresh);
        lowerb.delete();
        upperb.delete();
      } else {
        // all the HSV modes are broken incorrect,
        // because opencv uses hue 0-180 not 0-255
        // which means that the math doesn't wrap.
        if (this.trackingColorMode === p5.cv.TrackingColorMode.TRACK_COLOR_H) {
          offset[1] = 255;
          offset[2] = 255;
        }
        if (this.trackingColorMode === p5.cv.TrackingColorMode.TRACK_COLOR_HS) {
          offset[2] = 255;
        }
        if (!p5.cv.getAllocated(this.hsvBuffer)) {
          p5.cv.imitate(this.hsvBuffer, sourceMat);
        }
        cv.cvtColor(sourceMat, this.hsvBuffer, cv.COLOR_RGBA2RGB);
        cv.cvtColor(this.hsvBuffer, this.hsvBuffer, cv.COLOR_RGB2HSV);
        base = p5.cv.convertSingleColor(this.targetColor, cv.COLOR_RGBA2RGB);
        base = p5.cv.convertSingleColor(base, cv.COLOR_RGB2HSV);

        let lowerb = new cv.Mat(
          this.hsvBuffer.rows,
          this.hsvBuffer.cols,
          this.hsvBuffer.type(),
          cv.Scalar.sub(base, offset)
        );
        let upperb = new cv.Mat(
          this.hsvBuffer.rows,
          this.hsvBuffer.cols,
          this.hsvBuffer.type(),
          cv.Scalar.add(base, offset)
        );
        cv.inRange(this.hsvBuffer, lowerb, upperb, this.thresh);
        lowerb.delete();
        upperb.delete();
      }
    } else {
      p5.cv.copyGray(sourceMat, this.thresh);
    }

    if (this.autoThreshold) {
      p5.cv.threshold(this.thresh, this.thresholdValue, this.invert);
    }

    // run the contour finder
    let allContours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    let simplifyMode = this.simplify
      ? cv.CHAIN_APPROX_SIMPLE
      : cv.CHAIN_APPROX_NONE;
    cv.findContours(
      this.thresh,
      allContours,
      hierarchy,
      this.contourFindingMode,
      simplifyMode
    );

    // filter the contours
    let needMinFilter = this.minArea > 0;
    let needMaxFilter = this.maxAreaNorm
      ? this.maxArea < 1
      : this.maxArea < Number.POSITIVE_INFINITY;
    let allIndices = [];
    let allAreas = [];
    let allHoles = [];
    if (needMinFilter || needMaxFilter) {
      let imgArea = sourceMat.rows * sourceMat.cols;
      let imgMinArea = this.minAreaNorm ? this.minArea * imgArea : this.minArea;
      let imgMaxArea = this.maxAreaNorm ? this.maxArea * imgArea : this.maxArea;

      for (let i = 0; i < allContours.size(); i++) {
        let curArea = cv.contourArea(allContours.get(i), true);
        let hole = true;
        if (curArea < 0) {
          curArea = -curArea;
          hole = false;
        }
        allHoles.push(hole);
        allAreas.push(curArea);
        if (
          (!needMinFilter || curArea >= imgMinArea) &&
          (!needMaxFilter || curArea <= imgMaxArea)
        ) {
          allIndices.push(i);
        }
      }
    } else {
      for (let i = 0; i < allContours.size(); i++) {
        if (this.sortBySize) {
          allAreas.push(cv.contourArea(allContours.get(i)));
        }
        allIndices.push(i);
      }
    }

    if (allIndices.length > 1 && this.sortBySize) {
      // Sort contour indices, based on a separate vector of areas.
      // Sort contour indices into decreasing order, based on a vector of
      // contour areas.  Later, we will use these indices to order the
      // contours (which are stored in a separate vector).
      /* bool operator()(size_t a, size_t b) const
            {
                return mAreaVec[a] > mAreaVec[b];
            } */
      allIndices.sort((a, b) => {
        if (allAreas[a] > allAreas[b]) return 1;
        if (allAreas[a] < allAreas[b]) return -1;
        return 0;
      });
    }

    // generate polylines and bounding boxes from the contours
    this.contours.length = 0;
    this.polylines.length = 0;
    this.boundingRects.length = 0;
    this.holes.length = 0;
    let allIndicesSize = allIndices.length;
    for (let i = 0; i < allIndicesSize; i++) {
      let contour = allContours.get(allIndices[i]);
      this.contours.push(contour);
      this.polylines.push(p5.cv.cvPointsToVectors(contour));
      this.boundingRects.push(cv.boundingRect(contour));
      this.holes.push(allHoles[allIndices[i]]);
    }

    // track bounding boxes
    this.tracker.track(this.boundingRects);
  }

  setFindHoles(findHoles) {
    if (findHoles) {
      this.contourFindingMode = cv.RETR_LIST;
    } else {
      this.contourFindingMode = cv.RETR_EXTERNAL;
    }
  }

  setSortBySize(sizeSort) {
    this.sortBySize = sizeSort;
  }

  getContours() {
    return this.contours;
  }

  getPolylines() {
    return this.polylines;
  }

  getBoundingRects() {
    return this.boundingRects;
  }

  size() {
    return this.contours.length;
  }

  getContour(i) {
    return this.contours[i];
  }

  getPolyline(i) {
    return this.polylines[i];
  }

  getBoundingRect(i) {
    return this.boundingRects[i];
  }

  getCenter(i) {
    let box = this.getBoundingRect(i);
    return new cv.Point(box.x + box.width * 0.5, box.y + box.height * 0.5);
  }

  getCentroid(i) {
    let m = cv.moments(this.contours[i]);
    if (m.m00 !== 0) {
      return new cv.Point(m.m10 / m.m00, m.m01 / m.m00);
    } else {
      return new cvPoint(0, 0);
    }
  }

  getAverage(i) {
    let average = cv.mean(this.contours[i]);
    return new cv.Point(average[0], average[1]);
  }

  getBalance(i) {
    return cv.Point.sub(this.getCentroid(i), this.getCenter(i));
  }

  getContourArea(i) {
    return cv.contourArea(this.contours[i]);
  }

  getArcLength(i) {
    return cv.arcLength(this.contours[i], true);
  }

  getConvexHull(i) {
    if (this.contours[i]) {
      return p5.cv.getConvexHullMat(this.contours[i]);
    }
  }

  getConvexityDefects(i) {
    return p5.cv.convexityDefectsCv(this.contours[i]);
  }

  getMinAreaRect(i) {
    return cv.minAreaRect(this.contours[i]);
  }

  getMinEnclosingCircle(i) {
    return cv.minEnclosingCircle(this.contours[i]);
  }

  getFitEllipse(i) {
    if (this.contours[i].total() < 5) {
      return this.getMinAreaRect(i);
    }
    return cv.fitEllipse(this.contours[i]);
  }

  getFitQuad(i) {
    let convexHull = this.getConvexHull(i);
    if (!convexHull) {
      return;
    }
    let quad = convexHull.clone();

    const targetPoints = 4;
    const maxIterations = 16;
    const infinity = Number.POSITIVE_INFINITY;
    let minEpsilon = 0;
    let maxEpsilon = infinity;
    let curEpsilon = 16; // good initial guess

    // unbounded binary search to simplify the convex hull until it's 4 points
    if (quad.total() > 4) {
      for (let i = 0; i < maxIterations; i++) {
        cv.approxPolyDP(convexHull, quad, curEpsilon, true);
        if (quad.total() === targetPoints) {
          break;
        }
        if (quad.total() > targetPoints) {
          minEpsilon = curEpsilon;
          if (maxEpsilon === infinity) {
            curEpsilon = curEpsilon * 2;
          } else {
            curEpsilon = (maxEpsilon + minEpsilon) / 2;
          }
        }
        if (quad.total() < targetPoints) {
          maxEpsilon = curEpsilon;
          curEpsilon = (maxEpsilon + minEpsilon) / 2;
        }
      }
    }

    return quad;
  }

  getHole(i) {
    return this.holes[i];
  }

  getVelocity(i) {
    return this.tracker.getVelocity(i);
  }

  getLabel(i) {
    return this.tracker.getCurrentLabels()[i];
  }

  getTracker() {
    return this.tracker;
  }

  setAutoThreshold(autoThreshold) {
    this.autoThreshold = autoThreshold;
  }

  setThreshold(thresholdValue) {
    this.thresholdValue = thresholdValue;
  }
  // FIXME: this might not actually be used
  setThresholdMax(thresholdValueMax) {
    this.thresholdValueMax = thresholdValueMax;
  }

  setInvert(invert) {
    this.invert = invert;
  }

  setUseTargetColor(useTargetColor) {
    this.useTargetColor = useTargetColor;
  }

  setTargetColor(targetColor, trackingColorMode) {
    this.useTargetColor = true;
    this.targetColor = targetColor;
    this.trackingColorMode = trackingColorMode;
  }

  setSimplify(simplify) {
    this.simplify = simplify;
  }

  draw() {
    push();
    noFill();
    let polylinesSize = this.polylines.length;
    for (let i = 0; i < polylinesSize; i++) {
      p5.cv.drawVectors(this.polylines[i]);
      let boundingRect = this.getBoundingRect(i);
      rect(
        boundingRect.x,
        boundingRect.y,
        boundingRect.width,
        boundingRect.height
      );
    }
    pop();
  }

  resetMinArea() {
    this.setMinArea(0);
  }

  resetMaxArea() {
    this.setMaxArea(Number.POSITIVE_INFINITY);
  }

  setMinArea(minArea) {
    this.minArea = minArea;
    this.maxAreaNorm = false;
  }

  setMaxArea(maxArea) {
    this.maxArea = maxArea;
    this.minAreaNorm = false;
  }

  setMinAreaRadius(minAreaRadius) {
    this.minArea = PI * minAreaRadius * minAreaRadius;
    this.minAreaNorm = false;
  }

  setMaxAreaRadius(maxAreaRadius) {
    this.maxArea = PI * maxAreaRadius * maxAreaRadius;
    this.maxAreaNorm = false;
  }

  setMinAreaNorm(minAreaNorm) {
    this.minArea = minAreaNorm;
    this.minAreaNorm = true;
  }

  setMaxAreaNorm(maxAreaNorm) {
    this.maxArea = maxAreaNorm;
    this.maxAreaNorm = true;
  }
}

export default ContourFinder;
