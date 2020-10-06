 (function(modules) { 
 	var installedModules = {};
 	function __webpack_require__(moduleId) {
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 		module.l = true;
 		return module.exports;
 	}
 	__webpack_require__.m = modules;
 	__webpack_require__.c = installedModules;
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
 	__webpack_require__.p = "";
 	return __webpack_require__(__webpack_require__.s = 4);
 })
 ([
 (function(module, exports) {

p5.cv = {};

p5.prototype.loadOpenCV = function () {
  cv.onRuntimeInitialized = function () {
    p5.cv.isReady = true;

    if (p5.cv.onComplete) {
      p5.cv.onComplete();
    }
  };

  p5.cv.createFileFromUrl = function (path, url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function (ev) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var data = new Uint8Array(request.response);
          cv.FS_createDataFile('/', path, data, true, false, false);
          callback();
        } else {
          console.error('Failed to load ' + url + ' status: ' + request.status);
        }
      }
    };

    request.send();
  };

  p5.cv.loadImageToCanvas = function (url, cavansId) {
    var canvas = document.getElementById(cavansId);
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };

    img.src = url;
  };
};

p5.prototype.registerMethod('init', p5.prototype.loadOpenCV);

 }),
 (function(module, exports) {

p5.cv.getWidth = function (sourceMat) {
  return sourceMat.cols;
};

p5.cv.getHeight = function (sourceMat) {
  return sourceMat.rows;
};

p5.cv.getAllocated = function (sourceMat) {
  return sourceMat.rows > 0 && sourceMat.cols > 0;
};

p5.cv.getDepthForType = function (cvImageType) {
  return cv.CV_MAT_DEPTH(cvImageType);
};

p5.cv.getDepthForMat = function (sourceMat) {
  return sourceMat.depth();
}; 


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

cv.CV_MAT_CN_MASK = cv.CV_CN_MAX - 1 << cv.CV_CN_SHIFT;

cv.CV_MAT_CN = function (flags) {
  return ((flags & cv.CV_MAT_CN_MASK) >> cv.CV_CN_SHIFT) + 1;
};

cv.CV_MAT_DEPTH_MASK = cv.CV_DEPTH_MAX - 1;

cv.CV_MAT_DEPTH = function (flags) {
  return flags & cv.CV_MAT_DEPTH_MASK;
};

cv.CV_MAKETYPE = function (depth, cn) {
  return cv.CV_MAT_DEPTH(depth) + (cn - 1 << cv.CV_CN_SHIFT);
};

p5.cv.getCvImageType = function (channels) {
  var cvDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cv.CV_8U;
  return cv.CV_MAKETYPE(cvDepth, channels);
};

p5.cv.getCvImageTypeForImage = function () {
  var cvDepth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : CV_8U;
  return cv.CV_MAKETYPE(cvDepth, 4);
};

p5.cv.getChannelsForType = function (cvImageType) {
  return cv.CV_MAT_CN(cvImageType);
}; 


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
    var alpha = p5.cv.getMaxVal(destinationMat) / p5.cv.getMaxVal(sourceMat);
    sourceMat.convertTo(destinationMat, destinationMat.depth(), alpha);
  }
};

p5.cv.copy = function (sourceMat, destinationMat) {
  var dstDepth;

  if (p5.cv.getAllocated(destinationMat)) {
    dstDepth = p5.cv.getDepthForMat(destinationMat);
  } else {
    dstDepth = p5.cv.getDepthForMat(sourceMat);
  }

  p5.cv.copyTo(sourceMat, destinationMat, dstDepth);
};

p5.cv.allocate = function (sourceMat, width, height, cvType) {
  if (p5.cv.getWidth(sourceMat) !== width || p5.cv.getHeight(sourceMat) !== height || p5.cv.getCvImageType(sourceMat) !== cvType) {
    sourceMat.create(height, width, cvType);
  }
};

p5.cv.imitateWithType = function (mirror, original, mirrorCvImageType) {
  var ow = p5.cv.getWidth(original),
      oh = p5.cv.getHeight(original);
  p5.cv.allocate(mirror, ow, oh, mirrorCvImageType);
};

p5.cv.imitate = function (mirror, original) {
  p5.cv.imitateWithType(mirror, original, p5.cv.getCvImageType(original));
}; 


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


p5.cv.getColorConversionTypes = function () {
  var types = [];

  for (property in cv) {
    if (property.indexOf('COLOR_') === 0) {
      types.push(property);
    }
  }

  return types;
};

