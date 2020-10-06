p5.cv.trackingDistanceRect = function (a, b) {
  let dx = a.x + a.width * 0.5 - (b.x + b.width * 0.5);
  let dy = a.y + a.height * 0.5 - (b.y + b.height * 0.5);
  let dw = a.width - b.width;
  let dh = a.height - b.height;
  let pd = Math.sqrt(dx * dx + dy * dy);
  let sd = Math.sqrt(dw * dw + dh * dh);
  return pd + sd;
};

p5.cv.trackingDistancePoint = function (a, b) {
  return dist(a.x, a.y, b.x, b.y);
};

p5.cv.isPoint = function (pt) {
  return 'x' in pt && 'y' in pt && !('width' in pt);
};

p5.cv.isRect = function (pt) {
  return 'x' in pt && 'y' in pt && 'width' in pt && 'height' in pt;
};

p5.cv.trackingDistance = function (a, b) {
  if (p5.cv.isPoint(a) && p5.cv.isPoint(b)) {
    return p5.cv.trackingDistancePoint(a, b);
  }
  if (p5.cv.isRect(a) && p5.cv.isRect(b)) {
    return p5.cv.trackingDistanceRect(a, b);
  }
  console.warn(
    'invalid input: currently supporting only points(e.g. {x:0,y:0}) and rectangles({x:0,y:0,width:10,height:10})'
  );
  return -1;
};

class TrackedObject {
  initFromObject(object, label, index) {
    this.lastSeen = 0;
    this.label = label;
    this.age = 0;
    this.index = index;
    this.object = object;
    return this;
  }

  initFromPreviousObject(object, previous, index) {
    this.lastSeen = 0;
    this.label = previous.label;
    this.age = previous.age;
    this.index = index;
    this.object = object;
    return this;
  }

  copyFrom(old) {
    this.lastSeen = old.lastSeen;
    this.label = old.label;
    this.age = old.age;
    this.index = -1;
    this.object = old.object;
    return this;
  }

  timeStep(visible) {
    this.age++;
    if (!visible) {
      this.lastSeen++;
    }
  }

  getLastSeen() {
    return this.lastSeen;
  }

  getAge() {
    return this.age;
  }

  getLabel() {
    return this.label;
  }

  getIndex() {
    return this.index;
  }
}

class Tracker {
  constructor() {
    this.previous = [];
    this.current = [];
    this.currentLabels = [];
    this.previousLabels = [];
    this.newLabels = [];
    this.deadLabels = [];

    this.previousLabelMap = new Map();
    this.currentLabelMap = new Map();

    this.persistence = 15;
    this.curLabel = 0;

    this.maximumDistance = 64;
  }

  getNewLabel() {
    return this.curLabel++;
  }

  setPersistence(persistence) {
    this.persistance = persistence;
  }

  setMaximumDistance(maximumDistance) {
    this.maximumDistance = maximumDistance;
  }

  sortByDistance(a, b) {
    if (a.distance > b.distance) return 1;
    if (a.distance < b.distance) return -1;
    return 0;
  }

