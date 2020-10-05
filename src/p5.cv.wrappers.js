// wrapThree are based on functions that operate on three Mat objects.
// the first two are inputs, and the third is an output. for example,
// the min() function: min(x, y, result) will calculate the per-element min
// between x and y, and store that in result. both y and result need to
// match x in dimensions and type. while wrapThree functions will use
// imitate() to make sure your data is allocated correctly, you shouldn't
// epect the function to behave properly if you haven't already allocated
// your y argument. in general, OF images contain noise when newly allocated
// so the result will also contain that noise.
// #define wrapThree(name) \
// template <class X, class Y, class Result>\
// void name(X& x, Y& y, Result& result) {\
// imitate(y, x);\
// imitate(result, x);\
// cv::Mat xMat = toCv(x), yMat = toCv(y);\
// cv::Mat resultMat = toCv(result);\
// cv::name(xMat, yMat, resultMat);\
// }

// wrapThree(max);
// wrapThree(min);
// wrapThree(multiply);
// wrapThree(divide);
// wrapThree(add);
// wrapThree(subtract);
// wrapThree(absdiff);
// wrapThree(bitwise_and);
// wrapThree(bitwise_or);
// wrapThree(bitwise_xor);

// Wrappers.h
p5.cv.invertTo = function (sourceMat, destinationMat) {
  // TODO: args safety check
  cv.bitwise_not(sourceMat, destinationMat);
};
// inverting non-floating point images is a just a bitwise not operation
p5.cv.invert = function (sourceMat) {
  // TODO: args safety check
  p5.cv.invertTo(sourceMat, sourceMat);
};
// also useful for taking the average/mixing two images
p5.cv.lerp = function (lerpFromMat, lerpToMat, lerpResult, amount) {
  // TODO: args safety check (including constraining amount)
  if (lerpToMat.cols === 0) {
    lerpFromMat.copyTo(lerpResult);
  } else if (lerpFromMat.cols === 0) {
    lerpToMat.copyTo(lerpResult);
  } else {
    cv.addWeighted(
      lerpFromMat,
      amount,
      lerpToMat,
      1.0 - amount,
      0.0,
      lerpResult
    );
  }
};
p5.cv.accumulate = function (newMat, accumulatorMat) {
  // FIXME: handle type differences, currently assumes sourceMat and destinationMat are the same type
  cv.add(newMat, accumulatorMat, accumulatorMat);
};
p5.cv.accumulateWeighted = function (
  newMat,
  accumulatorMat,
  alpha,
  mask = null
) {
  // imageA = alpha*imageA + (1-alpha)*imageB;
  p5.cv.lerp(accumulatorMat, newMat, accumulatorMat, alpha);
};
// normalize the min/max to [0, max for this type] out of place
p5.cv.normalizeTo = function (sourceMat, destinationMat) {
  // TODO: args safety check
  cv.normalize(
    sourceMat,
    destinationMat,
    0,
    p5.cv.getMaxValForMat(destinationMat),
    cv.NORM_MINMAX
  );
};
// TODO: test more
// normalize the min/max to [0, max for this type] in place
p5.cv.normalize = function (sourceMat) {
  // TODO: args safety check
  p5.cv.normalizeTo(sourceMat, sourceMat);
};
// TODO: test if invert does anything
// threshold out of place
p5.cv.thresholdTo = function (
  sourceMat,
  destinationMat,
  thresholdValue,
  invert = false
) {
  p5.cv.imitate(destinationMat, sourceMat);
  let thresholdType = invert ? cv.THRESH_BINARY_INV : cv.THRESH_BINARY;
  let maxVal = p5.cv.getMaxValForMat(destinationMat);
  // cv.threshold(sourceMat, destinationMat, thresholdValue, maxVal, thresholdType);
  cv.threshold(
    sourceMat,
    destinationMat,
    thresholdValue,
    maxVal,
    thresholdType
  );
};
// threshold in place
p5.cv.threshold = function (sourceMat, thresholdValue, invert = false) {
  p5.cv.thresholdTo(sourceMat, sourceMat, thresholdValue, invert);
};
// cache reusable point
p5.cv.MINUS_ONE_POINT = new cv.Point(-1, -1);
// FIXME: load cv nicely and cache this
// p5.cv.DEFAULT_KERNEL_MAT = new cv.Mat();
// erode out of place
p5.cv.erodeTo = function (sourceMat, destinationMat, iterations = 1) {
  p5.cv.imitate(destinationMat, sourceMat);
  cv.erode(
    sourceMat,
    destinationMat,
    new cv.Mat(),
    p5.cv.MINUS_ONE_POINT,
    iterations
  );
};
// erode in place
p5.cv.erode = function (sourceMat, iterations = 1) {
  p5.cv.erodeTo(sourceMat, sourceMat, iterations);
};

