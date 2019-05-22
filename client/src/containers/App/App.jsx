import React, { Component } from 'react';
import { Header } from '../../components/header/Header';
import Main from '../../components/main/Main';
import { connect } from 'react-redux';
import { storeQuests } from '../../actions';

export class App extends Component {
  componentDidMount() {
    !this.props.quests.length && 
    fetch('http://localhost:5000/api/quests')
      .then(response => response.json())
      .then(quests => this.props.storeQuests(quests))
  }

  render() {    
		return (
      <div className="App">
        <div className="background">
          <Header/>
          <Main />
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
