import { Line } from "rc-progress";

import React, { Component } from "react";
import Star from "../../assets/Star.png";
import Life from "../../assets/Life.png";
import { userReducer } from "../../reducers/userReducer";

export class ExperienceBar extends Component {

  convertExpToPercent = () => {
    return this.props.user.exp / this.props.user.nextLvl * 100
  }
  render() {
    const expPercent = this.convertExpToPercent();
    return (
      <div className="bar-container" style={{ margin: 10, width: 200 }}>
        <div>
          <img
            alt="experience"
            src={Star}
            style={{ width: 50 }}
            className="progress-img"
          />
          <Line
            className="progress-bar"
            strokeColor="#FEEC26"
            strokeWidth="4"
            percent={expPercent}
          />
          <span className="progress-text">{this.props.user.exp}/{Math.floor(this.props.user.nextLvl)}</span>
        </div>
        <div>
          <img
            alt="life"
            src={Life}
            style={{ width: 50 }}
            className="progress-img"
          />
          <Line
            className="progress-bar"
            strokeColor="#FF6696"
            strokeWidth="4"
            percent={100}
          />
          <span className="progress-text">100/100</span>
        </div>
      </div>
    );
  }
}

export default ExperienceBar;
