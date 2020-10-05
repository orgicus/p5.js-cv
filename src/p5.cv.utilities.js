// Utilities.h

p5.cv.getWidth = function (sourceMat) {
  return sourceMat.cols;
};
p5.cv.getHeight = function (sourceMat) {
  return sourceMat.rows;
};
p5.cv.getAllocated = function (sourceMat) {
  //return p5.cv.getWidth(sourceMat) > 0 && p5.cv.getHeight(sourceMat) > 0;
  return sourceMat.rows > 0 && sourceMat.cols > 0;
};
p5.cv.getDepthForType = function (cvImageType) {
  return cv.CV_MAT_DEPTH(cvImageType);
};
p5.cv.getDepthForMat = function (sourceMat) {
  return sourceMat.depth();
};
// p5.Image / p5.Graphics will use Canvas = RGBA
p5.cv.getDepthForImage = function () {
  return cv.CV_8UC4;
};
cv.CV_8UC = function (channels) {
  if (channels === 1) return cv.CV_8UC1;
  if (channels === 2) return cv.CV_8UC2;
  if (channels === 3) return cv.CV_8UC3;
  if (channels === 4) return cv.CV_8UC4;
  return cv.CV_8UC1;
};
cv.CV_8SC = function (channels) {
  if (channels === 1) return cv.CV_8SC1;
  if (channels === 2) return cv.CV_8SC2;
  if (channels === 3) return cv.CV_8SC3;
  if (channels === 4) return cv.CV_8SC4;
  return cv.CV_8SC1;
};
cv.CV_16UC = function (channels) {
  if (channels === 1) return cv.CV_16UC1;
  if (channels === 2) return cv.CV_16UC2;
  if (channels === 3) return cv.CV_16UC3;
  if (channels === 4) return cv.CV_16UC4;
  return cv.CV_16UC1;
};
cv.CV_16SC = function (channels) {
  if (channels === 1) return cv.CV_16SC1;
  if (channels === 2) return cv.CV_16SC2;
  if (channels === 3) return cv.CV_16SC3;
  if (channels === 4) return cv.CV_16SC4;
  return cv.CV_16SC1;
};
cv.CV_32SC = function (channels) {
  if (channels === 1) return cv.CV_32SC1;
  if (channels === 2) return cv.CV_32SC2;
  if (channels === 3) return cv.CV_32SC3;
  if (channels === 4) return cv.CV_32SC4;
  return cv.CV_32SC1;
};
cv.CV_32FC = function (channels) {
  if (channels === 1) return cv.CV_32FC1;
  if (channels === 2) return cv.CV_32FC2;
  if (channels === 3) return cv.CV_32FC3;
  if (channels === 4) return cv.CV_32FC4;
  return cv.CV_32FC1;
};
cv.CV_64FC = function (channels) {
  if (channels === 1) return cv.CV_64FC1;
  if (channels === 2) return cv.CV_64FC2;
  if (channels === 3) return cv.CV_64FC3;
  if (channels === 4) return cv.CV_64FC4;
  return cv.CV_64FC1;
};

