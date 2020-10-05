/**
 * Sparse (Lucas-Kanade) Optical Flow
 * based on ofxCv example-flow by Kyle McDonald
 *
 * Detects "good features" and tracks their motion between frames
 */

// p5.js Video capture
let myCapture;
// OpenCV capture helper
let myCVCapture;
// (RGBA) Mat to store the latest color camera frame
let myMat;
// Mat to store the grayscale converted camera frame
let myMatGrayscale;
// Optical Flow
let myFlowLK;

function setup() {
  createCanvas(640, 480);
  stroke(0, 192, 0);
  strokeWeight(3);
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
  // init LK Optical Flow
  myFlowLK = new FlowPyrLK();
}
// this gets called from html input slider events
function updateFlowSettings(){
  myFlowLK.setMaxFeatures(select('#lkMaxFeatures').value());
  myFlowLK.setQualityLevel(select('#lkQualityLevel').value());
  myFlowLK.setMinDistance(select('#lkMinDistance').value());
  myFlowLK.setWindowSize(select('#lkWinSize').value());
  myFlowLK.setMaxLevel(select('#lkMaxLevel').value());
  myFlowLK.resetFeaturesToTrack();
}

function draw() {
  if (p5.cv.isReady) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // convert Mat to grayscale
    p5.cv.copyGray(myMat, myMatGrayscale);
    // display Mat
    p5.cv.drawMat(myMatGrayscale, 0, 0);
    // warm up, then update Optical Flow
    if (frameCount > 42) {
      myFlowLK.calcOpticalFlow(myMat);
    }
    // draw Optical Flow
    myFlowLK.draw();
  } else {
    image(myCapture, 0, 0);
  }
}
