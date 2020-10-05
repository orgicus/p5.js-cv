p5.cv.ZERO_SCALAR = [0, 0, 0, 0];
// Helpers.h
// TODO: test ! test ! test !
//new cv.Mat(3, 3, cv.CV_32FC1,0)
p5.cv.makeMatrix = function (rotation, translation) {
  let rot3x3;
  if (rotation.rows === 3 && rotation.cols === 3) {
    rot3x3 = rotation;
  } else {
    //rot3x3 = new cv.Mat();
    rot3x3 = new cv.Mat(3, 3, cv.CV_32FC1, p5.cv.ZERO_SCALAR);
    cv.Rodrigues(rotation, rot3x3);
  }
  let rm = rot3x3.data32F;
  let tm = translation.data32F;
  // TODO: is this ok ? should it be Float32Array instead ?
  // dafuq is this formatting, eslint?!
  return [
    rm[0],
    rm[3],
    rm[6],
    0.0,
    rm[1],
    rm[4],
    rm[7],
    0.0,
    rm[2],
    rm[5],
    rm[8],
    0.0,
    tm[0],
    tm[1],
    tm[2],
    1.0,
  ];
};
// TODO! test test test!
p5.cv.applyMatrix = function (transformationMatrix4x4) {
  applyMatrix(...transformationMatrix4x4);
};

p5.cv.drawMat = function (sourceMat, x, y, width, height) {
  let p5Image = p5.cv.matToNewImage(sourceMat);
  if (!width) width = sourceMat.cols;
  if (!height) height = sourceMat.rows;
  image(p5Image, x, y, width, height);
  p5Image = null;
};

p5.cv.drawVectors = function (vectors, close = true) {
  let numVectors = vectors.length;
  let vector;
  beginShape();
  for (let i = 0; i < numVectors; i++) {
    vector = vectors[i];
    vertex(vector.x, vector.y);
  }
  if (close) {
    vector = vectors[0];
    vertex(vector.x, vector.y);
  }
  endShape();
};

p5.cv.drawRotatedRect = function (rotatedRect) {
  let center = rotatedRect.center;
  let size = rotatedRect.size;
  push();
  translate(center.x, center.y);
  rotate(radians(rotatedRect.angle));
  rect(-size.width * 0.5, -size.height * 0.5, size.width, size.height);
  pop();
};

p5.cv.drawRotatedEllipse = function (rotatedEllipse) {
  let center = rotatedEllipse.center;
  let size = rotatedEllipse.size;
  push();
  translate(center.x, center.y);
  rotate(radians(rotatedEllipse.angle));
  // p5.js uses ellipseMode(CENTER) by default
  ellipse(0, 0, size.width, size.height);
  pop();
};

p5.cv.findMaxLocation = function (sourceMat) {
  return cv.minMaxLoc(sourceMat).maxLoc;
};
// TODO: test: especially Mat type and data access
p5.cv.meanCols = function (sourceMat) {
  let colMat = new cv.Mat(sourceMat.cols, 1, cv.CV_32FC1);
  for (let i = 0; i < sourceMat.cols; i++) {
    colMat.row(i).data32F[0] = cv.mean(sourceMat.col(i))[0];
  }
  return colMat;
};

p5.cv.meanRows = function (sourceMat) {
  let rowMat = new cv.Mat(sourceMat.rows, 1, cv.CV_32FC1);
  for (let i = 0; i < sourceMat.cols; i++) {
    rowMat.row(i).data32F[0] = cv.mean(sourceMat.row(i))[0];
  }
  return colMat;
};

p5.cv.sumData = function (data) {
  return data.reduce((a, b) => a + b);
};

p5.cv.sumCols = function (sourceMat) {
  let colMat = new cv.Mat(sourceMat.cols, 1, CV_32FC1);
  for (let i = 0; i < sourceMat.cols; i++) {
    // FIXME: cv.sum does not exist -> will col(i).data always work ?
    colMat.row(i).data32F[0] = sourceMat.col(i).data.reduce((a, b) => a + b);
  }
  return colMat;
};