cv.CV_CN_MAX = 512;
cv.CV_CN_SHIFT = 3;
cv.CV_DEPTH_MAX = 1 << cv.CV_CN_SHIFT;
// #define CV_MAT_CN_MASK          ((CV_CN_MAX - 1) << CV_CN_SHIFT)
cv.CV_MAT_CN_MASK = (cv.CV_CN_MAX - 1) << cv.CV_CN_SHIFT;
cv.CV_MAT_CN = function (flags) {
  return ((flags & cv.CV_MAT_CN_MASK) >> cv.CV_CN_SHIFT) + 1;
};
cv.CV_MAT_DEPTH_MASK = cv.CV_DEPTH_MAX - 1;
cv.CV_MAT_DEPTH = function (flags) {
  return flags & cv.CV_MAT_DEPTH_MASK;
};
cv.CV_MAKETYPE = function (depth, cn) {
  return cv.CV_MAT_DEPTH(depth) + ((cn - 1) << cv.CV_CN_SHIFT);
};
p5.cv.getCvImageType = function (channels, cvDepth = cv.CV_8U) {
  return cv.CV_MAKETYPE(cvDepth, channels);
};
p5.cv.getCvImageTypeForImage = function (cvDepth = CV_8U) {
  return cv.CV_MAKETYPE(cvDepth, 4);
};
p5.cv.getChannelsForType = function (cvImageType) {
  return cv.CV_MAT_CN(cvImageType);
};
// p5.Image / p5.Graphics will use Canvas = RGBA
p5.cv.getChannelsForImage = function () {
  return 4;
};
p5.cv.getChannelsForMat = function (sourceMat) {
  return sourceMat.channels();
};
p5.cv.copyTo = function (sourceMat, destinationMat) {
  if (sourceMat.type() === destinationMat.type()) {
    sourceMat.copyTo(destinationMat);
  } else {
    let alpha = p5.cv.getMaxVal(destinationMat) / p5.cv.getMaxVal(sourceMat);
    sourceMat.convertTo(destinationMat, destinationMat.depth(), alpha);
  }
};
p5.cv.copy = function (sourceMat, destinationMat) {
  let dstDepth;
  if (p5.cv.getAllocated(destinationMat)) {
    dstDepth = p5.cv.getDepthForMat(destinationMat);
  } else {
    dstDepth = p5.cv.getDepthForMat(sourceMat);
  }
  p5.cv.copyTo(sourceMat, destinationMat, dstDepth);
};

p5.cv.allocate = function (sourceMat, width, height, cvType) {
  if (
    p5.cv.getWidth(sourceMat) !== width ||
    p5.cv.getHeight(sourceMat) !== height ||
    p5.cv.getCvImageType(sourceMat) !== cvType
  ) {
    sourceMat.create(height, width, cvType);
  }
};
p5.cv.imitateWithType = function (mirror, original, mirrorCvImageType) {
  let ow = p5.cv.getWidth(original),
    oh = p5.cv.getHeight(original);
  p5.cv.allocate(mirror, ow, oh, mirrorCvImageType);
};
p5.cv.imitate = function (mirror, original) {
  p5.cv.imitateWithType(mirror, original, p5.cv.getCvImageType(original));
};
// maximum possible values for that depth or matrix
p5.cv.getMaxValForDepth = function (cvDepth) {
  switch (cvDepth) {
    case cv.CV_8U:
      return 255;
    case cv.CV_16U:
      return 65535;

    case cv.CV_8S:
      return 127;
    case cv.CV_16S:
      return 32767;
    case cv.CV_32S:
      return 2147483647;

    case cv.CV_32F:
      return 1.0;
    case cv.CV_64F:
    default:
      return 1.0;
  }
};

p5.cv.getMaxValForMat = function (mat) {
  return p5.cv.getMaxValForDepth(mat.depth());
};