p5.cv.getTargetChannelsFromCode = function (conversionCode) {
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


p5.cv.vectorsToCvContour = function (points) {
  return cv.matFromArray(points.length, 1, cv.CV_32SC2, points.map(function (pt) {
    return [pt.x, pt.y];
  }).flat());
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


p5.cv.cvRotatedRectToPoints = function (rect) {
  return cv.RotatedRect.points(rect);
};

p5.cv.cvRotatedRectToVectors = function (rect) {
  return p5.cv.cvRotatedRectToPoints(rect).map(function (pt) {
    return createVector(pt.x, pt.y);
  });
}; 


p5.cv.cvContourToPoints = function (contour) {
  return p5.cv.cvPointsToJS(contour);
};


p5.cv.cvPointToVector = function (point) {
  return createVector(point.x, point.y);
};

p5.cv.cvRectVectorToArray = function (rectVector, array) {
  var rectVectorSize = rectVector.size();

  for (var i = 0; i < rectVectorSize; i++) {
    array.push(rectVector.get(i));
  }
};

 }),
 (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

p5.cv.ZERO_SCALAR = [0, 0, 0, 0]; 

p5.cv.makeMatrix = function (rotation, translation) {
  var rot3x3;

  if (rotation.rows === 3 && rotation.cols === 3) {
    rot3x3 = rotation;
  } else {
    rot3x3 = new cv.Mat(3, 3, cv.CV_32FC1, p5.cv.ZERO_SCALAR);
    cv.Rodrigues(rotation, rot3x3);
  }

  var rm = rot3x3.data32F;
  var tm = translation.data32F; 

  return [rm[0], rm[3], rm[6], 0.0, rm[1], rm[4], rm[7], 0.0, rm[2], rm[5], rm[8], 0.0, tm[0], tm[1], tm[2], 1.0];
}; 


p5.cv.applyMatrix = function (transformationMatrix4x4) {
  applyMatrix.apply(void 0, _toConsumableArray(transformationMatrix4x4));
};

p5.cv.drawMat = function (sourceMat, x, y, width, height) {
  var p5Image = p5.cv.matToNewImage(sourceMat);
  if (!width) width = sourceMat.cols;
  if (!height) height = sourceMat.rows;
  image(p5Image, x, y, width, height);
  p5Image = null;
};

p5.cv.drawVectors = function (vectors) {
  var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var numVectors = vectors.length;
  var vector;
  beginShape();

  for (var i = 0; i < numVectors; i++) {
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
  var center = rotatedRect.center;
  var size = rotatedRect.size;
  push();
  translate(center.x, center.y);
  rotate(radians(rotatedRect.angle));
  rect(-size.width * 0.5, -size.height * 0.5, size.width, size.height);
  pop();
};

p5.cv.drawRotatedEllipse = function (rotatedEllipse) {
  var center = rotatedEllipse.center;
  var size = rotatedEllipse.size;
  push();
  translate(center.x, center.y);
  rotate(radians(rotatedEllipse.angle)); 

  ellipse(0, 0, size.width, size.height);
  pop();
};

p5.cv.findMaxLocation = function (sourceMat) {
  return cv.minMaxLoc(sourceMat).maxLoc;
}; 


p5.cv.meanCols = function (sourceMat) {
  var colMat = new cv.Mat(sourceMat.cols, 1, cv.CV_32FC1);

  for (var i = 0; i < sourceMat.cols; i++) {
    colMat.row(i).data32F[0] = cv.mean(sourceMat.col(i))[0];
  }

  return colMat;
};

p5.cv.meanRows = function (sourceMat) {
  var rowMat = new cv.Mat(sourceMat.rows, 1, cv.CV_32FC1);

  for (var i = 0; i < sourceMat.cols; i++) {
    rowMat.row(i).data32F[0] = cv.mean(sourceMat.row(i))[0];
  }

  return colMat;
};

p5.cv.sumData = function (data) {
  return data.reduce(function (a, b) {
    return a + b;
  });
};

p5.cv.sumCols = function (sourceMat) {
  var colMat = new cv.Mat(sourceMat.cols, 1, CV_32FC1);

  for (var i = 0; i < sourceMat.cols; i++) {
    colMat.row(i).data32F[0] = sourceMat.col(i).data.reduce(function (a, b) {
      return a + b;
    });
  }

  return colMat;
};

p5.cv.sumRows = function (sourceMat) {
  var rowMat = new cv.Mat(sourceMat.rows, 1, CV_32FC1);

  for (var i = 0; i < sourceMat.rows; i++) {
    rowMat.row(i).data32F[0] = sourceMat.row(i).data.reduce(function (a, b) {
      return a + b;
    });
  }

  return rowMat;
};

p5.cv.minCols = function (sourceMat) {
  var colMat = new cv.Mat(sourceMat.cols, 1, CV_32FC1);

  for (var i = 0; i < sourceMat.cols; i++) {
    colMat.row(i).data32F[0] = minMaxLoc(mat.col(i)).minVal;
  }

  return colMat;
};

p5.cv.minRows = function (sourceMat) {
  var rowMat = new cv.Mat(sourceMat.rows, 1, cv.CV_32FC1);

  for (var i = 0; i < sourceMat.cols; i++) {
    rowMat.row(i).data32F[0] = minMaxLoc(mat.row(i)).minVal;
  }

  return colMat;
};

p5.cv.maxCols = function (sourceMat) {
  var colMat = new cv.Mat(sourceMat.cols, 1, CV_32FC1);

  for (var i = 0; i < sourceMat.cols; i++) {
    colMat.row(i).data32F[0] = minMaxLoc(mat.col(i)).maxVal;
  }

  return colMat;
};

p5.cv.maxRows = function (sourceMat) {
  var rowMat = new cv.Mat(sourceMat.rows, 1, cv.CV_32FC1);

  for (var i = 0; i < sourceMat.cols; i++) {
    rowMat.row(i).data32F[0] = minMaxLoc(mat.row(i)).maxVal;
  }

  return colMat;
};

p5.cv.findFirst = function (sourceMat, target) {
  for (var i = 0; i < sourceMat.rows; i++) {
    if (sourceMat.charAt(i) === target) {
      return i;
    }
  }

  return 0;
};

p5.cv.findLast = function (sourceMat, target) {
  for (var i = sourceMat.rows - 1; i >= 0; i--) {
    if (sourceMat.charAt(i) === target) {
      return i;
    }
  }

  return 0;
};

p5.cv.getBoundingBox = function (sourceMat, thresh, invert) {
  var flags = invert ? cv.THRESH_BINARY_INV : cv.THRESH_BINARY;
  var box = new cv.Rect();
  var rowMat = p5.cv.meanRows(sourceMat);
  cv.threshold(rowMat, rowMat, thresh, 255, flags);
  box.y = p5.cv.findFirst(rowMat, 255);
  box.height = p5.cv.findLast(rowMat, 255);
  box.height -= box.y;
  var colMat = p5.cv.meanCols(mat);
  cv.threshold(colMat, colMat, thresh, 255, flags);
  box.x = findFirst(colMat, 255);
  box.width = findLast(colMat, 255);
  box.width -= box.x;
  return box;
}; 


p5.cv.weightedAverageAngle = function (linesMat) {
  var angleSum = 0;
  var weights = 0;

  for (var i = 0; i < linesMat.rows; i++) {
    var start = new cv.Point(linesMat.data32S[i * 4], linesMat.data32S[i * 4 + 1]);
    var end = new cv.Point(linesMat.data32S[i * 4 + 2], linesMat.data32S[i * 4 + 3]);
    var diff = p5.Vector.sub(end, start);
    var length = diff.mag();
    var weight = length * length;
    var angle = atan2(diff.y, diff.x);
    angleSum += angle * weight;
    weights += weight;
  }

  return angleSum / weights;
}; 


p5.cv.autorotate = function (sourceMat, destinationMat) {
  var threshold1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var threshold2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
  var threshMat = new cv.Mat();
  cv.Canny(sourceMat, threshMat, threshold1, threshold2);
  return autorotate(sourceMat, threshMat, destinationMat);
};

p5.cv.autorotate = function (sourceMat, threshMat, destinationMat) {
  p5.cv.imitate(destinationMat, sourceMat);
  var lines = new cv.Mat();
  var distanceResolution = 1.0; 

  var angleResolution = PI / 180; 

  var voteThreshold = 10;
  var minLineLength = (srcMat.rows + srcMat.cols) / 8;
  var maxLineGap = 3;
  cv.HoughLinesP(threshMat, lines, distanceResolution, angleResolution, voteThreshold, minLineLength, maxLineGap);
  var rotationAmount = ofRadToDeg(weightedAverageAngle(lines));
  p5.cv.rotate(sourceMat, destinationMat, rotationAmount);
  return rotationAmount;
}; 


p5.cv.imageToNewMat = function (sourceImage) {
  return cv.imread(sourceImage.canvas);
};

p5.cv.imageToMat = function (sourceImage, cvMat) {
  var sourceWidth = sourceImage.width;
  var sourceHeight = sourceImage.height;

  if (!p5.cv.getAllocated(cvMat)) {
    p5.cv.allocate(cvMat, sourceWidth, sourceHeight, cv.CV_8UC4);
  }

  var data = sourceImage.canvas.getContext('2d').getImageData(0, 0, sourceWidth, sourceHeight).data;
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
  cv.imshow(destinationImage.canvas, sourceMat);
};

p5.cv.matToNewImage = function (sourceMat) {
  var destinationImage = createImage(sourceMat.cols, sourceMat.rows);
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

 }),
 (function(module, exports) {

p5.cv.invertTo = function (sourceMat, destinationMat) {
  cv.bitwise_not(sourceMat, destinationMat);
}; 


p5.cv.invert = function (sourceMat) {
  p5.cv.invertTo(sourceMat, sourceMat);
}; 


p5.cv.lerp = function (lerpFromMat, lerpToMat, lerpResult, amount) {
  if (lerpToMat.cols === 0) {
    lerpFromMat.copyTo(lerpResult);
  } else if (lerpFromMat.cols === 0) {
    lerpToMat.copyTo(lerpResult);
  } else {
    cv.addWeighted(lerpFromMat, amount, lerpToMat, 1.0 - amount, 0.0, lerpResult);
  }
};

p5.cv.accumulate = function (newMat, accumulatorMat) {
  cv.add(newMat, accumulatorMat, accumulatorMat);
};

p5.cv.accumulateWeighted = function (newMat, accumulatorMat, alpha) {
  var mask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  p5.cv.lerp(accumulatorMat, newMat, accumulatorMat, alpha);
}; 


p5.cv.normalizeTo = function (sourceMat, destinationMat) {
  cv.normalize(sourceMat, destinationMat, 0, p5.cv.getMaxValForMat(destinationMat), cv.NORM_MINMAX);
}; 


p5.cv.normalize = function (sourceMat) {
  p5.cv.normalizeTo(sourceMat, sourceMat);
}; 


p5.cv.thresholdTo = function (sourceMat, destinationMat, thresholdValue) {
  var invert = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  p5.cv.imitate(destinationMat, sourceMat);
  var thresholdType = invert ? cv.THRESH_BINARY_INV : cv.THRESH_BINARY;
  var maxVal = p5.cv.getMaxValForMat(destinationMat); 

  cv.threshold(sourceMat, destinationMat, thresholdValue, maxVal, thresholdType);
}; 


p5.cv.threshold = function (sourceMat, thresholdValue) {
  var invert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  p5.cv.thresholdTo(sourceMat, sourceMat, thresholdValue, invert);
}; 


p5.cv.MINUS_ONE_POINT = new cv.Point(-1, -1); 

p5.cv.erodeTo = function (sourceMat, destinationMat) {
  var iterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  p5.cv.imitate(destinationMat, sourceMat);
  cv.erode(sourceMat, destinationMat, new cv.Mat(), p5.cv.MINUS_ONE_POINT, iterations);
}; 


p5.cv.erode = function (sourceMat) {
  var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  p5.cv.erodeTo(sourceMat, sourceMat, iterations);
}; 


p5.cv.dilateTo = function (sourceMat, destinationMat) {
  var iterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  p5.cv.imitate(destinationMat, sourceMat);
  cv.dilate(sourceMat, destinationMat, new cv.Mat(), p5.cv.MINUS_ONE_POINT, iterations);
}; 


p5.cv.dilate = function (sourceMat) {
  var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  p5.cv.dilateTo(sourceMat, sourceMat, iterations);
}; 


p5.cv.autothresholdTo = function (sourceMat, destinationMat) {
  var invert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  p5.cv.imitate(destinationMat, sourceMat);
  var flags = cv.THRESH_OTSU | (invert ? cv.THRESH_BINARY_INV : cv.THRESH_BINARY);
  cv.threshold(sourceMat, destinationMat, 0, 255, flags);
}; 


p5.cv.autothreshold = function (sourceMat) {
  var invert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  p5.cv.autothresholdTo(sourceMat, sourceMat, invert);
}; 


p5.cv.convertColor = function (sourceMat, destinationMat, code) {
  var targetChannels = p5.cv.getTargetChannelsFromCode(code);
  p5.cv.imitate(destinationMat, sourceMat, p5.cv.getCvImageType(targetChannels, p5.cv.getDepthForMat(sourceMat)));
  cv.cvtColor(sourceMat, destinationMat, code);
}; 


p5.cv.convertSingleColor = function (p5Color, code) {
  var mat = cv.Mat.zeros(1, 1, cv.CV_8UC3); 

  var levels;

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
  var data = Array.from(mat.data); 

  data.push(levels[4]);
  return data;
}; 


p5.cv.copyGray = function (sourceMat, destinationMat) {
  var channels = p5.cv.getChannelsForMat(sourceMat);

  if (channels === 4) {
    p5.cv.convertColor(sourceMat, destinationMat, cv.COLOR_RGBA2GRAY);
  } else if (channels === 3) {
    p5.cv.convertColor(sourceMat, destinationMat, cv.COLOR_RGB2GRAY);
  } else if (channels === 1) {
    sourceMat.copyTo(destinationMat);
  }
};

p5.cv.copyRGB = function (sourceMat, destinationMat) {
  var channels = p5.cv.getChannelsForMat(sourceMat);

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


p5.cv.blurTo = function (sourceMat, destinationMat, size) {
  p5.cv.imitate(destinationMat, sourceMat);
  size = p5.cv.forceOdd(size);
  cv.blur(sourceMat, destinationMat, new cv.Size(size, size));
}; 


p5.cv.blur = function (sourceMat, size) {
  p5.cv.blurTo(sourceMat, sourceMat, size);
}; 


p5.cv.GaussianBlurTo = function (sourceMat, destinationMat, size) {
  p5.cv.imitate(destinationMat, sourceMat);
  size = p5.cv.forceOdd(size);
  cv.GaussianBlur(sourceMat, destinationMat, new cv.Size(size, size), 0, 0);
}; 


p5.cv.GaussianBlur = function (sourceMat, size) {
  p5.cv.GaussianBlurTo(sourceMat, sourceMat, size);
}; 


p5.cv.medianBlurTo = function (sourceMat, destinationMat, size) {
  p5.cv.imitate(destinationMat, sourceMat);
  size = p5.cv.forceOdd(size);
  cv.medianBlur(sourceMat, destinationMat, size);
}; 


p5.cv.medianBlur = function (sourceMat, size) {
  p5.cv.medianBlurTo(sourceMat, sourceMat, size);
}; 


p5.cv.equalizeHistTo = function (sourceMat, destinationMat) {
  p5.cv.imitate(destinationMat, sourceMat);

  if (sourceMat.channels() > 1) {
    var sourceChannels = new cv.MatVector();
    var destinationChannels = new cv.MatVector();
    split(sourceMat, sourceChannels);
    split(destinationMat, destinationChannels);

    for (var i = 0; i < sourceChannels.size(); i++) {
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


p5.cv.Canny = function (sourceMat, destinationMat, threshold1, threshold2) {
  var apertureSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3;
  var L2gradient = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  p5.cv.imitate(destinationMat, sourceMat, cv.CV_8UC1);
  cv.Canny(sourceMat, destinationMat, threshold1, threshold2, apertureSize, L2gradient);
}; 


p5.cv.Sobel = function (sourceMat, destinationMat) {
  var ddepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
  var dx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var dy = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var ksize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3;
  var scale = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
  var delta = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var borderType = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : cv.BORDER_DEFAULT;
  p5.cv.imitate(destinationMat, sourceMat, cv.CV_8UC1);
  cv.Sobel(sourceMat, destinationMat, ddepth, dx, dy, ksize, scale, delta, borderType);
}; 


p5.cv.warpPerspective = function (sourceMat, destinationMat, destinationPoints) {
  var flags = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : cv.INTER_LINEAR;

  if (destinationPoints.type() !== cv.CV_32FC2) {
    destinationPoints.convertTo(destinationPoints, cv.CV_32FC2);
  } 


  var w = sourceMat.cols;
  var h = sourceMat.rows;
  var sourcePoints = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, w, 0, w, h, 0, h]);

  if (destinationPoints instanceof Array) {
    destinationPoints = cv.matFromArray(4, 1, cv.CV_32FC2, destinationPoints);
  }

  var transform = cv.getPerspectiveTransform(sourcePoints, destinationPoints);
  cv.warpPerspective(sourceMat, destinationMat, transform, destinationMat.size(), flags);
}; 


p5.cv.unwarpPerspective = function (sourceMat, destinationMat, sourcePoints) {
  var flags = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : cv.INTER_LINEAR;

  if (sourcePoints.type() !== cv.CV_32FC2) {
    sourcePoints.convertTo(sourcePoints, cv.CV_32FC2);
  }

  var w = destinationMat.cols;
  var h = destinationMat.rows;
  var destinationPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, w, 0, w, h, 0, h]);
  var transform = cv.getPerspectiveTransform(sourcePoints, destinationPoints);
  cv.warpPerspective(sourceMat, destinationMat, transform, destinationMat.size(), flags);
}; 


p5.cv.warpPerspectiveFromTranform = function (sourceMat, destinationMat, transform) {
  var flags = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : cv.INTER_LINEAR;
  cv.warpPerspective(sourceMat, destinationMat, transform, destinationMat.size(), flags);
}; 


p5.cv.resizeTo = function (sourceMat, destinationMat) {
  var interpolation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : cv.INTER_LINEAR;
  cv.resize(sourceMat, destinationMat, destinationMat.size(), 0, 0, interpolation);
}; 


p5.cv.resizeToScale = function (sourceMat, destinationMat, xScale, yScale) {
  var interpolation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : cv.INTER_LINEAR;
  var dstWidth = Math.floor(p5.cv.getWidth(sourceMat) * xScale),
      dstHeight = Math.floor(p5.cv.getHeight(sourceMat) * yScale);

  if (p5.cv.getWidth(destinationMat) !== dstWidth || p5.cv.getHeight(destinationMat) !== dstHeight) {
    p5.cv.allocate(destinationMat, dstWidth, dstHeight, p5.cv.getCvImageType(sourceMat));
  }

  cv.resize(sourceMat, destinationMat, {
    width: dstWidth,
    height: dstHeight
  }, interpolation);
};

p5.cv.resizeToDimensions = function (sourceMat, destinationMat, dstWidth, dstHeight) {
  var interpolation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : cv.INTER_LINEAR;

  if (p5.cv.getWidth(destinationMat) !== dstWidth || p5.cv.getHeight(destinationMat) !== dstHeight) {
    p5.cv.allocate(destinationMat, dstWidth, dstHeight, p5.cv.getCvImageType(sourceMat));
  }

  cv.resize(sourceMat, destinationMat, {
    width: dstWidth,
    height: dstHeight
  }, interpolation);
};

p5.cv.cvPointsToJS = function (mat) {
  var result = [];

  for (var i = 0; i < mat.rows; i++) {
    result.push({
      x: mat.data32S[i * 2],
      y: mat.data32S[i * 2 + 1]
    });
  }

  return result;
};

p5.cv.drawContour = function (mat) {
  var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  beginShape();

  for (var i = 0; i < mat.rows; i++) {
    vertex(mat.data32S[i * 2], mat.data32S[i * 2 + 1]);
  }

  if (close) {
    vertex(mat.data32S[0], mat.data32S[1]);
  }

  endShape();
};

p5.cv.cvPointsToVectors = function (mat) {
  var result = [];

  for (var i = 0; i < mat.rows; i++) {
    result.push(createVector(mat.data32S[i * 2], mat.data32S[i * 2 + 1]));
  }

  return result;
};

p5.cv.cvFeaturesToPoints = function (mat) {
  var result = [];

  for (var i = 0; i < mat.rows; i++) {
    result.push({
      x: mat.data32F[i * 2],
      y: mat.data32F[i * 2 + 1]
    });
  }

  return result;
};

p5.cv.getFeatureAsPoint = function (mat, index) {
  return {
    x: mat.data32F[index * 2],
    y: mat.data32F[index * 2 + 1]
  };
};

p5.cv.cvLineToJS = function (mat) {
  var result = [];

  for (var i = 0; i < mat.rows; i++) {
    result.push({
      x: mat.data32F[i * 2],
      y: mat.data32F[i * 2 + 1]
    });
  }

  return result;
};

p5.cv.cvLineToVectors = function (mat) {
  var result = [];

  for (var i = 0; i < mat.rows; i++) {
    result.push(createVector(mat.data32F[i * 2], mat.data32F[i * 2 + 1]));
  }

  return result;
};

p5.cv.getConvexHullMat = function (contourMat) {
  var hull = new cv.Mat();
  cv.convexHull(contourMat, hull);
  return hull;
};

p5.cv.convexHullFromMat = function (contourMat) {
  return p5.cv.cvPointsToJS(p5.cv.getConvexHullMat(contourMat));
};

p5.cv.convexHull = function (vectors) {
  var contour = p5.cv.vectorsToCvContour(vectors);
  return p5.cv.convexHullFromMat(contour);
};

p5.cv.convexityDefectsCv = function (contourMat) {
  var hull = new cv.Mat();
  var defects = new cv.Mat();
  cv.convexHull(contourMat, hull, false, false);
  cv.convexityDefects(contourMat, hull, defects);
  return defects;
};

p5.cv.convexityDefectsFromVectors = function (vectors) {
  return p5.cv.cvPointsToVectors(p5.cv.convexityDefectsCv(p5.cv.vectorsToCvContour(vectors)));
};

p5.cv.minAreaRectFromVectors = function (vectors) {
  return cv.minAreaRect(p5.cv.vectorsToCvContour(vectors));
};

p5.cv.fitEllipseFromVectors = function (vectors) {
  return cv.fitEllipse(p5.cv.vectorsToCvContour(vectors));
}; 


p5.cv.fitLineFromVectors = function (vectors, height) {
  var line = new cv.Mat();
  cv.fitLine(p5.cv.vectorsToCvContour(vectors), line, cv.DIST_L2, 0, 0.01, 0.01); 

  var vx = line.data32F[0];
  var vy = line.data32F[1];
  var x = line.data32F[2];
  var y = line.data32F[3];
  var lefty = Math.round(-x * vy / vx + y);
  var righty = Math.round((height - x) * vy / vx + y);
  var point1 = createVector(height - 1, righty);
  var point2 = createVector(0, lefty);
  return [point1, point2];
}; 


p5.cv.fillPoly = function (points, destinationMat) {
  var numPoints = [points.length];
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


p5.cv.rotateTo = function (sourceMat, destinationMat, angle) {
  var fill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [0, 0, 0, 255];
  var interpolation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : cv.INTER_LINEAR;
  p5.cv.imitate(destinationMat, sourceMat);
  var center = new cv.Point(Math.floor(sourceMat.cols * 0.5), Math.floor(sourceMat.rows * 0.5));
  var rotationMatrix = cv.getRotationMatrix2D(center, angle, 1);
  cv.warpAffine(sourceMat, destinationMat, rotationMatrix, sourceMat.size(), interpolation, cv.BORDER_CONSTANT, fill);
};

p5.cv.rotate = function (sourceMat, angle) {
  var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0, 0, 255];
  var interpolation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : cv.INTER_LINEAR;
  p5.cv.rotateTo(sourceMat, sourceMat, angle, fill, interpolation);
}; 


p5.cv.rotate90To = function (sourceMat, destinationMat, angle) {
  if (angle === 0) {
    sourceMat.copyTo(destinationMat);
  } else if (angle === 90) {
    cv.transpose(sourceMat, destinationMat);
    cv.flip(sourceMat, destinationMat, p5.cv.FLIP_HORIZONTAL);
  } else if (angle === 180) {
    p5.cv.imitate(destinationMat, sourceMat);
    cv.flip(sourceMat, destinationMat, p5.cv.FLIP_BOTH);
  } else if (angle === 270) {
    cv.transpose(sourceMat, destinationMat); 
  }
};

p5.cv.rotate90 = function (sourceMat, angle) {
  p5.cv.rotate90To(sourceMat, sourceMat, angle);
};

p5.cv.transposeTo = function (sourceMat, destinationMat) {
  cv.transpose(sourceMat, destinationMat);
};

p5.cv.transpose = function (sourceMat) {
  p5.cv.transposeTo(sourceMat, sourceMat);
};

p5.cv.swap = function (a, b) {
  var temp = a.clone();
  b.copyTo(a);
  temp.copyTo(b);
  temp["delete"]();
};

 }),
 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

var p5_cv_utils = __webpack_require__(0);

var p5_cv_utilities = __webpack_require__(1);

var p5_cv_helpers = __webpack_require__(2);

var p5_cv_wrappers = __webpack_require__(3);

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

p5.cv.trackingDistanceRect = function (a, b) {
  var dx = a.x + a.width * 0.5 - (b.x + b.width * 0.5);
  var dy = a.y + a.height * 0.5 - (b.y + b.height * 0.5);
  var dw = a.width - b.width;
  var dh = a.height - b.height;
  var pd = Math.sqrt(dx * dx + dy * dy);
  var sd = Math.sqrt(dw * dw + dh * dh);
  return pd + sd;
};

p5.cv.trackingDistancePoint = function (a, b) {
  return dist(a.x, a.y, b.x, b.y);
};

p5.cv.isPoint = function (pt) {
  return 'x' in pt && 'y' in pt && !('width' in pt);
};

p5.cv.isRect = function (pt) {
  return 'x' in pt && 'y' in pt && 'width' in pt && 'height' in pt;
};

p5.cv.trackingDistance = function (a, b) {
  if (p5.cv.isPoint(a) && p5.cv.isPoint(b)) {
    return p5.cv.trackingDistancePoint(a, b);
  }

  if (p5.cv.isRect(a) && p5.cv.isRect(b)) {
    return p5.cv.trackingDistanceRect(a, b);
  }

  console.warn('invalid input: currently supporting only points(e.g. {x:0,y:0}) and rectangles({x:0,y:0,width:10,height:10})');
  return -1;
};

var TrackedObject = function () {
  function TrackedObject() {
    _classCallCheck(this, TrackedObject);
  }

  _createClass(TrackedObject, [{
    key: "initFromObject",
    value: function initFromObject(object, label, index) {
      this.lastSeen = 0;
      this.label = label;
      this.age = 0;
      this.index = index;
      this.object = object;
      return this;
    }
  }, {
    key: "initFromPreviousObject",
    value: function initFromPreviousObject(object, previous, index) {
      this.lastSeen = 0;
      this.label = previous.label;
      this.age = previous.age;
      this.index = index;
      this.object = object;
      return this;
    }
  }, {
    key: "copyFrom",
    value: function copyFrom(old) {
      this.lastSeen = old.lastSeen;
      this.label = old.label;
      this.age = old.age;
      this.index = -1;
      this.object = old.object;
      return this;
    }
  }, {
    key: "timeStep",
    value: function timeStep(visible) {
      this.age++;

      if (!visible) {
        this.lastSeen++;
      }
    }
  }, {
    key: "getLastSeen",
    value: function getLastSeen() {
      return this.lastSeen;
    }
  }, {
    key: "getAge",
    value: function getAge() {
      return this.age;
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      return this.label;
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index;
    }
  }]);

  return TrackedObject;
}();

var Tracker = function () {
  function Tracker() {
    _classCallCheck(this, Tracker);

    this.previous = [];
    this.current = [];
    this.currentLabels = [];
    this.previousLabels = [];
    this.newLabels = [];
    this.deadLabels = [];
    this.previousLabelMap = new Map();
    this.currentLabelMap = new Map();
    this.persistence = 15;
    this.curLabel = 0;
    this.maximumDistance = 64;
  }

  _createClass(Tracker, [{
    key: "getNewLabel",
    value: function getNewLabel() {
      return this.curLabel++;
    }
  }, {
    key: "setPersistence",
    value: function setPersistence(persistence) {
      this.persistance = persistence;
    }
  }, {
    key: "setMaximumDistance",
    value: function setMaximumDistance(maximumDistance) {
      this.maximumDistance = maximumDistance;
    }
  }, {
    key: "sortByDistance",
    value: function sortByDistance(a, b) {
      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      return 0;
    }
  }, {
    key: "track",
    value: function track(objects) {
      this.previous = [].concat(this.current);
      var n = objects.length;
      var m = this.previous.length; 

      var all = [];

      for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
          var curDistance = p5.cv.trackingDistance(objects[i], this.previous[j].object);

          if (curDistance < this.maximumDistance) {
            all.push({
              pair: [i, j],
              distance: curDistance
            });
          }
        }
      }

      all.sort(this.sortByDistance); 

      this.previousLabels = [].concat(this.currentLabels);
      this.currentLabels = new Array(n);
      this.current.length = 0;
      var matchedObjects = new Array(n).fill(false);
      var matchedPrevious = new Array(m).fill(false); 

      var allSize = all.length;

      for (var k = 0; k < allSize; k++) {
        var match = all[k].pair;
        var _i = match[0];
        var _j = match[1]; 

        if (!matchedObjects[_i] && !matchedPrevious[_j]) {
          matchedObjects[_i] = true;
          matchedPrevious[_j] = true;
          var index = this.current.length;
          var newFromPrevious = new TrackedObject().initFromPreviousObject(objects[_i], this.previous[_j], index);
          this.current.push(newFromPrevious);
          newFromPrevious.timeStep(true);
          this.currentLabels[_i] = newFromPrevious.getLabel();
        }
      } 


      this.newLabels.length = 0;

      for (var _i2 = 0; _i2 < n; _i2++) {
        if (!matchedObjects[_i2]) {
          var curLabel = this.getNewLabel();
          var _index = this.current.length;
          var newWithLabel = new TrackedObject().initFromObject(objects[_i2], curLabel, _index);
          this.current.push(newWithLabel);
          newWithLabel.timeStep(true);
          this.currentLabels[_i2] = curLabel;
          this.newLabels.push(curLabel);
        }
      } 


      this.deadLabels.length = 0;

      for (var _j2 = 0; _j2 < m; _j2++) {
        if (!matchedPrevious[_j2]) {
          if (this.previous[_j2].getLastSeen() < this.persistence) {
            this.current.push(this.previous[_j2]);
            this.current[this.current.length - 1].timeStep(false);
          }

          this.deadLabels.push(this.previous[_j2].getLabel());
        }
      } 


      this.currentLabelMap.clear();
      var currentSize = this.current.length;

      for (var _i3 = 0; _i3 < currentSize; _i3++) {
        var label = this.current[_i3].getLabel();

        this.currentLabelMap.set(label, this.current[_i3]);
      }

      this.previousLabelMap.clear();
      var previousSize = this.previous.length;

      for (var _i4 = 0; _i4 < previousSize; _i4++) {
        var _label = this.previous[_i4].getLabel();

        this.previousLabelMap.set(_label, this.previous[_i4]);
      }

      return this.currentLabels;
    }
  }, {
    key: "getCurrentLabels",
    value: function getCurrentLabels() {
      return this.currentLabels;
    }
  }, {
    key: "getPreviousLabels",
    value: function getPreviousLabels() {
      return this.previousLabels;
    }
  }, {
    key: "getNewLabels",
    value: function getNewLabels() {
      return this.newLabels;
    }
  }, {
    key: "getDeadLabels",
    value: function getDeadLabels() {
      return this.deadLabels;
    }
  }, {
    key: "getLabelFromIndex",
    value: function getLabelFromIndex(i) {
      return this.currentLabels[i];
    } 

  }, {
    key: "getIndexFromLabel",
    value: function getIndexFromLabel(label) {
      if (this.currentLabelMap.has(label)) {
        return this.currentLabelMap.get(label).getIndex();
      }

      console.warn('label', label, 'not found');
    }
  }, {
    key: "getPrevious",
    value: function getPrevious(label) {
      if (this.previousLabelMap.has(label)) {
        return this.previousLabelMap.get(label).object;
      }

      console.warn('label', label, 'not found');
    }
  }, {
    key: "getCurrent",
    value: function getCurrent(label) {
      if (this.currentLabelMap.has(label)) {
        return this.currentLabelMap.get(label).object;
      }

      console.warn('label', label, 'not found');
    }
  }, {
    key: "existsCurrent",
    value: function existsCurrent(label) {
      return this.currentLabelMap.has(label);
    }
  }, {
    key: "existsPrevious",
    value: function existsPrevious(label) {
      return this.previousLabelMap.has(label);
    }
  }, {
    key: "getAge",
    value: function getAge(label) {
      if (this.currentLabelMap.has(label)) {
        return this.currentLabelMap.get(label).getAge();
      }

      console.warn('label', label, 'not found');
    }
  }, {
    key: "getLastSeen",
    value: function getLastSeen(label) {
      if (this.currentLabelMap.has(label)) {
        return this.currentLabelMap.get(label).getLastSeen();
      }

      console.warn('label', label, 'not found');
    }
  }]);

  return Tracker;
}();

