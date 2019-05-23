import React, { Component } from 'react';

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

  render() {
    console.log(this.props.data)
    const { title, challenges } = this.props.data;
		const completedTaskItems = [];
    const uncompletedTaskItems = [];
    
    challenges.length && challenges.forEach(({ id, message, isCompleted }) => {
      let card = (
        <li className="challenge-txt" key={id} contentEditable="true" suppressContentEditableWarning={true}>
          {message}
        </li>);
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

export default Quest;
