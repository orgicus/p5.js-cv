class ObjectFinder {
  constructor() {
    this.rescale = 1;
    this.multiScaleFactor = 1.1;
    this.minNeighbors = 3;
    this.minSizeScale = new cv.Size();
    this.maxSizeScale = new cv.Size(1, 1);
    this.useHistogramEqualization = true;
    this.cannyPrunning = false;
    this.findBiggestObject = false;

    this.gray = new cv.Mat();
    this.graySmall = new cv.Mat();
    this.classifier = new cv.CascadeClassifier();
    // vector<Rect>
    this.objects = [];
    this.tracker = new RectTracker();
  }

  setup(cascadeFilename) {
    // FIXME: handle load errors
    this.classifier.load(cascadeFilename);
  }

  update(newFrameMat) {
    if (this.classifier.empty()) {
      return;
    }
    if (newFrameMat.channels() === 1) {
      this.gray = newFrameMat;
    } else {
      p5.cv.copyGray(newFrameMat, this.gray);
    }
    p5.cv.resizeToScale(this.gray, this.graySmall, this.rescale, this.rescale);

    if (this.useHistogramEqualization) {
      p5.cv.equalizeHist(this.graySmall);
    }
    let minSize = new cv.Size(),
      maxSize = new cv.Size();
    let minSide = min(this.graySmall.rows, this.graySmall.cols);
    if (this.minSizeScale > 0) {
      let side = this.minSizeScale * minSide;
      minSize.width = side;
      minSize.height = side;
    }
    if (this.maxSizeScale < 1) {
      let side = this.maxSizeScale * minSide;
      // maxSize = new cv.Size(side, side);
      maxSize.width = side;
      maxSize.height = side;
    }

    let rectVector = new cv.RectVector();
    this.classifier.detectMultiScale(
      this.graySmall,
      rectVector,
      this.multiScaleFactor,
      this.minNeighbors,
      (this.cannyPruning ? cv.CASCADE_DO_CANNY_PRUNING : 0) |
        (this.findBiggestObject
          ? cv.CASCADE_FIND_BIGGEST_OBJECT | cv.CASCADE_DO_ROUGH_SEARCH
          : 0),
      minSize,
      maxSize
    );

    this.objects.length = 0;
    p5.cv.cvRectVectorToArray(rectVector, this.objects);
    rectVector.delete();
    let objectsSize = this.objects.length;
    let rect;
    for (let i = 0; i < objectsSize; i++) {
      rect = this.objects[i];
      // FIXME check if this is meant to be /= or *=
      (rect.width /= this.rescale), (rect.height /= this.rescale);
      (rect.x /= this.rescale), (rect.y /= this.rescale);
      // // FIXME check if the above does the job by reference of we need the bellow re-assingment
      this.objects[i] = rect;
    }
    this.tracker.track(this.objects);
  }

  size() {
    return this.objects.length;
  }

  getObject(i) {
    return this.objects[i];
  }

  getObjectSmoothed(i) {
    return this.tracker.getSmoothed(this.getLabel(i));
  }

  getVelocity(i) {
    return this.tracker.getVelocity(i);
  }

  getLabel(i) {
    return this.tracker.getCurrentLabels()[i];
  }

  getTracker() {
    return this.tracker;
  }

  draw() {
    push();
    noFill();
    stroke(0, 192, 0);
    let size = this.size();
    let object;
    for (let i = 0; i < size; i++) {
      object = this.getObject(i);
      rect(object.x, object.y, object.width, object.height);
      text(this.getLabel(i), object.x, object.y - 3);
    }
    pop();
  }

  setPreset(preset) {
    if (preset === ObjectFinder.FAST) {
      this.setRescale(0.25);
      this.setMinNeighbors(2);
      this.setMultiScaleFactor(1.2);
      this.setMinSizeScale(0.25);
      this.setMaxSizeScale(0.75);
      this.setCannyPruning(true);
      this.setFindBiggestObject(false);
    } else if (preset === ObjectFinder.ACCURATE) {
      this.setRescale(0.5);
      this.setMinNeighbors(6);
      this.setMultiScaleFactor(1.02);
      this.setMinSizeScale(0.1);
      this.setMaxSizeScale(1);
      this.setCannyPruning(true);
      this.setFindBiggestObject(false);
    } else if (preset === ObjectFinder.SENSITIVE) {
      this.setRescale(0.5);
      this.setMinNeighbors(1);
      this.setMultiScaleFactor(1.02);
      this.setMinSizeScale(0.1);
      this.setMaxSizeScale(1);
      this.setCannyPruning(false);
      this.setFindBiggestObject(false);
    }
  }

  setRescale(rescale) {
    this.rescale = rescale;
  }

  setMinNeighbors(minNeighbors) {
    this.minNeighbors = minNeighbors;
  }

  setMultiScaleFactor(multiScaleFactor) {
    this.multiScaleFactor = multiScaleFactor;
  }

  setCannyPruning(cannyPruning) {
    this.cannyPrunning = cannyPruning;
  }

  setFindBiggestObject(findBiggestObject) {
    this.findBiggestObject = findBiggestObject;
  }

  setUseHistogramEqualization(useHistogramEqualization) {
    this.useHistogramEqualization = useHistogramEqualization;
  }

  setMinSizeScale(minSizeScale) {
    this.minSizeScale = minSizeScale;
  }

  setMaxSizeScale(maxSizeScale) {
    this.maxSizeScale = maxSizeScale;
  }
}

ObjectFinder.FAST = 0;
ObjectFinder.ACCURATE = 1;
ObjectFinder.SENSITIVE = 2;

export default ObjectFinder;