var p5_cv_tracker_RectTracker = function (_Tracker) {
  _inherits(RectTracker, _Tracker);

  var _super = _createSuper(RectTracker);

  function RectTracker() {
    var _this;

    _classCallCheck(this, RectTracker);

    _this = _super.call(this);
    _this.smoothingRate = 0.5; 

    _this.smoothed = new Map();
    return _this;
  }

  _createClass(RectTracker, [{
    key: "setSmoothingRate",
    value: function setSmoothingRate(smoothingRate) {
      this.smoothingRate = smoothingRate;
    }
  }, {
    key: "getSmoothingRate",
    value: function getSmoothingRate() {
      return this.smoothingRate;
    }
  }, {
    key: "track",
    value: function track(objects) {
      var labels = _get(_getPrototypeOf(RectTracker.prototype), "track", this).call(this, objects); 


      var labelsSize = labels.length;

      for (var i = 0; i < labelsSize; i++) {
        var label = labels[i];
        var cur = this.getCurrent(label);

        if (this.smoothed.has(label)) {
          var smooth = this.smoothed.get(label);
          smooth.x = lerp(smooth.x, cur.x, smoothingRate);
          smooth.y = lerp(smooth.y, cur.y, smoothingRate);
          smooth.width = lerp(smooth.width, cur.width, smoothingRate);
          smooth.height = lerp(smooth.height, cur.height, smoothingRate);
        } else {
          this.smoothed[label] = cur;
        }
      } 


      var _iterator = _createForOfIteratorHelper(this.smoothed.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              _label2 = _step$value[0],
              trackedRect = _step$value[1];

          if (!this.existsCurrent(_label2)) {
            this.smoothed["delete"](_label2);
            trackedRect; 
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return labels;
    }
  }, {
    key: "getSmoothed",
    value: function getSmoothed(label) {
      if (this.smoothed.has(label)) {
        return this.smoothed.get(label);
      }

      console.warn('label', label, 'not found');
    }
  }, {
    key: "getVelocity",
    value: function getVelocity(i) {
      var label = this.getLabelFromIndex(i); 

      if (this.existsPrevious(label)) {
        var previous = this.getPrevious(label);
        var current = this.getCurrent(label); 

        var previousPosition = createVector(previous.x + previous.width * 0.5, previous.y + previous.height * 0.5);
        var currentPosition = createVector(current.x + current.width * 0.5, current.y + current.height * 0.5);
        return p5.Vector.sub(currentPosition, previousPosition);
      } else {
        return createVector();
      }
    }
  }]);

  return RectTracker;
}(Tracker); 


var PointTracker = function (_Tracker2) {
  _inherits(PointTracker, _Tracker2);

  var _super2 = _createSuper(PointTracker);

  function PointTracker() {
    _classCallCheck(this, PointTracker);

    return _super2.call(this);
  }

  return PointTracker;
}(Tracker);

var Follower = function () {
  function Follower() {
    _classCallCheck(this, Follower);

    this.dead = false;
    this.label = 0;
  }

  _createClass(Follower, [{
    key: "setup",
    value: function setup(track) {}
  }, {
    key: "update",
    value: function update(track) {}
  }, {
    key: "kill",
    value: function kill() {
      this.dead = true;
    }
  }, {
    key: "setLabel",
    value: function setLabel(label) {
      this.label = label;
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      return this.label;
    }
  }, {
    key: "getDead",
    value: function getDead() {
      return this.dead;
    }
  }]);

  return Follower;
}(); 


var RectFollower = function (_Follower) {
  _inherits(RectFollower, _Follower);

  var _super3 = _createSuper(RectFollower);

  function RectFollower() {
    _classCallCheck(this, RectFollower);

    return _super3.call(this);
  }

  return RectFollower;
}(Follower);

var PointFollower = function (_Follower2) {
  _inherits(PointFollower, _Follower2);

  var _super4 = _createSuper(PointFollower);

  function PointFollower() {
    _classCallCheck(this, PointFollower);

    return _super4.call(this);
  }

  return PointFollower;
}(Follower); 


var TrackerFollower = function (_Tracker3) {
  _inherits(TrackerFollower, _Tracker3);

  var _super5 = _createSuper(TrackerFollower);

  function TrackerFollower() {
    var _this2;

    _classCallCheck(this, TrackerFollower);

    _this2 = _super5.call(this);
    _this2.labels = [];
    _this2.followers = [];
    return _this2;
  }

  _createClass(TrackerFollower, [{
    key: "track",
    value: function track(objects) {
      _get(_getPrototypeOf(TrackerFollower.prototype), "track", this).call(this, objects); 


      var labelsSize = this.labels.length;

      for (var i = 0; i < labelsSize; i++) {
        var curLabel = this.labels[i];
        var curFollower = this.followers[i];

        if (!this.existsCurrent(curLabel)) {
          curFollower.kill();
        } else {
          curFollower.update(this.getCurrent(curLabel));
        }
      } 


      var newLabelsSize = this.newLabels.length;

      for (var _i5 = 0; _i5 < newLabelsSize; _i5++) {
        var _curLabel = this.newLabels[_i5];
        this.labels.push(_curLabel);
        var newFollower = new Follower();
        this.followers.push(newFollower);
        newFollower.setup(this.getCurrent(_curLabel));
        newFollower.setLabel(_curLabel);
      } 


      labelsSize = this.labels.length;

      for (var _i6 = labelsSize - 1; _i6 >= 0; _i6--) {
        if (this.followers[_i6].getDead()) {
          this.followers.splice(_i6, 1);
          this.labels.splice(_i6, 1);
        }
      }

      return this.labels;
    }
  }, {
    key: "getFollowers",
    value: function getFollowers() {
      return this.followers;
    }
  }]);

  return TrackerFollower;
}(Tracker); 


var RectTrackerFollower = function (_TrackerFollower) {
  _inherits(RectTrackerFollower, _TrackerFollower);

  var _super6 = _createSuper(RectTrackerFollower);

  function RectTrackerFollower() {
    _classCallCheck(this, RectTrackerFollower);

    return _super6.call(this);
  }

  return RectTrackerFollower;
}(TrackerFollower);

var PointTrackerFollower = function (_TrackerFollower2) {
  _inherits(PointTrackerFollower, _TrackerFollower2);

  var _super7 = _createSuper(PointTrackerFollower);

  function PointTrackerFollower() {
    _classCallCheck(this, PointTrackerFollower);

    return _super7.call(this);
  }

  return PointTrackerFollower;
}(TrackerFollower);


function p5_cv_running_background_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function p5_cv_running_background_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function p5_cv_running_background_createClass(Constructor, protoProps, staticProps) { if (protoProps) p5_cv_running_background_defineProperties(Constructor.prototype, protoProps); if (staticProps) p5_cv_running_background_defineProperties(Constructor, staticProps); return Constructor; }

var DifferenceMode = {
  ABSDIFF: 0,
  BRIGHTER: 1,
  DARKER: 2
};

var RunningBackground = function () {
  function RunningBackground(width, height) {
    p5_cv_running_background_classCallCheck(this, RunningBackground);

    this.learningRate = 0.0001;
    this.learningTime = 900.0;
    this.useLearningTime = false;
    this.thresholdValue = 26;
    this.ignoreForeground = false;
    this.needToReset = false;
    this.differenceMode = DifferenceMode.ABSDIFF;
    this.accumulator = new cv.Mat();
    this.background = cv.Mat.zeros(height, width, cv.CV_32F);
    this.foreground = cv.Mat.zeros(height, width, cv.CV_32F);
    this.foregroundGray = cv.Mat.zeros(height, width, cv.CV_32F);
  }

  p5_cv_running_background_createClass(RunningBackground, [{
    key: "update",
    value: function update(frame, thresholded) {
      if (this.needToReset || this.accumulator.empty()) {
        this.needToReset = false; 

        frame.copyTo(this.accumulator);
      }

      this.accumulator.convertTo(this.background, cv.CV_8U);

      switch (this.differenceMode) {
        case DifferenceMode.ABSDIFF:
          cv.absdiff(this.background, frame, this.foreground);
          break;

        case DifferenceMode.BRIGHTER:
          cv.subtract(frame, this.background, this.foreground);
          break;

        case DifferenceMode.DARKER:
          cv.subtract(this.background, frame, this.foreground);
          break;
      }

      p5.cv.copyGray(this.foreground, this.foregroundGray);
      var thresholdMode = this.ignoreForeground ? cv.THRESH_BINARY_INV : cv.THRESH_BINARY;
      cv.threshold(this.foregroundGray, thresholded, this.thresholdValue, 255, thresholdMode); 

      var curLearningRate = float(this.learningRate);

      if (this.useLearningTime) {
        curLearningRate = pow(1 - this.thresholdValue / 255, 1 / float(this.learningRate));
      }

      if (this.ignoreForeground) {
        p5.cv.accumulateWeighted(frame, this.accumulator, curLearningRate); 
      } else {
        p5.cv.accumulateWeighted(frame, this.accumulator, curLearningRate);
      }
    }
  }, {
    key: "getPresence",
    value: function getPresence() {
      return cv.mean(this.foreground).data[0] / 255.0;
    }
  }, {
    key: "setThresholdValue",
    value: function setThresholdValue(thresholdValue) {
      this.thresholdValue = thresholdValue;
    }
  }, {
    key: "setLearningRate",
    value: function setLearningRate(learningRate) {
      this.learningRate = learningRate;
      this.useLearningTime = false;
    }
  }, {
    key: "setLearningTime",
    value: function setLearningTime(learningTime) {
      this.learningTime = learningTime;
      this.useLearningTime = true;
    }
  }, {
    key: "setIgnoreForeground",
    value: function setIgnoreForeground(ignoreForeground) {
      this.ignoreForeground = ignoreForeground;
    }
  }, {
    key: "setDifferenceMode",
    value: function setDifferenceMode(differenceMode) {
      this.differenceMode = differenceMode;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.needToReset = true;
    }
  }]);

  return RunningBackground;
}();

 var p5_cv_running_background = (RunningBackground);
function p5_cv_object_finder_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function p5_cv_object_finder_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function p5_cv_object_finder_createClass(Constructor, protoProps, staticProps) { if (protoProps) p5_cv_object_finder_defineProperties(Constructor.prototype, protoProps); if (staticProps) p5_cv_object_finder_defineProperties(Constructor, staticProps); return Constructor; }

var ObjectFinder = function () {
  function ObjectFinder() {
    p5_cv_object_finder_classCallCheck(this, ObjectFinder);

    this.rescale = 1;
    this.multiScaleFactor = 1.1;
    this.minNeighbors = 3;
    this.minSizeScale = new cv.Size();
    this.maxSizeScale = new cv.Size(1, 1);
    this.useHistogramEqualization = true;
    this.cannyPrunning = false;
    this.findBiggestObject = false;
    this.gray = new cv.Mat();
    this.graySmall = new cv.Mat();
    this.classifier = new cv.CascadeClassifier(); 

    this.objects = [];
    this.tracker = new RectTracker();
  }

  p5_cv_object_finder_createClass(ObjectFinder, [{
    key: "setup",
    value: function setup(cascadeFilename) {
      this.classifier.load(cascadeFilename);
    }
  }, {
    key: "update",
    value: function update(newFrameMat) {
      if (this.classifier.empty()) {
        return;
      }

      if (newFrameMat.channels() === 1) {
        this.gray = newFrameMat;
      } else {
        p5.cv.copyGray(newFrameMat, this.gray);
      }

      p5.cv.resizeToScale(this.gray, this.graySmall, this.rescale, this.rescale);

      if (this.useHistogramEqualization) {
        p5.cv.equalizeHist(this.graySmall);
      }

      var minSize = new cv.Size(),
          maxSize = new cv.Size();
      var minSide = min(this.graySmall.rows, this.graySmall.cols);

      if (this.minSizeScale > 0) {
        var side = this.minSizeScale * minSide;
        minSize.width = side;
        minSize.height = side;
      }

      if (this.maxSizeScale < 1) {
        var _side = this.maxSizeScale * minSide; 


        maxSize.width = _side;
        maxSize.height = _side;
      }

      var rectVector = new cv.RectVector();
      this.classifier.detectMultiScale(this.graySmall, rectVector, this.multiScaleFactor, this.minNeighbors, (this.cannyPruning ? cv.CASCADE_DO_CANNY_PRUNING : 0) | (this.findBiggestObject ? cv.CASCADE_FIND_BIGGEST_OBJECT | cv.CASCADE_DO_ROUGH_SEARCH : 0), minSize, maxSize);
      this.objects.length = 0;
      p5.cv.cvRectVectorToArray(rectVector, this.objects);
      rectVector["delete"]();
      var objectsSize = this.objects.length;
      var rect;

      for (var i = 0; i < objectsSize; i++) {
        rect = this.objects[i]; 

        rect.width /= this.rescale, rect.height /= this.rescale;
        rect.x /= this.rescale, rect.y /= this.rescale; 

        this.objects[i] = rect;
      }

      this.tracker.track(this.objects);
    }
  }, {
    key: "size",
    value: function size() {
      return this.objects.length;
    }
  }, {
    key: "getObject",
    value: function getObject(i) {
      return this.objects[i];
    }
  }, {
    key: "getObjectSmoothed",
    value: function getObjectSmoothed(i) {
      return this.tracker.getSmoothed(this.getLabel(i));
    }
  }, {
    key: "getVelocity",
    value: function getVelocity(i) {
      return this.tracker.getVelocity(i);
    }
  }, {
    key: "getLabel",
    value: function getLabel(i) {
      return this.tracker.getCurrentLabels()[i];
    }
  }, {
    key: "getTracker",
    value: function getTracker() {
      return this.tracker;
    }
  }, {
    key: "draw",
    value: function draw() {
      push();
      noFill();
      stroke(0, 192, 0);
      var size = this.size();
      var object;

      for (var i = 0; i < size; i++) {
        object = this.getObject(i);
        rect(object.x, object.y, object.width, object.height);
        text(this.getLabel(i), object.x, object.y - 3);
      }

      pop();
    }
  }, {
    key: "setPreset",
    value: function setPreset(preset) {
      if (preset === ObjectFinder.FAST) {
        this.setRescale(0.25);
        this.setMinNeighbors(2);
        this.setMultiScaleFactor(1.2);
        this.setMinSizeScale(0.25);
        this.setMaxSizeScale(0.75);
        this.setCannyPruning(true);
        this.setFindBiggestObject(false);
      } else if (preset === ObjectFinder.ACCURATE) {
        this.setRescale(0.5);
        this.setMinNeighbors(6);
        this.setMultiScaleFactor(1.02);
        this.setMinSizeScale(0.1);
        this.setMaxSizeScale(1);
        this.setCannyPruning(true);
        this.setFindBiggestObject(false);
      } else if (preset === ObjectFinder.SENSITIVE) {
        this.setRescale(0.5);
        this.setMinNeighbors(1);
        this.setMultiScaleFactor(1.02);
        this.setMinSizeScale(0.1);
        this.setMaxSizeScale(1);
        this.setCannyPruning(false);
        this.setFindBiggestObject(false);
      }
    }
  }, {
    key: "setRescale",
    value: function setRescale(rescale) {
      this.rescale = rescale;
    }
  }, {
    key: "setMinNeighbors",
    value: function setMinNeighbors(minNeighbors) {
      this.minNeighbors = minNeighbors;
    }
  }, {
    key: "setMultiScaleFactor",
    value: function setMultiScaleFactor(multiScaleFactor) {
      this.multiScaleFactor = multiScaleFactor;
    }
  }, {
    key: "setCannyPruning",
    value: function setCannyPruning(cannyPruning) {
      this.cannyPrunning = cannyPruning;
    }
  }, {
    key: "setFindBiggestObject",
    value: function setFindBiggestObject(findBiggestObject) {
      this.findBiggestObject = findBiggestObject;
    }
  }, {
    key: "setUseHistogramEqualization",
    value: function setUseHistogramEqualization(useHistogramEqualization) {
      this.useHistogramEqualization = useHistogramEqualization;
    }
  }, {
    key: "setMinSizeScale",
    value: function setMinSizeScale(minSizeScale) {
      this.minSizeScale = minSizeScale;
    }
  }, {
    key: "setMaxSizeScale",
    value: function setMaxSizeScale(maxSizeScale) {
      this.maxSizeScale = maxSizeScale;
    }
  }]);

  return ObjectFinder;
}();

ObjectFinder.FAST = 0;
ObjectFinder.ACCURATE = 1;
ObjectFinder.SENSITIVE = 2;
 var p5_cv_object_finder = (ObjectFinder);
function p5_cv_flow_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { p5_cv_flow_typeof = function _typeof(obj) { return typeof obj; }; } else { p5_cv_flow_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return p5_cv_flow_typeof(obj); }

function p5_cv_flow_get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { p5_cv_flow_get = Reflect.get; } else { p5_cv_flow_get = function _get(target, property, receiver) { var base = p5_cv_flow_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return p5_cv_flow_get(target, property, receiver || target); }

function p5_cv_flow_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = p5_cv_flow_getPrototypeOf(object); if (object === null) break; } return object; }

function p5_cv_flow_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) p5_cv_flow_setPrototypeOf(subClass, superClass); }

