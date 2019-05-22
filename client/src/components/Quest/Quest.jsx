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
    const { title, challenges } = this.props.data;
		const completedTaskItems = [];
    const uncompletedTaskItems = [];
    
    challenges.forEach(({ id, message, isCompleted }) => {
      let card = (
        <li className="challenge-txt" key={id} contentEditable="true">
          {message}
        </li>);
      isCompleted
        ? completedTaskItems.push(card)
        : uncompletedTaskItems.push(card);
    })

    // const challengeList = challenges.map((chal, i) => {
    //   return <li className="challenge-txt" key={i} contentEditable="true">{chal}</li>
    // })

		return (
      <article className="Quest">
        <div className="card-header">
          <h2 className="card-title" contentEditable="true">{title}</h2>
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