// dilate out of place
p5.cv.dilateTo = function (sourceMat, destinationMat, iterations = 1) {
  p5.cv.imitate(destinationMat, sourceMat);
  cv.dilate(
    sourceMat,
    destinationMat,
    new cv.Mat(),
    p5.cv.MINUS_ONE_POINT,
    iterations
  );
};

// dilate in place
p5.cv.dilate = function (sourceMat, iterations = 1) {
  p5.cv.dilateTo(sourceMat, sourceMat, iterations);
};

// automatic threshold (grayscale 8-bit only) out of place
p5.cv.autothresholdTo = function (sourceMat, destinationMat, invert = false) {
  p5.cv.imitate(destinationMat, sourceMat);
  let flags =
    cv.THRESH_OTSU | (invert ? cv.THRESH_BINARY_INV : cv.THRESH_BINARY);
  cv.threshold(sourceMat, destinationMat, 0, 255, flags);
};

// automatic threshold (grayscale 8-bit only) in place
p5.cv.autothreshold = function (sourceMat, invert = false) {
  p5.cv.autothresholdTo(sourceMat, sourceMat, invert);
};

// CV_RGB2GRAY, CV_HSV2RGB, etc. with [RGB, BGR, GRAY, HSV, HLS, XYZ, YCrCb, Lab, Luv]
// you can convert whole images...
p5.cv.convertColor = function (sourceMat, destinationMat, code) {
  // cvtColor allocates Mat for you, but we need this to handle ofImage etc.
  let targetChannels = p5.cv.getTargetChannelsFromCode(code);
  p5.cv.imitate(
    destinationMat,
    sourceMat,
    p5.cv.getCvImageType(targetChannels, p5.cv.getDepthForMat(sourceMat))
  );
  cv.cvtColor(sourceMat, destinationMat, code);
};
// ...or single colors.
// TODO: ask Golan about a decent way to tackle this.
// return color (but have it clamped to 0-255) ?
// test under different colorMode options
// !!!!note it converts RGB, not RGB
p5.cv.convertSingleColor = function (p5Color, code) {
  let mat = cv.Mat.zeros(1, 1, cv.CV_8UC3);
  // TODO: check if array.length < 4, if fill in the blanks
  let levels;
  if (p5Color instanceof p5.Color) {
    levels = p5Color.levels;
  } else if (p5Color instanceof Array) {
    levels = p5Color;
  } else {
    console.warn('unsupported format');
    return mat.data;
  }

  mat.data[0] = levels[0];
  mat.data[1] = levels[1];
  mat.data[2] = levels[2];

  cv.cvtColor(mat, mat, code);
  let data = Array.from(mat.data);
  // add alpha back in
  data.push(levels[4]);
  return data;
};

// a common cv task is to convert something to grayscale. this function will
// do that quickly for RGBA, RGB, and 1-channel images.
p5.cv.copyGray = function (sourceMat, destinationMat) {
  let channels = p5.cv.getChannelsForMat(sourceMat);
  if (channels === 4) {
    p5.cv.convertColor(sourceMat, destinationMat, cv.COLOR_RGBA2GRAY);
  } else if (channels === 3) {
    p5.cv.convertColor(sourceMat, destinationMat, cv.COLOR_RGB2GRAY);
  } else if (channels === 1) {
    sourceMat.copyTo(destinationMat);
  }
};