function p5_cv_flow_setPrototypeOf(o, p) { p5_cv_flow_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return p5_cv_flow_setPrototypeOf(o, p); }

function p5_cv_flow_createSuper(Derived) { var hasNativeReflectConstruct = p5_cv_flow_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = p5_cv_flow_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = p5_cv_flow_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return p5_cv_flow_possibleConstructorReturn(this, result); }; }

function p5_cv_flow_possibleConstructorReturn(self, call) { if (call && (p5_cv_flow_typeof(call) === "object" || typeof call === "function")) { return call; } return p5_cv_flow_assertThisInitialized(self); }

function p5_cv_flow_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function p5_cv_flow_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function p5_cv_flow_getPrototypeOf(o) { p5_cv_flow_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return p5_cv_flow_getPrototypeOf(o); }

function p5_cv_flow_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function p5_cv_flow_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function p5_cv_flow_createClass(Constructor, protoProps, staticProps) { if (protoProps) p5_cv_flow_defineProperties(Constructor.prototype, protoProps); if (staticProps) p5_cv_flow_defineProperties(Constructor, staticProps); return Constructor; }

var Flow = function () {
  function Flow() {
    p5_cv_flow_classCallCheck(this, Flow);

    this.last = new cv.Mat();
    this.curr = new cv.Mat();
    this.hasFlow = false;
  } 


  p5_cv_flow_createClass(Flow, [{
    key: "calcOpticalFlowTo",
    value: function calcOpticalFlowTo(lastMat, currentMat) {
      if (lastMat.channels() === 1 && currentMat.channels() === 1) {
        this.calcFlow(lastMat, currentMat);
      } else {
        p5.cv.copyGray(lastMat, this.last);
        p5.cv.copyGray(currentMat, this.curr);
        this.calcFlow(this.last, this.curr);
      }

      this.hasFlow = true;
    } 

  }, {
    key: "calcOpticalFlow",
    value: function calcOpticalFlow(currentMat) {
      p5.cv.copyGray(currentMat, this.curr);
      var lastSize = this.last.size();
      var currSize = this.curr.size();

      if (lastSize.width === currSize.width && lastSize.height === currSize.height) {
        this.calcFlow(this.last, this.curr);
        this.hasFlow = true;
      }

      p5.cv.swap(this.curr, this.last);
    }
  }, {
    key: "draw",
    value: function draw(x, y, renderWidth, renderHeight) {
      x = x || 0;
      y = y || 0;
      renderWidth = renderWidth || width;
      renderHeight = renderHeight || height;

      if (this.hasFlow) {
        this.drawFlow(x, y, width, height);
      }
    }
  }, {
    key: "drawRect",
    value: function drawRect(rect) {
      if (this.hasFlow) {
        this.drawFlow(rect.x, rect.y, rect.width, rect.height);
      }
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.curr.cols;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.curr.rows;
    }
  }, {
    key: "resetFlow",
    value: function resetFlow() {
      this.last.setTo(p5.cv.ZERO_SCALAR);
      this.curr.setTo(p5.cv.ZERO_SCALAR);
      this.hasFlow = false;
    } 

  }, {
    key: "calcFlow",
    value: function calcFlow(prevMat, nextMat) {}
  }]);

  return Flow;
}(); 


