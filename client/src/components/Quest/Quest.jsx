import React, { Component } from 'react';
import { fetchEditNote } from '../../api/fetch/fetchEditNote';
import { connect } from "react-redux";
import { editQuest } from '../../actions';


export class Quest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCompleted: false
		};
	}

	toggleShowCompleted = () => {
		this.setState({ showCompleted: !this.state.showCompleted });
  };
  
  markComplete = (e) => {
    const localNote = { ...this.props.data};
    const targetChallenge = localNote.challenges.find(chal => chal.id === +e.target.id);
    targetChallenge.isCompleted = true;
    this.props.updateQuest(localNote);
    fetchEditNote(localNote);
  }

  editChallenge= (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const localNote = { ...this.props.data};
      const targetChallenge = localNote.challenges.find(chal => chal.id === +e.target.id);
      targetChallenge.message = e.target.innerText;
      this.props.updateQuest(localNote);
      e.target.blur();
      fetchEditNote(localNote);
    }
  }

  render() {
    const { title, challenges } = this.props.data;
		const completedTaskItems = [];
    const uncompletedTaskItems = [];
    
    challenges.forEach(({ id, message, isCompleted }) => {
      let boxClass = isCompleted ? "fa-check-square" : "fa-square";
      let card = (
        <li className="challenge-txt" key={id}>
          <i
            className={`far ${boxClass}`}
            id={id}
            onClick={this.markComplete}
          />
          <span
            contentEditable="true"
            id={id}
            suppressContentEditableWarning={true}
            onKeyDown={this.editChallenge}
          >
            {message}
          </span>
        </li>
      );
      isCompleted
        ? completedTaskItems.push(card)
        : uncompletedTaskItems.push(card);
    })

		return (
      <article className="Quest">
        <div className="card-header">
          <h2 className="card-title" contentEditable="true" suppressContentEditableWarning={true}>{title}</h2>
        </div>
        <div className="card-body">
          <ul>{uncompletedTaskItems}</ul>
          <p className="showCompleted" onClick={this.toggleShowCompleted}>
            Show {completedTaskItems.length} completed challenges
          </p>
          <ul>{this.state.showCompleted && completedTaskItems}</ul>
          <button className="delete-btn" type="button">
            <i className="fas fa-trash"></i>
          </button>
        </div>
			</article>
		);
	}
}

const mapDispatchToProps = dispatch => ({
  updateQuest: quest => dispatch(editQuest(quest))
})

export default connect(null, mapDispatchToProps)(Quest);