p5.cv.sumRows = function (sourceMat) {
  let rowMat = new cv.Mat(sourceMat.rows, 1, CV_32FC1);
  for (let i = 0; i < sourceMat.rows; i++) {
    // FIXME: cv.sum does not exist -> will data(i).data always work ?
    rowMat.row(i).data32F[0] = sourceMat.row(i).data.reduce((a, b) => a + b);
  }
  return rowMat;
};

p5.cv.minCols = function (sourceMat) {
  let colMat = new cv.Mat(sourceMat.cols, 1, CV_32FC1);
  for (let i = 0; i < sourceMat.cols; i++) {
    colMat.row(i).data32F[0] = minMaxLoc(mat.col(i)).minVal;
  }
  return colMat;
};

p5.cv.minRows = function (sourceMat) {
  let rowMat = new cv.Mat(sourceMat.rows, 1, cv.CV_32FC1);
  for (let i = 0; i < sourceMat.cols; i++) {
    rowMat.row(i).data32F[0] = minMaxLoc(mat.row(i)).minVal;
  }
  return colMat;
};

p5.cv.maxCols = function (sourceMat) {
  let colMat = new cv.Mat(sourceMat.cols, 1, CV_32FC1);
  for (let i = 0; i < sourceMat.cols; i++) {
    colMat.row(i).data32F[0] = minMaxLoc(mat.col(i)).maxVal;
  }
  return colMat;
};

p5.cv.maxRows = function (sourceMat) {
  let rowMat = new cv.Mat(sourceMat.rows, 1, cv.CV_32FC1);
  for (let i = 0; i < sourceMat.cols; i++) {
    rowMat.row(i).data32F[0] = minMaxLoc(mat.row(i)).maxVal;
  }
  return colMat;
};

p5.cv.findFirst = function (sourceMat, target) {
  for (let i = 0; i < sourceMat.rows; i++) {
    if (sourceMat.charAt(i) === target) {
      return i;
    }
  }
  return 0;
};

p5.cv.findLast = function (sourceMat, target) {
  for (let i = sourceMat.rows - 1; i >= 0; i--) {
    if (sourceMat.charAt(i) === target) {
      return i;
    }
  }
  return 0;
};

p5.cv.getBoundingBox = function (sourceMat, thresh, invert) {
  let flags = invert ? cv.THRESH_BINARY_INV : cv.THRESH_BINARY;
  let box = new cv.Rect();
  let rowMat = p5.cv.meanRows(sourceMat);
  cv.threshold(rowMat, rowMat, thresh, 255, flags);
  box.y = p5.cv.findFirst(rowMat, 255);
  box.height = p5.cv.findLast(rowMat, 255);
  box.height -= box.y;

  let colMat = p5.cv.meanCols(mat);
  cv.threshold(colMat, colMat, thresh, 255, flags);
  box.x = findFirst(colMat, 255);
  box.width = findLast(colMat, 255);
  box.width -= box.x;
  return box;
};

// TODO: after October
// // (nearest point) to the two given lines
// template <class T>
// cv::Point3_<T> intersectLineLine(cv::Point3_<T> lineStart1, cv::Point3_<T> lineEnd1, cv::Point3_<T> lineStart2, cv::Point3_<T> lineEnd2) {
//     cv::Point3_<T> v1(lineEnd1 - lineStart1), v2(lineEnd2 - lineStart2);
//     T v1v1 = v1.dot(v1), v2v2 = v2.dot(v2), v1v2 = v1.dot(v2), v2v1 = v2.dot(v1);
//     cv::Mat_<T> lambda = (1. / (v1v1 * v2v2 - v1v2 * v1v2))
//     * ((cv::Mat_<T>(2, 2) << v2v2, v1v2, v2v1, v1v1)
//          * (cv::Mat_<T>(2, 1) << v1.dot(lineStart2 - lineStart1), v2.dot(lineStart1 - lineStart2)));
//     return (1./2) * ((lineStart1 + v1 * lambda(0)) + (lineStart2 + v2 * lambda(1)));
// }

// (nearest point on a line) to the given point
// template <class T>
// cv::Point3_<T> intersectPointLine(cv::Point3_<T> point, cv::Point3_<T> lineStart, cv::Point3_<T> lineEnd) {
//     cv::Point3_<T> ray = lineEnd - lineStart;
//     T u = (point - lineStart).dot(ray) / ray.dot(ray);
//     return lineStart + u * ray;
// }

