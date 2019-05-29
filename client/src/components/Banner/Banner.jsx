import React, { Component } from "react";
import ProgressBarIndicator from "../../containers/ExperienceBar/ExperienceBar";
import Rogue from "../../assets/Rogue.png";
import PropTypes from 'prop-types';
export class Banner extends Component {
  render() {
    return (
      <section className="Banner">
        <div className="info-cntr">
          <section>
            <img src={Rogue} style={{ width: 45 }} />
          </section>

          <ProgressBarIndicator />
        </div>
      </section>
    );
  }
}
Banner.propTypes = {
  
}
export default Banner;
