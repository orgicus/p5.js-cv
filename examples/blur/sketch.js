/**
 * OpenCV 4 in p5.js: Blur example
 */

// p5.js Video capture
let myCapture;
// OpenCV capture helper
let myCVCapture;
// (RGBA) Mat to store the latest color camera frame
let myMat;
// Mat to store the grayscale converted camera frame
let myMatGrayscale;

// Blur properties
let useGaussian = false;
let radius = 12;

function setup() {
  createCanvas(320, 240);
  // setup p5 capture
  myCapture = createCapture(VIDEO);
  myCapture.size(320, 240);
  myCapture.hide();
  // wait for OpenCV to init
  p5.cv.onComplete = onOpenCVComplete;
}

function onOpenCVComplete() {
  // create a CV capture helper
  myCVCapture = p5.cv.getCvVideoCapture(myCapture);
  // create a CV Mat to read new color frames into
  myMat = p5.cv.getRGBAMat(320, 240);
  // create a CV mat for color to grayscale conversion
  myMatGrayscale = new cv.Mat();
}

function draw() {
  if (p5.cv.isReady) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // convert Mat to grayscale
    p5.cv.copyGray(myMat, myMatGrayscale);
    // apply blur filter
    // note: this will destroy the original grayscale
    // additionally p5.cv.GaussianBlurTo( sourceMat, destinationMat ) / p5.cv.blur( sourceMat, destinationMat )
    // will keep sourceMat intact
    if (useGaussian) {
      p5.cv.GaussianBlur(myMatGrayscale, radius);
    } else {
      p5.cv.blur(myMatGrayscale, radius);
    }
    // display Mat
    p5.cv.drawMat(myMatGrayscale, 0, 0);
  } else {
    image(myCapture, 0, 0);
  }
}
