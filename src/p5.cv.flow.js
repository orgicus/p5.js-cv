class Flow {
  constructor() {
    this.last = new cv.Mat();
    this.curr = new cv.Mat();
    this.hasFlow = false;
  }

  //call these functions to calculate flow on sequential images.
  //After this call the flow field will be populated and
  //subsequent calls to getFlow() will be updated

  //call with two contiguous images
  calcOpticalFlowTo(lastMat, currentMat) {
    if (lastMat.channels() === 1 && currentMat.channels() === 1) {
      this.calcFlow(lastMat, currentMat);
    } else {
      p5.cv.copyGray(lastMat, this.last);
      p5.cv.copyGray(currentMat, this.curr);
      this.calcFlow(this.last, this.curr);
    }
    this.hasFlow = true;
  }

  //call with subsequent images to do running optical flow.
  //the Flow class internally stores the last image for convenience
  calcOpticalFlow(currentMat) {
    p5.cv.copyGray(currentMat, this.curr);
    let lastSize = this.last.size();
    let currSize = this.curr.size();
    if (
      lastSize.width === currSize.width &&
      lastSize.height === currSize.height
    ) {
      this.calcFlow(this.last, this.curr);
      this.hasFlow = true;
    }
    p5.cv.swap(this.curr, this.last);
  }

  draw(x, y, renderWidth, renderHeight) {
    x = x || 0;
    y = y || 0;
    renderWidth = renderWidth || width;
    renderHeight = renderHeight || height;
    if (this.hasFlow) {
      this.drawFlow(x, y, width, height);
    }
  }

  drawRect(rect) {
    if (this.hasFlow) {
      this.drawFlow(rect.x, rect.y, rect.width, rect.height);
    }
  }

  getWidth() {
    return this.curr.cols;
  }

  getHeight() {
    return this.curr.rows;
  }

  resetFlow() {
    this.last.setTo(p5.cv.ZERO_SCALAR);
    this.curr.setTo(p5.cv.ZERO_SCALAR);
    this.hasFlow = false;
  }

  // for subclass override
  calcFlow(prevMat, nextMat) {}
}

//there are two implementations of Flow
//use Farneback for a dense flow field,
//use PyrLK for specific features

//see http://opencv.willowgarage.com/documentation/cpp/motion_analysis_and_object_tracking.html
//for more info on the meaning of these parameters

class FlowPyrLK extends Flow {
  constructor() {
    super();
    this.prevPts = new cv.Mat();
    this.nextPts = new cv.Mat();

    //LK feature finding parameters
    this.windowSize = new cv.Size(32, 32);
    this.maxLevel = 3;
    this.maxFeatures = 200;

    // parameters for ShiTomasi corner detection
    this.maxCorners = 30;
    this.blockSize = 7;
    this.qualityLevel = 0.01;
    //min distance for PyrLK
    this.minDistance = 4;

    this.criteria = new cv.TermCriteria(
      cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT,
      10,
      0.03
    );

    //pyramid levels
    this.pyramidLevels = 10;

    this.calcFeaturesNextFrame = true;

    //pyramid + err/status data
    this.pyramid = new cv.Mat();
    this.prevPyramid = new cv.Mat();
    this.status = new cv.Mat();
    this.err = new cv.Mat();
  }

  //flow parameters
  setMinDistance(minDistance) {
    this.minDistance = minDistance;
  }
  setWindowSize(winSize) {
    this.windowSize.width = winSize;
    this.windowSize.height = winSize;
  }

  //feature finding parameters
  setMaxLevel(maxLevel) {
    this.maxLevel = maxLevel;
  }

  setMaxFeatures(maxFeatures) {
    this.maxFeatures = maxFeatures;
  }

  setQualityLevel(qualityLevel) {
    this.qualityLevel = qualityLevel;
  }

  setPyramidLevels(levels) {
    this.pyramidLevels = levels;
  }

  //returns tracking features for this image
  getFeatures() {
    // FIXME: make sure these are cv.Point like
    return p5.cv.cvFeaturesToPoints(this.prevPts);
  }

