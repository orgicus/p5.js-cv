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
// Mat to store threshold result
let myMatThresh;

// Blur properties
let useGaussian = false;
let radius = 12;

function setup() {
  createCanvas(640, 240);
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
  // create a CV mat for thersholding
  myMatThresh = new cv.Mat();
}

function draw() {
  if (p5.cv.isReady) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // convert Mat to grayscale
    p5.cv.copyGray(myMat, myMatGrayscale);
    // apply threshold
    if(mouseIsPressed) {
			p5.cv.autothreshold(myMatGrayscale);
		} else {
			let thresholdValue = map(constrain(mouseX, 0, width), 0, width, 0, 255);
			p5.cv.threshold(myMatGrayscale, thresholdValue);
		}
    // display Mat
    p5.cv.drawMat(myMat, 0, 0);
    p5.cv.drawMat(myMatGrayscale, 320, 0);

  } else {
    image(myCapture, 0, 0);
  }
}
