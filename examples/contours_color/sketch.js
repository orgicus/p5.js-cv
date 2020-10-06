/**
 * Based on ofxCv's contours-color example
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
let targetColor;

function setup() {
  createCanvas(320, 240).mousePressed(onCanvasPressed);
  noFill();
  stroke(0, 192, 0);
  targetColor = color(255);
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
  myContourFinder.setMinArea(10);
  myContourFinder.setMaxArea(150);
  // optional: find black instead of white
  // myContourFinder.setInvert(true);
}

function draw() {
  if (p5.cv.isReady) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // update settings
    myContourFinder.setTargetColor(
      targetColor,
      select('#trackHs').checked()
        ? p5.cv.TrackingColorMode.TRACK_COLOR_HS
        : p5.cv.TrackingColorMode.TRACK_COLOR_RGB
    );
    myContourFinder.setThreshold(select('#threshold').value());
    // search for contours in the latest frame
    myContourFinder.findContours(myMat);
    // display Mat
    p5.cv.drawMat(myMat, 0, 0);
    // draw contours
    myContourFinder.draw();
    // draw target color
    translate(8, 75);
    fill(0);
    rect(-3, -3, 64 + 6, 64 + 6);
    fill(targetColor);
    rect(0, 0, 64, 64);
  } else {
    image(myCapture, 0, 0);
  }
}

function onCanvasPressed(){
  targetColor = myCapture.get(mouseX, mouseY);
}