  getCurrent() {
    let result = [];
    for (let i = 0; i < this.nextPts.rows; i++) {
      if (this.status.data[i]) {
        result.push(p5.cv.getFeatureAsPoint(this.nextPts, i));
      }
    }
    return result;
  }

  getMotion() {
    let result = [];
    let featuresSize = this.prevPts.rows;
    for (let i = 0; i < featuresSize; i++) {
      if (this.status.data[i]) {
        result.push(
          cv.Point.sub(
            p5.cv.getFeatureAsPoint(this.nextPts, i),
            p5.cv.getFeatureAsPoint(this.prevPts, i)
          )
        );
      }
    }
    return result;
  }

  // recalculates features to track
  resetFeaturesToTrack() {
    this.calcFeaturesNextFrame = true;
  }
  setFeaturesToTrack(features) {
    this.nextPts = features;
    this.calcFeaturesNextFrame = false;
  }
  resetFlow() {
    super.resetFlow();
    this.resetFeaturesToTrack();
    this.prevPts = new cv.Mat();
  }

  drawFlow(drawX, drawY, drawWidth, drawHeight) {
    let scaleX = drawWidth / width;
    let scaleY = drawHeight / height;
    let prevPtsSize = this.prevPts.rows;

    beginShape(LINES);
    for (let i = 0; i < prevPtsSize; i++) {
      if (this.status.data[i]) {
        vertex(
          this.prevPts.data32F[i * 2] * scaleX + drawX,
          this.prevPts.data32F[i * 2 + 1] * scaleY + drawY,
          9
        );

        vertex(
          this.nextPts.data32F[i * 2] * scaleX + drawX,
          this.nextPts.data32F[i * 2 + 1] * scaleY + drawY,
          9
        );
      }
    }
    endShape();
  }

  calcFlow(prevMat, nextMat) {
    if (!this.nextPts.empty() || this.calcFeaturesNextFrame) {
      if (this.calcFeaturesNextFrame) {
        this.calcFeaturesToTrack(this.prevPts, nextMat);
        this.calcFeaturesNextFrame = false;
      } else {
        p5.cv.swap(this.prevPts, this.nextPts);
      }
      this.nextPts.setTo(p5.cv.ZERO_SCALAR);

      cv.calcOpticalFlowPyrLK(
        prevMat,
        nextMat,
        this.prevPts,
        this.nextPts,
        this.status,
        this.err,
        this.windowSize,
        this.maxLevel
      );

      // cv.calcOpticalFlowPyrLK(oldGray, frameGray, p0, p1, st, err, winSize, maxLevel, criteria);

      // status.resize(nextPts.size(),0);
    } else {
      this.calcFeaturesToTrack(this.nextPts, nextMat);
    }
  }

  calcFeaturesToTrack(features, nextMat) {
    /* goodFeaturesToTrack arguments

        image – single-channel 8-bit input image.
        edges – output edge map; it has the same size and type as image .
        threshold1 – first threshold for the hysteresis procedure.
        threshold2 – second threshold for the hysteresis procedure.
        apertureSize – aperture size for the Sobel() operator.
        L2gradient - a flag, indicating whether a more accurate L_2 norm =\sqrt{(dI/dx)^2 + (dI/dy)^2} should be used to calculate the image gradient magnitude ( L2gradient=true ), or whether the default L_1 norm =|dI/dx|+|dI/dy| is enough ( L2gradient=false ).
        
        cv.goodFeaturesToTrack(oldGray, p0, maxCorners, qualityLevel, minDistance, none, blockSize);

        */
    cv.goodFeaturesToTrack(
      nextMat,
      features,
      this.maxFeatures,
      this.qualityLevel,
      this.minDistance
    );
  }
}

