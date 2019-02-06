import React from "react";
import "./Video.css";

class VideoImage extends React.Component {
  constructor(props) {
    super(props);
    this.video = null;
  }

  componentDidMount() {
    this.initCam();
  }

  initCam() {
    this.media = navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: this.props.size.width
      }
    });

    this.media.then(stream => {
      this.video.srcObject = stream;
      this.video.onloadedmetadata = function(e) {
        console.log("Onload video", e);
      };
    });

    this.media.catch(err => {
      //alert("error");
    });
  }

  render() {
    return (
      <video
        ref={ref => {
          this.video = ref;
          this.props.set(ref);
        }}
        autoPlay
        playsInline
        width={this.props.size.width}
        height={this.props.size.height}
        className={"flip"}
      />
    );
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = null;
  }

  componentDidMount() {
    setInterval(() => {
      this.draw();
    }, this.props.interval);
  }

  draw() {
    if (!this.props.video || !this.canvas) {
      return;
    }
    let rect = this.props.video.getBoundingClientRect();
    var context = this.canvas.getContext("2d");
    this.canvas.width = this.props.size.width;
    this.canvas.height = this.props.size.height;
    context.drawImage(
      this.props.video,
      0,
      0,
      this.props.size.width,
      this.props.size.height
    );
  }

  render() {
    return (
      <canvas
        ref={ref => {
          this.canvas = ref;
          this.props.set(ref);
        }}
        style={{
          border: "1px solid red",
          position: "absolute",
          top: 0,
          left: 0,
          width: this.props.size.width + "px",
          height: this.props.size.height + "px",
          visibility: "hidden"
        }}
      />
    );
  }
}

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      canvas: null
    };
  }

  setVideo(ref) {
    if (this.state.video !== ref && ref) {
      this.setState({ video: ref });
      this.props.videoTag(ref);
    }
  }

  setCanvas(ref) {
    if (this.state.canvas !== ref && ref) {
      this.setState({ canvas: ref });
      this.props.imageSrc(ref);
    }
  }

  render() {
    return (
      <div style={{ position: "aboslute", top: 0, left: 0 }}>
        <VideoImage
          size={this.props.size}
          set={video => {
            this.setVideo(video);
          }}
        />
        <Canvas
          size={this.props.size}
          video={this.state.video}
          interval={this.props.interval}
          set={canvas => {
            this.setCanvas(canvas);
          }}
        />
      </div>
    );
  }
}
