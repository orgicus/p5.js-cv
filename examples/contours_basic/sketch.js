/**
 * Based on ofxCv's contours-quad example
 * by Kyle McDonald.
 *
 * Find a contour by colour, fits a quad to the contours and unwarps it
 */

// p5.js Video capture
let myCapture;
// OpenCV capture helper
let myCVCapture;
// (RGBA) Mat to store the latest color camera frame
let myMat;
// contour finder
let myContourFinder;

function setup() {
  createCanvas(320, 240);
  noFill();
  stroke(0, 192, 0);
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
  // init contour finder
  myContourFinder = new ContourFinder();
}

function draw() {
  if (p5.cv.isReady) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // update settings
    myContourFinder.setMinArea(select('#minArea').value());
    myContourFinder.setMaxArea(select('#maxArea').value());
    myContourFinder.setThreshold(select('#threshold').value());
    // search for contours in the latest frame
    myContourFinder.findContours(myMat);
    myContourFinder.setFindHoles(select("#holes").checked());
		// display Mat
    p5.cv.drawMat(myMat, 0, 0);
    // draw contours
    myContourFinder.draw();
  } else {
    image(myCapture, 0, 0);
  }
}