class FlowFarneback extends Flow {
  constructor() {
    super();

    this.flow = new cv.Mat();

    this.pyramidScale = 0.5;
    this.numLevels = 4;
    this.windowSize = 8;
    this.numIterations = 2;
    this.polyN = 7;
    this.polySigma = 1.5;
    this.farnebackGaussian = false;
    this.renderStep = 60;

    // let frame2 = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    // let next = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    // let flow = new cv.Mat(video.height, video.width, cv.CV_32FC2);
    // let flowVec = new cv.MatVector();
    // let mag = new cv.Mat(video.height, video.width, cv.CV_32FC1);
    // let ang = new cv.Mat(video.height, video.width, cv.CV_32FC1);
    // let rgb = new cv.Mat(video.height, video.width, cv.CV_8UC3);
  }

  setPyramidScale(scale) {
    if (scale < 0.0 || scale >= 1.0) {
      console.warn(
        'FlowFarneback::setPyramidScale',
        'setting scale to a number outside of 0 - 1'
      );
      scale = constrain(scale, 0.0, 1.0);
    }
    this.pyramidScale = scale;
  }
  setNumLevels(levels) {
    this.numLevels = levels;
  }
  setWindowSize(winSize) {
    this.windowSize = winSize;
  }
  setNumIterations(iterations) {
    this.numIterations = iterations;
  }
  setPolyN(polyN) {
    this.polyN = polyN;
  }
  setPolySigma(polySigma) {
    this.polySigma = polySigma;
  }
  setUseGaussian(gaussian) {
    this.farnebackGaussian = gaussian;
  }

  //call this if you switch to a new video file to reset internal caches
  resetFlow() {
    super.resetFlow();
    this.flow.setTo(p5.cv.ZERO_SCALAR);
  }

  calcFlow(prevMat, nextMat) {
    let flags = 0;
    if (this.hasFlow) {
      flags = cv.OPTFLOW_USE_INITIAL_FLOW;
    }
    if (this.farnebackGaussian) {
      flags |= cv.OPTFLOW_FARNEBACK_GAUSSIAN;
    }
    // cv.calcOpticalFlowFarneback(prevMat, nextMat, this.flow, 0.5, 3, 15, 3, 5, 1.2, 0);

    cv.calcOpticalFlowFarneback(
      prevMat,
      nextMat,
      this.flow,
      this.pyramidScale,
      this.numLevels,
      this.windowSize,
      this.numIterations,
      this.polyN,
      this.polySigma,
      flags
    );
  }

  getFlow() {
    if (!hasFlow) {
      this.flow = cv.Mat.zeros(1, 1, CV_32FC2);
    }
    return this.flow;
  }

  getTotalFlow() {
    return this.getTotalFlowInRegion(0, 0, this.flow.cols, this.flow.rows);
  }
  getAverageFlow() {
    return this.getAverageFlowInRegion(0, 0, this.flow.cols, this.flow.rows);
  }
  getFlowOffset(x, y) {
    if (!this.hasFlow) {
      return new cv.Point();
    }
    // (x + (y * w) ) * channels()
    let xIndex = (x + y * this.flow.cols) * 2;
    let yIndex = xIndex + 1;
    return { x: this.flow.data32F[xIndex], y: this.flow.data32F[yIndex] };
  }
  getFlowPosition(x, y) {
    let position = this.getFlowOffset(x, y);
    position.x += x;
    position.y += y;
    return position;
  }
  getTotalFlowInRegion(regionX, regionY, regionWidth, regionHeight) {
    if (!this.hasFlow) {
      return new cv.Point(0, 0);
    }

    let x = 0;
    let y = 0;
    let total = this.flow.total();
    let data = this.flow.data32F;

    for (let i = 0; i < total; i++) {
      let xIndex = i * 2;
      let yIndex = i * 2 + 1;
      x += data[xIndex];
      y += data[yIndex];
    }

    return { x: x, y: y };
  }

  getAverageFlowInRegion(regionX, regionY, regionWidth, regionHeight) {
    let flow = this.getTotalFlowInRegion(
      regionX,
      regionY,
      regionWidth,
      regionHeight
    );
    flow.x /= regionWidth;
    flow.y /= regionHeight;
    return flow;
  }