p5.cv.copyRGB = function (sourceMat, destinationMat) {
  let channels = p5.cv.getChannelsForMat(sourceMat);
  if (channels === 4) {
    p5.cv.convertColor(sourceMat, destinationMat, cv.COLOR_RGBA2RGB);
  } else if (channels === 3) {
    sourceMat.copyTo(destinationMat);
  } else if (channels === 1) {
    p5.cv.convertColor(sourceMat, destinationMat, cv.COLOR_GRAY2RGB);
  }
};

p5.cv.forceOdd = function (x) {
  return Math.floor(x / 2) * 2 + 1;
};

// box blur
p5.cv.blurTo = function (sourceMat, destinationMat, size) {
  p5.cv.imitate(destinationMat, sourceMat);
  size = p5.cv.forceOdd(size);
  cv.blur(sourceMat, destinationMat, new cv.Size(size, size));
};
// in-place box blur
p5.cv.blur = function (sourceMat, size) {
  p5.cv.blurTo(sourceMat, sourceMat, size);
};

// Gaussian blur
p5.cv.GaussianBlurTo = function (sourceMat, destinationMat, size) {
  p5.cv.imitate(destinationMat, sourceMat);
  size = p5.cv.forceOdd(size);
  cv.GaussianBlur(sourceMat, destinationMat, new cv.Size(size, size), 0, 0);
};

// in-place Gaussian blur
p5.cv.GaussianBlur = function (sourceMat, size) {
  p5.cv.GaussianBlurTo(sourceMat, sourceMat, size);
};

// Median blur
p5.cv.medianBlurTo = function (sourceMat, destinationMat, size) {
  p5.cv.imitate(destinationMat, sourceMat);
  size = p5.cv.forceOdd(size);
  cv.medianBlur(sourceMat, destinationMat, size);
};

// in-place Median blur
p5.cv.medianBlur = function (sourceMat, size) {
  p5.cv.medianBlurTo(sourceMat, sourceMat, size);
};

// histogram equalization, adds support for color images
p5.cv.equalizeHistTo = function (sourceMat, destinationMat) {
  p5.cv.imitate(destinationMat, sourceMat);
  if (sourceMat.channels() > 1) {
    let sourceChannels = new cv.MatVector();
    let destinationChannels = new cv.MatVector();
    split(sourceMat, sourceChannels);
    split(destinationMat, destinationChannels);
    for (let i = 0; i < sourceChannels.size(); i++) {
      cv.equalizeHist(sourceChannels.get(i), destinationChannels.get(i));
    }
    cv.merge(destinationChannels, destinationChannels);
  } else {
    cv.equalizeHist(sourceMat, destinationMat);
  }
};

p5.cv.equalizeHist = function (sourceMat) {
  p5.cv.equalizeHistTo(sourceMat, sourceMat);
};

// Canny edge detection assumes your input and output are grayscale 8-bit
// example thresholds might be 0,30 or 50,200
// TODO: ask Golan if there's a reason to add an in-place version
p5.cv.Canny = function (
  sourceMat,
  destinationMat,
  threshold1,
  threshold2,
  apertureSize = 3,
  L2gradient = false
) {
  p5.cv.imitate(destinationMat, sourceMat, cv.CV_8UC1);
  cv.Canny(
    sourceMat,
    destinationMat,
    threshold1,
    threshold2,
    apertureSize,
    L2gradient
  );
};

// Sobel edge detection
p5.cv.Sobel = function (
  sourceMat,
  destinationMat,
  ddepth = -1,
  dx = 1,
  dy = 1,
  ksize = 3,
  scale = 1,
  delta = 0,
  borderType = cv.BORDER_DEFAULT
) {
  p5.cv.imitate(destinationMat, sourceMat, cv.CV_8UC1);
  cv.Sobel(
    sourceMat,
    destinationMat,
    ddepth,
    dx,
    dy,
    ksize,
    scale,
    delta,
    borderType
  );
};
// CLD missing at the moment

