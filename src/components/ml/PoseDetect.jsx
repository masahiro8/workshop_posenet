import React from "react";
import * as posenet from "@tensorflow-models/posenet";
import { setPoint } from "../util/canvas.util";

export default class PoseDetect extends React.Component {
  constructor(props) {
    super(props);
    this.model = null;
    this.state = {
      results: []
    };
  }

  async componentDidMount() {
    this.init();
  }

  async init() {
    await this.loadModel();
    setInterval(() => {
      this.clearCanvas();
      this.predict();
    }, this.props.interval);
  }

  //TFモデルのロード
  async loadModel() {
    this.model = await posenet.load();
    let p = new Promise(resolve => {
      if (this.model) {
        console.log("loaded pose model");
        resolve();
      }
    });
    return p;
  }

  async predict() {
    //let tensor = this.imageFromVideo();
    const pose = await this.model.estimateSinglePose(
      this.props.imageSrc,
      0.5,
      true,
      16
    );
    let results = pose.keypoints.map((p, i) => {
      return {
        score: p.score,
        className: p.part,
        position: p.position
      };
    });

    this.setState({
      results: results
    });

    this.props.result(results);
    this.drawPoints();
  }

  //キャンバスをクリア
  clearCanvas() {
    const context = this.props.canvas.getContext("2d");
    context.clearRect(0, 0, this.props.size.width, this.props.size.height);
  }

  drawPoints() {
    this.state.results.map(p => {
      setPoint(this.props.canvas, p.position);
    });
  }

  getLogs() {
    if (!this.props.log) return <div />;
    return this.state.results.map(p => {
      return (
        <div>
          {p.className}:{p.score.toFixed(3)}({p.position.x},{p.position.y})
        </div>
      );
    });
  }

  render() {
    return <div className="log">{this.getLogs()}</div>;
  }
}
