import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuest } from '../../actions';

//will build body out into multiple challenge entries

class QuestForm extends Component {
	state = {
		title: '',
		challenges: ''
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		fetch('http://localhost:5000/api/quests', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		})
			.then(response => response.json())
      .then(quest => this.props.addQuest(quest));
    
    this.props.closeForm();
	};

	render() {
		return (
			<div className="QuestForm">
				<i className="fas fa-times close-btn" onClick={this.props.closeForm} />
				<h2 className="dialog-title">Add a new quest</h2>
				<form className="new-quest-form">
					<label className="new-quest-label" htmlFor="new-quest-title">
						Title:
					</label>
					<input className="new-quest-input" id="new-quest-title" name="title" onChange={this.handleChange} />
					<label className="new-quest-label" htmlFor="new-quest-challenges">
						Challenges:
					</label>
					<input className="new-quest-input" id="new-quest-challenges" name="challenges" onChange={this.handleChange} />
					<button className="save-quest-btn" type="button" onClick={this.handleSubmit}>
						Save
					</button>
				</form>
			</div>
		);
	}
}

export const mapDispatchToProps = dispatch => ({
	addQuest: quest => dispatch(addQuest(quest))
});

export default connect(null, mapDispatchToProps)(QuestForm);
