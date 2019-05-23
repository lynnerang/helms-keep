import React, { Component } from 'react';
import { fetchEditNote } from '../../api/fetch/fetchEditNote';
import { connect } from "react-redux";
import { editQuest, showPopup } from '../../actions';

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

  // handleDelete = () => {
  //   const { id } = this.props.data;
  //   fetchDeleteNote(id);
  //   this.props.deleteQuest(id);
  // }
  
  handleQuestDelete = () => {
    this.props.showPopup(true);
  }

  // handleChallengeDelete = e => {
  //   const 
  // }

  handleUpdate = (e) => {
    const localNote = {...this.props.data};
    const targetChallenge = localNote.challenges.find(chal => chal.id === e.target.id);
    if (e.target.classList[1] === "fa-square") {
      targetChallenge.isCompleted = true;
    } else if (e.target.className === "card-title" && e.key === "Enter") {
      e.preventDefault();
      localNote.title = e.target.innerText;
      e.target.blur();
    } else if (e.target.classList[1] === "fa-check-square") {
      targetChallenge.isCompleted = false;
    } else if (e.key === "Enter") {
      e.preventDefault();
      targetChallenge.message = e.target.innerText;
      e.target.blur();
    } else if (e.target.className === "message" && e.type === "blur") {
      targetChallenge.message = e.target.innerText;
    } else if (e.target.className === "card-title" && e.type === "blur") {
      localNote.title = e.target.innerText;
    }
    this.props.updateQuest(localNote);
    fetchEditNote(localNote);
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
            onClick={this.handleUpdate}
          />
          <span
            contentEditable="true"
            id={id}
            className='message'
            suppressContentEditableWarning={true}
            onKeyDown={this.handleUpdate}
            onBlur={this.handleUpdate}
          >
            {message}
          </span>
          <p role="button" name={id} className="close-icon" onClick={this.handleChallengeDelete}>x</p>
        </li>
      );
      isCompleted
        ? completedTaskItems.push(card)
        : uncompletedTaskItems.push(card);
    })

    const verb = !this.state.showCompleted ? '+ Show' : '- Hide';
    const divider = this.state.showCompleted && completedTaskItems.length ? <h4 className="divider">Completed</h4> : null;
    const link = completedTaskItems.length ?
      <p role="button" className="show-completed" onClick={this.toggleShowCompleted}>{verb} {completedTaskItems.length} completed</p>
      : null;

		return (
      <article className="Quest">
        <div className="card-header">
          <h2
            className="card-title"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onKeyDown={this.handleUpdate}
            onBlur={this.handleUpdate}
          >
            {title}
          </h2>
        </div>
        <div className="card-body">
          <ul className="uncompleted-ul">{uncompletedTaskItems}</ul>
          {divider}
          <ul className="complete-ul">{this.state.showCompleted && completedTaskItems}</ul>
        </div>
        <div className="card-footer">
          <div>{link}</div>
          <button className="delete-btn" type="button">
            <i className="fas fa-trash" onClick={this.handleQuestDelete}/>
          </button>
        </div>
      </article>
    );
	}
}

export const mapDispatchToProps = dispatch => ({
  updateQuest: quest => dispatch(editQuest(quest)),
  showPopup: bool => dispatch(showPopup(bool))
})

export default connect(null, mapDispatchToProps)(Quest);
