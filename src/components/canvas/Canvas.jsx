import React from "react";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = null;
  }

  componentDidMount() {}

  render() {
    return (
      <canvas
        ref={ref => {
          this.canvas = ref;
          this.props.canvasTag(ref);
        }}
        width={this.props.size.width}
        height={this.props.size.height}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: this.props.size.width + "px",
          height: this.props.size.height + "px",
          zIndex: 1
        }}
      />
    );
  }
}
