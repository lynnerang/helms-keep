import React, { Component } from 'react';
import QuestContainer from '../QuestContainer/QuestContainer';
import QuestForm from '../QuestForm/QuestForm';
import { NavLink } from 'react-router-dom';

export class Main extends Component {
	state = {
		showForm: false
	};

	render() {
		const form = this.state.showForm ? <QuestForm closeForm={this.closeForm} /> : null;

		return (
			<main className="Main">
				{form}
				<div className="main-header">
					<h1 className="page-title">My Quests</h1>
					<div className="controls">
						<div className="search-bar">
							<input className="search-input" placeholder="Search your quests..." />
							<i className="fas fa-search" />
						</div>
						<select className="quest-filter" />
					</div>
				</div>
				<QuestContainer />
				<NavLink to="/new-note" className="add-quest-btn" type="button">
					<i className="fas fa-plus" />
				</NavLink>
			</main>
		);
	}
}

export default Main;
