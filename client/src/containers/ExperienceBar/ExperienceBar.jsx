import { Line } from "rc-progress";

import React, { Component } from "react";

export class ProgressBarIndicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: 10
    };
  }
  handleClick = () => {
      this.setState({percent: this.state.percent+10})
  }
  render() {
    return (
      <div style={{ margin: 10, width: 200 }}>
        <Line
          className="progress-bar"
          strokeWidth="4"
          percent={this.state.percent}
        />
        <button onClick={this.handleClick}>CLICK ME!</button>
      </div>
    );
  }
}

export default ProgressBarIndicator;