var FlowPyrLK = function (_Flow) {
  p5_cv_flow_inherits(FlowPyrLK, _Flow);

  var _super = p5_cv_flow_createSuper(FlowPyrLK);

  function FlowPyrLK() {
    var _this;

    p5_cv_flow_classCallCheck(this, FlowPyrLK);

    _this = _super.call(this);
    _this.prevPts = new cv.Mat();
    _this.nextPts = new cv.Mat(); 

    _this.windowSize = new cv.Size(32, 32);
    _this.maxLevel = 3;
    _this.maxFeatures = 200; 

    _this.maxCorners = 30;
    _this.blockSize = 7;
    _this.qualityLevel = 0.01; 

    _this.minDistance = 4;
    _this.criteria = new cv.TermCriteria(cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 0.03); 

    _this.pyramidLevels = 10;
    _this.calcFeaturesNextFrame = true; 

    _this.pyramid = new cv.Mat();
    _this.prevPyramid = new cv.Mat();
    _this.status = new cv.Mat();
    _this.err = new cv.Mat();
    return _this;
  } 


  p5_cv_flow_createClass(FlowPyrLK, [{
    key: "setMinDistance",
    value: function setMinDistance(minDistance) {
      this.minDistance = minDistance;
    }
  }, {
    key: "setWindowSize",
    value: function setWindowSize(winSize) {
      this.windowSize.width = winSize;
      this.windowSize.height = winSize;
    } 

  }, {
    key: "setMaxLevel",
    value: function setMaxLevel(maxLevel) {
      this.maxLevel = maxLevel;
    }
  }, {
    key: "setMaxFeatures",
    value: function setMaxFeatures(maxFeatures) {
      this.maxFeatures = maxFeatures;
    }
  }, {
    key: "setQualityLevel",
    value: function setQualityLevel(qualityLevel) {
      this.qualityLevel = qualityLevel;
    }
  }, {
    key: "setPyramidLevels",
    value: function setPyramidLevels(levels) {
      this.pyramidLevels = levels;
    } 

  }, {
    key: "getFeatures",
    value: function getFeatures() {
      return p5.cv.cvFeaturesToPoints(this.prevPts);
    }
  }, {
    key: "getCurrent",
    value: function getCurrent() {
      var result = [];

      for (var i = 0; i < this.nextPts.rows; i++) {
        if (this.status.data[i]) {
          result.push(p5.cv.getFeatureAsPoint(this.nextPts, i));
        }
      }

      return result;
    }
  }, {
    key: "getMotion",
    value: function getMotion() {
      var result = [];
      var featuresSize = this.prevPts.rows;

      for (var i = 0; i < featuresSize; i++) {
        if (this.status.data[i]) {
          result.push(cv.Point.sub(p5.cv.getFeatureAsPoint(this.nextPts, i), p5.cv.getFeatureAsPoint(this.prevPts, i)));
        }
      }

      return result;
    } 

  }, {
    key: "resetFeaturesToTrack",
    value: function resetFeaturesToTrack() {
      this.calcFeaturesNextFrame = true;
    }
  }, {
    key: "setFeaturesToTrack",
    value: function setFeaturesToTrack(features) {
      this.nextPts = features;
      this.calcFeaturesNextFrame = false;
    }
  }, {
    key: "resetFlow",
    value: function resetFlow() {
      p5_cv_flow_get(p5_cv_flow_getPrototypeOf(FlowPyrLK.prototype), "resetFlow", this).call(this);

      this.resetFeaturesToTrack();
      this.prevPts = new cv.Mat();
    }
  }, {
    key: "drawFlow",
    value: function drawFlow(drawX, drawY, drawWidth, drawHeight) {
      var scaleX = drawWidth / width;
      var scaleY = drawHeight / height;
      var prevPtsSize = this.prevPts.rows;
      beginShape(LINES);

      for (var i = 0; i < prevPtsSize; i++) {
        if (this.status.data[i]) {
          vertex(this.prevPts.data32F[i * 2] * scaleX + drawX, this.prevPts.data32F[i * 2 + 1] * scaleY + drawY, 9);
          vertex(this.nextPts.data32F[i * 2] * scaleX + drawX, this.nextPts.data32F[i * 2 + 1] * scaleY + drawY, 9);
        }
      }

      endShape();
    }
  }, {
    key: "calcFlow",
    value: function calcFlow(prevMat, nextMat) {
      if (!this.nextPts.empty() || this.calcFeaturesNextFrame) {
        if (this.calcFeaturesNextFrame) {
          this.calcFeaturesToTrack(this.prevPts, nextMat);
          this.calcFeaturesNextFrame = false;
        } else {
          p5.cv.swap(this.prevPts, this.nextPts);
        }

        this.nextPts.setTo(p5.cv.ZERO_SCALAR);
        cv.calcOpticalFlowPyrLK(prevMat, nextMat, this.prevPts, this.nextPts, this.status, this.err, this.windowSize, this.maxLevel); 
      } else {
        this.calcFeaturesToTrack(this.nextPts, nextMat);
      }
    }
  }, {
    key: "calcFeaturesToTrack",
    value: function calcFeaturesToTrack(features, nextMat) {
      cv.goodFeaturesToTrack(nextMat, features, this.maxFeatures, this.qualityLevel, this.minDistance);
    }
  }]);

  return FlowPyrLK;
}(Flow);

