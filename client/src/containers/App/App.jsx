import React, { Component } from 'react';
import { Header } from '../../components/Header/Header';
import Main from '../../containers/Main/Main';
import QuestForm from '../../containers/QuestForm/QuestForm';
import { connect } from 'react-redux';
import { storeQuests } from '../../actions';
import { fetchAllQuests } from '../../api/fetch/fetchAllQuests';
import { Route } from 'react-router-dom';

export class App extends Component {

  componentDidMount() {
		!this.props.quests.length && fetchAllQuests().then(quests => this.props.storeQuests(quests));
	}

	render() {
		return (
			<div className="App">
				<div className="background">
					<Header />
					<Main />
					<Route path="/" component={Main} />
					<Route exact path="/new-quest" component={() => <QuestForm viewType="new" />} />
					<Route
						exact
						path="/quests/:id"
						component={({ match }) => <QuestForm viewType="edit" id={match.params.id} key={match.params.id} />}
					/>
				</div>
			</div>
		);
	}
}

export const mapStateToProps = state => ({
	quests: state.quests
});

export const mapDispatchToProps = dispatch => ({
	storeQuests: quests => dispatch(storeQuests(quests))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