// float getMaxVal(const cv::Mat& mat);
p5.cv.getColorConversionTypes = function () {
  let types = [];
  for (property in cv) {
    if (property.indexOf('COLOR_') === 0) {
      types.push(property);
    }
  }
  return types;
};
p5.cv.getTargetChannelsFromCode = function (conversionCode) {
  // TODO: add the rest of the modes
  // ["COLOR_BGR2BGR555","COLOR_BGR2BGR565","COLOR_BGR2BGRA","COLOR_BGR2GRAY","COLOR_BGR2HLS","COLOR_BGR2HLS_FULL","COLOR_BGR2HSV","COLOR_BGR2HSV_FULL","COLOR_BGR2Lab","COLOR_BGR2Luv","COLOR_BGR2RGB","COLOR_BGR2RGBA","COLOR_BGR2XYZ","COLOR_BGR2YCrCb","COLOR_BGR2YUV","COLOR_BGR2YUV_I420","COLOR_BGR2YUV_IYUV","COLOR_BGR2YUV_YV12","COLOR_BGR5552BGR","COLOR_BGR5552BGRA","COLOR_BGR5552GRAY","COLOR_BGR5552RGB","COLOR_BGR5552RGBA","COLOR_BGR5652BGR","COLOR_BGR5652BGRA","COLOR_BGR5652GRAY","COLOR_BGR5652RGB","COLOR_BGR5652RGBA","COLOR_BGRA2BGR","COLOR_BGRA2BGR555","COLOR_BGRA2BGR565","COLOR_BGRA2GRAY","COLOR_BGRA2RGB","COLOR_BGRA2RGBA","COLOR_BGRA2YUV_I420","COLOR_BGRA2YUV_IYUV","COLOR_BGRA2YUV_YV12","COLOR_BayerBG2BGR","COLOR_BayerBG2BGRA","COLOR_BayerBG2BGR_EA","COLOR_BayerBG2BGR_VNG","COLOR_BayerBG2GRAY","COLOR_BayerBG2RGB","COLOR_BayerBG2RGBA","COLOR_BayerBG2RGB_EA","COLOR_BayerBG2RGB_VNG","COLOR_BayerGB2BGR","COLOR_BayerGB2BGRA","COLOR_BayerGB2BGR_EA","COLOR_BayerGB2BGR_VNG","COLOR_BayerGB2GRAY","COLOR_BayerGB2RGB","COLOR_BayerGB2RGBA","COLOR_BayerGB2RGB_EA","COLOR_BayerGB2RGB_VNG","COLOR_BayerGR2BGR","COLOR_BayerGR2BGRA","COLOR_BayerGR2BGR_EA","COLOR_BayerGR2BGR_VNG","COLOR_BayerGR2GRAY","COLOR_BayerGR2RGB","COLOR_BayerGR2RGBA","COLOR_BayerGR2RGB_EA","COLOR_BayerGR2RGB_VNG","COLOR_BayerRG2BGR","COLOR_BayerRG2BGRA","COLOR_BayerRG2BGR_EA","COLOR_BayerRG2BGR_VNG","COLOR_BayerRG2GRAY","COLOR_BayerRG2RGB","COLOR_BayerRG2RGBA","COLOR_BayerRG2RGB_EA","COLOR_BayerRG2RGB_VNG","COLOR_GRAY2BGR","COLOR_GRAY2BGR555","COLOR_GRAY2BGR565","COLOR_GRAY2BGRA","COLOR_GRAY2RGB","COLOR_GRAY2RGBA","COLOR_HLS2BGR","COLOR_HLS2BGR_FULL","COLOR_HLS2RGB","COLOR_HLS2RGB_FULL","COLOR_HSV2BGR","COLOR_HSV2BGR_FULL","COLOR_HSV2RGB","COLOR_HSV2RGB_FULL","COLOR_LBGR2Lab","COLOR_LBGR2Luv","COLOR_LRGB2Lab","COLOR_LRGB2Luv","COLOR_Lab2BGR","COLOR_Lab2LBGR","COLOR_Lab2LRGB","COLOR_Lab2RGB","COLOR_Luv2BGR","COLOR_Luv2LBGR","COLOR_Luv2LRGB","COLOR_Luv2RGB","COLOR_RGB2BGR","COLOR_RGB2BGR555","COLOR_RGB2BGR565","COLOR_RGB2BGRA","COLOR_RGB2GRAY","COLOR_RGB2HLS","COLOR_RGB2HLS_FULL","COLOR_RGB2HSV","COLOR_RGB2HSV_FULL","COLOR_RGB2Lab","COLOR_RGB2Luv","COLOR_RGB2RGBA","COLOR_RGB2XYZ","COLOR_RGB2YCrCb","COLOR_RGB2YUV","COLOR_RGB2YUV_I420","COLOR_RGB2YUV_IYUV","COLOR_RGB2YUV_YV12","COLOR_RGBA2BGR","COLOR_RGBA2BGR555","COLOR_RGBA2BGR565","COLOR_RGBA2BGRA","COLOR_RGBA2GRAY","COLOR_RGBA2RGB","COLOR_RGBA2YUV_I420","COLOR_RGBA2YUV_IYUV","COLOR_RGBA2YUV_YV12","COLOR_RGBA2mRGBA","COLOR_XYZ2BGR","COLOR_XYZ2RGB","COLOR_YCrCb2BGR","COLOR_YCrCb2RGB","COLOR_YUV2BGR","COLOR_YUV2BGRA_I420","COLOR_YUV2BGRA_IYUV","COLOR_YUV2BGRA_NV12","COLOR_YUV2BGRA_NV21","COLOR_YUV2BGRA_UYNV","COLOR_YUV2BGRA_UYVY","COLOR_YUV2BGRA_Y422","COLOR_YUV2BGRA_YUNV","COLOR_YUV2BGRA_YUY2","COLOR_YUV2BGRA_YUYV","COLOR_YUV2BGRA_YV12","COLOR_YUV2BGRA_YVYU","COLOR_YUV2BGR_I420","COLOR_YUV2BGR_IYUV","COLOR_YUV2BGR_NV12","COLOR_YUV2BGR_NV21","COLOR_YUV2BGR_UYNV","COLOR_YUV2BGR_UYVY","COLOR_YUV2BGR_Y422","COLOR_YUV2BGR_YUNV","COLOR_YUV2BGR_YUY2","COLOR_YUV2BGR_YUYV","COLOR_YUV2BGR_YV12","COLOR_YUV2BGR_YVYU","COLOR_YUV2GRAY_420","COLOR_YUV2GRAY_I420","COLOR_YUV2GRAY_IYUV","COLOR_YUV2GRAY_NV12","COLOR_YUV2GRAY_NV21","COLOR_YUV2GRAY_UYNV","COLOR_YUV2GRAY_UYVY","COLOR_YUV2GRAY_Y422","COLOR_YUV2GRAY_YUNV","COLOR_YUV2GRAY_YUY2","COLOR_YUV2GRAY_YUYV","COLOR_YUV2GRAY_YV12","COLOR_YUV2GRAY_YVYU","COLOR_YUV2RGB","COLOR_YUV2RGBA_I420","COLOR_YUV2RGBA_IYUV","COLOR_YUV2RGBA_NV12","COLOR_YUV2RGBA_NV21","COLOR_YUV2RGBA_UYNV","COLOR_YUV2RGBA_UYVY","COLOR_YUV2RGBA_Y422","COLOR_YUV2RGBA_YUNV","COLOR_YUV2RGBA_YUY2","COLOR_YUV2RGBA_YUYV","COLOR_YUV2RGBA_YV12","COLOR_YUV2RGBA_YVYU","COLOR_YUV2RGB_I420","COLOR_YUV2RGB_IYUV","COLOR_YUV2RGB_NV12","COLOR_YUV2RGB_NV21","COLOR_YUV2RGB_UYNV","COLOR_YUV2RGB_UYVY","COLOR_YUV2RGB_Y422","COLOR_YUV2RGB_YUNV","COLOR_YUV2RGB_YUY2","COLOR_YUV2RGB_YUYV","COLOR_YUV2RGB_YV12","COLOR_YUV2RGB_YVYU","COLOR_YUV420p2BGR","COLOR_YUV420p2BGRA","COLOR_YUV420p2GRAY","COLOR_YUV420p2RGB","COLOR_YUV420p2RGBA","COLOR_YUV420sp2BGR","COLOR_YUV420sp2BGRA","COLOR_YUV420sp2GRAY","COLOR_YUV420sp2RGB","COLOR_YUV420sp2RGBA","COLOR_mRGBA2RGBA"]
  if (conversionCode === cv.COLOR_RGB2RGBA) return 4;
  if (conversionCode === cv.COLOR_RGBA2RGB) return 3;
  if (conversionCode === cv.COLOR_RGB2BGRA) return 4;
  if (conversionCode === cv.COLOR_RGBA2BGR) return 3;
  if (conversionCode === cv.COLOR_BGR2RGB) return 3;
  if (conversionCode === cv.COLOR_BGRA2RGBA) return 4;
  if (conversionCode === cv.COLOR_BGR2GRAY) return 1;
  if (conversionCode === cv.COLOR_RGB2GRAY) return 1;
  if (conversionCode === cv.COLOR_GRAY2RGB) return 3;
  if (conversionCode === cv.COLOR_GRAY2RGBA) return 4;
  if (conversionCode === cv.COLOR_BGRA2GRAY) return 1;
  if (conversionCode === cv.COLOR_RGBA2GRAY) return 1;
  if (conversionCode === cv.COLOR_BGR5652BGR) return 3;
  if (conversionCode === cv.COLOR_BGR5652RGB) return 3;
  if (conversionCode === cv.COLOR_BGR5652BGRA) return 4;
  if (conversionCode === cv.COLOR_BGR5652RGBA) return 4;
  if (conversionCode === cv.COLOR_BGR5652GRAY) return 1;
  if (conversionCode === cv.COLOR_BGR5552BGR) return 3;
  if (conversionCode === cv.COLOR_BGR5552RGB) return 3;
  if (conversionCode === cv.COLOR_BGR5552BGRA) return 4;
  if (conversionCode === cv.COLOR_BGR5552RGBA) return 4;
  if (conversionCode === cv.COLOR_BGR5552GRAY) return 1;
  if (conversionCode === cv.COLOR_BGR2XYZ) return 3;
  if (conversionCode === cv.COLOR_RGB2XYZ) return 3;
  if (conversionCode === cv.COLOR_XYZ2BGR) return 3;
  if (conversionCode === cv.COLOR_XYZ2RGB) return 3;
  if (conversionCode === cv.COLOR_BGR2YCrCb) return 3;
  if (conversionCode === cv.COLOR_RGB2YCrCb) return 3;
  if (conversionCode === cv.COLOR_YCrCb2BGR) return 3;
  if (conversionCode === cv.COLOR_YCrCb2RGB) return 3;
  if (conversionCode === cv.COLOR_BGR2HSV) return 3;
  if (conversionCode === cv.COLOR_RGB2HSV) return 3;
  if (conversionCode === cv.COLOR_BGR2Lab) return 3;
  if (conversionCode === cv.COLOR_RGB2Lab) return 3;
  if (conversionCode === cv.COLOR_BayerGB2BGR) return 3;
  if (conversionCode === cv.COLOR_BayerBG2RGB) return 3;
  if (conversionCode === cv.COLOR_BayerGB2RGB) return 3;
  if (conversionCode === cv.COLOR_BayerRG2RGB) return 3;
  if (conversionCode === cv.COLOR_BGR2Luv) return 3;
  if (conversionCode === cv.COLOR_RGB2Luv) return 3;
  if (conversionCode === cv.COLOR_BGR2HLS) return 3;
  if (conversionCode === cv.COLOR_RGB2HLS) return 3;
  if (conversionCode === cv.COLOR_HSV2BGR) return 3;
  if (conversionCode === cv.COLOR_HSV2RGB) return 3;
  if (conversionCode === cv.COLOR_Lab2BGR) return 3;
  if (conversionCode === cv.COLOR_Lab2RGB) return 3;
  if (conversionCode === cv.COLOR_Luv2BGR) return 3;
  if (conversionCode === cv.COLOR_Luv2RGB) return 3;
  if (conversionCode === cv.COLOR_HLS2BGR) return 3;
  if (conversionCode === cv.COLOR_HLS2RGB) return 3;
  if (conversionCode === cv.COLOR_BayerBG2RGB_VNG) return 3;
  if (conversionCode === cv.COLOR_BayerGB2RGB_VNG) return 3;
  if (conversionCode === cv.COLOR_BayerRG2RGB_VNG) return 3;
  if (conversionCode === cv.COLOR_BayerGR2RGB_VNG) return 3;
  if (conversionCode === cv.COLOR_BGR2HSV_FULL) return 3;
  if (conversionCode === cv.COLOR_RGB2HSV_FULL) return 3;
  if (conversionCode === cv.COLOR_BGR2HLS_FULL) return 3;
  if (conversionCode === cv.COLOR_RGB2HLS_FULL) return 3;
  if (conversionCode === cv.COLOR_HSV2BGR_FULL) return 3;
  if (conversionCode === cv.COLOR_HSV2RGB_FULL) return 3;
  if (conversionCode === cv.COLOR_HLS2BGR_FULL) return 3;
  if (conversionCode === cv.COLOR_HLS2RGB_FULL) return 3;
  if (conversionCode === cv.COLOR_LBGR2Lab) return 3;
  if (conversionCode === cv.COLOR_LRGB2Lab) return 3;
  if (conversionCode === cv.COLOR_LBGR2Luv) return 3;
  if (conversionCode === cv.COLOR_LRGB2Luv) return 3;
  if (conversionCode === cv.COLOR_Lab2LBGR) return 4;
  if (conversionCode === cv.COLOR_Lab2LRGB) return 4;
  if (conversionCode === cv.COLOR_Luv2LBGR) return 4;
  if (conversionCode === cv.COLOR_Luv2LRGB) return 4;
  if (conversionCode === cv.COLOR_BGR2YUV) return 3;
  if (conversionCode === cv.COLOR_RGB2YUV) return 3;
  if (conversionCode === cv.COLOR_YUV2BGR) return 3;
  if (conversionCode === cv.COLOR_YUV2RGB) return 3;
  return 0;
};

