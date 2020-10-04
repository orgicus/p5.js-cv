/**
 * Based on the Processing Video Brightness Tracking example
 * by Golan Levin.
 *
 * Tracks the brightest pixel in a live video signal. 
 */

// p5.js Video capture
let myCapture;
// OpenCV capture helper
let myCVCapture;
// (RGBA) Mat to store the latest color camera frame
let myMat;
// Mat to store the grayscale converted camera frame
let myMatGrayscale;

function setup() {
  createCanvas(320, 240);
  myCapture = createCapture(VIDEO);
  myCapture.size(320, 240);
  myCapture.hide();

  myGraphics = createGraphics(320, 240);

  p5.cv.onComplete = onOpenCVComplete;
}

function onOpenCVComplete() {
  myCVCapture = new cv.VideoCapture(myCapture.elt);
  myMat = p5.cv.getRGBAMat(320, 240);
  myMatGrayscale = new cv.Mat();
}

function draw() {
  if (p5.cv.isReady) {
    // render video element to canvas
    //myGraphics.image(myCapture, 0, 0);
    // convert Canvas to OpenCV Mat
    myCVCapture.read(myMat);
    // convert Mat to grayscale
    p5.cv.copyGray(myMat, myMatGrayscale);
    // display Mat
    p5.cv.drawMat(myMatGrayscale, 0, 0);
    // get brightnest point
    let brightestPoint = p5.cv.findMaxLocation(myMatGrayscale);
    // draw brightest point
    circle(brightestPoint.x, brightestPoint.y, 30);
  } else {
    image(myCapture, 0, 0);
  }
}
