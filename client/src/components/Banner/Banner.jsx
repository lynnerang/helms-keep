import React, { Component } from "react";
import ExperienceBar from "../../containers/ExperienceBar/ExperienceBar";
import Rogue from "../../assets/Rogue.png";
import { addLvl, addExp } from "../../actions";
import { connect } from "react-redux";

export class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <section className="Banner">
        
        <div className="info-cntr">
          <section>
        <span>{this.props.user.lvl}</span>

            <img src={Rogue} style={{ width: 45 }} />
          </section>
          <ExperienceBar user={this.props.user} />
          
        </div>

      </section>
    );
  }
}
export const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Banner);