p5.cv.pixelsToCvMat = function (width, height, pixels) {
  return cv.matFromArray(width, height, cv.CV_8UC4, pixels);
};
p5.cv.imageDataToCvMat = function (imageData) {
  return cv.matFromImageData(imageData);
};
// std::vector<cv::Point2f> toCv(const ofPolyline& polyline);
// TODO: ask Golan if vectorsToCvMat is explanatory enough: this can represent a contour or a hull
p5.cv.vectorsToCvContour = function (points) {
  // extract x,y points into value array and flatten that
  return cv.matFromArray(
    points.length,
    1,
    cv.CV_32SC2,
    points.map((pt) => [pt.x, pt.y]).flat()
  );
};
p5.cv.colorToCvScalar = function (color) {
  if (color instanceof p5.Color) {
    return color.levels;
  } else if (color instanceof Array) {
    return color;
  } else {
    console.warn('unexpected color format', color);
    return color;
  }
};
// TODO: cv::Mat toCv(ofMesh& mesh);
// cv::Point2f toCv(ofVec2f vec); -> not required as any object with x,y properties will do the job as an input
// cv::Point3f toCv(ofVec3f vec); -> to be implemented later as OpenCV.js support for 3D improves
// cv::Rect toCv(ofRectangle rect); -> not required as any object with x, y, width, height properties will do the job as an input
// ofRectangle toOf(cv::Rect rect); -> not required as x, y, width, height properties can be accessed directly