  track(objects) {
    // TODO: check if this is mean to update reference or copy values
    // this.previous = this.current;
    this.previous = [].concat(this.current);

    let n = objects.length;
    let m = this.previous.length;

    // matchPair = {index1:index2};
    // matchDistancePair = {pair: matchPair, distance: dist}
    let all = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        let curDistance = p5.cv.trackingDistance(
          objects[i],
          this.previous[j].object
        );
        if (curDistance < this.maximumDistance) {
          all.push({ pair: [i, j], distance: curDistance });
        }
      }
    }

    all.sort(this.sortByDistance);

    // previousLabels = currentLabels;
    this.previousLabels = [].concat(this.currentLabels);
    this.currentLabels = new Array(n);
    this.current.length = 0;

    let matchedObjects = new Array(n).fill(false);
    let matchedPrevious = new Array(m).fill(false);
    // walk through matches in order
    let allSize = all.length;
    for (let k = 0; k < allSize; k++) {
      let match = all[k].pair;
      let i = match[0];
      let j = match[1];
      // only use match if both objects are unmatched, lastSeen is set to 0
      if (!matchedObjects[i] && !matchedPrevious[j]) {
        matchedObjects[i] = true;
        matchedPrevious[j] = true;
        let index = this.current.length;
        let newFromPrevious = new TrackedObject().initFromPreviousObject(
          objects[i],
          this.previous[j],
          index
        );
        this.current.push(newFromPrevious);
        newFromPrevious.timeStep(true);
        this.currentLabels[i] = newFromPrevious.getLabel();
      }
    }

    // create new labels for new unmatched objects, lastSeen is set to 0
    this.newLabels.length = 0;
    for (let i = 0; i < n; i++) {
      if (!matchedObjects[i]) {
        let curLabel = this.getNewLabel();
        let index = this.current.length;
        let newWithLabel = new TrackedObject().initFromObject(
          objects[i],
          curLabel,
          index
        );
        this.current.push(newWithLabel);
        newWithLabel.timeStep(true);
        this.currentLabels[i] = curLabel;
        this.newLabels.push(curLabel);
      }
    }

    // copy old unmatched objects if young enough, lastSeen is increased
    this.deadLabels.length = 0;
    for (let j = 0; j < m; j++) {
      if (!matchedPrevious[j]) {
        if (this.previous[j].getLastSeen() < this.persistence) {
          this.current.push(this.previous[j]);
          this.current[this.current.length - 1].timeStep(false);
        }
        this.deadLabels.push(this.previous[j].getLabel());
      }
    }

    // build label maps
    this.currentLabelMap.clear();
    let currentSize = this.current.length;
    for (let i = 0; i < currentSize; i++) {
      let label = this.current[i].getLabel();
      this.currentLabelMap.set(label, this.current[i]);
    }
    this.previousLabelMap.clear();
    let previousSize = this.previous.length;
    for (let i = 0; i < previousSize; i++) {
      let label = this.previous[i].getLabel();
      this.previousLabelMap.set(label, this.previous[i]);
    }

    return this.currentLabels;
  }

  getCurrentLabels() {
    return this.currentLabels;
  }

  getPreviousLabels() {
    return this.previousLabels;
  }

  getNewLabels() {
    return this.newLabels;
  }

  getDeadLabels() {
    return this.deadLabels;
  }
  getLabelFromIndex(i) {
    return this.currentLabels[i];
  }
  // TODO: test with invalid label
  getIndexFromLabel(label) {
    if (this.currentLabelMap.has(label)) {
      return this.currentLabelMap.get(label).getIndex();
    }
    console.warn('label', label, 'not found');
  }
  getPrevious(label) {
    // return previousLabelMap.find(label)->second->object;
    if (this.previousLabelMap.has(label)) {
      return this.previousLabelMap.get(label).object;
    }
    console.warn('label', label, 'not found');
  }
  getCurrent(label) {
    if (this.currentLabelMap.has(label)) {
      return this.currentLabelMap.get(label).object;
    }
    console.warn('label', label, 'not found');
  }
  existsCurrent(label) {
    return this.currentLabelMap.has(label);
  }
  existsPrevious(label) {
    return this.previousLabelMap.has(label);
  }
  getAge(label) {
    if (this.currentLabelMap.has(label)) {
      return this.currentLabelMap.get(label).getAge();
    }
    console.warn('label', label, 'not found');
  }
  getLastSeen(label) {
    if (this.currentLabelMap.has(label)) {
      return this.currentLabelMap.get(label).getLastSeen();
    }
    console.warn('label', label, 'not found');
  }
}

class RectTracker extends Tracker {
  constructor() {
    super();
    this.smoothingRate = 0.5;
    // std::map<unsigned int, cv::Rect> smoothed;
    this.smoothed = new Map();
  }

  setSmoothingRate(smoothingRate) {
    this.smoothingRate = smoothingRate;
  }
  getSmoothingRate() {
    return this.smoothingRate;
  }

