import React from "react";
import { setPoint } from "../util/canvas.util";

export default class Work1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setInterval(() => {
      this.work();
    }, this.props.interval);
  }

  work() {
    if (!this.props.pose || !this.props.pose.length) return false;
    this.props.pose.map(p => {
      if (p.className === "nose") {
        this.draw(p.position);
      }
    });
  }

  draw(position) {
    setPoint(this.props.canvas, position, "#f00");
  }

  render() {
    return <div />;
  }
}