// // (nearest point on a ray) to the given point
// template <class T>
// cv::Point3_<T> intersectPointRay(cv::Point3_<T> point, cv::Point3_<T> ray) {
//     return ray * (point.dot(ray) / ray.dot(ray));
// }

// morphological thinning, also called skeletonization, strangely missing from opencv
// here is a description of the algorithm http://homepages.inf.ed.ac.uk/rbf/HIPR2/thin.htm
// template <class T>
// void thin(T& img) {
//     cv::Mat mat = toCv(img);
//     int w = mat.cols, h = mat.rows;
//     int ia1=-w-1,ia2=-w-0,ia3=-w+1,ib1=-0-1,ib3=-0+1,ic1=+w-1,ic2=+w-0,ic3=+w+1;
//     unsigned char* p = mat.ptr<unsigned char>();
//     vector<unsigned int> q;
//     for(int y = 1; y + 1 < h; y++) {
//         for(int x = 1; x + 1 < w; x++) {
//             int i = y * w + x;
//             if(p[i]) {
//                 q.push_back(i);
//             }
//         }
//     }
//     int n = q.size();
//     for(int i=0;i<n;i++){int j=q[i];if(!p[j+ia1]&&!p[j+ia2]&&!p[j+ia3]&&p[j+ic1]&&p[j+ic2]&&p[j+ic3]){p[j]=0;}}
//     for(int i=0;i<n;i++){int j=q[i];if(!p[j+ia3]&&!p[j+ib3]&&!p[j+ic3]&&p[j+ia1]&&p[j+ib1]&&p[j+ic1]){p[j]=0;}}
//     for(int i=0;i<n;i++){int j=q[i];if(!p[j+ic1]&&!p[j+ic2]&&!p[j+ic3]&&p[j+ia1]&&p[j+ia2]&&p[j+ia3]){p[j]=0;}}
//     for(int i=0;i<n;i++){int j=q[i];if(!p[j+ia1]&&!p[j+ib1]&&!p[j+ic1]&&p[j+ia3]&&p[j+ib3]&&p[j+ic3]){p[j]=0;}}
//     for(int i=0;i<n;i++){int j=q[i];if(!p[j+ia2]&&!p[j+ia3]&&!p[j+ib3]&&p[j+ib1]&&p[j+ic2]){p[j]=0;}}
//     for(int i=0;i<n;i++){int j=q[i];if(!p[j+ib3]&&!p[j+ic3]&&!p[j+ic2]&&p[j+ib1]&&p[j+ia2]){p[j]=0;}}
//     for(int i=0;i<n;i++){int j=q[i];if(!p[j+ic2]&&!p[j+ic1]&&!p[j+ib1]&&p[j+ia2]&&p[j+ib3]){p[j]=0;}}
//     for(int i=0;i<n;i++){int j=q[i];if(!p[j+ib1]&&!p[j+ia1]&&!p[j+ia2]&&p[j+ic2]&&p[j+ib3]){p[j]=0;}}
// }
// additionally: https://github.com/LingDong-/skeletonization-js

// given a vector of lines, this function will find the average angle
p5.cv.weightedAverageAngle = function (linesMat) {
  let angleSum = 0;
  let weights = 0;
  for (let i = 0; i < linesMat.rows; i++) {
    let start = new cv.Point(
      linesMat.data32S[i * 4],
      linesMat.data32S[i * 4 + 1]
    );
    let end = new cv.Point(
      linesMat.data32S[i * 4 + 2],
      linesMat.data32S[i * 4 + 3]
    );
    let diff = p5.Vector.sub(end, start);
    let length = diff.mag();
    let weight = length * length;
    let angle = atan2(diff.y, diff.x);
    angleSum += angle * weight;
    weights += weight;
  }
  return angleSum / weights;
};

// finds the average angle of hough lines, unrotates by that amount and
// returns the average rotation. you can supply your own thresholded image
// for hough lines, or let it run canny detection for you.
p5.cv.autorotate = function (
  sourceMat,
  destinationMat,
  threshold1 = 50,
  threshold2 = 200
) {
  let threshMat = new cv.Mat();
  cv.Canny(sourceMat, threshMat, threshold1, threshold2);
  return autorotate(sourceMat, threshMat, destinationMat);
};

