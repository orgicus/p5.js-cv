// OpenCV.js <-> p5.js setup
p5.cv = {};
p5.prototype.loadOpenCV = function () {
  // from https://docs.opencv.org/4.4.0/utils.js

  cv.onRuntimeInitialized = function () {
    p5.cv.isReady = true;
    if (p5.cv.onComplete) {
      p5.cv.onComplete();
    }
  };

  p5.cv.createFileFromUrl = function (path, url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function (ev) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let data = new Uint8Array(request.response);
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
    let canvas = document.getElementById(cavansId);
    let ctx = canvas.getContext('2d');
    let img = new Image();
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