  track(objects) {
    let labels = super.track(objects);
    // add new objects, update old objects
    let labelsSize = labels.length;
    for (let i = 0; i < labelsSize; i++) {
      let label = labels[i];
      let cur = this.getCurrent(label);
      if (this.smoothed.has(label)) {
        let smooth = this.smoothed.get(label);
        smooth.x = lerp(smooth.x, cur.x, smoothingRate);
        smooth.y = lerp(smooth.y, cur.y, smoothingRate);
        smooth.width = lerp(smooth.width, cur.width, smoothingRate);
        smooth.height = lerp(smooth.height, cur.height, smoothingRate);
      } else {
        this.smoothed[label] = cur;
      }
    }
    // TODO: check if this is legit both global and instance p5.js modes
    for (const [label, trackedRect] of this.smoothed.entries()) {
      if (!this.existsCurrent(label)) {
        this.smoothed.delete(label);
        trackedRect; //eslint :/
      }
    }

    return labels;
  }

  getSmoothed(label) {
    if (this.smoothed.has(label)) {
      return this.smoothed.get(label);
    }
    console.warn('label', label, 'not found');
  }

  getVelocity(i) {
    let label = this.getLabelFromIndex(i);
    // TODO: validate / handle i not found
    if (this.existsPrevious(label)) {
      let previous = this.getPrevious(label);
      let current = this.getCurrent(label);
      // TODO: check if this works: it's more readable, but looks like it could swallow memory over time
      let previousPosition = createVector(
        previous.x + previous.width * 0.5,
        previous.y + previous.height * 0.5
      );
      let currentPosition = createVector(
        current.x + current.width * 0.5,
        current.y + current.height * 0.5
      );
      return p5.Vector.sub(currentPosition, previousPosition);
    } else {
      return createVector();
    }
  }
}

//   typedef Tracker<cv::Point2f> PointTracker;
class PointTracker extends Tracker {
  constructor() {
    super();
  }
}

class Follower {
  constructor() {
    this.dead = false;
    this.label = 0;
  }

  setup(track) {}
  update(track) {}
  kill() {
    this.dead = true;
  }

  setLabel(label) {
    this.label = label;
  }
  getLabel() {
    return this.label;
  }
  getDead() {
    return this.dead;
  }
}

// typedef Follower<cv::Rect> RectFollower;
// typedef Follower<cv::Point2f> PointFollower;
class RectFollower extends Follower {
  constructor() {
    super();
  }
}

class PointFollower extends Follower {
  constructor() {
    super();
  }
}
// FIXME: figure out the best way to handle RectTracker/PointTracker
class TrackerFollower extends Tracker {
  constructor() {
    super();
    this.labels = [];
    this.followers = [];
  }

  track(objects) {
    // will this handle all types ?
    super.track(objects);
    // kill missing, update old
    let labelsSize = this.labels.length;
    for (let i = 0; i < labelsSize; i++) {
      let curLabel = this.labels[i];
      let curFollower = this.followers[i];
      if (!this.existsCurrent(curLabel)) {
        curFollower.kill();
      } else {
        curFollower.update(this.getCurrent(curLabel));
      }
    }
    // add new
    let newLabelsSize = this.newLabels.length;
    for (let i = 0; i < newLabelsSize; i++) {
      let curLabel = this.newLabels[i];
      this.labels.push(curLabel);
      let newFollower = new Follower();
      this.followers.push(newFollower);
      newFollower.setup(this.getCurrent(curLabel));
      newFollower.setLabel(curLabel);
    }
    // remove dead
    labelsSize = this.labels.length;
    for (let i = labelsSize - 1; i >= 0; i--) {
      if (this.followers[i].getDead()) {
        this.followers.splice(i, 1);
        this.labels.splice(i, 1);
      }
    }
    return this.labels;
  }

  getFollowers() {
    return this.followers;
  }
}

// template <class F> class RectTrackerFollower : public TrackerFollower<cv::Rect, F> {};
// template <class F> class PointTrackerFollower : public TrackerFollower<cv::Point2f, F> {};
class RectTrackerFollower extends TrackerFollower {
  constructor() {
    super();
  }
}
class PointTrackerFollower extends TrackerFollower {
  constructor() {
    super();
  }
}

export {
  TrackedObject,
  Tracker,
  PointTracker,
  RectTracker,
  Follower,
  RectFollower,
  PointFollower,
  TrackerFollower,
  RectTrackerFollower,
  PointTrackerFollower,
};
