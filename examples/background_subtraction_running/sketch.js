/**
 * Running Background Subtraction
 * based on ofxCv example-background by Kyle McDonald
 *
 * accumulates background over time
 */

// p5.js Video
let myVideo;
// OpenCV capture helper
let myCVCapture;
// (RGBA) Mat to store the latest color camera frame
let myMat;
// Mat to store the grayscale converted camera frame
let myMatGrayscale;
// Running Background
let myBackground;
// accumulated thresholded image
let myThresholdedMat;

function setup() {
  createCanvas(320, 240);
  stroke(0, 192, 0);
  strokeWeight(3);
  // setup p5 video
  myVideo = createVideo(['../assets/fingers.mov'], myVideoLoaded);
  // wait for OpenCV to init
  p5.cv.onComplete = setupCV;
}

function myVideoLoaded() {
  myVideo.loop();
  myVideo.volume(0);
}

function setupCV() {
  // create a CV capture helper
  myCVCapture = p5.cv.getCvVideoCapture(myVideo);
  // create a CV Mat to read new color frames into
  myMat = p5.cv.getRGBAMat(320, 240);
  // create a CV Mat for color to grayscale conversion
  myMatGrayscale = new cv.Mat();
  // create a CV Mat to accumulate threshold into
  myThresholdedMat = p5.cv.getGrayscaleMat(320, 240);
  // init Running Background
  myBackground = new RunningBackground(320, 240);
  myBackground.setLearningTime(30);
  myBackground.setThresholdValue(10);
}

function updateRunningBackgroundSettings(){
  myBackground.setLearningTime(select('#learningTime').value());
  myBackground.setThresholdValue(select('#thresholdValue').value());
}

function hasSameSize(capture, mat){
  return capture.video.width === mat.cols && capture.video.height === mat.rows;
}

function draw() {
  if (p5.cv.isReady && hasSameSize(myCVCapture, myMat)) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // convert Mat to grayscale
    p5.cv.copyGray(myMat, myMatGrayscale);
    // update Running Background
    myBackground.update(myMatGrayscale, myThresholdedMat);
    // display Mat
    p5.cv.drawMat(myMat, 0, 0);
  }
}