// TODO: test ! test ! test!
// dst does not imitate src
p5.cv.warpPerspective = function (
  sourceMat,
  destinationMat,
  destinationPoints,
  flags = cv.INTER_LINEAR
) {
  if (destinationPoints.type() !== cv.CV_32FC2) {
    destinationPoints.convertTo(destinationPoints, cv.CV_32FC2);
  }
  // TODO validate args !!!
  let w = sourceMat.cols;
  let h = sourceMat.rows;
  let sourcePoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
    0,
    0,
    w,
    0,
    w,
    h,
    0,
    h,
  ]);
  if (destinationPoints instanceof Array) {
    // FIXME: maybe convert this from [x1,y1,x2,y2,x3,y3...] to [{x:0,y:0}...] or [p5.Vector(),...]
    destinationPoints = cv.matFromArray(4, 1, cv.CV_32FC2, destinationPoints);
  }
  let transform = cv.getPerspectiveTransform(sourcePoints, destinationPoints);
  cv.warpPerspective(
    sourceMat,
    destinationMat,
    transform,
    destinationMat.size(),
    flags
  );
};
// dst does not imitate src
p5.cv.unwarpPerspective = function (
  sourceMat,
  destinationMat,
  sourcePoints,
  flags = cv.INTER_LINEAR
) {
  if (sourcePoints.type() !== cv.CV_32FC2) {
    sourcePoints.convertTo(sourcePoints, cv.CV_32FC2);
  }
  let w = destinationMat.cols;
  let h = destinationMat.rows;
  let destinationPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
    0,
    0,
    w,
    0,
    w,
    h,
    0,
    h,
  ]);

  let transform = cv.getPerspectiveTransform(sourcePoints, destinationPoints);
  cv.warpPerspective(
    sourceMat,
    destinationMat,
    transform,
    destinationMat.size(),
    flags
  );
};

// dst does not imitate src
p5.cv.warpPerspectiveFromTranform = function (
  sourceMat,
  destinationMat,
  transform,
  flags = cv.INTER_LINEAR
) {
  cv.warpPerspective(
    sourceMat,
    destinationMat,
    transform,
    destinationMat.size(),
    flags
  );
};

// also: INTER_NEAREST, INTER_AREA, INTER_CUBIC, INTER_LANCZOS4
p5.cv.resizeTo = function (
  sourceMat,
  destinationMat,
  interpolation = cv.INTER_LINEAR
) {
  // TODO: validation args (especially destination Mat (e.g. width !=== 0, height !=== 0))
  cv.resize(
    sourceMat,
    destinationMat,
    destinationMat.size(),
    0,
    0,
    interpolation
  );
};

// also: INTER_NEAREST, INTER_AREA, INTER_CUBIC, INTER_LANCZOS4
p5.cv.resizeToScale = function (
  sourceMat,
  destinationMat,
  xScale,
  yScale,
  interpolation = cv.INTER_LINEAR
) {
  let dstWidth = Math.floor(p5.cv.getWidth(sourceMat) * xScale),
    dstHeight = Math.floor(p5.cv.getHeight(sourceMat) * yScale);
  if (
    p5.cv.getWidth(destinationMat) !== dstWidth ||
    p5.cv.getHeight(destinationMat) !== dstHeight
  ) {
    p5.cv.allocate(
      destinationMat,
      dstWidth,
      dstHeight,
      p5.cv.getCvImageType(sourceMat)
    );
  }
  cv.resize(
    sourceMat,
    destinationMat,
    { width: dstWidth, height: dstHeight },
    interpolation
  );
};

