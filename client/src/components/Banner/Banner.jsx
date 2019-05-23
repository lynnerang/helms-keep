import React, { Component } from "react";
import ProgressBarIndicator from "../../containers/ExperienceBar/ExperienceBar";

export class Banner extends Component {
  render() {
    return (
      <section className="Banner">
        <div className="info-cntr">
          <section>
            <figure />
          </section>

          <ProgressBarIndicator />
        </div>
      </section>
    );
  }
}

export default Banner;
