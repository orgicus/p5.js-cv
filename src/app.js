import './p5.cv.utils';
import './p5.cv.utilities';

import './p5.cv.helpers';
import './p5.cv.wrappers';

import './p5.cv.tracker';

import {
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
} from './p5.cv.tracker';

window.Tracker = Tracker;
window.TrackedObject = TrackedObject;
window.RectTracker = RectTracker;
window.PointTracker = PointTracker;
window.Follower = Follower;
window.RectFollower = RectFollower;
window.PointFollower = PointFollower;
window.TrackerFollower = TrackerFollower;
window.RectTrackerFollower = RectTrackerFollower;
window.PointTrackerFollower = PointTrackerFollower;

import RunningBackground from './p5.cv.running_background';

window.RunningBackground = RunningBackground;

import ObjectFinder from './p5.cv.object_finder';

window.ObjectFinder = ObjectFinder;

import { Flow, FlowPyrLK, FlowFarneback, OFlow, Graph } from './p5.cv.flow';

window.Flow = Flow;
window.FlowPyrLK = FlowPyrLK;
window.FlowFarneback = FlowFarneback;
window.OFlow = OFlow;
window.Graph = Graph;

import './p5.cv.contour_finder';
import ContourFinder from './p5.cv.contour_finder';

window.ContourFinder = ContourFinder;