  drawFlow(rectX, rectY, rectWidth, rectHeight) {
    if (!this.hasFlow) {
      return;
    }
    let scaleX = rectWidth / this.flow.cols;
    let scaleY = rectHeight / this.flow.rows;
    console.log(rectWidth, rectHeight);
    beginShape(LINES);
    let flowPosition;
    for (let y = 0; y < this.flow.rows; y += this.renderStep) {
      for (let x = 0; x < this.flow.cols; x += this.renderStep) {
        flowPosition = this.getFlowPosition(x, y);
        vertex(x * scaleX + rectX, y * scaleY + rectY);
        vertex(
          flowPosition.x * scaleX + rectX,
          flowPosition.y * scaleY + rectY
        );
      }
    }
    endShape();
  }
}

class Graph {
  constructor(historyLength, minValue, maxValue) {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.historyLength = historyLength;
    this.history = new Float32Array(historyLength);
    this.index = 0;
  }

  addSample(sample) {
    this.history[this.index] = sample;
    this.index = (this.index + 1) % this.historyLength;
  }

  getNormalizedSample(offset) {
    var i = (this.index + offset) % this.historyLength;
    var range = this.maxValue - this.minValue;
    return (this.history[i] - this.minValue) / range;
  }

  draw(width, height) {
    push();
    noFill();
    strokeWeight(1);
    beginShape();
    var range = this.maxValue - this.minValue;
    for (var offset = 0; offset < this.historyLength; offset++) {
      var i = (this.index + offset) % this.historyLength;
      var x = (offset * width) / this.historyLength;
      var normalized = (this.history[i] - this.minValue) / range;
      var y = height - normalized * height;
      vertex(x, y);
    }
    endShape();
    pop();
  }
}

p5.cv.samePixels = function (a1, a2, stride, n) {
  for (var i = 0; i < n; i += stride) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
};
// TODO: review all functions that make new matrices and cleanup
p5.cv.same = function (matA, matB) {
  let diff = new cv.Mat();
  let matAGray = new cv.Mat();
  let matBGray = new cv.Mat();
  p5.cv.copyGray(matA, matAGray);
  p5.cv.copyGray(matB, matBGray);
  cv.absdiff(matAGray, matBGray, diff);
  let same = cv.countNonZero(diff) === 0;
  diff.delete();
  matAGray.delete();
  matBGray.delete();
  return same;
};

// copied from https://github.com/anvaka/oflow

class OFlow extends Flow {
  constructor() {
    super();
    this.step = 8;
    this.flow = null;

    this.uMotionGraph = new Graph(100, -this.step / 2, +this.step / 2);
    this.vMotionGraph = new Graph(100, -this.step / 2, +this.step / 2);
  }

  calcOpticalFlow(currentMat) {
    this.curr = currentMat;
    let lastSize = this.last.size();
    let currSize = this.curr.size();
    if (
      lastSize.width === currSize.width &&
      lastSize.height === currSize.height
    ) {
      // TODO: profile CPU improvements
      // cheap way to ignore duplicate frames
      if (!p5.cv.samePixels(this.last.data, currentMat.data, 4, width)) {
        this.calcFlow(this.last, this.curr);
        this.hasFlow = true;
      }
    }
    p5.cv.swap(this.curr, this.last);
  }