p5.cv.resizeToDimensions = function (
  sourceMat,
  destinationMat,
  dstWidth,
  dstHeight,
  interpolation = cv.INTER_LINEAR
) {
  if (
    p5.cv.getWidth(destinationMat) !== dstWidth ||
    p5.cv.getHeight(destinationMat) !== dstHeight
  ) {
    p5.cv.allocate(
      destinationMat,
      dstWidth,
      dstHeight,
      p5.cv.getCvImageType(sourceMat)
    );
  }
  cv.resize(
    sourceMat,
    destinationMat,
    { width: dstWidth, height: dstHeight },
    interpolation
  );
};

p5.cv.cvPointsToJS = function (mat) {
  let result = [];
  for (let i = 0; i < mat.rows; i++) {
    result.push({ x: mat.data32S[i * 2], y: mat.data32S[i * 2 + 1] });
  }
  return result;
};

p5.cv.drawContour = function (mat, close = true) {
  beginShape();
  for (let i = 0; i < mat.rows; i++) {
    vertex(mat.data32S[i * 2], mat.data32S[i * 2 + 1]);
  }
  if (close) {
    vertex(mat.data32S[0], mat.data32S[1]);
  }
  endShape();
};

p5.cv.cvPointsToVectors = function (mat) {
  let result = [];
  for (let i = 0; i < mat.rows; i++) {
    result.push(createVector(mat.data32S[i * 2], mat.data32S[i * 2 + 1]));
  }
  return result;
};

p5.cv.cvFeaturesToPoints = function (mat) {
  let result = [];
  for (let i = 0; i < mat.rows; i++) {
    result.push({ x: mat.data32F[i * 2], y: mat.data32F[i * 2 + 1] });
  }
  return result;
};

p5.cv.getFeatureAsPoint = function (mat, index) {
  return { x: mat.data32F[index * 2], y: mat.data32F[index * 2 + 1] };
};

p5.cv.cvLineToJS = function (mat) {
  let result = [];
  for (let i = 0; i < mat.rows; i++) {
    result.push({ x: mat.data32F[i * 2], y: mat.data32F[i * 2 + 1] });
  }
  return result;
};

p5.cv.cvLineToVectors = function (mat) {
  let result = [];
  for (let i = 0; i < mat.rows; i++) {
    result.push(createVector(mat.data32F[i * 2], mat.data32F[i * 2 + 1]));
  }
  return result;
};

p5.cv.getConvexHullMat = function (contourMat) {
  let hull = new cv.Mat();
  cv.convexHull(contourMat, hull);
  return hull;
};

p5.cv.convexHullFromMat = function (contourMat) {
  return p5.cv.cvPointsToJS(p5.cv.getConvexHullMat(contourMat));
};

p5.cv.convexHull = function (vectors) {
  let contour = p5.cv.vectorsToCvContour(vectors);
  return p5.cv.convexHullFromMat(contour);
};

p5.cv.convexityDefectsCv = function (contourMat) {
  let hull = new cv.Mat();
  let defects = new cv.Mat();
  cv.convexHull(contourMat, hull, false, false);
  cv.convexityDefects(contourMat, hull, defects);
  return defects;
};

p5.cv.convexityDefectsFromVectors = function (vectors) {
  return p5.cv.cvPointsToVectors(
    p5.cv.convexityDefectsCv(p5.cv.vectorsToCvContour(vectors))
  );
};

p5.cv.minAreaRectFromVectors = function (vectors) {
  return cv.minAreaRect(p5.cv.vectorsToCvContour(vectors));
};

p5.cv.fitEllipseFromVectors = function (vectors) {
  return cv.fitEllipse(p5.cv.vectorsToCvContour(vectors));
};
// TODO: test more, fix as needed
p5.cv.fitLineFromVectors = function (vectors, height) {
  let line = new cv.Mat();
  cv.fitLine(
    p5.cv.vectorsToCvContour(vectors),
    line,
    cv.DIST_L2,
    0,
    0.01,
    0.01
  );
  // return p5.cv.cvLineToVectors(line);
  // if(frameCount === 75){
  //   console.log(line);
  // }

  let vx = line.data32F[0];
  let vy = line.data32F[1];
  let x = line.data32F[2];
  let y = line.data32F[3];
  let lefty = Math.round((-x * vy) / vx + y);
  let righty = Math.round(((height - x) * vy) / vx + y);
  let point1 = createVector(height - 1, righty);
  let point2 = createVector(0, lefty);
  return [point1, point2];
};

