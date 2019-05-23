import React, { Component } from "react";
import shortid from "shortid";

export class ChallengeContainer extends Component {
  state = {
    challenge: ""
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  handleChange = e => this.setState({ challenge: e.target.value });

  handleSubmit = e => {
    this.props.addChallenge({
      id: shortid.generate(),
      message: this.state.challenge,
      isCompleted: false
    });
    this.setState({ challenge: "" });
  };

  render() {
    //consider allowing editing existing chals in form
    const challenges = this.props.challenges.map(chal => {
      return (
        <li className="challenge-txt" key={chal.id}>
          {chal.message}
        </li>
      );
    });

    return (
      <article className="ChallengeContainer">
        <ul>
          {challenges}
          <div ref={el => { this.el = el; }}/>
        </ul>
        <div className="form-row">
          <input
            className="new-challenge-input"
            placeholder="Add new challenge..."
            name="challenge"
            onChange={this.handleChange}
            value={this.state.challenge}
          />
          <button
            className="add-challenge-btn"
            type="button"
            onClick={this.handleSubmit}
          >
            +
          </button>
        </div>
      </article>
    );
  }
}

export default ChallengeContainer;