var FlowFarneback = function (_Flow2) {
  p5_cv_flow_inherits(FlowFarneback, _Flow2);

  var _super2 = p5_cv_flow_createSuper(FlowFarneback);

  function FlowFarneback() {
    var _this2;

    p5_cv_flow_classCallCheck(this, FlowFarneback);

    _this2 = _super2.call(this);
    _this2.flow = new cv.Mat();
    _this2.pyramidScale = 0.5;
    _this2.numLevels = 4;
    _this2.windowSize = 8;
    _this2.numIterations = 2;
    _this2.polyN = 7;
    _this2.polySigma = 1.5;
    _this2.farnebackGaussian = false;
    _this2.renderStep = 60; 

    return _this2;
  }

  p5_cv_flow_createClass(FlowFarneback, [{
    key: "setPyramidScale",
    value: function setPyramidScale(scale) {
      if (scale < 0.0 || scale >= 1.0) {
        console.warn('FlowFarneback::setPyramidScale', 'setting scale to a number outside of 0 - 1');
        scale = constrain(scale, 0.0, 1.0);
      }

      this.pyramidScale = scale;
    }
  }, {
    key: "setNumLevels",
    value: function setNumLevels(levels) {
      this.numLevels = levels;
    }
  }, {
    key: "setWindowSize",
    value: function setWindowSize(winSize) {
      this.windowSize = winSize;
    }
  }, {
    key: "setNumIterations",
    value: function setNumIterations(iterations) {
      this.numIterations = iterations;
    }
  }, {
    key: "setPolyN",
    value: function setPolyN(polyN) {
      this.polyN = polyN;
    }
  }, {
    key: "setPolySigma",
    value: function setPolySigma(polySigma) {
      this.polySigma = polySigma;
    }
  }, {
    key: "setUseGaussian",
    value: function setUseGaussian(gaussian) {
      this.farnebackGaussian = gaussian;
    } 

  }, {
    key: "resetFlow",
    value: function resetFlow() {
      p5_cv_flow_get(p5_cv_flow_getPrototypeOf(FlowFarneback.prototype), "resetFlow", this).call(this);

      this.flow.setTo(p5.cv.ZERO_SCALAR);
    }
  }, {
    key: "calcFlow",
    value: function calcFlow(prevMat, nextMat) {
      var flags = 0;

      if (this.hasFlow) {
        flags = cv.OPTFLOW_USE_INITIAL_FLOW;
      }

      if (this.farnebackGaussian) {
        flags |= cv.OPTFLOW_FARNEBACK_GAUSSIAN;
      } 


      cv.calcOpticalFlowFarneback(prevMat, nextMat, this.flow, this.pyramidScale, this.numLevels, this.windowSize, this.numIterations, this.polyN, this.polySigma, flags);
    }
  }, {
    key: "getFlow",
    value: function getFlow() {
      if (!hasFlow) {
        this.flow = cv.Mat.zeros(1, 1, CV_32FC2);
      }

      return this.flow;
    }
  }, {
    key: "getTotalFlow",
    value: function getTotalFlow() {
      return this.getTotalFlowInRegion(0, 0, this.flow.cols, this.flow.rows);
    }
  }, {
    key: "getAverageFlow",
    value: function getAverageFlow() {
      return this.getAverageFlowInRegion(0, 0, this.flow.cols, this.flow.rows);
    }
  }, {
    key: "getFlowOffset",
    value: function getFlowOffset(x, y) {
      if (!this.hasFlow) {
        return new cv.Point();
      } 


      var xIndex = (x + y * this.flow.cols) * 2;
      var yIndex = xIndex + 1;
      return {
        x: this.flow.data32F[xIndex],
        y: this.flow.data32F[yIndex]
      };
    }
  }, {
    key: "getFlowPosition",
    value: function getFlowPosition(x, y) {
      var position = this.getFlowOffset(x, y);
      position.x += x;
      position.y += y;
      return position;
    }
  }, {
    key: "getTotalFlowInRegion",
    value: function getTotalFlowInRegion(regionX, regionY, regionWidth, regionHeight) {
      if (!this.hasFlow) {
        return new cv.Point(0, 0);
      }

      var x = 0;
      var y = 0;
      var total = this.flow.total();
      var data = this.flow.data32F;

      for (var i = 0; i < total; i++) {
        var xIndex = i * 2;
        var yIndex = i * 2 + 1;
        x += data[xIndex];
        y += data[yIndex];
      }

      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "getAverageFlowInRegion",
    value: function getAverageFlowInRegion(regionX, regionY, regionWidth, regionHeight) {
      var flow = this.getTotalFlowInRegion(regionX, regionY, regionWidth, regionHeight);
      flow.x /= regionWidth;
      flow.y /= regionHeight;
      return flow;
    }
  }, {
    key: "drawFlow",
    value: function drawFlow(rectX, rectY, rectWidth, rectHeight) {
      if (!this.hasFlow) {
        return;
      }

      var scaleX = rectWidth / this.flow.cols;
      var scaleY = rectHeight / this.flow.rows;
      console.log(rectWidth, rectHeight);
      beginShape(LINES);
      var flowPosition;

      for (var y = 0; y < this.flow.rows; y += this.renderStep) {
        for (var x = 0; x < this.flow.cols; x += this.renderStep) {
          flowPosition = this.getFlowPosition(x, y);
          vertex(x * scaleX + rectX, y * scaleY + rectY);
          vertex(flowPosition.x * scaleX + rectX, flowPosition.y * scaleY + rectY);
        }
      }

      endShape();
    }
  }]);

  return FlowFarneback;
}(Flow);

var Graph = function () {
  function Graph(historyLength, minValue, maxValue) {
    p5_cv_flow_classCallCheck(this, Graph);

    this.minValue = minValue;
    this.maxValue = maxValue;
    this.historyLength = historyLength;
    this.history = new Float32Array(historyLength);
    this.index = 0;
  }

  p5_cv_flow_createClass(Graph, [{
    key: "addSample",
    value: function addSample(sample) {
      this.history[this.index] = sample;
      this.index = (this.index + 1) % this.historyLength;
    }
  }, {
    key: "getNormalizedSample",
    value: function getNormalizedSample(offset) {
      var i = (this.index + offset) % this.historyLength;
      var range = this.maxValue - this.minValue;
      return (this.history[i] - this.minValue) / range;
    }
  }, {
    key: "draw",
    value: function draw(width, height) {
      push();
      noFill();
      strokeWeight(1);
      beginShape();
      var range = this.maxValue - this.minValue;

      for (var offset = 0; offset < this.historyLength; offset++) {
        var i = (this.index + offset) % this.historyLength;
        var x = offset * width / this.historyLength;
        var normalized = (this.history[i] - this.minValue) / range;
        var y = height - normalized * height;
        vertex(x, y);
      }

      endShape();
      pop();
    }
  }]);

  return Graph;
}();

p5.cv.samePixels = function (a1, a2, stride, n) {
  for (var i = 0; i < n; i += stride) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }

  return true;
}; 


