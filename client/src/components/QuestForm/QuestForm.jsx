import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuest } from '../../actions';
import { ChallengeContainer } from '../ChallengeContainer/ChallengeContainer';
import { NavLink } from 'react-router-dom';

//will build body out into multiple challenge entries

class QuestForm extends Component {
	state = {
		title: '',
		challenges: []
  };

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addChallenge = challenge => {
		this.setState({ challenges: [ ...this.state.challenges, challenge ] });
	};

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
						<input
							className="new-quest-input"
							id="new-quest-title"
							name="title"
							placeholder="Add a title..."
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-body">
						<ChallengeContainer challenges={this.state.challenges} addChallenge={this.addChallenge} />
					</div>
					<NavLink exact to="/">
						<button className="save-quest-btn" type="button" onClick={this.handleSubmit}>
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
