import React from "react";
import Video from "./components/video/Video.jsx";
import Canvas from "./components/canvas/Canvas.jsx";
import PoseDetect from "./components/ml/PoseDetect.jsx";
import Work1 from "./components/works/Work1.jsx";

const VIDEO_SIZE = { width: 640, height: 480 };
const INTERVAL = 1000 / 5;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.video = null;
    this.canvas = null;
    this.state = {
      video: null,
      canvas: null,
      imageSrc: null,
      pose: null
    };
  }

  componentDidMount() {}

  setVideo(ref) {
    if (this.state.video !== ref && ref) {
      this.setState({
        video: ref
      });
    }
  }

  setCanvas(ref) {
    if (this.state.canvas !== ref && ref) {
      this.setState({
        canvas: ref
      });
    }
  }

  setImageSrc(ref) {
    if (this.state.imageSrc !== ref && ref) {
      this.setState({
        imageSrc: ref
      });
    }
  }

  setPose(ref) {
    if (this.state.pose !== ref && ref) {
      this.setState({
        pose: ref
      });
    }
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Video
          size={VIDEO_SIZE}
          videoTag={ref => {
            this.setVideo(ref);
          }}
          imageSrc={ref => {
            this.setImageSrc(ref);
          }}
          interval={INTERVAL}
        />
        <Canvas
          size={VIDEO_SIZE}
          canvasTag={ref => {
            this.setCanvas(ref);
          }}
        />
        <Work1
          canvas={this.state.canvas}
          pose={this.state.pose}
          interval={INTERVAL}
        />
        <PoseDetect
          size={VIDEO_SIZE}
          imageSrc={this.state.imageSrc}
          video={this.state.video}
          canvas={this.state.canvas}
          interval={INTERVAL}
          result={results => {
            this.setPose(results);
          }}
          log={false}
        />
      </div>
    );
  }
}
