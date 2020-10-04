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
 	return __webpack_require__(__webpack_require__.s = 10);
 })
 ([
 (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  return color.levels;
}; 


p5.cv.cvRotatedRectToPoints = function (rect) {
  return cv.RotatedRect.points(rect);
};

p5.cv.cvRotatedRectToVectors = function (rect) {
  return p5.cv.cvRotatedRectToPoints(rect).map(function (pt) {
    return createVector(pt.x, pt.y);
  });
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


var Graph = function () {
  function Graph(historyLength, minValue, maxValue) {
    _classCallCheck(this, Graph);

    this.minValue = minValue;
    this.maxValue = maxValue;
    this.historyLength = historyLength;
    this.history = new Float32Array(historyLength);
    this.index = 0;
  }

  _createClass(Graph, [{
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

 }),
 (function(module, exports) {

var cachedSetTimeout,cachedClearTimeout,process=module.exports={};function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(t){if(cachedSetTimeout===setTimeout)return setTimeout(t,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(t,0);try{return cachedSetTimeout(t,0)}catch(e){try{return cachedSetTimeout.call(null,t,0)}catch(e){return cachedSetTimeout.call(this,t,0)}}}function runClearTimeout(t){if(cachedClearTimeout===clearTimeout)return clearTimeout(t);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(t);try{return cachedClearTimeout(t)}catch(e){try{return cachedClearTimeout.call(null,t)}catch(e){return cachedClearTimeout.call(this,t)}}}!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var currentQueue,queue=[],draining=!1,queueIndex=-1;function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}process.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

 }),
 (function(module, exports, __webpack_require__) {

(function(process) {function normalizeArray(r,t){for(var e=0,n=r.length-1;0<=n;n--){var o=r[n];"."===o?r.splice(n,1):".."===o?(r.splice(n,1),e++):e&&(r.splice(n,1),e--)}if(t)for(;e--;)r.unshift("..");return r}function basename(r){"string"!=typeof r&&(r+="");for(var t=0,e=-1,n=!0,o=r.length-1;0<=o;--o)if(47===r.charCodeAt(o)){if(!n){t=o+1;break}}else-1===e&&(n=!1,e=o+1);return-1===e?"":r.slice(t,e)}function filter(r,t){if(r.filter)return r.filter(t);for(var e=[],n=0;n<r.length;n++)t(r[n],n,r)&&e.push(r[n]);return e}exports.resolve=function(){for(var r="",t=!1,e=arguments.length-1;-1<=e&&!t;e--){var n=0<=e?arguments[e]:process.cwd();if("string"!=typeof n)throw new TypeError("Arguments to path.resolve must be strings");n&&(r=n+"/"+r,t="/"===n.charAt(0))}return(t?"/":"")+(r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"))||"."},exports.normalize=function(r){var t=exports.isAbsolute(r),e="/"===substr(r,-1);return(r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"))||t||(r="."),r&&e&&(r+="/"),(t?"/":"")+r},exports.isAbsolute=function(r){return"/"===r.charAt(0)},exports.join=function(){var r=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(r,function(r,t){if("string"!=typeof r)throw new TypeError("Arguments to path.join must be strings");return r}).join("/"))},exports.relative=function(r,t){function e(r){for(var t=0;t<r.length&&""===r[t];t++);for(var e=r.length-1;0<=e&&""===r[e];e--);return e<t?[]:r.slice(t,e-t+1)}r=exports.resolve(r).substr(1),t=exports.resolve(t).substr(1);for(var n=e(r.split("/")),o=e(t.split("/")),s=Math.min(n.length,o.length),i=s,u=0;u<s;u++)if(n[u]!==o[u]){i=u;break}for(var f=[],u=i;u<n.length;u++)f.push("..");return(f=f.concat(o.slice(i))).join("/")},exports.sep="/",exports.delimiter=":",exports.dirname=function(r){if("string"!=typeof r&&(r+=""),0===r.length)return".";for(var t=r.charCodeAt(0),e=47===t,n=-1,o=!0,s=r.length-1;1<=s;--s)if(47===r.charCodeAt(s)){if(!o){n=s;break}}else o=!1;return-1===n?e?"/":".":e&&1===n?"/":r.slice(0,n)},exports.basename=function(r,t){r=basename(r);return t&&r.substr(-1*t.length)===t&&(r=r.substr(0,r.length-t.length)),r},exports.extname=function(r){"string"!=typeof r&&(r+="");for(var t=-1,e=0,n=-1,o=!0,s=0,i=r.length-1;0<=i;--i){var u=r.charCodeAt(i);if(47===u){if(o)continue;e=i+1;break}-1===n&&(o=!1,n=i+1),46===u?-1===t?t=i:1!==s&&(s=1):-1!==t&&(s=-1)}return-1===t||-1===n||0===s||1===s&&t===n-1&&t===e+1?"":r.slice(t,n)};var substr="b"==="ab".substr(-1)?function(r,t,e){return r.substr(t,e)}:function(r,t,e){return t<0&&(t=r.length+t),r.substr(t,e)};
}.call(this, __webpack_require__(1)))

 }),
 (function(module, exports) {



 }),
 (function(module, exports) {

exports.endianness=function(){return"LE"},exports.hostname=function(){return"undefined"!=typeof location?location.hostname:""},exports.loadavg=function(){return[]},exports.uptime=function(){return 0},exports.freemem=function(){return Number.MAX_VALUE},exports.totalmem=function(){return Number.MAX_VALUE},exports.cpus=function(){return[]},exports.type=function(){return"Browser"},exports.release=function(){return"undefined"!=typeof navigator?navigator.appVersion:""},exports.networkInterfaces=exports.getNetworkInterfaces=function(){return{}},exports.arch=function(){return"javascript"},exports.platform=function(){return"browser"},exports.tmpdir=exports.tmpDir=function(){return"/tmp"},exports.EOL="\n",exports.homedir=function(){return"/"};

 }),
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
 (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = __webpack_require__(7),
    src = _require.src;

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

p5.cv.getRGBAMat = function (width, height) {
  return new cv.Mat(height, width, cv.CV_8UC4);
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
 (function(module, exports, __webpack_require__) {

(function(process, global) {!function(t,e){if(true)module.exports=e(__webpack_require__(2),__webpack_require__(3),__webpack_require__(4));else { var n, r; }}(this,function(t,e,n){return i={},r.m=o=[function(t,e){t=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=t)},function(t,e,n){var r=n(69)("wks"),o=n(73),i=n(0).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e,n){var r=n(85),n="object"==typeof self&&self&&self.Object===Object&&self,n=r||n||Function("return this")();t.exports=n},function(t,e){var n=Array.isArray;t.exports=n},function(t,e){t=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=t)},function(t,e){t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},function(t,e,n){var r=n(16);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(162),o=n(194);t.exports=function(t,e){return e=o(t,e),r(e)?e:void 0}},function(t,e){t.exports=function(t){return null!=t&&"object"==typeof t}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={SHORT:"AIV_SHORT",SILENT:!1,PACKAGE_JSON_PATH:"./package.json",components:{AutoIncreaseVersion:!0,InjectAsComment:!0,InjectByTag:!0},componentsOptions:{AutoIncreaseVersion:{runInWatchMode:!1},InjectAsComment:{tag:"Build version: {version} - {date}",dateFormat:"dddd, mmmm dS, yyyy, h:MM:ss TT",multiLineCommentType:!1},InjectByTag:{fileRegex:/\.+/,AIVTagRegexp:/(\[AIV])(([a-zA-Z{} ,:;!()_@\-"'\\\/])+)(\[\/AIV])/g,dateFormat:"dddd, mmmm dS, yyyy, h:MM:ss TT"}},LOGS_TEXT:{AIS_START:"Auto inject version started"}}},function(t,e,n){t.exports=!n(63)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(18),o=n(68);t.exports=n(10)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(26),o=n(191),i=n(220),u=r?r.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":(u&&u in Object(t)?o:i)(t)}},function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";e.__esModule=!0;var r,o=n(101),i=(r=o)&&r.__esModule?r:{default:r};function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,i.default)(t,r.key,r)}}e.default=function(t,e,n){return e&&u(t.prototype,e),n&&u(t,n),t}},function(t,e,n){var d=n(0),y=n(4),g=n(23),m=n(11),b=n(24),x="prototype",_=function(t,e,n){var r,o,i,u=t&_.F,c=t&_.G,s=t&_.S,a=t&_.P,f=t&_.B,l=t&_.W,p=c?y:y[e]||(y[e]={}),h=p[x],v=c?d:s?d[e]:(d[e]||{})[x];for(r in c&&(n=e),n)(o=!u&&v&&void 0!==v[r])&&b(p,r)||(i=(o?v:n)[r],p[r]=c&&"function"!=typeof v[r]?n[r]:f&&o?g(i,d):l&&v[r]==i?function(r){function t(t,e,n){if(this instanceof r){switch(arguments.length){case 0:return new r;case 1:return new r(t);case 2:return new r(t,e)}return new r(t,e,n)}return r.apply(this,arguments)}return t[x]=r[x],t}(i):a&&"function"==typeof i?g(Function.call,i):i,a&&((p.virtual||(p.virtual={}))[r]=i,t&_.R&&h&&!h[r]&&m(h,r,i)))};_.F=1,_.G=2,_.S=4,_.P=8,_.B=16,_.W=32,_.U=64,_.R=128,t.exports=_},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports={}},function(t,e,n){var r=n(6),o=n(110),i=n(130),u=Object.defineProperty;e.f=n(10)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t,e){return t===e||t!=t&&e!=e}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s(n(13)),o=s(n(14)),i=s(n(102)),u=s(n(9)),c=n(59);function s(t){return t&&t.__esModule?t:{default:t}}var a=n(93).EOL,o=((0,o.default)(f,[{key:"getLogLevel",value:function(){"silent"===process.env.npm_config_loglevel?this.logLevel=0:(0,c.isArgv)("aiv-log-full")?this.logLevel=3:(0,c.isArgv)("aiv-log-none")&&(this.logLevel=0)}},{key:"getHead",value:function(){return a+i.default.bgYellow.black("[AIV] : ")}},{key:"getText",value:function(t){return u.default.LOGS_TEXT[t]}},{key:"call",value:function(t,e){"function"==typeof this[t]&&this[t](this.getText(e))}},{key:"error",value:function(t){u.default.SILENT||this.logLevel<3||console.log(this.getHead()+" "+i.default.red("error")+" : "+t)}},{key:"info",value:function(t){u.default.SILENT||this.logLevel&&console.log(this.getHead()+" "+i.default.blue("info")+" : "+t)}},{key:"warn",value:function(t){u.default.SILENT||this.logLevel&&console.log(this.getHead()+" "+i.default.yellow("warn")+" : "+t)}}]),f);function f(){(0,r.default)(this,f),this.logLevel=3,this.getLogLevel()}e.default=new o},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var i=n(21);t.exports=function(r,o,t){if(i(r),void 0===o)return r;switch(t){case 1:return function(t){return r.call(o,t)};case 2:return function(t,e){return r.call(o,t,e)};case 3:return function(t,e,n){return r.call(o,t,e,n)}}return function(){return r.apply(o,arguments)}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(205),o=n(206),i=n(207),u=n(208),n=n(209);function c(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}c.prototype.clear=r,c.prototype.delete=o,c.prototype.get=i,c.prototype.has=u,c.prototype.set=n,t.exports=c},function(t,e,n){n=n(2).Symbol;t.exports=n},function(t,e,n){var r=n(19);t.exports=function(t,e){for(var n=t.length;n--;)if(r(t[n][0],e))return n;return-1}},function(t,e,n){var r=n(203);t.exports=function(t,e){return t=t.__data__,r(e)?t["string"==typeof e?"string":"hash"]:t.map}},function(t,e,n){n=n(7)(Object,"create");t.exports=n},function(t,e,n){var r=n(56);t.exports=function(t){if("string"==typeof t||r(t))return t;var e=t+"";return"0"==e&&1/t==-1/0?"-0":e}},function(t,e,n){var r=n(33),o=n(55);t.exports=function(t){return null!=t&&o(t.length)&&!r(t)}},function(t,i,u){(function(t){var e=u(2),n=u(242),r="object"==typeof i&&i&&!i.nodeType&&i,o=r&&"object"==typeof t&&t&&!t.nodeType&&t,e=o&&o.exports===r?e.Buffer:void 0,n=(e?e.isBuffer:void 0)||n;t.exports=n}).call(i,u(35)(t))},function(t,e,n){var r=n(12),o=n(5);t.exports=function(t){return!!o(t)&&("[object Function]"==(t=r(t))||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t)}},function(t,e,n){var r=n(163),o=n(177),n=n(219),n=n&&n.isTypedArray,r=n?o(n):r;t.exports=r},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e){t.exports=__webpack_require__(2)},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(16),o=n(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e){t.exports=!0},function(t,e,n){"use strict";var o=n(21);function r(t){var n,r;this.promise=new t(function(t,e){if(void 0!==n||void 0!==r)throw TypeError("Bad Promise constructor");n=t,r=e}),this.resolve=o(n),this.reject=o(r)}t.exports.f=function(t){return new r(t)}},function(t,e,n){var r=n(18).f,o=n(24),i=n(1)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(69)("keys"),o=n(73);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(0<t?r:n)(t)}},function(t,e,n){var r=n(112),o=n(37);t.exports=function(t){return r(o(t))}},function(t,e,n){n=n(7)(n(2),"Map");t.exports=n},function(t,e,n){var r=n(210),o=n(211),i=n(212),u=n(213),n=n(214);function c(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}c.prototype.clear=r,c.prototype.delete=o,c.prototype.get=i,c.prototype.has=u,c.prototype.set=n,t.exports=c},function(t,e,n){var r=n(25),o=n(227),i=n(228),u=n(229),c=n(230),n=n(231);function s(t){t=this.__data__=new r(t);this.size=t.size}s.prototype.clear=o,s.prototype.delete=i,s.prototype.get=u,s.prototype.has=c,s.prototype.set=n,t.exports=s},function(t,e,n){var r=n(83);t.exports=function(t,e,n){"__proto__"==e&&r?r(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}},function(t,e,n){n=n(88)(Object.getPrototypeOf,Object);t.exports=n},function(t,e){var r=/^(?:0|[1-9]\d*)$/;t.exports=function(t,e){var n=typeof t;return!!(e=null==e?9007199254740991:e)&&("number"==n||"symbol"!=n&&r.test(t))&&-1<t&&t%1==0&&t<e}},function(t,e,n){var r=n(3),o=n(56),i=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,u=/^\w*$/;t.exports=function(t,e){if(r(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!o(t))||(u.test(t)||!i.test(t)||null!=e&&t in Object(e))}},function(t,e){var n=Object.prototype;t.exports=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||n)}},function(t,e){t.exports=function(t){return t}},function(t,e,n){var r=n(159),o=n(8),n=Object.prototype,i=n.hasOwnProperty,u=n.propertyIsEnumerable,r=r(function(){return arguments}())?r:function(t){return o(t)&&i.call(t,"callee")&&!u.call(t,"callee")};t.exports=r},function(t,e){t.exports=function(t){return"number"==typeof t&&-1<t&&t%1==0&&t<=9007199254740991}},function(t,e,n){var r=n(12),o=n(8);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==r(t)}},function(t,e,n){var r=n(76),o=n(165),i=n(31);t.exports=function(t){return(i(t)?r:o)(t)}},function(t,e,n){"use strict";t.exports=function(){return/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isArgv=function(t){return void 0!==r.env&&(void 0!==r.env[t]&&Boolean(r.env[t]))};var r=n(247).argv},function(t,e,n){t.exports={default:n(105),__esModule:!0}},function(t,e,n){var r=n(22),o=n(1)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var e;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(t=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?t:i?r(e):"Object"==(t=r(e))&&"function"==typeof e.callee?"Arguments":t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){n=n(0).document;t.exports=n&&n.documentElement},function(t,e,n){"use strict";function m(){return this}var b=n(39),x=n(15),_=n(125),j=n(11),w=n(17),O=n(115),T=n(41),A=n(121),k=n(1)("iterator"),S=!([].keys&&"next"in[].keys()),M="values";t.exports=function(t,e,n,r,o,i,u){O(n,e,r);function c(t){if(!S&&t in v)return v[t];switch(t){case"keys":case M:return function(){return new n(this,t)}}return function(){return new n(this,t)}}var s,a,f,l=e+" Iterator",p=o==M,h=!1,v=t.prototype,d=v[k]||v["@@iterator"]||o&&v[o],y=d||c(o),g=o?p?c("entries"):y:void 0,r="Array"==e&&v.entries||d;if(r&&(f=A(r.call(new t)))!==Object.prototype&&f.next&&(T(f,l,!0),b||"function"==typeof f[k]||j(f,k,m)),p&&d&&d.name!==M&&(h=!0,y=function(){return d.call(this)}),b&&!u||!S&&!h&&v[k]||j(v,k,y),w[e]=y,w[l]=m,o)if(s={values:p?y:c(M),keys:i?y:c("keys"),entries:g},u)for(a in s)a in v||_(v,a,s[a]);else x(x.P+x.F*(S||h),e,s);return s}},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var r=n(6),o=n(16),i=n(40);t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;t=i.f(t);return(0,t.resolve)(e),t.promise}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(4),o=n(0),i="__core-js_shared__",u=o[i]||(o[i]={});(t.exports=function(t,e){return u[t]||(u[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(39)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e,n){var r=n(6),o=n(21),i=n(1)("species");t.exports=function(t,e){var n,t=r(t).constructor;return void 0===t||null==(n=r(t)[i])?e:o(n)}},function(t,e,n){function r(){var t,e=+this;g.hasOwnProperty(e)&&(t=g[e],delete g[e],t())}function o(t){r.call(t.data)}var i,u=n(23),c=n(111),s=n(64),a=n(38),f=n(0),l=f.process,p=f.setImmediate,h=f.clearImmediate,v=f.MessageChannel,d=f.Dispatch,y=0,g={},m="onreadystatechange";p&&h||(p=function(t){for(var e=[],n=1;n<arguments.length;)e.push(arguments[n++]);return g[++y]=function(){c("function"==typeof t?t:Function(t),e)},i(y),y},h=function(t){delete g[t]},"process"==n(22)(l)?i=function(t){l.nextTick(u(r,t,1))}:d&&d.now?i=function(t){d.now(u(r,t,1))}:v?(v=(n=new v).port2,n.port1.onmessage=o,i=u(v.postMessage,v,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(i=function(t){f.postMessage(t+"","*")},f.addEventListener("message",o,!1)):i=m in a("script")?function(t){s.appendChild(a("script"))[m]=function(){s.removeChild(this),r.call(t)}}:function(t){setTimeout(u(r,t,1),0)}),t.exports={set:p,clear:h}},function(t,e,n){var r=n(43),o=Math.min;t.exports=function(t){return 0<t?o(r(t),9007199254740991):0}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r;!function(){"use strict";var y,g,m,b=(y=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g,g=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,m=/[^-+\dA-Z]/g,function(t,e,n,r){if(1!==arguments.length||"string"!==function(t){if(null===t)return"null";if(void 0===t)return"undefined";if("object"!=typeof t)return typeof t;if(Array.isArray(t))return"array";return{}.toString.call(t).slice(8,-1).toLowerCase()}(t)||/\d/.test(t)||(e=t,t=void 0),(t=t||new Date)instanceof Date||(t=new Date(t)),isNaN(t))throw TypeError("Invalid date");var o=(e=String(b.masks[e]||e||b.masks.default)).slice(0,4);"UTC:"!==o&&"GMT:"!==o||(e=e.slice(4),n=!0,"GMT:"===o&&(r=!0));var i=n?"getUTC":"get",u=t[i+"Date"](),c=t[i+"Day"](),s=t[i+"Month"](),a=t[i+"FullYear"](),f=t[i+"Hours"](),l=t[i+"Minutes"](),p=t[i+"Seconds"](),h=t[i+"Milliseconds"](),v=n?0:t.getTimezoneOffset(),o=function(t){var e=new Date(t.getFullYear(),t.getMonth(),t.getDate());e.setDate(e.getDate()-(e.getDay()+6)%7+3);var n=new Date(e.getFullYear(),0,4);n.setDate(n.getDate()-(n.getDay()+6)%7+3);t=e.getTimezoneOffset()-n.getTimezoneOffset();e.setHours(e.getHours()-t);n=(e-n)/6048e5;return 1+Math.floor(n)}(t),i=function(t){t=t.getDay();0===t&&(t=7);return t}(t),d={d:u,dd:x(u),ddd:b.i18n.dayNames[c],dddd:b.i18n.dayNames[c+7],m:s+1,mm:x(s+1),mmm:b.i18n.monthNames[s],mmmm:b.i18n.monthNames[s+12],yy:String(a).slice(2),yyyy:a,h:f%12||12,hh:x(f%12||12),H:f,HH:x(f),M:l,MM:x(l),s:p,ss:x(p),l:x(h,3),L:x(Math.round(h/10)),t:f<12?"a":"p",tt:f<12?"am":"pm",T:f<12?"A":"P",TT:f<12?"AM":"PM",Z:r?"GMT":n?"UTC":(String(t).match(g)||[""]).pop().replace(m,""),o:(0<v?"-":"+")+x(100*Math.floor(Math.abs(v)/60)+Math.abs(v)%60,4),S:["th","st","nd","rd"][3<u%10?0:(u%100-u%10!=10)*u%10],W:o,N:i};return e.replace(y,function(t){return t in d?d[t]:t.slice(1,t.length-1)})});function x(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}b.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},b.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]},void 0===(r=function(){return b}.call(e,n,e,t))||(t.exports=r)}()},function(t,e,n){n=n(2).Uint8Array;t.exports=n},function(t,e,n){var f=n(175),l=n(54),p=n(3),h=n(32),v=n(50),d=n(34),y=Object.prototype.hasOwnProperty;t.exports=function(t,e){var n,r=p(t),o=!r&&l(t),i=!r&&!o&&h(t),u=!r&&!o&&!i&&d(t),c=r||o||i||u,s=c?f(t.length,String):[],a=s.length;for(n in t)!e&&!y.call(t,n)||c&&("length"==n||i&&("offset"==n||"parent"==n)||u&&("buffer"==n||"byteLength"==n||"byteOffset"==n)||v(n,a))||s.push(n);return s}},function(t,e,n){var r=n(48),o=n(19);t.exports=function(t,e,n){(void 0===n||o(t[e],n))&&(void 0!==n||e in t)||r(t,e,n)}},function(t,e,n){var r=n(5),o=Object.create,n=function(t){if(!r(t))return{};if(o)return o(t);i.prototype=t;t=new i;return i.prototype=void 0,t};function i(){}t.exports=n},function(t,e,n){n=n(186)();t.exports=n},function(t,e,n){var o=n(82),i=n(30);t.exports=function(t,e){for(var n=0,r=(e=o(e,t)).length;null!=t&&n<r;)t=t[i(e[n++])];return n&&n==r?t:void 0}},function(t,e,n){var u=n(160),c=n(8);t.exports=function t(e,n,r,o,i){return e===n||(null==e||null==n||!c(e)&&!c(n)?e!=e&&n!=n:u(e,n,r,o,t,i))}},function(t,e,n){var r=n(3),o=n(51),i=n(232),u=n(244);t.exports=function(t,e){return r(t)?t:o(t,e)?[t]:i(u(t))}},function(t,e,n){var r=n(7),n=function(){try{var t=r(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=n},function(t,e,n){var d=n(147),y=n(154),g=n(178);t.exports=function(t,e,n,r,o,i){var u=1&n,c=t.length,s=e.length;if(c!=s&&!(u&&c<s))return!1;if((s=i.get(t))&&i.get(e))return s==e;var a=-1,f=!0,l=2&n?new d:void 0;for(i.set(t,e),i.set(e,t);++a<c;){var p,h=t[a],v=e[a];if(r&&(p=u?r(v,h,a,e,t,i):r(h,v,a,t,e,i)),void 0!==p){if(p)continue;f=!1;break}if(l){if(!y(e,function(t,e){if(!g(l,e)&&(h===t||o(h,t,n,r,i)))return l.push(e)})){f=!1;break}}else if(h!==v&&!o(h,v,n,r,i)){f=!1;break}}return i.delete(t),i.delete(e),f}},function(t,e){var n="object"==typeof global&&global&&global.Object===Object&&global;t.exports=n},function(t,e,n){var r=n(5);t.exports=function(t){return t==t&&!r(t)}},function(t,e){t.exports=function(e,n){return function(t){return null!=t&&(t[e]===n&&(void 0!==n||e in Object(t)))}}},function(t,e){t.exports=function(e,n){return function(t){return e(n(t))}}},function(t,e){t.exports=function(t,e){if("__proto__"!=e)return t[e]}},function(t,e){var n=Function.prototype.toString;t.exports=function(t){if(null!=t){try{return n.call(t)}catch(t){}try{return t+""}catch(t){}}return""}},function(t,e,n){var r=n(76),o=n(166),i=n(31);t.exports=function(t){return i(t)?r(t,!0):o(t)}},function(t,e){t.exports=__webpack_require__(3)},function(t,e){t.exports=__webpack_require__(4)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=v(n(13)),o=v(n(14)),i=v(n(92)),u=v(n(36)),c=v(n(9)),s=v(n(20)),a=v(n(239)),f=v(n(245)),l=v(n(96)),p=v(n(97)),h=v(n(99));function v(t){return t&&t.__esModule?t:{default:t}}var d=((0,o.default)(y,[{key:"setConfig",value:function(t){this.config=(0,a.default)(c.default,t),this.config.components=(0,f.default)(this.config.components,function(t,e,n){t[n.toLowerCase()]=e})}},{key:"apply",value:function(t){this.compiler=t,this._executeWebpackComponents()}},{key:"_executeNoneWebpackComponents",value:function(){this._executeComponent([l.default])}},{key:"_executeWebpackComponents",value:function(){c.default.componentsOptions.AutoIncreaseVersion.runInWatchMode&&this._executeComponent([l.default]),this._executeComponent([p.default,h.default])}},{key:"_executeComponent",value:function(t){var e;t.length&&(e=t.shift(),this.config.components[e.componentName.toLowerCase()]&&new e(this).apply(),this._executeComponent(t))}}]),y);function y(t){(0,r.default)(this,y),this.setConfig(t);t=JSON.parse(i.default.readFileSync(u.default.resolve(this.config.PACKAGE_JSON_PATH),"utf8"));this.version=t.version,s.default.call("info","AIS_START"),this._executeNoneWebpackComponents()}e.default=d,void 0===(e=function(){return d}.call(e,n,e,t))||(t.exports=e)},function(t,e,n){"use strict";(function(t){Object.defineProperty(t,"exports",{enumerable:!0,get:function(){var r={modifiers:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},colors:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39]},bgColors:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49]}};return r.colors.grey=r.colors.gray,Object.keys(r).forEach(function(t){var n=r[t];Object.keys(n).forEach(function(t){var e=n[t];r[t]=n[t]={open:"["+e[0]+"m",close:"["+e[1]+"m"}}),Object.defineProperty(r,t,{value:n,enumerable:!1})}),r}})}).call(e,n(35)(t))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=h(n(100)),o=h(n(60)),i=h(n(13)),u=h(n(14)),c=h(n(36)),s=h(n(92)),a=h(n(249)),f=n(59),l=h(n(20)),p=h(n(9));function h(t){return t&&t.__esModule?t:{default:t}}(0,u.default)(v,[{key:"apply",value:function(){var n=this,t=new o.default(function(t,e){n.resolve=t,n.reject=e});return p.default.componentsOptions.AutoIncreaseVersion.runInWatchMode?(this.context.compiler&&this.context.compiler.plugin("emit",function(t,e){n.start(),e()}),null):(this.start(),t)}},{key:"start",value:function(){if(this.packageFile=this.openPackageFile(),this.packageFile)return p.default.componentsOptions.AutoIncreaseVersion.forceMode&&"function"==typeof this[p.default.componentsOptions.AutoIncreaseVersion.forceMode]?this[p.default.componentsOptions.AutoIncreaseVersion.forceMode]():void((0,f.isArgv)("major")?this.major():(0,f.isArgv)("minor")?this.minor():(0,f.isArgv)("patch")?this.patch():this.resolve())}},{key:"openPackageFile",value:function(){try{return JSON.parse(s.default.readFileSync(c.default.resolve(this.context.config.PACKAGE_JSON_PATH),"utf8"))}catch(t){return console.log(t),null}}},{key:"updateContextVersion",value:function(t){this.context.version=t}},{key:"closePackageFile",value:function(e){var n=this;if(this.packageFile.version=e,p.default.componentsOptions.AutoIncreaseVersion.simulate)return l.default.info("autoIncVersion : new version : "+e),void l.default.info("package.json updated!");s.default.writeFile(c.default.resolve(this.context.config.PACKAGE_JSON_PATH),(0,r.default)(this.packageFile,null,4),function(t){return t?(n.reject(t),console.log(t),!1):(l.default.info("autoIncVersion : new version : "+e),l.default.info("package.json updated!"),n.context.version=e,n.resolve(),!0)})}},{key:"major",value:function(){var t=a.default.inc(this.packageFile.version,"major");this.updateContextVersion(t),this.closePackageFile(t)}},{key:"minor",value:function(){var t=a.default.inc(this.packageFile.version,"minor");this.updateContextVersion(t),this.closePackageFile(t)}},{key:"patch",value:function(){var t=a.default.inc(this.packageFile.version,"patch");this.updateContextVersion(t),this.closePackageFile(t)}}]),u=v;function v(t){(0,i.default)(this,v),this.context=t}u.componentName="AutoIncreaseVersion",e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(n(13)),o=a(n(14)),u=a(n(36)),i=a(n(9)),c=a(n(20)),s=a(n(98));function a(t){return t&&t.__esModule?t:{default:t}}var f=n(93).EOL,o=((0,o.default)(l,[{key:"apply",value:function(){var i=this;this.context.compiler.plugin("emit",function(t,e){for(var n in t.assets){var r=u.default.extname(n).replace(/(\?)(.){0,}/,""),o=t.assets[n];i._handleAssetFile(r,o),c.default.info("InjectAsComment : match : "+n+" : injected : "+i.context.version)}e()})}},{key:"_handleAssetFile",value:function(t,e){switch(t){case".js":this.injectIntoJs(e);break;case".html":this.injectIntoHtml(e);break;case".css":this.injectIntoCss(e)}}},{key:"parseTags",value:function(t,e){var n=this;return t+" "+this.context.config.componentsOptions.InjectAsComment.tag.replace(/(\{([a-zA-Z]+)\})/g,function(t){var e=t.replace(/(\{|\})/g,"");return"function"==typeof s.default[e]?s.default[e](n.context):(c.default.error("unsupported tag in componentsOptions.InjectAsComment.tag ["+e+"]"),t)})+" "+e}},{key:"injectIntoCss",value:function(t){var e=this.parseTags("/** ["+i.default.SHORT+"] "," **/ ");e+=f+" "+t.source()+" ",t.source=function(){return e}}},{key:"injectIntoHtml",value:function(t){var e=this.parseTags("\x3c!-- ["+i.default.SHORT+"] "," --\x3e ");e+=f+" "+t.source()+" ",t.source=function(){return e}}},{key:"injectIntoJs",value:function(t){var e=void 0,e=this.context.config.componentsOptions.InjectAsComment.multiLineCommentType?this.parseTags("/** ["+i.default.SHORT+"] ","*/ "):this.parseTags("// ["+i.default.SHORT+"] "," ");e+=f+" "+t.source()+" ",t.source=function(){return e}}}]),l);function l(t){(0,r.default)(this,l),this.context=t}o.componentName="InjectAsComment",e.default=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i(n(74)),o=i(n(9));function i(t){return t&&t.__esModule?t:{default:t}}e.default={version:function(t){return t.version},date:function(){return(0,r.default)(new Date,o.default.componentsOptions.InjectAsComment.dateFormat)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=u(n(60)),o=u(n(13)),i=u(n(14)),c=u(n(74)),s=u(n(20)),a=u(n(9));function u(t){return t&&t.__esModule?t:{default:t}}(0,i.default)(f,[{key:"apply",value:function(){var u=this;return this.context.compiler.plugin("emit",function(o,t){for(var i in o.assets){u.context.config.componentsOptions.InjectByTag.fileRegex.test(i)&&function(){var e=0,t=o.assets[i],n=t.source();if(!n||"function"!=typeof n.replace)return;var r=n.replace(u.context.config.componentsOptions.InjectByTag.AIVTagRegexp,function(t){return t=(t=(t=t.replace(/(\{)(version)(\})/g,function(){return u.context.version})).replace(/(\{)(date)(\})/g,function(){return(0,c.default)(new Date,a.default.componentsOptions.InjectByTag.dateFormat)})).replace(/(\[AIV])|(\[\/AIV])/g,""),e++,t});t.source=function(){return r},s.default.info("InjectByTag : match : "+i+" : replaced : "+e)}()}t()}),new r.default(function(t){t()})}}]),i=f;function f(t){(0,o.default)(this,f),this.context=t}i.componentName="InjectByTag",e.default=i},function(t,e,n){t.exports={default:n(103),__esModule:!0}},function(t,e,n){t.exports={default:n(104),__esModule:!0}},function(t,e,n){"use strict";var r=n(141),s=n(95),o=n(250),i=n(142),u=n(251),n=Object.defineProperties,a="win32"===process.platform&&!/^xterm/i.test(process.env.TERM);function c(t){this.enabled=t&&void 0!==t.enabled?t.enabled:u}a&&(s.blue.open="[94m");var f,l,p=(f={},Object.keys(s).forEach(function(t){s[t].closeRe=new RegExp(r(s[t].close),"g"),f[t]={get:function(){return v.call(this,this._styles.concat(t))}}}),f),h=n(function(){},p);function v(t){var e=function(){return function(){var t=arguments,e=t.length,n=0!==e&&String(arguments[0]);if(1<e)for(var r=1;r<e;r++)n+=" "+t[r];if(!this.enabled||!n)return n;var o=this._styles,i=o.length,u=s.dim.open;!a||-1===o.indexOf("gray")&&-1===o.indexOf("grey")||(s.dim.open="");for(;i--;){var c=s[o[i]];n=c.open+n.replace(c.closeRe,c.open)+c.close}return s.dim.open=u,n}.apply(e,arguments)};return e._styles=t,e.enabled=this.enabled,e.__proto__=h,e}n(c.prototype,(l={},Object.keys(p).forEach(function(t){l[t]={get:function(){return v.call(this,[t])}}}),l)),t.exports=new c,t.exports.styles=s,t.exports.hasColor=i,t.exports.stripColor=o,t.exports.supportsColor=u},function(t,e,n){var n=n(4),r=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}},function(t,e,n){n(134);var r=n(4).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){n(135),n(137),n(140),n(136),n(138),n(139),t.exports=n(4).Promise},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var s=n(44),a=n(72),f=n(128);t.exports=function(c){return function(t,e,n){var r,o=s(t),i=a(o.length),u=f(n,i);if(c&&e!=e){for(;u<i;)if((r=o[u++])!=r)return!0}else for(;u<i;u++)if((c||u in o)&&o[u]===e)return c||u||0;return!c&&-1}}},function(t,e,n){var l=n(23),p=n(114),h=n(113),v=n(6),d=n(72),y=n(132),g={},m={};(e=t.exports=function(t,e,n,r,o){var i,u,c,s,o=o?function(){return t}:y(t),a=l(n,r,e?2:1),f=0;if("function"!=typeof o)throw TypeError(t+" is not iterable!");if(h(o)){for(i=d(t.length);f<i;f++)if((s=e?a(v(u=t[f])[0],u[1]):a(t[f]))===g||s===m)return s}else for(c=o.call(t);!(u=c.next()).done;)if((s=p(c,a,u.value,e))===g||s===m)return s}).BREAK=g,e.RETURN=m},function(t,e,n){t.exports=!n(10)&&!n(63)(function(){return 7!=Object.defineProperty(n(38)("div"),"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var r=n(22);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(17),o=n(1)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){var i=n(6);t.exports=function(e,t,n,r){try{return r?t(i(n)[0],n[1]):t(n)}catch(t){var o=e.return;throw void 0!==o&&i(o.call(e)),t}}},function(t,e,n){"use strict";var r=n(119),o=n(68),i=n(41),u={};n(11)(u,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var i=n(1)("iterator"),u=!1;try{var r=[7][i]();r.return=function(){u=!0},Array.from(r,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!u)return!1;var n=!1;try{var r=[7],o=r[i]();o.next=function(){return{done:n=!0}},r[i]=function(){return o},t(r)}catch(t){}return n}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var c=n(0),s=n(71).set,a=c.MutationObserver||c.WebKitMutationObserver,f=c.process,l=c.Promise,p="process"==n(22)(f);t.exports=function(){function t(){var t,e;for(p&&(t=f.domain)&&t.exit();n;){e=n.fn,n=n.next;try{e()}catch(t){throw n?o():r=void 0,t}}r=void 0,t&&t.enter()}var n,r,e,o,i,u;return o=p?function(){f.nextTick(t)}:!a||c.navigator&&c.navigator.standalone?l&&l.resolve?(e=l.resolve(void 0),function(){e.then(t)}):function(){s.call(c,t)}:(i=!0,u=document.createTextNode(""),new a(t).observe(u,{characterData:!0}),function(){u.data=i=!i}),function(t){t={fn:t,next:void 0};r&&(r.next=t),n||(n=t,o()),r=t}}},function(t,e,n){function r(){}var o=n(6),i=n(120),u=n(62),c=n(42)("IE_PROTO"),s="prototype",a=function(){var t=n(38)("iframe"),e=u.length;for(t.style.display="none",n(64).appendChild(t),t.src="javascript:",(t=t.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;e--;)delete a[s][u[e]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(r[s]=o(t),n=new r,r[s]=null,n[c]=t):n=a(),void 0===e?n:i(n,e)}},function(t,e,n){var u=n(18),c=n(6),s=n(123);t.exports=n(10)?Object.defineProperties:function(t,e){c(t);for(var n,r=s(e),o=r.length,i=0;i<o;)u.f(t,n=r[i++],e[n]);return t}},function(t,e,n){var r=n(24),o=n(129),i=n(42)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var u=n(24),c=n(44),s=n(108)(!1),a=n(42)("IE_PROTO");t.exports=function(t,e){var n,r=c(t),o=0,i=[];for(n in r)n!=a&&u(r,n)&&i.push(n);for(;e.length>o;)u(r,n=e[o++])&&(~s(i,n)||i.push(n));return i}},function(t,e,n){var r=n(122),o=n(62);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var o=n(11);t.exports=function(t,e,n){for(var r in e)n&&t[r]?t[r]=e[r]:o(t,r,e[r]);return t}},function(t,e,n){t.exports=n(11)},function(t,e,n){"use strict";var r=n(0),o=n(4),i=n(18),u=n(10),c=n(1)("species");t.exports=function(t){t=("function"==typeof o[t]?o:r)[t];u&&t&&!t[c]&&i.f(t,c,{configurable:!0,get:function(){return this}})}},function(t,e,n){var u=n(43),c=n(37);t.exports=function(i){return function(t,e){var n,r=String(c(t)),o=u(e),t=r.length;return o<0||t<=o?i?"":void 0:(e=r.charCodeAt(o))<55296||56319<e||o+1===t||(n=r.charCodeAt(o+1))<56320||57343<n?i?r.charAt(o):e:i?r.slice(o,o+2):n-56320+(e-55296<<10)+65536}}},function(t,e,n){var r=n(43),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(37);t.exports=function(t){return Object(r(t))}},function(t,e,n){var o=n(16);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){n=n(0).navigator;t.exports=n&&n.userAgent||""},function(t,e,n){var r=n(61),o=n(1)("iterator"),i=n(17);t.exports=n(4).getIteratorMethod=function(t){if(null!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){"use strict";var r=n(106),o=n(117),i=n(17),u=n(44);t.exports=n(65)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(15);r(r.S+r.F*!n(10),"Object",{defineProperty:n(18).f})},function(t,e){},function(t,e,n){"use strict";function r(){}function l(t){var e;return!(!y(t)||"function"!=typeof(e=t.then))&&e}function o(f,e){var n;f._n||(f._n=!0,n=f._c,j(function(){for(var s=f._v,a=1==f._s,t=0;n.length>t;)!function(t){var e,n,r,o=a?t.ok:t.fail,i=t.resolve,u=t.reject,c=t.domain;try{o?(a||(2==f._h&&N(f),f._h=1),!0===o?e=s:(c&&c.enter(),e=o(s),c&&(c.exit(),r=!0)),e===t.promise?u(S("Promise-chain cycle")):(n=l(e))?n.call(e,i,u):i(e)):u(s)}catch(t){c&&!r&&c.exit(),u(t)}}(n[t++]);f._c=[],f._n=!1,e&&!f._h&&R(f)}))}function i(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),o(e,!0))}var u,c,s,a,f=n(39),p=n(0),h=n(23),v=n(61),d=n(15),y=n(16),g=n(21),m=n(107),b=n(109),x=n(70),_=n(71).set,j=n(118)(),w=n(40),O=n(66),T=n(131),A=n(67),k="Promise",S=p.TypeError,M=p.process,E=M&&M.versions,P=E&&E.v8||"",I=p[k],C="process"==v(M),L=c=w.f,v=!!function(){try{var t=I.resolve(1),e=(t.constructor={})[n(1)("species")]=function(t){t(r,r)};return(C||"function"==typeof PromiseRejectionEvent)&&t.then(r)instanceof e&&0!==P.indexOf("6.6")&&-1===T.indexOf("Chrome/66")}catch(t){}}(),R=function(o){_.call(p,function(){var t,e,n=o._v,r=F(o);if(r&&(t=O(function(){C?M.emit("unhandledRejection",n,o):(e=p.onunhandledrejection)?e({promise:o,reason:n}):(e=p.console)&&e.error&&e.error("Unhandled promise rejection",n)}),o._h=C||F(o)?2:1),o._a=void 0,r&&t.e)throw t.v})},F=function(t){return 1!==t._h&&0===(t._a||t._c).length},N=function(e){_.call(p,function(){var t;C?M.emit("rejectionHandled",e):(t=p.onrejectionhandled)&&t({promise:e,reason:e._v})})},$=function(t){var n,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===t)throw S("Promise can't be resolved itself");(n=l(t))?j(function(){var e={_w:r,_d:!1};try{n.call(t,h($,e,1),h(i,e,1))}catch(t){i.call(e,t)}}):(r._v=t,r._s=1,o(r,!1))}catch(t){i.call({_w:r,_d:!1},t)}}};v||(I=function(t){m(this,I,k,"_h"),g(t),u.call(this);try{t(h($,this,1),h(i,this,1))}catch(t){i.call(this,t)}},(u=function(){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=n(124)(I.prototype,{then:function(t,e){var n=L(x(this,I));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=C?M.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&o(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),s=function(){var t=new u;this.promise=t,this.resolve=h($,t,1),this.reject=h(i,t,1)},w.f=L=function(t){return t===I||t===a?new s:c(t)}),d(d.G+d.W+d.F*!v,{Promise:I}),n(41)(I,k),n(126)(k),a=n(4)[k],d(d.S+d.F*!v,k,{reject:function(t){var e=L(this);return(0,e.reject)(t),e.promise}}),d(d.S+d.F*(f||!v),k,{resolve:function(t){return A(f&&this===a?I:this,t)}}),d(d.S+d.F*!(v&&n(116)(function(t){I.all(t).catch(r)})),k,{all:function(t){var u=this,e=L(u),c=e.resolve,s=e.reject,n=O(function(){var r=[],o=0,i=1;b(t,!1,function(t){var e=o++,n=!1;r.push(void 0),i++,u.resolve(t).then(function(t){n||(n=!0,r[e]=t,--i||c(r))},s)}),--i||c(r)});return n.e&&s(n.v),e.promise},race:function(t){var e=this,n=L(e),r=n.reject,o=O(function(){b(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o.e&&r(o.v),n.promise}})},function(t,e,n){"use strict";var r=n(127)(!0);n(65)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t=this._t,e=this._i;return e>=t.length?{value:void 0,done:!0}:(e=r(t,e),this._i+=e.length,{value:e,done:!1})})},function(t,e,n){"use strict";var r=n(15),o=n(4),i=n(0),u=n(70),c=n(67);r(r.P+r.R,"Promise",{finally:function(e){var n=u(this,o.Promise||i.Promise),t="function"==typeof e;return this.then(t?function(t){return c(n,e()).then(function(){return t})}:e,t?function(t){return c(n,e()).then(function(){throw t})}:e)}})},function(t,e,n){"use strict";var r=n(15),o=n(40),i=n(66);r(r.S,"Promise",{try:function(t){var e=o.f(this),t=i(t);return(t.e?e.reject:e.resolve)(t.v),e.promise}})},function(t,e,n){n(133);for(var r=n(0),o=n(11),i=n(17),u=n(1)("toStringTag"),c="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),s=0;s<c.length;s++){var a=c[s],f=r[a],f=f&&f.prototype;f&&!f[u]&&o(f,u,a),i[a]=i.Array}},function(t,e,n){"use strict";var r=/[|\\{}()[\]^$+*?.]/g;t.exports=function(t){if("string"!=typeof t)throw new TypeError("Expected a string");return t.replace(r,"\\$&")}},function(t,e,n){"use strict";n=n(58),n=new RegExp(n().source);t.exports=n.test.bind(n)},function(t,e,n){n=n(7)(n(2),"DataView");t.exports=n},function(t,e,n){var r=n(196),o=n(197),i=n(198),u=n(199),n=n(200);function c(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}c.prototype.clear=r,c.prototype.delete=o,c.prototype.get=i,c.prototype.has=u,c.prototype.set=n,t.exports=c},function(t,e,n){n=n(7)(n(2),"Promise");t.exports=n},function(t,e,n){n=n(7)(n(2),"Set");t.exports=n},function(t,e,n){var r=n(46),o=n(222),n=n(223);function i(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new r;++e<n;)this.add(t[e])}i.prototype.add=i.prototype.push=o,i.prototype.has=n,t.exports=i},function(t,e,n){n=n(7)(n(2),"WeakMap");t.exports=n},function(t,e){t.exports=function(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}},function(t,e){t.exports=function(t,e){for(var n=-1,r=null==t?0:t.length;++n<r&&!1!==e(t[n],n,t););return t}},function(t,e){t.exports=function(t,e){for(var n=-1,r=null==t?0:t.length,o=0,i=[];++n<r;){var u=t[n];e(u,n,t)&&(i[o++]=u)}return i}},function(t,e){t.exports=function(t,e){for(var n=-1,r=null==t?0:t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}},function(t,e){t.exports=function(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}},function(t,e){t.exports=function(t,e){for(var n=-1,r=null==t?0:t.length;++n<r;)if(e(t[n],n,t))return!0;return!1}},function(t,e,n){var o=n(48),i=n(19),u=Object.prototype.hasOwnProperty;t.exports=function(t,e,n){var r=t[e];u.call(t,e)&&i(r,n)&&(void 0!==n||e in t)||o(t,e,n)}},function(t,e,n){var r=n(79),o=n(57);t.exports=function(t,e){return t&&r(t,e,o)}},function(t,e,n){var r=n(153),o=n(3);t.exports=function(t,e,n){return e=e(t),o(t)?e:r(e,n(t))}},function(t,e){t.exports=function(t,e){return null!=t&&e in Object(t)}},function(t,e,n){var r=n(12),o=n(8);t.exports=function(t){return o(t)&&"[object Arguments]"==r(t)}},function(t,e,n){var l=n(47),p=n(84),h=n(187),v=n(188),d=n(193),y=n(3),g=n(32),m=n(34),b="[object Arguments]",x="[object Array]",_="[object Object]",j=Object.prototype.hasOwnProperty;t.exports=function(t,e,n,r,o,i){var u=y(t),c=y(e),s=u?x:d(t),a=c?x:d(e),f=(s=s==b?_:s)==_,c=(a=a==b?_:a)==_;if((a=s==a)&&g(t)){if(!g(e))return!1;f=!(u=!0)}if(a&&!f)return i=i||new l,u||m(t)?p(t,e,n,r,o,i):h(t,e,s,n,r,o,i);if(!(1&n)){f=f&&j.call(t,"__wrapped__"),c=c&&j.call(e,"__wrapped__");if(f||c)return o(f?t.value():t,c?e.value():e,n,r,i=i||new l)}return!!a&&(i=i||new l,v(t,e,n,r,o,i))}},function(t,e,n){var h=n(47),v=n(81);t.exports=function(t,e,n,r){var o=n.length,i=o,u=!r;if(null==t)return!i;for(t=Object(t);o--;){var c=n[o];if(u&&c[2]?c[1]!==t[c[0]]:!(c[0]in t))return!1}for(;++o<i;){var s=(c=n[o])[0],a=t[s],f=c[1];if(u&&c[2]){if(void 0===a&&!(s in t))return!1}else{var l,p=new h;if(r&&(l=r(a,f,s,t,e,p)),!(void 0===l?v(f,a,3,r,p):l))return!1}}return!0}},function(t,e,n){var r=n(33),o=n(204),i=n(5),u=n(90),c=/^\[object .+?Constructor\]$/,s=Function.prototype,n=Object.prototype,s=s.toString,n=n.hasOwnProperty,a=RegExp("^"+s.call(n).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=function(t){return!(!i(t)||o(t))&&(r(t)?a:c).test(u(t))}},function(t,e,n){var r=n(12),o=n(55),i=n(8),u={};u["[object Float32Array]"]=u["[object Float64Array]"]=u["[object Int8Array]"]=u["[object Int16Array]"]=u["[object Int32Array]"]=u["[object Uint8Array]"]=u["[object Uint8ClampedArray]"]=u["[object Uint16Array]"]=u["[object Uint32Array]"]=!0,u["[object Arguments]"]=u["[object Array]"]=u["[object ArrayBuffer]"]=u["[object Boolean]"]=u["[object DataView]"]=u["[object Date]"]=u["[object Error]"]=u["[object Function]"]=u["[object Map]"]=u["[object Number]"]=u["[object Object]"]=u["[object RegExp]"]=u["[object Set]"]=u["[object String]"]=u["[object WeakMap]"]=!1,t.exports=function(t){return i(t)&&o(t.length)&&!!u[r(t)]}},function(t,e,n){var r=n(167),o=n(168),i=n(53),u=n(3),c=n(240);t.exports=function(t){return"function"==typeof t?t:null==t?i:"object"==typeof t?u(t)?o(t[0],t[1]):r(t):c(t)}},function(t,e,n){var r=n(52),o=n(217),i=Object.prototype.hasOwnProperty;t.exports=function(t){if(!r(t))return o(t);var e,n=[];for(e in Object(t))i.call(t,e)&&"constructor"!=e&&n.push(e);return n}},function(t,e,n){var o=n(5),i=n(52),u=n(218),c=Object.prototype.hasOwnProperty;t.exports=function(t){if(!o(t))return u(t);var e,n=i(t),r=[];for(e in t)("constructor"!=e||!n&&c.call(t,e))&&r.push(e);return r}},function(t,e,n){var r=n(161),o=n(190),i=n(87);t.exports=function(e){var n=o(e);return 1==n.length&&n[0][2]?i(n[0][0],n[0][1]):function(t){return t===e||r(t,e,n)}}},function(t,e,n){var o=n(81),i=n(234),u=n(235),c=n(51),s=n(86),a=n(87),f=n(30);t.exports=function(n,r){return c(n)&&s(r)?a(f(n),r):function(t){var e=i(t,n);return void 0===e&&e===r?u(t,n):o(r,e,3)}}},function(t,e,n){var a=n(47),f=n(77),l=n(79),p=n(170),h=n(5),v=n(91),d=n(89);t.exports=function r(o,i,u,c,s){o!==i&&l(i,function(t,e){var n;h(t)?(s=s||new a,p(o,i,e,u,r,c,s)):(void 0===(n=c?c(d(o,e),t,e+"",o,i,s):void 0)&&(n=t),f(o,e,n))},v)}},function(t,e,n){var h=n(77),v=n(180),d=n(181),y=n(182),g=n(201),m=n(54),b=n(3),x=n(236),_=n(32),j=n(33),w=n(5),O=n(237),T=n(34),A=n(89),k=n(243);t.exports=function(t,e,n,r,o,i,u){var c,s,a,f=A(t,n),l=A(e,n),p=u.get(l);p?h(t,n,p):((c=void 0===(a=i?i(f,l,n+"",t,e,u):void 0))&&(p=!(s=b(l))&&_(l),e=!s&&!p&&T(l),a=l,s||p||e?a=b(f)?f:x(f)?y(f):p?v(l,!(c=!1)):e?d(l,!(c=!1)):[]:O(l)||m(l)?m(a=f)?a=k(f):w(f)&&!j(f)||(a=g(l)):c=!1),c&&(u.set(l,a),o(a,l,r,i,u),u.delete(l)),h(t,n,a))}},function(t,e){t.exports=function(e){return function(t){return null==t?void 0:t[e]}}},function(t,e,n){var r=n(80);t.exports=function(e){return function(t){return r(t,e)}}},function(t,e,n){var r=n(53),o=n(221),i=n(225);t.exports=function(t,e){return i(o(t,e,r),t+"")}},function(t,e,n){var r=n(233),o=n(83),n=n(53),n=o?function(t,e){return o(t,"toString",{configurable:!0,enumerable:!1,value:r(e),writable:!0})}:n;t.exports=n},function(t,e){t.exports=function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}},function(t,e,n){var r=n(26),o=n(152),i=n(3),u=n(56),c=1/0,r=r?r.prototype:void 0,s=r?r.toString:void 0;t.exports=function t(e){if("string"==typeof e)return e;if(i(e))return o(e,t)+"";if(u(e))return s?s.call(e):"";var n=e+"";return"0"==n&&1/e==-c?"-0":n}},function(t,e){t.exports=function(e){return function(t){return e(t)}}},function(t,e){t.exports=function(t,e){return t.has(e)}},function(t,e,n){var r=n(75);t.exports=function(t){var e=new t.constructor(t.byteLength);return new r(e).set(new r(t)),e}},function(t,i,u){(function(t){var e=u(2),n="object"==typeof i&&i&&!i.nodeType&&i,r=n&&"object"==typeof t&&t&&!t.nodeType&&t,e=r&&r.exports===n?e.Buffer:void 0,o=e?e.allocUnsafe:void 0;t.exports=function(t,e){return e?t.slice():(e=t.length,e=o?o(e):new t.constructor(e),t.copy(e),e)}}).call(i,u(35)(t))},function(t,e,n){var r=n(179);t.exports=function(t,e){return e=e?r(t.buffer):t.buffer,new t.constructor(e,t.byteOffset,t.length)}},function(t,e){t.exports=function(t,e){var n=-1,r=t.length;for(e=e||Array(r);++n<r;)e[n]=t[n];return e}},function(t,e,n){var a=n(155),f=n(48);t.exports=function(t,e,n,r){var o=!n;n=n||{};for(var i=-1,u=e.length;++i<u;){var c=e[i],s=r?r(n[c],t[c],c,n,t):void 0;void 0===s&&(s=t[c]),(o?f:a)(n,c,s)}return n}},function(t,e,n){n=n(2)["__core-js_shared__"];t.exports=n},function(t,e,n){var r=n(173),s=n(202);t.exports=function(c){return r(function(t,e){var n=-1,r=e.length,o=1<r?e[r-1]:void 0,i=2<r?e[2]:void 0,o=3<c.length&&"function"==typeof o?(r--,o):void 0;for(i&&s(e[0],e[1],i)&&(o=r<3?void 0:o,r=1),t=Object(t);++n<r;){var u=e[n];u&&c(t,u,n,o)}return t})}},function(t,e){t.exports=function(s){return function(t,e,n){for(var r=-1,o=Object(t),i=n(t),u=i.length;u--;){var c=i[s?u:++r];if(!1===e(o[c],c,o))break}return t}}},function(t,e,n){var r=n(26),s=n(75),a=n(19),f=n(84),l=n(215),p=n(224),r=r?r.prototype:void 0,h=r?r.valueOf:void 0;t.exports=function(t,e,n,r,o,i,u){switch(n){case"[object DataView]":if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case"[object ArrayBuffer]":return t.byteLength==e.byteLength&&i(new s(t),new s(e))?!0:!1;case"[object Boolean]":case"[object Date]":case"[object Number]":return a(+t,+e);case"[object Error]":return t.name==e.name&&t.message==e.message;case"[object RegExp]":case"[object String]":return t==e+"";case"[object Map]":var c=l;case"[object Set]":n=1&r,c=c||p;if(t.size!=e.size&&!n)return!1;n=u.get(t);if(n)return n==e;r|=2,u.set(t,e);i=f(c(t),c(e),r,o,i,u);return u.delete(t),i;case"[object Symbol]":if(h)return h.call(t)==h.call(e)}return!1}},function(t,e,n){var m=n(189),b=Object.prototype.hasOwnProperty;t.exports=function(t,e,n,r,o,i){var u=1&n,c=m(t),s=c.length;if(s!=m(e).length&&!u)return!1;for(var a=s;a--;){var f=c[a];if(!(u?f in e:b.call(e,f)))return!1}var l=i.get(t);if(l&&i.get(e))return l==e;var p=!0;i.set(t,e),i.set(e,t);for(var h,v=u;++a<s;){var d,y=t[f=c[a]],g=e[f];if(r&&(d=u?r(g,y,f,e,t,i):r(y,g,f,t,e,i)),!(void 0===d?y===g||o(y,g,n,r,i):d)){p=!1;break}v=v||"constructor"==f}return!p||v||(h=t.constructor)!=(l=e.constructor)&&"constructor"in t&&"constructor"in e&&!("function"==typeof h&&h instanceof h&&"function"==typeof l&&l instanceof l)&&(p=!1),i.delete(t),i.delete(e),p}},function(t,e,n){var r=n(157),o=n(192),i=n(57);t.exports=function(t){return r(t,i,o)}},function(t,e,n){var i=n(86),u=n(57);t.exports=function(t){for(var e=u(t),n=e.length;n--;){var r=e[n],o=t[r];e[n]=[r,o,i(o)]}return e}},function(t,e,n){var r=n(26),n=Object.prototype,i=n.hasOwnProperty,u=n.toString,c=r?r.toStringTag:void 0;t.exports=function(t){var e=i.call(t,c),n=t[c];try{var r=!(t[c]=void 0)}catch(t){}var o=u.call(t);return r&&(e?t[c]=n:delete t[c]),o}},function(t,e,n){var r=n(151),n=n(241),o=Object.prototype.propertyIsEnumerable,i=Object.getOwnPropertySymbols,n=i?function(e){return null==e?[]:(e=Object(e),r(i(e),function(t){return o.call(e,t)}))}:n;t.exports=n},function(t,e,n){var r=n(143),o=n(45),i=n(145),u=n(146),c=n(148),s=n(12),a=n(90),f="[object Map]",l="[object Promise]",p="[object Set]",h="[object WeakMap]",v="[object DataView]",d=a(r),y=a(o),g=a(i),m=a(u),b=a(c),n=s;(r&&n(new r(new ArrayBuffer(1)))!=v||o&&n(new o)!=f||i&&n(i.resolve())!=l||u&&n(new u)!=p||c&&n(new c)!=h)&&(n=function(t){var e=s(t),t="[object Object]"==e?t.constructor:void 0,t=t?a(t):"";if(t)switch(t){case d:return v;case y:return f;case g:return l;case m:return p;case b:return h}return e}),t.exports=n},function(t,e){t.exports=function(t,e){return null==t?void 0:t[e]}},function(t,e,n){var c=n(82),s=n(54),a=n(3),f=n(50),l=n(55),p=n(30);t.exports=function(t,e,n){for(var r=-1,o=(e=c(e,t)).length,i=!1;++r<o;){var u=p(e[r]);if(!(i=null!=t&&n(t,u)))break;t=t[u]}return i||++r!=o?i:!!(o=null==t?0:t.length)&&l(o)&&f(u,o)&&(a(t)||s(t))}},function(t,e,n){var r=n(29);t.exports=function(){this.__data__=r?r(null):{},this.size=0}},function(t,e){t.exports=function(t){return t=this.has(t)&&delete this.__data__[t],this.size-=t?1:0,t}},function(t,e,n){var r=n(29),o=Object.prototype.hasOwnProperty;t.exports=function(t){var e=this.__data__;if(r){var n=e[t];return"__lodash_hash_undefined__"===n?void 0:n}return o.call(e,t)?e[t]:void 0}},function(t,e,n){var r=n(29),o=Object.prototype.hasOwnProperty;t.exports=function(t){var e=this.__data__;return r?void 0!==e[t]:o.call(e,t)}},function(t,e,n){var r=n(29);t.exports=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=r&&void 0===e?"__lodash_hash_undefined__":e,this}},function(t,e,n){var r=n(78),o=n(49),i=n(52);t.exports=function(t){return"function"!=typeof t.constructor||i(t)?{}:r(o(t))}},function(t,e,n){var o=n(19),i=n(31),u=n(50),c=n(5);t.exports=function(t,e,n){if(!c(n))return!1;var r=typeof e;return!!("number"==r?i(n)&&u(e,n.length):"string"==r&&e in n)&&o(n[e],t)}},function(t,e){t.exports=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}},function(t,e,n){var n=n(184),r=(n=/[^.]+$/.exec(n&&n.keys&&n.keys.IE_PROTO||""))?"Symbol(src)_1."+n:"";t.exports=function(t){return!!r&&r in t}},function(t,e){t.exports=function(){this.__data__=[],this.size=0}},function(t,e,n){var r=n(27),o=Array.prototype.splice;t.exports=function(t){var e=this.__data__;return!((t=r(e,t))<0)&&(t==e.length-1?e.pop():o.call(e,t,1),--this.size,!0)}},function(t,e,n){var r=n(27);t.exports=function(t){var e=this.__data__;return(t=r(e,t))<0?void 0:e[t][1]}},function(t,e,n){var r=n(27);t.exports=function(t){return-1<r(this.__data__,t)}},function(t,e,n){var o=n(27);t.exports=function(t,e){var n=this.__data__,r=o(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this}},function(t,e,n){var r=n(144),o=n(25),i=n(45);t.exports=function(){this.size=0,this.__data__={hash:new r,map:new(i||o),string:new r}}},function(t,e,n){var r=n(28);t.exports=function(t){return t=r(this,t).delete(t),this.size-=t?1:0,t}},function(t,e,n){var r=n(28);t.exports=function(t){return r(this,t).get(t)}},function(t,e,n){var r=n(28);t.exports=function(t){return r(this,t).has(t)}},function(t,e,n){var o=n(28);t.exports=function(t,e){var n=o(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this}},function(t,e){t.exports=function(t){var n=-1,r=Array(t.size);return t.forEach(function(t,e){r[++n]=[e,t]}),r}},function(t,e,n){var r=n(238);t.exports=function(t){var e=(t=r(t,function(t){return 500===e.size&&e.clear(),t})).cache;return t}},function(t,e,n){n=n(88)(Object.keys,Object);t.exports=n},function(t,e){t.exports=function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}},function(t,i,u){(function(t){var e=u(85),n="object"==typeof i&&i&&!i.nodeType&&i,r=n&&"object"==typeof t&&t&&!t.nodeType&&t,o=r&&r.exports===n&&e.process,e=function(){try{var t=r&&r.require&&r.require("util").types;return t?t:o&&o.binding&&o.binding("util")}catch(t){}}();t.exports=e}).call(i,u(35)(t))},function(t,e){var n=Object.prototype.toString;t.exports=function(t){return n.call(t)}},function(t,e,n){var s=n(149),a=Math.max;t.exports=function(i,u,c){return u=a(void 0===u?i.length-1:u,0),function(){for(var t=arguments,e=-1,n=a(t.length-u,0),r=Array(n);++e<n;)r[e]=t[u+e];e=-1;for(var o=Array(u+1);++e<u;)o[e]=t[e];return o[u]=c(r),s(i,this,o)}}},function(t,e){t.exports=function(t){return this.__data__.set(t,"__lodash_hash_undefined__"),this}},function(t,e){t.exports=function(t){return this.__data__.has(t)}},function(t,e){t.exports=function(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}},function(t,e,n){var r=n(174),r=n(226)(r);t.exports=r},function(t,e){var i=Date.now;t.exports=function(n){var r=0,o=0;return function(){var t=i(),e=16-(t-o);if(o=t,0<e){if(800<=++r)return arguments[0]}else r=0;return n.apply(void 0,arguments)}}},function(t,e,n){var r=n(25);t.exports=function(){this.__data__=new r,this.size=0}},function(t,e){t.exports=function(t){var e=this.__data__,t=e.delete(t);return this.size=e.size,t}},function(t,e){t.exports=function(t){return this.__data__.get(t)}},function(t,e){t.exports=function(t){return this.__data__.has(t)}},function(t,e,n){var o=n(25),i=n(45),u=n(46);t.exports=function(t,e){var n=this.__data__;if(n instanceof o){var r=n.__data__;if(!i||r.length<199)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new u(r)}return n.set(t,e),this.size=n.size,this}},function(t,e,n){var n=n(216),r=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,i=/\\(\\)?/g,n=n(function(t){var o=[];return 46===t.charCodeAt(0)&&o.push(""),t.replace(r,function(t,e,n,r){o.push(n?r.replace(i,"$1"):e||t)}),o});t.exports=n},function(t,e){t.exports=function(t){return function(){return t}}},function(t,e,n){var r=n(80);t.exports=function(t,e,n){return void 0===(e=null==t?void 0:r(t,e))?n:e}},function(t,e,n){var r=n(158),o=n(195);t.exports=function(t,e){return null!=t&&o(t,e,r)}},function(t,e,n){var r=n(31),o=n(8);t.exports=function(t){return o(t)&&r(t)}},function(t,e,n){var r=n(12),o=n(49),i=n(8),u=Function.prototype,n=Object.prototype,c=u.toString,s=n.hasOwnProperty,a=c.call(Object);t.exports=function(t){return!(!i(t)||"[object Object]"!=r(t))&&(null===(t=o(t))||"function"==typeof(t=s.call(t,"constructor")&&t.constructor)&&t instanceof t&&c.call(t)==a)}},function(t,e,n){var u=n(46),c="Expected a function";function s(r,o){if("function"!=typeof r||null!=o&&"function"!=typeof o)throw new TypeError(c);var i=function(){var t=arguments,e=o?o.apply(this,t):t[0],n=i.cache;if(n.has(e))return n.get(e);t=r.apply(this,t);return i.cache=n.set(e,t)||n,t};return i.cache=new(s.Cache||u),i}s.Cache=u,t.exports=s},function(t,e,n){var r=n(169),n=n(185)(function(t,e,n){r(t,e,n)});t.exports=n},function(t,e,n){var r=n(171),o=n(172),i=n(51),u=n(30);t.exports=function(t){return i(t)?r(u(t)):o(t)}},function(t,e){t.exports=function(){return[]}},function(t,e){t.exports=function(){return!1}},function(t,e,n){var r=n(183),o=n(91);t.exports=function(t){return r(t,o(t))}},function(t,e,n){var r=n(176);t.exports=function(t){return null==t?"":r(t)}},function(t,e,n){var u=n(150),c=n(78),s=n(156),a=n(164),f=n(49),l=n(3),p=n(32),h=n(33),v=n(5),d=n(34);t.exports=function(t,r,o){var e,n=l(t),i=n||p(t)||d(t);return r=a(r,4),null==o&&(e=t&&t.constructor,o=i?n?new e:[]:v(t)&&h(e)?c(f(t)):{}),(i?u:s)(t,function(t,e,n){return r(o,t,e,n)}),o}},function(t,e){function y(t,e,n){var r=t;e.slice(0,-1).forEach(function(t){void 0===r[t]&&(r[t]={}),r=r[t]});e=e[e.length-1];void 0===r[e]||"boolean"==typeof r[e]?r[e]=n:Array.isArray(r[e])?r[e].push(n):r[e]=[r[e],n]}function g(t){return"number"==typeof t||(/^0x[0-9a-f]+$/i.test(t)||/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(t))}t.exports=function(t,e){var r={bools:{},strings:{}};[].concat((e=e||{}).boolean).filter(Boolean).forEach(function(t){r.bools[t]=!0}),[].concat(e.string).filter(Boolean).forEach(function(t){r.strings[t]=!0});var o={};Object.keys(e.alias||{}).forEach(function(t){o[t]=[].concat(e.alias[t]),o[t].forEach(function(e){o[e]=[t].concat(o[t].filter(function(t){return e!==t}))})});var i=e.default||{},u={_:[]};Object.keys(r.bools).forEach(function(t){c(t,void 0!==i[t]&&i[t])});var n=[];function c(t,e){var n=!r.strings[t]&&g(e)?Number(e):e;y(u,t.split("."),n),(o[t]||[]).forEach(function(t){y(u,t.split("."),n)})}-1!==t.indexOf("--")&&(n=t.slice(t.indexOf("--")+1),t=t.slice(0,t.indexOf("--")));for(var s=0;s<t.length;s++){var a=t[s];if(/^--.+=/.test(a)){var f=a.match(/^--([^=]+)=([\s\S]*)$/);c(f[1],f[2])}else if(/^--no-.+/.test(a)){c(l=a.match(/^--no-(.+)/)[1],!1)}else if(/^--.+/.test(a)){var l=a.match(/^--(.+)/)[1];void 0===(p=t[s+1])||/^-/.test(p)||r.bools[l]||o[l]&&r.bools[o[l]]?/^(true|false)$/.test(p)?(c(l,"true"===p),s++):c(l,!r.strings[l]||""):(c(l,p),s++)}else if(/^-[^-]+/.test(a)){for(var p,h=a.slice(1,-1).split(""),v=!1,d=0;d<h.length;d++){if("-"!==(p=a.slice(d+2))){if(/[A-Za-z]/.test(h[d])&&/-?\d+(\.\d*)?(e-?\d+)?$/.test(p)){c(h[d],p),v=!0;break}if(h[d+1]&&h[d+1].match(/\W/)){c(h[d],a.slice(d+2)),v=!0;break}c(h[d],!r.strings[h[d]]||"")}else c(h[d],p)}l=a.slice(-1)[0];v||"-"===l||(!t[s+1]||/^(-|--)[^-]/.test(t[s+1])||r.bools[l]||o[l]&&r.bools[o[l]]?t[s+1]&&/true|false/.test(t[s+1])?(c(l,"true"===t[s+1]),s++):c(l,!r.strings[l]||""):(c(l,t[s+1]),s++))}else u._.push(r.strings._||!g(a)?a:Number(a))}return Object.keys(i).forEach(function(e){var t,n,r;t=u,n=e.split("."),r=t,n.slice(0,-1).forEach(function(t){r=r[t]||{}}),n[n.length-1]in r||(y(u,e.split("."),i[e]),(o[e]||[]).forEach(function(t){y(u,t.split("."),i[e])}))}),n.forEach(function(t){u._.push(t)}),u}},function(t,e,n){var c=n(36),s=n(246),d=n(248),r=o(process.argv.slice(2));function o(t,n){var r={};n=n||process.cwd(),r.$0=process.argv.slice(0,2).map(function(t){var e=a(n,t);return t.match(/^\//)&&e.length<t.length?e:t}).join(" "),null!=process.env._&&process.argv[1]==process.env._&&(r.$0=process.env._.replace(c.dirname(process.execPath)+"/",""));var f={boolean:[],string:[],alias:{},default:[]};r.boolean=function(t){return f.boolean.push.apply(f.boolean,[].concat(t)),r},r.string=function(t){return f.string.push.apply(f.string,[].concat(t)),r},r.default=function(e,t){return"object"==typeof e?Object.keys(e).forEach(function(t){r.default(t,e[t])}):f.default[e]=t,r},r.alias=function(e,t){return"object"==typeof e?Object.keys(e).forEach(function(t){r.alias(t,e[t])}):f.alias[e]=(f.alias[e]||[]).concat(t),r};var o,l={};function i(t){r.showHelp(),t&&console.error(t),process.exit(1)}r.demand=function(t){return"number"==typeof t?(l._||(l._=0),l._+=t):Array.isArray(t)?t.forEach(function(t){r.demand(t)}):l[t]=!0,r},r.usage=function(t,e){return e||"object"!=typeof t||(e=t,t=null),o=t,e&&r.options(e),r};var u=[];r.check=function(t){return u.push(t),r};var p={};r.describe=function(e,t){return"object"==typeof e?Object.keys(e).forEach(function(t){r.describe(t,e[t])}):p[e]=t,r},r.parse=e,r.option=r.options=function(e,t){return"object"==typeof e?Object.keys(e).forEach(function(t){r.options(t,e[t])}):(t.alias&&r.alias(e,t.alias),t.demand&&r.demand(e),void 0!==t.default&&r.default(e,t.default),!t.boolean&&"boolean"!==t.type||r.boolean(e),!t.string&&"string"!==t.type||r.string(e),(t=t.describe||t.description||t.desc)&&r.describe(e,t)),r};var h=null;function e(t){var e=s(t,f);e.$0=r.$0,l._&&e._.length<l._&&i("Not enough non-option arguments: got "+e._.length+", need at least "+l._);var n=[];return Object.keys(l).forEach(function(t){e[t]||n.push(t)}),n.length&&i("Missing required arguments: "+n.join(", ")),u.forEach(function(t){try{!1===t(e)&&i("Argument check failed: "+t.toString())}catch(t){i(t)}}),e}function v(t){return Math.max.apply(null,t.map(function(t){return t.length}))}return r.wrap=function(t){return h=t,r},r.showHelp=function(t){(t=t||console.error)(r.help())},r.help=function(){var t=Object.keys(Object.keys(p).concat(Object.keys(l)).concat(Object.keys(f.default)).reduce(function(t,e){return"_"!==e&&(t[e]=!0),t},{})),u=t.length?["Options:"]:[];o&&u.unshift(o.replace(/\$0/g,r.$0),"");var c=t.reduce(function(t,e){return t[e]=[e].concat(f.alias[e]||[]).map(function(t){return(1<t.length?"--":"-")+t}).join(", "),t},{}),s=v(Object.keys(c).map(function(t){return c[t]||""})),a=v(Object.keys(p).map(function(t){return p[t]||""}));return t.forEach(function(t){var e=c[t],n=p[t]||"";h&&(n=d(s+4,h)(n).slice(s+4));var r=new Array(Math.max(s-e.length+3,0)).join(" "),o=new Array(Math.max(a-n.length+1,0)).join(" "),i=null;f.boolean[t]&&(i="[boolean]"),f.string[t]&&(i="[string]"),!h&&0<o.length&&(n+=o);e="  "+e+r,r=[i,l[t]?"[required]":null,void 0!==f.default[t]?"[default: "+JSON.stringify(f.default[t])+"]":null].filter(Boolean).join("  "),i=[n,r].filter(Boolean).join("  ");h&&(t=n.split("\n"),i=n+((t=t.slice(-1)[0].length+(1===t.length?e.length:0))+r.length>h-2?"\n"+new Array(h-r.length+1).join(" ")+r:new Array(h-r.length-t+1).join(" ")+r)),u.push(e+i)}),u.push(""),u.join("\n")},Object.defineProperty(r,"argv",{get:function(){return e(t)},enumerable:!0}),r}function a(t,e){for(var n=c.normalize(e).split("/").slice(1),r=c.normalize(t).split("/").slice(1),o=0;n[o]&&n[o]==r[o];o++);n.splice(0,o),r.splice(0,o);t=c.normalize(r.map(function(){return".."}).concat(n).join("/")).replace(/\/$/,"").replace(/^$/,".");return t.match(/^[.\/]/)?t:"./"+t}Object.keys(r).forEach(function(t){o[t]="function"==typeof r[t]?r[t].bind(r):r[t]}),(t.exports=o).rebase=a},function(t,e){var n=t.exports=function(o,i,t){"object"==typeof o&&(o=(t=o).start,i=t.stop),"object"==typeof i&&(t=i,o=o||t.start,i=void 0),i||(i=o,o=0);var r=(t=t||{}).mode||"soft",e="hard"===r?/\b/:/(\S+\s+)/;return function(t){return t.toString().split(e).reduce(function(t,e){if("hard"===r)for(var n=0;n<e.length;n+=i-o)t.push(e.slice(n,n+i-o));else t.push(e);return t},[]).reduce(function(e,t){if(""===t)return e;var n=t.replace(/\t/g,"    "),r=e.length-1;return e[r].length+n.length>i?(e[r]=e[r].replace(/\s+$/,""),n.split(/\n/).forEach(function(t){e.push(new Array(o+1).join(" ")+t.replace(/^\s+/,""))})):n.match(/\n/)?(t=n.split(/\n/),e[r]+=t.shift(),t.forEach(function(t){e.push(new Array(o+1).join(" ")+t.replace(/^\s+/,""))})):e[r]+=n,e},[new Array(o+1).join(" ")]).join("\n")}};(n.soft=n).hard=function(t,e){return n(t,e,{mode:"hard"})}},function(t,r){var a;r=t.exports=x,a="object"==typeof process&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?function(){var t=Array.prototype.slice.call(arguments,0);t.unshift("SEMVER"),console.log.apply(console,t)}:function(){},r.SEMVER_SPEC_VERSION="2.0.0";var n=256,o=Number.MAX_SAFE_INTEGER||9007199254740991,u=r.re=[],e=r.src=[],i=0;i++;e[0]="0|[1-9]\\d*";i++;e[1]="[0-9]+";i++;e[2]="\\d*[a-zA-Z-][a-zA-Z0-9-]*";i++;e[3]="("+e[0]+")\\.("+e[0]+")\\.("+e[0]+")";i++;e[4]="("+e[1]+")\\.("+e[1]+")\\.("+e[1]+")";i++;e[5]="(?:"+e[0]+"|"+e[2]+")";i++;e[6]="(?:"+e[1]+"|"+e[2]+")";i++;e[7]="(?:-("+e[5]+"(?:\\."+e[5]+")*))";i++;e[8]="(?:-?("+e[6]+"(?:\\."+e[6]+")*))";i++;e[9]="[0-9A-Za-z-]+";i++;e[10]="(?:\\+("+e[9]+"(?:\\."+e[9]+")*))";var c=i++,s="v?"+e[3]+e[7]+"?"+e[10]+"?";e[c]="^"+s+"$";var t="[v=\\s]*"+e[4]+e[8]+"?"+e[10]+"?",f=i++;e[f]="^"+t+"$";i++;e[13]="((?:<|>)?=?)";i++;e[14]=e[1]+"|x|X|\\*";i++;e[15]=e[0]+"|x|X|\\*";i++;e[16]="[v=\\s]*("+e[15]+")(?:\\.("+e[15]+")(?:\\.("+e[15]+")(?:"+e[7]+")?"+e[10]+"?)?)?";i++;e[17]="[v=\\s]*("+e[14]+")(?:\\.("+e[14]+")(?:\\.("+e[14]+")(?:"+e[8]+")?"+e[10]+"?)?)?";var l=i++;e[l]="^"+e[13]+"\\s*"+e[16]+"$";var p=i++;e[p]="^"+e[13]+"\\s*"+e[17]+"$";i++;e[20]="(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";i++;e[21]="(?:~>?)";i++;e[22]="(\\s*)"+e[21]+"\\s+",u[22]=new RegExp(e[22],"g");var h=i++;e[h]="^"+e[21]+e[16]+"$";var v=i++;e[v]="^"+e[21]+e[17]+"$";i++;e[25]="(?:\\^)";i++;e[26]="(\\s*)"+e[25]+"\\s+",u[26]=new RegExp(e[26],"g");var d=i++;e[d]="^"+e[25]+e[16]+"$";var y=i++;e[y]="^"+e[25]+e[17]+"$";i++;e[29]="^"+e[13]+"\\s*("+t+")$|^$";i++;e[30]="^"+e[13]+"\\s*("+s+")$|^$";i++;e[31]="(\\s*)"+e[13]+"\\s*("+t+"|"+e[16]+")",u[31]=new RegExp(e[31],"g");i++;e[32]="^\\s*("+e[16]+")\\s+-\\s+("+e[16]+")\\s*$";i++;e[33]="^\\s*("+e[17]+")\\s+-\\s+("+e[17]+")\\s*$";var g=+i;e[g]="(<|>)?=?\\s*\\*";for(var m=0;m<35;m++)a(m,e[m]),u[m]||(u[m]=new RegExp(e[m]));function b(t,e){if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),t instanceof x)return t;if("string"!=typeof t)return null;if(t.length>n)return null;if(!(e.loose?u[f]:u[c]).test(t))return null;try{return new x(t,e)}catch(t){return null}}function x(t,e){if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),t instanceof x){if(t.loose===e.loose)return t;t=t.version}else if("string"!=typeof t)throw new TypeError("Invalid Version: "+t);if(t.length>n)throw new TypeError("version is longer than "+n+" characters");if(!(this instanceof x))return new x(t,e);a("SemVer",t,e),this.options=e,this.loose=!!e.loose;e=t.trim().match(e.loose?u[f]:u[c]);if(!e)throw new TypeError("Invalid Version: "+t);if(this.raw=t,this.major=+e[1],this.minor=+e[2],this.patch=+e[3],this.major>o||this.major<0)throw new TypeError("Invalid major version");if(this.minor>o||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>o||this.patch<0)throw new TypeError("Invalid patch version");e[4]?this.prerelease=e[4].split(".").map(function(t){if(/^[0-9]+$/.test(t)){var e=+t;if(0<=e&&e<o)return e}return t}):this.prerelease=[],this.build=e[5]?e[5].split("."):[],this.format()}r.parse=b,r.valid=function(t,e){e=b(t,e);return e?e.version:null},r.clean=function(t,e){e=b(t.trim().replace(/^[=v]+/,""),e);return e?e.version:null},(r.SemVer=x).prototype.format=function(){return this.version=this.major+"."+this.minor+"."+this.patch,this.prerelease.length&&(this.version+="-"+this.prerelease.join(".")),this.version},x.prototype.toString=function(){return this.version},x.prototype.compare=function(t){return a("SemVer.compare",this.version,this.options,t),t instanceof x||(t=new x(t,this.options)),this.compareMain(t)||this.comparePre(t)},x.prototype.compareMain=function(t){return t instanceof x||(t=new x(t,this.options)),j(this.major,t.major)||j(this.minor,t.minor)||j(this.patch,t.patch)},x.prototype.comparePre=function(t){if(t instanceof x||(t=new x(t,this.options)),this.prerelease.length&&!t.prerelease.length)return-1;if(!this.prerelease.length&&t.prerelease.length)return 1;if(!this.prerelease.length&&!t.prerelease.length)return 0;var e=0;do{var n=this.prerelease[e],r=t.prerelease[e];if(a("prerelease compare",e,n,r),void 0===n&&void 0===r)return 0;if(void 0===r)return 1;if(void 0===n)return-1;if(n!==r)return j(n,r)}while(++e)},x.prototype.inc=function(t,e){switch(t){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",e);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",e);break;case"prepatch":this.prerelease.length=0,this.inc("patch",e),this.inc("pre",e);break;case"prerelease":0===this.prerelease.length&&this.inc("patch",e),this.inc("pre",e);break;case"major":0===this.minor&&0===this.patch&&0!==this.prerelease.length||this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":0===this.patch&&0!==this.prerelease.length||this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;case"pre":if(0===this.prerelease.length)this.prerelease=[0];else{for(var n=this.prerelease.length;0<=--n;)"number"==typeof this.prerelease[n]&&(this.prerelease[n]++,n=-2);-1===n&&this.prerelease.push(0)}e&&(this.prerelease[0]!==e||isNaN(this.prerelease[1]))&&(this.prerelease=[e,0]);break;default:throw new Error("invalid increment argument: "+t)}return this.format(),this.raw=this.version,this},r.inc=function(t,e,n,r){"string"==typeof n&&(r=n,n=void 0);try{return new x(t,n).inc(e,r).version}catch(t){return null}},r.diff=function(t,e){{if(A(t,e))return null;var n=b(t),r=b(e);if(n.prerelease.length||r.prerelease.length){for(var o in n)if(("major"===o||"minor"===o||"patch"===o)&&n[o]!==r[o])return"pre"+o;return"prerelease"}for(o in n)if(("major"===o||"minor"===o||"patch"===o)&&n[o]!==r[o])return o}},r.compareIdentifiers=j;var _=/^[0-9]+$/;function j(t,e){var n=_.test(t),r=_.test(e);return n&&r&&(t=+t,e=+e),n&&!r?-1:r&&!n?1:t<e?-1:e<t?1:0}function w(t,e,n){return new x(t,n).compare(new x(e,n))}function O(t,e,n){return 0<w(t,e,n)}function T(t,e,n){return w(t,e,n)<0}function A(t,e,n){return 0===w(t,e,n)}function k(t,e,n){return 0!==w(t,e,n)}function S(t,e,n){return 0<=w(t,e,n)}function M(t,e,n){return w(t,e,n)<=0}function E(t,e,n,r){var o;switch(e){case"===":"object"==typeof t&&(t=t.version),"object"==typeof n&&(n=n.version),o=t===n;break;case"!==":"object"==typeof t&&(t=t.version),"object"==typeof n&&(n=n.version),o=t!==n;break;case"":case"=":case"==":o=A(t,n,r);break;case"!=":o=k(t,n,r);break;case">":o=O(t,n,r);break;case">=":o=S(t,n,r);break;case"<":o=T(t,n,r);break;case"<=":o=M(t,n,r);break;default:throw new TypeError("Invalid operator: "+e)}return o}function P(t,e){if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),t instanceof P){if(t.loose===!!e.loose)return t;t=t.value}if(!(this instanceof P))return new P(t,e);a("comparator",t,e),this.options=e,this.loose=!!e.loose,this.parse(t),this.semver===I?this.value="":this.value=this.operator+this.semver.version,a("comp",this)}r.rcompareIdentifiers=function(t,e){return j(e,t)},r.major=function(t,e){return new x(t,e).major},r.minor=function(t,e){return new x(t,e).minor},r.patch=function(t,e){return new x(t,e).patch},r.compare=w,r.compareLoose=function(t,e){return w(t,e,!0)},r.rcompare=function(t,e,n){return w(e,t,n)},r.sort=function(t,n){return t.sort(function(t,e){return r.compare(t,e,n)})},r.rsort=function(t,n){return t.sort(function(t,e){return r.rcompare(t,e,n)})},r.gt=O,r.lt=T,r.eq=A,r.neq=k,r.gte=S,r.lte=M,r.cmp=E,r.Comparator=P;var I={};function C(t,e){if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),t instanceof C)return t.loose===!!e.loose&&t.includePrerelease===!!e.includePrerelease?t:new C(t.raw,e);if(t instanceof P)return new C(t.value,e);if(!(this instanceof C))return new C(t,e);if(this.options=e,this.loose=!!e.loose,this.includePrerelease=!!e.includePrerelease,this.raw=t,this.set=t.split(/\s*\|\|\s*/).map(function(t){return this.parseRange(t.trim())},this).filter(function(t){return t.length}),!this.set.length)throw new TypeError("Invalid SemVer Range: "+t);this.format()}function L(t){return!t||"x"===t.toLowerCase()||"*"===t}function R(t,e,n,r,o,i,u,c,s,a,f,l,p){return((e=L(n)?"":L(r)?">="+n+".0.0":L(o)?">="+n+"."+r+".0":">="+e)+" "+(c=L(s)?"":L(a)?"<"+(+s+1)+".0.0":L(f)?"<"+s+"."+(+a+1)+".0":l?"<="+s+"."+a+"."+f+"-"+l:"<="+c)).trim()}function F(t,e,n){try{e=new C(e,n)}catch(t){return!1}return e.test(t)}function N(t,e,n,r){var o,i,u,c,s;switch(t=new x(t,r),e=new C(e,r),n){case">":o=O,i=M,u=T,c=">",s=">=";break;case"<":o=T,i=S,u=O,c="<",s="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(F(t,e,r))return!1;for(var a=0;a<e.set.length;++a){var f=e.set[a],l=null,p=null;if(f.forEach(function(t){t.semver===I&&(t=new P(">=0.0.0")),l=l||t,p=p||t,o(t.semver,l.semver,r)?l=t:u(t.semver,p.semver,r)&&(p=t)}),l.operator===c||l.operator===s)return!1;if((!p.operator||p.operator===c)&&i(t,p.semver))return!1;if(p.operator===s&&u(t,p.semver))return!1}return!0}P.prototype.parse=function(t){var e=this.options.loose?u[29]:u[30],e=t.match(e);if(!e)throw new TypeError("Invalid comparator: "+t);this.operator=e[1],"="===this.operator&&(this.operator=""),e[2]?this.semver=new x(e[2],this.options.loose):this.semver=I},P.prototype.toString=function(){return this.value},P.prototype.test=function(t){return a("Comparator.test",t,this.options.loose),this.semver===I||("string"==typeof t&&(t=new x(t,this.options)),E(t,this.operator,this.semver,this.options))},P.prototype.intersects=function(t,e){if(!(t instanceof P))throw new TypeError("a Comparator is required");if(e&&"object"==typeof e||(e={loose:!!e,includePrerelease:!1}),""===this.operator)return u=new C(t.value,e),F(this.value,u,e);if(""===t.operator)return u=new C(this.value,e),F(t.semver,u,e);var n=!(">="!==this.operator&&">"!==this.operator||">="!==t.operator&&">"!==t.operator),r=!("<="!==this.operator&&"<"!==this.operator||"<="!==t.operator&&"<"!==t.operator),o=this.semver.version===t.semver.version,i=!(">="!==this.operator&&"<="!==this.operator||">="!==t.operator&&"<="!==t.operator),u=E(this.semver,"<",t.semver,e)&&(">="===this.operator||">"===this.operator)&&("<="===t.operator||"<"===t.operator),t=E(this.semver,">",t.semver,e)&&("<="===this.operator||"<"===this.operator)&&(">="===t.operator||">"===t.operator);return n||r||o&&i||u||t},(r.Range=C).prototype.format=function(){return this.range=this.set.map(function(t){return t.join(" ").trim()}).join("||").trim(),this.range},C.prototype.toString=function(){return this.range},C.prototype.parseRange=function(t){var e=this.options.loose;t=t.trim();var n=e?u[33]:u[32];t=t.replace(n,R),a("hyphen replace",t),t=t.replace(u[31],"$1$2$3"),a("comparator trim",t,u[31]),t=(t=(t=t.replace(u[22],"$1~")).replace(u[26],"$1^")).split(/\s+/).join(" ");var r=e?u[29]:u[30],t=t.split(" ").map(function(t){return e=t,t=this.options,a("comp",e,t),e=function(t,e){return t.trim().split(/\s+/).map(function(t){return function(i,t){a("caret",i,t),t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1});t=t.loose?u[y]:u[d];return i.replace(t,function(t,e,n,r,o){return a("caret",i,t,e,n,r,o),e=L(e)?"":L(n)?">="+e+".0.0 <"+(+e+1)+".0.0":L(r)?"0"===e?">="+e+"."+n+".0 <"+e+"."+(+n+1)+".0":">="+e+"."+n+".0 <"+(+e+1)+".0.0":o?(a("replaceCaret pr",o),"-"!==o.charAt(0)&&(o="-"+o),"0"===e?"0"===n?">="+e+"."+n+"."+r+o+" <"+e+"."+n+"."+(+r+1):">="+e+"."+n+"."+r+o+" <"+e+"."+(+n+1)+".0":">="+e+"."+n+"."+r+o+" <"+(+e+1)+".0.0"):(a("no pr"),"0"===e?"0"===n?">="+e+"."+n+"."+r+" <"+e+"."+n+"."+(+r+1):">="+e+"."+n+"."+r+" <"+e+"."+(+n+1)+".0":">="+e+"."+n+"."+r+" <"+(+e+1)+".0.0"),a("caret return",e),e})}(t,e)}).join(" ")}(e,t),a("caret",e),e=function(t,e){return t.trim().split(/\s+/).map(function(t){return function(i,t){t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1});t=t.loose?u[v]:u[h];return i.replace(t,function(t,e,n,r,o){return a("tilde",i,t,e,n,r,o),n=L(e)?"":L(n)?">="+e+".0.0 <"+(+e+1)+".0.0":L(r)?">="+e+"."+n+".0 <"+e+"."+(+n+1)+".0":o?(a("replaceTilde pr",o),"-"!==o.charAt(0)&&(o="-"+o),">="+e+"."+n+"."+r+o+" <"+e+"."+(+n+1)+".0"):">="+e+"."+n+"."+r+" <"+e+"."+(+n+1)+".0",a("tilde return",n),n})}(t,e)}).join(" ")}(e,t),a("tildes",e),e=function(t,e){return a("replaceXRanges",t,e),t.split(/\s+/).map(function(t){return function(s,t){s=s.trim(),t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1});t=t.loose?u[p]:u[l];return s.replace(t,function(t,e,n,r,o,i){a("xRange",s,t,e,n,r,o,i);var u=L(n),c=u||L(r),i=c||L(o);return"="===e&&i&&(e=""),u?t=">"===e||"<"===e?"<0.0.0":"*":e&&i?(c&&(r=0),i&&(o=0),">"===e?(e=">=",c?(n=+n+1,o=r=0):i&&(r=+r+1,o=0)):"<="===e&&(e="<",c?n=+n+1:r=+r+1),t=e+n+"."+r+"."+o):c?t=">="+n+".0.0 <"+(+n+1)+".0.0":i&&(t=">="+n+"."+r+".0 <"+n+"."+(+r+1)+".0"),a("xRange return",t),t})}(t,e)}).join(" ")}(e,t),a("xrange",e),e=function(t,e){return a("replaceStars",t,e),t.trim().replace(u[g],"")}(e,t),a("stars",e),e;var e},this).join(" ").split(/\s+/);return this.options.loose&&(t=t.filter(function(t){return!!t.match(r)})),t=t.map(function(t){return new P(t,this.options)},this)},C.prototype.intersects=function(n,r){if(!(n instanceof C))throw new TypeError("a Range is required");return this.set.some(function(t){return t.every(function(e){return n.set.some(function(t){return t.every(function(t){return e.intersects(t,r)})})})})},r.toComparators=function(t,e){return new C(t,e).set.map(function(t){return t.map(function(t){return t.value}).join(" ").trim().split(" ")})},C.prototype.test=function(t){if(!t)return!1;"string"==typeof t&&(t=new x(t,this.options));for(var e=0;e<this.set.length;e++)if(function(t,e,n){for(var r=0;r<t.length;r++)if(!t[r].test(e))return!1;n=n||{};if(!e.prerelease.length||n.includePrerelease)return!0;for(r=0;r<t.length;r++)if(a(t[r].semver),t[r].semver!==I&&0<t[r].semver.prerelease.length){var o=t[r].semver;if(o.major===e.major&&o.minor===e.minor&&o.patch===e.patch)return!0}return!1}(this.set[e],t,this.options))return!0;return!1},r.satisfies=F,r.maxSatisfying=function(t,e,n){var r=null,o=null;try{var i=new C(e,n)}catch(t){return null}return t.forEach(function(t){i.test(t)&&(r&&-1!==o.compare(t)||(o=new x(r=t,n)))}),r},r.minSatisfying=function(t,e,n){var r=null,o=null;try{var i=new C(e,n)}catch(t){return null}return t.forEach(function(t){i.test(t)&&(r&&1!==o.compare(t)||(o=new x(r=t,n)))}),r},r.validRange=function(t,e){try{return new C(t,e).range||"*"}catch(t){return null}},r.ltr=function(t,e,n){return N(t,e,"<",n)},r.gtr=function(t,e,n){return N(t,e,">",n)},r.outside=N,r.prerelease=function(t,e){e=b(t,e);return e&&e.prerelease.length?e.prerelease:null},r.intersects=function(t,e,n){return t=new C(t,n),e=new C(e,n),t.intersects(e)},r.coerce=function(t){if(t instanceof x)return t;if("string"!=typeof t)return null;t=t.match(u[20]);return null==t?null:b((t[1]||"0")+"."+(t[2]||"0")+"."+(t[3]||"0"))}},function(t,e,n){"use strict";var r=n(58)();t.exports=function(t){return"string"==typeof t?t.replace(r,""):t}},function(t,e,n){"use strict";function r(t){return t="--"+t,-1!==(t=o.indexOf(t))&&(-1===i||t<i)}var o=process.argv,i=o.indexOf("--");t.exports="FORCE_COLOR"in process.env||!(r("no-color")||r("no-colors")||r("color=false"))&&(!!(r("color")||r("colors")||r("color=true")||r("color=always"))||!(process.stdout&&!process.stdout.isTTY)&&("win32"===process.platform||"COLORTERM"in process.env||"dumb"!==process.env.TERM&&!!/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)))},function(t,e,n){t.exports=n(94)}],r.c=i,r.i=function(t){return t},r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=252);function r(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return o[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var o,i});
}.call(this, __webpack_require__(1), __webpack_require__(8)))

 }),
 (function(module, exports) {

var g=function(){return this}();try{g=g||new Function("return this")()}catch(t){"object"==typeof window&&(g=window)}module.exports=g;

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
  mat.data[0] = p5Color._getRed();
  mat.data[1] = p5Color._getGreen();
  mat.data[2] = p5Color._getBlue();
  cv.cvtColor(mat, mat, code);
  var data = Array.from(mat.data); 

  data.push(p5Color._getAlpha());
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
  var w = dstMat.cols;
  var h = dstMat.rows;
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

p5.cv.convexHullFromMat = function (contourMat) {
  var hull = new cv.Mat();
  cv.convexHull(contourMat, hull);
  return p5.cv.cvPointsToJS(hull);
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

var p5_cv_utils = __webpack_require__(5);

var p5_cv_utilities = __webpack_require__(0);
var p5_cv_utilities_default = __webpack_require__.n(p5_cv_utilities);

var p5_cv_helpers = __webpack_require__(6);

var p5_cv_wrappers = __webpack_require__(9);

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
    key: "setPersistance",
    value: function setPersistance(persistance) {
      this.persistance = persistance;
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
        console.log('converted');
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
        cv.bitwise_not(this.thresholded, this.thresholded);
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
    this.contourFindingMode = cv.CV_RETR_EXTERNAL;
    this.sortBySize = false;
    this.resetMinArea();
    this.resetMaxArea();
  }

  p5_cv_contour_finder_createClass(ContourFinder, [{
    key: "findContours",
    value: function findContours(sourceMat) {
      if (this.useTargetColor) {
        var offset = [thresholdValue, thresholdValue, thresholdValue, 0];
        var base = p5.cv.colorToCvScalar(targetColor);

        if (this.trackingColorMode === p5.cv.TrackingColorMode.TRACK_COLOR_RGB) {
          cv.inRange(sourceMat, cv.Scalar.sub(base, offset), cv.Scalar.add(base + offset), this.thresh);
        } else {
          if (this.trackingColorMode === p5.cv.TrackingColorMode.TRACK_COLOR_H) {
            offset[1] = 255;
            offset[2] = 255;
          }

          if (this.trackingColorMode === p5.cv.TrackingColorMode.TRACK_COLOR_HS) {
            offset[2] = 255;
          }

          cv.cvtColor(sourceMat, this.hsvBuffer, cv.COLOR_RGBA2HSV);
          base = p5.cv.convertSingleColor(targetColor, cv.COLOR_RGBA2HSV);
          var lowerb = cv.Scalar.sub(base, offset);
          var upperb = cv.Scalar.add(base, offset);
          cv.inRange(this.hsvBuffer, lowerb, upperb, this.thresh);
        }
      } else {
        p5.cv.copyGray(sourceMat, this.thresh);
      }

      if (this.autoThreshold) {
        p5.cv.threshold(this.thresh, this.thresholdValue, this.invert);
      } 


      var allContours = new cv.MatVector();
      var hierarchy = new cv.Mat();
      var simplifyMode = this.simplify ? cv.HAIN_APPROX_SIMPLE : cv.CHAIN_APPROX_NONE;
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
            allIndices.push_back(i);
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
      return p5.cv.convexHullFromMat(this.contours[i]);
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



window.Graph = p5_cv_utilities_default.a;




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


window.ContourFinder = p5_cv_contour_finder;

 })
 ]);
