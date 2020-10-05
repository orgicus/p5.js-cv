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
// array of quads (array of points)
let quads = [];
let threshold;
let targetColor;
let unwarpedMat;

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
  // init contour finder
  myContourFinder = new ContourFinder();
  myContourFinder.setMinAreaRadius(10);
  myContourFinder.setMaxAreaRadius(200);
  // createa CV mat to unwarp
  unwarpedMat = p5.cv.getRGBAMat(150, 100);
  // default colour to track
  targetColor = color(255);
}

function draw() {
  if (p5.cv.isReady) {
    // read from CV Capture into myMat
    myCVCapture.read(myMat);
    // map (constrained) mouseX position to 0-255 range
    threshold = map(constrain(mouseX, 0, width), 0, width, 0, 255);
    // apply treshold
    myContourFinder.setThreshold(threshold);
    // search for contours in the latest frame
		myContourFinder.findContours(myMat);
		// count contours
    let n = myContourFinder.size();
    // clear previos quads
    quads.length = 0;
    // for each quad
		for(let i = 0; i < n; i++) {
			quads[i] = myContourFinder.getFitQuad(i);
			
		// 	// convert integer image coordinates Point2i to unwarp positions Point2f
		// 	// vector<Point2f> warpPoints;
		// 	// copy(quads[i].begin(), quads[i].end(), back_inserter(warpPoints));
			unwarpPerspective(myMat, unwarpedMat, quads[i]);
		// 	// unwarped.update();
		}

    // display Mat
    p5.cv.drawMat(myMat, 0, 0);
    p5.cv.drawMat(unwarpedMat, 0, 0);
    
  } else {
    image(myCapture, 0, 0);
  }
}