// ofPolyline toOf(cv::RotatedRect rect);
p5.cv.cvRotatedRectToPoints = function (rect) {
  return cv.RotatedRect.points(rect);
};
p5.cv.cvRotatedRectToVectors = function (rect) {
  return p5.cv
    .cvRotatedRectToPoints(rect)
    .map((pt) => createVector(pt.x, pt.y));
};
// template <class T> inline ofPolyline toOf(const std::vector<cv::Point_<T> >& contour)
p5.cv.cvContourToPoints = function (contour) {
  return p5.cv.cvPointsToJS(contour);
};
/* // toOf functions
  // TODO: add p5.cv.cvMatToImageData()
  template <class T>
  void toOf(cv::Mat mat, ofPixels_<T>& pixels) {
    pixels.setFromExternalPixels(mat.ptr<T>(), mat.cols, mat.rows, mat.channels());
  }
  template <class T>
  void toOf(cv::Mat mat, ofImage_<T>& img) {
    imitate(img, mat);
    toOf(mat, img.getPixels());
  } */

p5.cv.cvPointToVector = function (point) {
  // TODO: check if _setupDone and display a useful error otherwise
  return createVector(point.x, point.y);
};

p5.cv.cvRectVectorToArray = function (rectVector, array) {
  let rectVectorSize = rectVector.size();
  for (let i = 0; i < rectVectorSize; i++) {
    array.push(rectVector.get(i));
  }
};
