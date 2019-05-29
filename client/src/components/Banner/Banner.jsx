import React, { Component } from "react";
import ExperienceBar from "../../containers/ExperienceBar/ExperienceBar";
import Rogue from "../../assets/Rogue.png";
import CentaurLady from "../../assets/centaurlady.png"
import Elf from "../../assets/elf_f_hit_anim_f0.png";
import Knight from "../../assets/knight_idle.png";
import { addLvl, addExp } from "../../actions";
import { connect } from "react-redux";

export class Banner extends Component {

  selectAvatar = () => {
    const { lvl } = this.props.user
    switch (true) {
      case (lvl > 4 && lvl < 10):
        return Knight;
      case (lvl > 10 && lvl < 15):
        return CentaurLady;
      default:
        return Elf;
    }
  };

  render() {
    const avatar = this.selectAvatar();
    return (
      <section className="Banner">
        <div className="info-cntr">
          <section>
            <span>{this.props.user.lvl}</span>
            <img src={avatar} style={{ width: 25 }} />
            <span>{this.props.user.name}</span>
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
