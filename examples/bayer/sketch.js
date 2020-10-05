/**
 * Based on ofxCv's bayer example by Kyle McDonald
 *
 * Converts a Bayer pattern image
 */

// bayer p5.Image
let bayerImage;
// bayer conversion Mat
let bayerMat;
// bayer result
let bayerConvertedImage;

function preload(){
  bayerImage = loadImage('../assets/bayer.png');
}

function setup() {
  createCanvas(1280, 480);
  stroke(255);
  bayerConvertedImage = createImage(640, 480);
  update();
}

function update() {
  let dropDownValue = select('#bayerType').value();
  let cvConversionCode = cv[dropDownValue];
  // convert p5.Image to OpenCV Mat
  bayerMat = p5.cv.imageToNewMat(bayerImage);
  // convert from RGBA (p5 / Canvas) to Grayscale
  cv.cvtColor(bayerMat, bayerMat, cv.COLOR_RGBA2GRAY);
  // convert bayer grayscale to RGB
  cv.cvtColor(bayerMat, bayerMat, cvConversionCode);
  // converted OpenCV Mat to p5.Image
  p5.cv.matToImage(bayerMat, bayerConvertedImage);
}

function draw() {
  image(bayerImage, 0, 0);
  image(bayerConvertedImage, 640, 0);
}