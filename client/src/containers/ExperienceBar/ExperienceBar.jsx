import { Line } from "rc-progress";

import React, { Component } from "react";
import Star from "../../assets/Star.png";
import Life from "../../assets/Life.png";

export class ProgressBarIndicator extends Component {
  render() {
    return (
      <div className="bar-container" style={{ margin: 10, width: 200 }}>
        <div>
          <img src={Star} style={{ width: 40 }} />
          <Line
            className="progress-bar"
            strokeColor="#FEEC26"
            strokeWidth="4"
            percent={50}
          />
          <span className="progress-text">50/100</span>
        </div>
        <div>
          <img src={Life} style={{ width: 40 }} />

          <Line
            className="progress-bar"
            strokeColor="#FF77A8"
            strokeWidth="4"
            percent={25}
          />
          <span className="progress-text">25/100</span>
        </div>
      </div>
    );
  }
}

export default ProgressBarIndicator;