  // TODO: this could be simpler with OpenCV operations instead of individual byte access ?
  // assumes rgba images, but only uses one channel
  calcFlow(prevMat, nextMat) {
    if (prevMat.type() !== cv.CV_8UC4 || nextMat.type() !== cv.CV_8UC4) {
      console.warn('currently supporting only RGBA images');
      this.hasFlow = false;
      return;
    }

    let width = prevMat.cols;
    let height = prevMat.rows;

    let newImage = nextMat.data;
    let oldImage = prevMat.data;

    var zones = [];
    var step = this.step;
    var winStep = step * 2 + 1;

    var A2, A1B2, B1, C1, C2;
    var u, v, uu, vv;
    uu = vv = 0;
    var wMax = width - step - 1;
    var hMax = height - step - 1;
    var globalY, globalX, localY, localX;

    for (globalY = step + 1; globalY < hMax; globalY += winStep) {
      for (globalX = step + 1; globalX < wMax; globalX += winStep) {
        A2 = A1B2 = B1 = C1 = C2 = 0;
        // console.log('here',globalX,globalY);
        for (localY = -step; localY <= step; localY++) {
          for (localX = -step; localX <= step; localX++) {
            var address = (globalY + localY) * width + globalX + localX;

            var gradX =
              newImage[(address - 1) * 4] - newImage[(address + 1) * 4];

            var gradY =
              newImage[(address - width) * 4] - newImage[(address + width) * 4];
            var gradT = oldImage[address * 4] - newImage[address * 4];

            A2 += gradX * gradX;
            A1B2 += gradX * gradY;
            B1 += gradY * gradY;
            C2 += gradX * gradT;
            C1 += gradY * gradT;
          }
        }

        var delta = A1B2 * A1B2 - A2 * B1;

        if (delta !== 0) {
          /* system is not singular - solving by Kramer method */
          var Idelta = step / delta;
          var deltaX = -(C1 * A1B2 - C2 * B1);
          var deltaY = -(A1B2 * C2 - A2 * C1);

          u = deltaX * Idelta;
          v = deltaY * Idelta;
        } else {
          /* singular system - find optical flow in gradient direction */
          var norm = (A1B2 + A2) * (A1B2 + A2) + (B1 + A1B2) * (B1 + A1B2);
          if (norm !== 0) {
            var IGradNorm = step / norm;
            var temp = -(C1 + C2) * IGradNorm;

            u = (A1B2 + A2) * temp;
            v = (B1 + A1B2) * temp;
          } else {
            u = v = 0;
          }
        }

        if (-winStep < u && u < winStep && -winStep < v && v < winStep) {
          uu += u;
          vv += v;
          zones.push(new cv.Rect(globalX, globalY, u, v));
        }
      }
    }

    this.flow = {
      zones: zones,
      u: uu / zones.length,
      v: vv / zones.length,
    };

    this.hasFlow = true;

    return this.flow;
  }

  drawFlow(rectX, rectY, rectWidth, rectHeight) {
    if (!this.hasFlow) {
      return;
    }
    let scaleX = rectWidth / this.curr.cols;
    let scaleY = rectHeight / this.curr.rows;

    if (this.flow && this.flow.u !== 0 && this.flow.v !== 0) {
      this.uMotionGraph.addSample(this.flow.u);
      this.vMotionGraph.addSample(this.flow.v);

      strokeWeight(2);

      let step = this.step;
      this.flow.zones.forEach(function (zone) {
        stroke(
          map(zone.width, -step, +step, 0, 255),
          map(zone.height, -step, +step, 0, 255),
          128
        );
        line(
          zone.x * scaleX + rectX,
          zone.y * scaleY + rectY,
          (zone.x + zone.width) * scaleX + rectX,
          (zone.y + zone.height) * scaleY + rectY
        );
      });
    }
  }

  plotGraphs(rectX, rectY, rectWidth, rectHeight) {
    if (!this.hasFlow) {
      return;
    }
    if (this.flow && this.flow.u !== 0 && this.flow.v !== 0) {
      // draw left-right motion
      this.uMotionGraph.draw(rectWidth, rectHeight / 2);
      line(
        rectX,
        rectY + rectHeight / 4,
        rectX + rectWidth,
        rectY + rectHeight / 4
      );

      // draw up-down motion
      translate(0, rectHeight / 2);
      this.vMotionGraph.draw(rectWidth, rectHeight / 2);
      line(
        rectX,
        rectY + rectHeight / 4,
        rectX + rectWidth,
        rectY + rectHeight / 4
      );
    }
  }
}

export { Flow, FlowPyrLK, FlowFarneback, OFlow, Graph };
