import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuest, editQuest } from '../../actions';
import { ChallengeContainer } from '../ChallengeContainer/ChallengeContainer';
import { NavLink } from 'react-router-dom';
import { fetchAddQuest } from '../../api/fetch/fetchAddQuest';
import { fetchEditQuest } from '../../api/fetch/fetchEditQuest';

class QuestForm extends Component {
	state = {
		title: '',
    challenges: [],
	};

  componentDidMount() {
		if (this.props.viewType === 'edit' && this.props.quests.length) {
			this.getQuestDetails();
    } 
	}

  getQuestDetails = () => {
    const { id } = this.props;
    const details = this.props.quests.find(quest => quest.id === id);

    this.setState({ title: details.title, challenges: details.challenges });
	};

	saveTitle = e => {
		this.setState({ title: e.target.value });
	};

	editChallenge = challenge => {
		const challenges = [ ...this.state.challenges ];
		const index = challenges.findIndex(chal => chal.id === challenge.id);

		challenges[index] = challenge;
		this.setState({ challenges });
	};

	saveChallenge = challenge => {
		this.setState({ challenges: [ ...this.state.challenges, challenge ] });
	};

	removeChallenge = id => {
		const challenges = this.state.challenges.filter(chal => chal.id !== id);
		this.setState({ challenges });
	};

	handleSubmit = e => {
		const { title, challenges } = this.state;

    if (this.props.viewType === 'new') {
      fetchAddQuest(title, challenges)
        .then(res => this.props.addQuest(res));
		} else {
      fetchEditQuest({ id: this.props.id, title, challenges });
      this.props.editQuest({ id: this.props.id, title, challenges });
		}
  };
  
  getChallenges = () => {
    let challenges =
    <ChallengeContainer
      viewType={this.props.viewType}
      challengeType="incomplete"
      challenges={this.state.challenges}
      saveChallenge={this.saveChallenge}
      editChallenge={this.editChallenge}
      removeChallenge={this.removeChallenge}
    />
    
    if (this.props.viewType === 'edit') {
      const completedChals = this.state.challenges.filter(chal => chal.isCompleted);
      const incompleteChals = this.state.challenges.filter(chal => !chal.isCompleted);
      const completedContainer = completedChals.length
        ? <>
            <h4 className="divider">Completed</h4>
          <ChallengeContainer
              viewType={this.props.viewType}
              challengeType="complete"
              challenges={completedChals}
              saveChallenge={this.saveChallenge}
              editChallenge={this.editChallenge}
              removeChallenge={this.removeChallenge}
            />
          </>
        : null;
        
      challenges = (
        <>
          <ChallengeContainer
            challengeType="incomplete"
            challenges={incompleteChals}
            saveChallenge={this.saveChallenge}
            editChallenge={this.editChallenge}
            removeChallenge={this.removeChallenge}
          />
          {completedContainer}
        </>
      )
    }

    return challenges;
  }

	render() {
    const challenges = this.getChallenges();
    const title = this.props.viewType === 'new' ? 'Add a new quest'
      : 'Edit your quest';

		return (
			<div className="dialog-overlay">
				<NavLink exact to="/">
					<i className="fas fa-times close-btn" />
				</NavLink>
        <h2 className="dialog-title">{title}</h2>
				<div className="new-quest-form">
					<div className="form-header">
						<input
							className="new-title-input"
							value={this.state.title}
							placeholder="Add a title..."
							onChange={this.saveTitle}
						/>
					</div>
					<div className="form-body">
            {challenges}
          </div>
          <div className="form-footer">
					<NavLink exact to="/">
						<button className="save-quest-btn" type="button" onClick={this.handleSubmit} disabled={!this.state.title}>
							Save
						</button>
					</NavLink>
          </div>
				</div>
			</div>
		);
	}
}

export const mapStateToProps = state => ({
	quests: state.quests
});

export const mapDispatchToProps = dispatch => ({
  addQuest: quest => dispatch(addQuest(quest)),
  editQuest: quest => dispatch(editQuest(quest))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestForm);