// TODO: test
// kind of obscure function, draws filled polygons on the CPU
p5.cv.fillPoly = function (points, destinationMat) {
  let numPoints = [points.length];
  destinationMat.setTo(p5.cv.ZERO_SCALAR);
  cv.fillPoly(destinationMat, points, numPoints, 1, [255, 255, 255, 255]);
};

p5.cv.FLIP_HORIZONTAL = 1;
p5.cv.FLIP_VERTICAL = 0;
p5.cv.FLIP_BOTH = -1;

p5.cv.flipTo = function (sourceMat, destinationMat, code) {
  p5.cv.imitate(destinationMat, sourceMat);
  cv.flip(sourceMat, destinationMat, code);
};

p5.cv.flip = function (sourceMat, code) {
  p5.cv.flipTo(sourceMat, sourceMat, code);
};

// if you're doing the same rotation multiple times, it's better to precompute
// the displacement and use remap.
p5.cv.rotateTo = function (
  sourceMat,
  destinationMat,
  angle,
  fill = [0, 0, 0, 255],
  interpolation = cv.INTER_LINEAR
) {
  p5.cv.imitate(destinationMat, sourceMat);
  let center = new cv.Point(
    Math.floor(sourceMat.cols * 0.5),
    Math.floor(sourceMat.rows * 0.5)
  );
  let rotationMatrix = cv.getRotationMatrix2D(center, angle, 1);
  cv.warpAffine(
    sourceMat,
    destinationMat,
    rotationMatrix,
    sourceMat.size(),
    interpolation,
    cv.BORDER_CONSTANT,
    fill
  );
};

p5.cv.rotate = function (
  sourceMat,
  angle,
  fill = [0, 0, 0, 255],
  interpolation = cv.INTER_LINEAR
) {
  p5.cv.rotateTo(sourceMat, sourceMat, angle, fill, interpolation);
};

// efficient version of rotate that only operates on 0, 90, 180, 270 degrees
// the output is allocated to contain all pixels of the input.
// TODO: check if allocate calls are actually required!!!
p5.cv.rotate90To = function (sourceMat, destinationMat, angle) {
  if (angle === 0) {
    sourceMat.copyTo(destinationMat);
  } else if (angle === 90) {
    // p5.cv.allocate(destinationMat, sourceMat.rows, sourceMat.cols, sourceMat.type());
    cv.transpose(sourceMat, destinationMat);
    cv.flip(sourceMat, destinationMat, p5.cv.FLIP_HORIZONTAL);
  } else if (angle === 180) {
    p5.cv.imitate(destinationMat, sourceMat);
    cv.flip(sourceMat, destinationMat, p5.cv.FLIP_BOTH);
  } else if (angle === 270) {
    // p5.cv.allocate(destinationMat, sourceMat.rows, sourceMat.cols, sourceMat.type());
    cv.transpose(sourceMat, destinationMat);
    // cv.flip(sourceMat, destinationMat, p5.cv.FLIP_VERTICAL);
  }
};

p5.cv.rotate90 = function (sourceMat, angle) {
  p5.cv.rotate90To(sourceMat, sourceMat, angle);
};

p5.cv.transposeTo = function (sourceMat, destinationMat) {
  //p5.cv.allocate(destinationMat, sourceMat.rows, sourceMat.cols, sourceMat.type());
  cv.transpose(sourceMat, destinationMat);
};

p5.cv.transpose = function (sourceMat) {
  p5.cv.transposeTo(sourceMat, sourceMat);
};

p5.cv.swap = function (a, b) {
  let temp = a.clone();
  b.copyTo(a);
  temp.copyTo(b);
  temp.delete();
};