p5.cv.same = function (matA, matB) {
  var diff = new cv.Mat();
  var matAGray = new cv.Mat();
  var matBGray = new cv.Mat();
  p5.cv.copyGray(matA, matAGray);
  p5.cv.copyGray(matB, matBGray);
  cv.absdiff(matAGray, matBGray, diff);
  var same = cv.countNonZero(diff) === 0;
  diff["delete"]();
  matAGray["delete"]();
  matBGray["delete"]();
  return same;
}; 


var OFlow = function (_Flow3) {
  p5_cv_flow_inherits(OFlow, _Flow3);

  var _super3 = p5_cv_flow_createSuper(OFlow);

  function OFlow() {
    var _this3;

    p5_cv_flow_classCallCheck(this, OFlow);

    _this3 = _super3.call(this);
    _this3.step = 8;
    _this3.flow = null;
    _this3.uMotionGraph = new Graph(100, -_this3.step / 2, +_this3.step / 2);
    _this3.vMotionGraph = new Graph(100, -_this3.step / 2, +_this3.step / 2);
    return _this3;
  }

  p5_cv_flow_createClass(OFlow, [{
    key: "calcOpticalFlow",
    value: function calcOpticalFlow(currentMat) {
      this.curr = currentMat;
      var lastSize = this.last.size();
      var currSize = this.curr.size();

      if (lastSize.width === currSize.width && lastSize.height === currSize.height) {
        if (!p5.cv.samePixels(this.last.data, currentMat.data, 4, width)) {
          this.calcFlow(this.last, this.curr);
          this.hasFlow = true;
        }
      }

      p5.cv.swap(this.curr, this.last);
    } 

  }, {
    key: "calcFlow",
    value: function calcFlow(prevMat, nextMat) {
      if (prevMat.type() !== cv.CV_8UC4 || nextMat.type() !== cv.CV_8UC4) {
        console.warn('currently supporting only RGBA images');
        this.hasFlow = false;
        return;
      }

      var width = prevMat.cols;
      var height = prevMat.rows;
      var newImage = nextMat.data;
      var oldImage = prevMat.data;
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

          for (localY = -step; localY <= step; localY++) {
            for (localX = -step; localX <= step; localX++) {
              var address = (globalY + localY) * width + globalX + localX;
              var gradX = newImage[(address - 1) * 4] - newImage[(address + 1) * 4];
              var gradY = newImage[(address - width) * 4] - newImage[(address + width) * 4];
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
            var Idelta = step / delta;
            var deltaX = -(C1 * A1B2 - C2 * B1);
            var deltaY = -(A1B2 * C2 - A2 * C1);
            u = deltaX * Idelta;
            v = deltaY * Idelta;
          } else {
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
        v: vv / zones.length
      };
      this.hasFlow = true;
      return this.flow;
    }
  }, {
    key: "drawFlow",
    value: function drawFlow(rectX, rectY, rectWidth, rectHeight) {
      if (!this.hasFlow) {
        return;
      }

      var scaleX = rectWidth / this.curr.cols;
      var scaleY = rectHeight / this.curr.rows;

      if (this.flow && this.flow.u !== 0 && this.flow.v !== 0) {
        this.uMotionGraph.addSample(this.flow.u);
        this.vMotionGraph.addSample(this.flow.v);
        strokeWeight(2);
        var step = this.step;
        this.flow.zones.forEach(function (zone) {
          stroke(map(zone.width, -step, +step, 0, 255), map(zone.height, -step, +step, 0, 255), 128);
          line(zone.x * scaleX + rectX, zone.y * scaleY + rectY, (zone.x + zone.width) * scaleX + rectX, (zone.y + zone.height) * scaleY + rectY);
        });
      }
    }
  }, {
    key: "plotGraphs",
    value: function plotGraphs(rectX, rectY, rectWidth, rectHeight) {
      if (!this.hasFlow) {
        return;
      }

      if (this.flow && this.flow.u !== 0 && this.flow.v !== 0) {
        this.uMotionGraph.draw(rectWidth, rectHeight / 2);
        line(rectX, rectY + rectHeight / 4, rectX + rectWidth, rectY + rectHeight / 4); 

        translate(0, rectHeight / 2);
        this.vMotionGraph.draw(rectWidth, rectHeight / 2);
        line(rectX, rectY + rectHeight / 4, rectX + rectWidth, rectY + rectHeight / 4);
      }
    }
  }]);

  return OFlow;
}(Flow);


function p5_cv_contour_finder_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function p5_cv_contour_finder_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function p5_cv_contour_finder_createClass(Constructor, protoProps, staticProps) { if (protoProps) p5_cv_contour_finder_defineProperties(Constructor.prototype, protoProps); if (staticProps) p5_cv_contour_finder_defineProperties(Constructor, staticProps); return Constructor; }

p5.cv.TrackingColorMode = {
  TRACK_COLOR_RGB: 0,
  TRACK_COLOR_HSV: 1,
  TRACK_COLOR_H: 2,
  TRACK_COLOR_HS: 3
};

var ContourFinder = function () {
  function ContourFinder() {
    p5_cv_contour_finder_classCallCheck(this, ContourFinder);

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

  p5_cv_contour_finder_createClass(ContourFinder, [{
    key: "findContours",
    value: function findContours(sourceMat) {
      if (this.useTargetColor) {
        var offset = [this.thresholdValue, this.thresholdValue, this.thresholdValue, 0];
        var base = p5.cv.colorToCvScalar(this.targetColor);

        if (this.trackingColorMode === p5.cv.TrackingColorMode.TRACK_COLOR_RGB) {
          var lowerb = new cv.Mat(sourceMat.rows, sourceMat.cols, sourceMat.type(), cv.Scalar.sub(base, offset));
          var upperb = new cv.Mat(sourceMat.rows, sourceMat.cols, sourceMat.type(), cv.Scalar.add(base, offset));
          cv.inRange(sourceMat, lowerb, upperb, this.thresh);
          lowerb["delete"]();
          upperb["delete"]();
        } else {
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

          var _lowerb = new cv.Mat(this.hsvBuffer.rows, this.hsvBuffer.cols, this.hsvBuffer.type(), cv.Scalar.sub(base, offset));

          var _upperb = new cv.Mat(this.hsvBuffer.rows, this.hsvBuffer.cols, this.hsvBuffer.type(), cv.Scalar.add(base, offset));

          cv.inRange(this.hsvBuffer, _lowerb, _upperb, this.thresh);

          _lowerb["delete"]();

          _upperb["delete"]();
        }
      } else {
        p5.cv.copyGray(sourceMat, this.thresh);
      }

      if (this.autoThreshold) {
        p5.cv.threshold(this.thresh, this.thresholdValue, this.invert);
      } 


      var allContours = new cv.MatVector();
      var hierarchy = new cv.Mat();
      var simplifyMode = this.simplify ? cv.CHAIN_APPROX_SIMPLE : cv.CHAIN_APPROX_NONE;
      cv.findContours(this.thresh, allContours, hierarchy, this.contourFindingMode, simplifyMode); 

      var needMinFilter = this.minArea > 0;
      var needMaxFilter = this.maxAreaNorm ? this.maxArea < 1 : this.maxArea < Number.POSITIVE_INFINITY;
      var allIndices = [];
      var allAreas = [];
      var allHoles = [];

      if (needMinFilter || needMaxFilter) {
        var imgArea = sourceMat.rows * sourceMat.cols;
        var imgMinArea = this.minAreaNorm ? this.minArea * imgArea : this.minArea;
        var imgMaxArea = this.maxAreaNorm ? this.maxArea * imgArea : this.maxArea;

        for (var i = 0; i < allContours.size(); i++) {
          var curArea = cv.contourArea(allContours.get(i), true);
          var hole = true;

          if (curArea < 0) {
            curArea = -curArea;
            hole = false;
          }

          allHoles.push(hole);
          allAreas.push(curArea);

          if ((!needMinFilter || curArea >= imgMinArea) && (!needMaxFilter || curArea <= imgMaxArea)) {
            allIndices.push(i);
          }
        }
      } else {
        for (var _i = 0; _i < allContours.size(); _i++) {
          if (this.sortBySize) {
            allAreas.push(cv.contourArea(allContours.get(_i)));
          }

          allIndices.push(_i);
        }
      }

      if (allIndices.length > 1 && this.sortBySize) {

        allIndices.sort(function (a, b) {
          if (allAreas[a] > allAreas[b]) return 1;
          if (allAreas[a] < allAreas[b]) return -1;
          return 0;
        });
      } 


      this.contours.length = 0;
      this.polylines.length = 0;
      this.boundingRects.length = 0;
      this.holes.length = 0;
      var allIndicesSize = allIndices.length;

      for (var _i2 = 0; _i2 < allIndicesSize; _i2++) {
        var contour = allContours.get(allIndices[_i2]);
        this.contours.push(contour);
        this.polylines.push(p5.cv.cvPointsToVectors(contour));
        this.boundingRects.push(cv.boundingRect(contour));
        this.holes.push(allHoles[allIndices[_i2]]);
      } 


      this.tracker.track(this.boundingRects);
    }
  }, {
    key: "setFindHoles",
    value: function setFindHoles(findHoles) {
      if (findHoles) {
        this.contourFindingMode = cv.RETR_LIST;
      } else {
        this.contourFindingMode = cv.RETR_EXTERNAL;
      }
    }
  }, {
    key: "setSortBySize",
    value: function setSortBySize(sizeSort) {
      this.sortBySize = sizeSort;
    }
  }, {
    key: "getContours",
    value: function getContours() {
      return this.contours;
    }
  }, {
    key: "getPolylines",
    value: function getPolylines() {
      return this.polylines;
    }
  }, {
    key: "getBoundingRects",
    value: function getBoundingRects() {
      return this.boundingRects;
    }
  }, {
    key: "size",
    value: function size() {
      return this.contours.length;
    }
  }, {
    key: "getContour",
    value: function getContour(i) {
      return this.contours[i];
    }
  }, {
    key: "getPolyline",
    value: function getPolyline(i) {
      return this.polylines[i];
    }
  }, {
    key: "getBoundingRect",
    value: function getBoundingRect(i) {
      return this.boundingRects[i];
    }
  }, {
    key: "getCenter",
    value: function getCenter(i) {
      var box = this.getBoundingRect(i);
      return new cv.Point(box.x + box.width * 0.5, box.y + box.height * 0.5);
    }
  }, {
    key: "getCentroid",
    value: function getCentroid(i) {
      var m = cv.moments(this.contours[i]);

      if (m.m00 !== 0) {
        return new cv.Point(m.m10 / m.m00, m.m01 / m.m00);
      } else {
        return new cvPoint(0, 0);
      }
    }
  }, {
    key: "getAverage",
    value: function getAverage(i) {
      var average = cv.mean(this.contours[i]);
      return new cv.Point(average[0], average[1]);
    }
  }, {
    key: "getBalance",
    value: function getBalance(i) {
      return cv.Point.sub(this.getCentroid(i), this.getCenter(i));
    }
  }, {
    key: "getContourArea",
    value: function getContourArea(i) {
      return cv.contourArea(this.contours[i]);
    }
  }, {
    key: "getArcLength",
    value: function getArcLength(i) {
      return cv.arcLength(this.contours[i], true);
    }
  }, {
    key: "getConvexHull",
    value: function getConvexHull(i) {
      if (this.contours[i]) {
        return p5.cv.getConvexHullMat(this.contours[i]);
      }
    }
  }, {
    key: "getConvexityDefects",
    value: function getConvexityDefects(i) {
      return p5.cv.convexityDefectsCv(this.contours[i]);
    }
  }, {
    key: "getMinAreaRect",
    value: function getMinAreaRect(i) {
      return cv.minAreaRect(this.contours[i]);
    }
  }, {
    key: "getMinEnclosingCircle",
    value: function getMinEnclosingCircle(i) {
      return cv.minEnclosingCircle(this.contours[i]);
    }
  }, {
    key: "getFitEllipse",
    value: function getFitEllipse(i) {
      if (this.contours[i].total() < 5) {
        return this.getMinAreaRect(i);
      }

      return cv.fitEllipse(this.contours[i]);
    }
  }, {
    key: "getFitQuad",
    value: function getFitQuad(i) {
      var convexHull = this.getConvexHull(i);

      if (!convexHull) {
        return;
      }

      var quad = convexHull.clone();
      var targetPoints = 4;
      var maxIterations = 16;
      var infinity = Number.POSITIVE_INFINITY;
      var minEpsilon = 0;
      var maxEpsilon = infinity;
      var curEpsilon = 16; 

      if (quad.total() > 4) {
        for (var _i3 = 0; _i3 < maxIterations; _i3++) {
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
  }, {
    key: "getHole",
    value: function getHole(i) {
      return this.holes[i];
    }
  }, {
    key: "getVelocity",
    value: function getVelocity(i) {
      return this.tracker.getVelocity(i);
    }
  }, {
    key: "getLabel",
    value: function getLabel(i) {
      return this.tracker.getCurrentLabels()[i];
    }
  }, {
    key: "getTracker",
    value: function getTracker() {
      return this.tracker;
    }
  }, {
    key: "setAutoThreshold",
    value: function setAutoThreshold(autoThreshold) {
      this.autoThreshold = autoThreshold;
    }
  }, {
    key: "setThreshold",
    value: function setThreshold(thresholdValue) {
      this.thresholdValue = thresholdValue;
    } 

  }, {
    key: "setThresholdMax",
    value: function setThresholdMax(thresholdValueMax) {
      this.thresholdValueMax = thresholdValueMax;
    }
  }, {
    key: "setInvert",
    value: function setInvert(invert) {
      this.invert = invert;
    }
  }, {
    key: "setUseTargetColor",
    value: function setUseTargetColor(useTargetColor) {
      this.useTargetColor = useTargetColor;
    }
  }, {
    key: "setTargetColor",
    value: function setTargetColor(targetColor, trackingColorMode) {
      this.useTargetColor = true;
      this.targetColor = targetColor;
      this.trackingColorMode = trackingColorMode;
    }
  }, {
    key: "setSimplify",
    value: function setSimplify(simplify) {
      this.simplify = simplify;
    }
  }, {
    key: "draw",
    value: function draw() {
      push();
      noFill();
      var polylinesSize = this.polylines.length;

      for (var i = 0; i < polylinesSize; i++) {
        p5.cv.drawVectors(this.polylines[i]);
        var boundingRect = this.getBoundingRect(i);
        rect(boundingRect.x, boundingRect.y, boundingRect.width, boundingRect.height);
      }

      pop();
    }
  }, {
    key: "resetMinArea",
    value: function resetMinArea() {
      this.setMinArea(0);
    }
  }, {
    key: "resetMaxArea",
    value: function resetMaxArea() {
      this.setMaxArea(Number.POSITIVE_INFINITY);
    }
  }, {
    key: "setMinArea",
    value: function setMinArea(minArea) {
      this.minArea = minArea;
      this.maxAreaNorm = false;
    }
  }, {
    key: "setMaxArea",
    value: function setMaxArea(maxArea) {
      this.maxArea = maxArea;
      this.minAreaNorm = false;
    }
  }, {
    key: "setMinAreaRadius",
    value: function setMinAreaRadius(minAreaRadius) {
      this.minArea = PI * minAreaRadius * minAreaRadius;
      this.minAreaNorm = false;
    }
  }, {
    key: "setMaxAreaRadius",
    value: function setMaxAreaRadius(maxAreaRadius) {
      this.maxArea = PI * maxAreaRadius * maxAreaRadius;
      this.maxAreaNorm = false;
    }
  }, {
    key: "setMinAreaNorm",
    value: function setMinAreaNorm(minAreaNorm) {
      this.minArea = minAreaNorm;
      this.minAreaNorm = true;
    }
  }, {
    key: "setMaxAreaNorm",
    value: function setMaxAreaNorm(maxAreaNorm) {
      this.maxArea = maxAreaNorm;
      this.maxAreaNorm = true;
    }
  }]);

  return ContourFinder;
}();

 var p5_cv_contour_finder = (ContourFinder);






window.Tracker = Tracker;
window.TrackedObject = TrackedObject;
window.RectTracker = p5_cv_tracker_RectTracker;
window.PointTracker = PointTracker;
window.Follower = Follower;
window.RectFollower = RectFollower;
window.PointFollower = PointFollower;
window.TrackerFollower = TrackerFollower;
window.RectTrackerFollower = RectTrackerFollower;
window.PointTrackerFollower = PointTrackerFollower;

window.RunningBackground = p5_cv_running_background;

window.ObjectFinder = p5_cv_object_finder;

window.Flow = Flow;
window.FlowPyrLK = FlowPyrLK;
window.FlowFarneback = FlowFarneback;
window.OFlow = OFlow;
window.Graph = Graph;


window.ContourFinder = p5_cv_contour_finder;

 })
 ]);
