const DifferenceMode = { ABSDIFF: 0, BRIGHTER: 1, DARKER: 2 };

class RunningBackground {
  constructor(width, height) {
    this.learningRate = 0.0001;
    this.learningTime = 900.0;
    this.useLearningTime = false;
    this.thresholdValue = 26;
    this.ignoreForeground = false;
    this.needToReset = false;
    this.differenceMode = DifferenceMode.ABSDIFF;
    this.accumulator = new cv.Mat();
    this.background = cv.Mat.zeros(height, width, cv.CV_32F);
    this.foreground = cv.Mat.zeros(height, width, cv.CV_32F);
    this.foregroundGray = cv.Mat.zeros(height, width, cv.CV_32F);
  }

  update(frame, thresholded) {
    if (this.needToReset || this.accumulator.empty()) {
      this.needToReset = false;
      // frame.convertTo(this.accumulator, cv.CV_32F);
      frame.copyTo(this.accumulator);
    }

    this.accumulator.convertTo(this.background, cv.CV_8U);
    switch (this.differenceMode) {
      case DifferenceMode.ABSDIFF:
        cv.absdiff(this.background, frame, this.foreground);
        break;
      case DifferenceMode.BRIGHTER:
        cv.subtract(frame, this.background, this.foreground);
        break;
      case DifferenceMode.DARKER:
        cv.subtract(this.background, frame, this.foreground);
        break;
    }

    p5.cv.copyGray(this.foreground, this.foregroundGray);
    let thresholdMode = this.ignoreForeground
      ? cv.THRESH_BINARY_INV
      : cv.THRESH_BINARY;
    cv.threshold(
      this.foregroundGray,
      thresholded,
      this.thresholdValue,
      255,
      thresholdMode
    );
    // FIXME is this needed ?
    let curLearningRate = float(this.learningRate);
    if (this.useLearningTime) {
      // FIXME: this needs more love
      curLearningRate = pow(
        1 - this.thresholdValue / 255,
        1 / float(this.learningRate)
      );
    }
    if (this.ignoreForeground) {
      //   TODO: finish this: add mask
      p5.cv.accumulateWeighted(frame, this.accumulator, curLearningRate);
      // cv.bitwise_not(this.thresholded, this.thresholded);
    } else {
      p5.cv.accumulateWeighted(frame, this.accumulator, curLearningRate);
    }
  }

  getPresence() {
    return cv.mean(this.foreground).data[0] / 255.0;
  }

  setThresholdValue(thresholdValue) {
    this.thresholdValue = thresholdValue;
  }

  setLearningRate(learningRate) {
    this.learningRate = learningRate;
    this.useLearningTime = false;
  }

  setLearningTime(learningTime) {
    this.learningTime = learningTime;
    this.useLearningTime = true;
  }

  setIgnoreForeground(ignoreForeground) {
    this.ignoreForeground = ignoreForeground;
  }

  setDifferenceMode(differenceMode) {
    this.differenceMode = differenceMode;
  }

  reset() {
    this.needToReset = true;
  }
}

export default RunningBackground;