p5.cv.autorotate = function (sourceMat, threshMat, destinationMat) {
  p5.cv.imitate(destinationMat, sourceMat);
  let lines = new cv.Mat();
  let distanceResolution = 1.0;
  // FIXME check if this is correct: used to be CV_PI
  let angleResolution = PI / 180;
  // these three values are just heuristics that have worked for me
  let voteThreshold = 10;
  let minLineLength = (srcMat.rows + srcMat.cols) / 8;
  let maxLineGap = 3;
  cv.HoughLinesP(
    threshMat,
    lines,
    distanceResolution,
    angleResolution,
    voteThreshold,
    minLineLength,
    maxLineGap
  );
  let rotationAmount = ofRadToDeg(weightedAverageAngle(lines));
  p5.cv.rotate(sourceMat, destinationMat, rotationAmount);
  return rotationAmount;
};

// OCT ?
// p5.cv.getConvexPolygon(convexHull, targetPoints) {
//     let result = convexHull;

//     const maxIterations = 16;
//     const infinity = Number.POSITIVE_INFINITY;
//     let minEpsilon = 0;
//     let maxEpsilon = Number.POSITIVE_INFINITY;
//     let curEpsilon = 16; // good initial guess

//     // unbounded binary search to simplify the convex hull until it's targetPoints
//     if(result.size() > targetPoints) {
//         for(let i = 0; i < maxIterations; i++) {
//             cv.approxPolyDP(Mat(convexHull), result, curEpsilon, true);
//             if(result.size() === targetPoints) {
//                 break;
//             }
//             if(result.size() > targetPoints) {
//                 minEpsilon = curEpsilon;
//                 if(maxEpsilon === infinity) {
//                     curEpsilon = curEpsilon *  2;
//                 } else {
//                     curEpsilon = (maxEpsilon + minEpsilon) / 2;
//                 }
//             }
//             if(result.size() < targetPoints) {
//                 maxEpsilon = curEpsilon;
//                 curEpsilon = (maxEpsilon + minEpsilon) / 2;
//             }
//         }
//     }

//     return result;
// }

// TODO: rename these to imageToCvMat / cvMatToImage
p5.cv.imageToNewMat = function (sourceImage) {
  // TODO: args safety check
  return cv.imread(sourceImage.canvas);
};

p5.cv.imageToMat = function (sourceImage, cvMat) {
  let sourceWidth = sourceImage.width;
  let sourceHeight = sourceImage.height;
  if (!p5.cv.getAllocated(cvMat)) {
    p5.cv.allocate(cvMat, sourceWidth, sourceHeight, cv.CV_8UC4);
  }
  let data = sourceImage.canvas
    .getContext('2d')
    .getImageData(0, 0, sourceWidth, sourceHeight).data;
  cvMat.data.set(data);
};

p5.cv.getCvVideoCapture = function (p5Capture) {
  return new cv.VideoCapture(p5Capture.elt);
};

p5.cv.getRGBAMat = function (width, height) {
  return cv.Mat.zeros(height, width, cv.CV_8UC4);
};

p5.cv.getRGBMat = function (width, height) {
  return cv.Mat.zeros(height, width, cv.CV_8UC3);
};

p5.cv.getGrayscaleMat = function (width, height) {
  return cv.Mat.zeros(height, width, cv.CV_8UC1);
};

p5.cv.matToImage = function (sourceMat, destinationImage) {
  // TODO: args safety check
  cv.imshow(destinationImage.canvas, sourceMat);
};

p5.cv.matToNewImage = function (sourceMat) {
  let destinationImage = createImage(sourceMat.cols, sourceMat.rows);
  cv.imshow(destinationImage.canvas, sourceMat);
  return destinationImage;
};

p5.cv.areSamesize = function (matA, matB) {
  return matA.rows === matB.rows && matA.cols === matB.cols;
};

cv.Scalar.sub = function (a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]];
};

cv.Scalar.add = function (a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
};

cv.Point.sub = function (a, b) {
  return new cv.Point(a.x - b.x, a.x - b.x);
};

cv.Point.add = function (a, b) {
  return new cv.Point(a.x + b.x, a.x + b.x);
};
