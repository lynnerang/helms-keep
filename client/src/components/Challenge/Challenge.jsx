import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEditNote } from '../../api/fetch/fetchEditNote';
import { editQuest } from '../../actions';
import PropTypes from 'prop-types';

export class Challenge extends Component {

  handleUpdate = e => {
    const challenge = { ...this.props.data };

    if (this.props.type === 'form') {
      this.updateChallengeForm(e, challenge);
    } else {
      this.updateChallengeData(e, challenge);
    }
  };

  updateChallengeForm = (e, challenge) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      challenge.message = e.target.innerText;
      e.target.blur();
    } else if (e.type === 'blur') {
      challenge.message = e.target.innerText;
    }
    this.props.editChallenge(challenge);
  }
  
  updateChallengeData = (e, challenge) => {
    if (e.target.classList.contains('checkbox')) {
      challenge.isCompleted = !challenge.isCompleted;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      challenge.message = e.target.innerText;
      e.target.blur();
    } else if (e.type === 'blur') {
      challenge.message = e.target.innerText;
    }
    this.props.updateChallenge(challenge);
  }

  handleDelete = () => {
    const { id } = this.props.data;

    if (this.props.type === 'form') {
      this.props.removeChallenge(id);
    } else {
      this.props.deleteChallenge(id);
    }
  }

	render() {
		let boxClass = this.props.data.isCompleted ? 'checkbox fa-check-square' : 'checkbox fa-square';
		let box = this.props.type !== 'form' ? (
				<i className={`far ${boxClass}`} id={this.props.id} onClick={this.handleUpdate} />
			) : null;

		return (
			<li className="challenge-txt" key={this.props.data.id}>
				{box}
				<span
					contentEditable="true"
					id={this.props.id}
					className="message"
					suppressContentEditableWarning={true}
					onKeyDown={this.handleUpdate}
					onBlur={this.handleUpdate}>
					{this.props.data.message}
				</span>
				<p role="button" name={this.props.data.id} className="close-icon" onClick={this.handleDelete}>
					x
				</p>
			</li>
		);
	}
}

export const mapStateToProps = state => ({
	quests: state.quests
});

export const mapDispatchToProps = dispatch => ({
	updateQuest: quest => dispatch(editQuest(quest))
});



Challenge.propTypes = {
  data: PropTypes.object,
  deleteChallenge: PropTypes.func,
  quests: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  updateChallenge: PropTypes.func,
  updateQuest: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
