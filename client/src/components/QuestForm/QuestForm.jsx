import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuest } from '../../actions';
import { ChallengeContainer } from '../ChallengeContainer/ChallengeContainer';
import { NavLink } from 'react-router-dom';

class QuestForm extends Component {
	state = {
		title: '',
		challenges: []
	};

	saveTitle = e => {
		this.setState({ title: e.target.value });
  };
  
  editChallenge = challenge => {
    const challenges = [...this.state.challenges];
    const index = challenges.findIndex(chal => chal.id === challenge.id);

    challenges[index] = challenge;
    this.setState({ challenges });
  }

	saveChallenge = challenge => {
		this.setState({ challenges: [ ...this.state.challenges, challenge ] });
  };
  
  removeChallenge = id => {
    const challenges = this.state.challenges.filter(chal => chal.id !== id);
    this.setState({ challenges });
  }

	handleSubmit = e => {
		const { title, challenges } = this.state;
		fetch('http://localhost:5000/api/quests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, challenges })
		})
			.then(response => response.json())
			.then(quest => this.props.addQuest(quest));
	};

	render() {
		return (
			<div className="dialog-overlay">
				<NavLink exact to="/">
					<i className="fas fa-times close-btn" />
				</NavLink>
				<h2 className="dialog-title">Add a new quest</h2>
				<form className="new-quest-form">
					<div className="form-header">
						<input className="new-title-input" placeholder="Add a title..." onChange={this.saveTitle} />
					</div>
					<div className="form-body">
            <ChallengeContainer type="form" challenges={this.state.challenges} saveChallenge={this.saveChallenge} editChallenge={this.editChallenge} removeChallenge={this.removeChallenge}/>
					</div>
					<NavLink exact to="/">
            <button className="save-quest-btn" type="button" onClick={this.handleSubmit} disabled={!this.state.title}>
							Save
						</button>
					</NavLink>
				</form>
			</div>
		);
	}
}

export const mapDispatchToProps = dispatch => ({
	addQuest: quest => dispatch(addQuest(quest))
});

export default connect(null, mapDispatchToProps)(QuestForm);
