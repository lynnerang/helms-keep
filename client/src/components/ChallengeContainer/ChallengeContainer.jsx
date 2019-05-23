import React, { Component } from 'react';
import shortid from 'shortid';

export class ChallengeContainer extends Component {
  state = {
    challenge: '',
    challenges: []
  }

  handleChange = e => {
    this.setState({ challenge: e.target.value })
  }

  addChallenge = e => {
    this.setState({
      challenges: [
        ...this.state.challenges,
        {
          id: shortid.generate(),
          message: this.state.challenge,
          isCompleted: false
        }
      ], challenge: ''
    }, () => console.log(this.state))
  }

  render() {
    //consider allowing editing existing chals in form
    const challenges = this.state.challenges.map(chal => {
      return <li className="challenge-txt" key={chal.id}>{chal.message}</li>
    })

    return (
      <article className="ChallengeContainer">
        <ul>
          {challenges}
        </ul>
        <div className="form-row">
          <input className="new-challenge-input" placeholder="Add new challenge..." name="challenge" onChange={this.handleChange} value={this.state.challenge} />
          <button className="add-challenge-btn" type="button" onClick={this.addChallenge}>+</button>
        </div>
      </article>
    )
	}
}

export default ChallengeContainer;
