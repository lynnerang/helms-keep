import React, { Component } from 'react';
import { Header } from '../../components/Header/Header';
import Main from '../../containers/Main/Main';
import { connect } from 'react-redux';
import { storeQuests } from '../../actions';
import { fetchAllNotes } from '../../api/fetch/fetchAllNotes';
import QuestForm from '../../containers/QuestForm/QuestForm';
import { Route } from 'react-router-dom';

export class App extends Component {
  componentDidMount() {
    !this.props.quests.length && 
    fetchAllNotes()
      .then(quests => this.props.storeQuests(quests))
  }

  render() {    
		return (
      <div className="App">
        <div className="background">
          <Header/>
          <Main />
          <Route path='/' component={Main} />
          <Route exact path='/new-note' component={QuestForm} />
        </div>
			</div>
		);
	}
}

export const mapStateToProps = state => ({
  quests: state.quests
})

export const mapDispatchToProps = dispatch => ({
  storeQuests: quests => dispatch(storeQuests(quests))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
