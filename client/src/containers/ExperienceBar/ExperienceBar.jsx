import { Line } from "rc-progress";

import React, { Component } from "react";
import Star from "../../assets/Star.png";
import Life from "../../assets/Life.png";
import PropTypes from 'prop-types';

export class ProgressBarIndicator extends Component {
  render() {
    return (
      <div className="bar-container" style={{ margin: 10, width: 200 }}>
        <div>
          <img
            alt="experience"
            src={Star}
            style={{ width: 40 }}
            className="progress-img"
          />
          <Line
            className="progress-bar"
            strokeColor="#FEEC26"
            strokeWidth="4"
            percent={50}
          />
          <span className="progress-text">50/100</span>
        </div>
        <div>
          <img
            alt="life"
            src={Life}
            style={{ width: 40 }}
            className="progress-img"
          />
          <Line
            className="progress-bar"
            strokeColor="#FF6696"
            strokeWidth="4"
            percent={78}
          />
          <span className="progress-text">78/100</span>
        </div>
      </div>
    );
  }
}

ProgressBarIndicator.propTypes = {

}

export default ProgressBarIndicator;
