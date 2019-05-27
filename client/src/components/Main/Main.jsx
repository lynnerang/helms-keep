import React, { Component } from 'react';
import QuestContainer from '../QuestContainer/QuestContainer';
import { NavLink } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';
import { connect } from 'react-redux';
import { searchQuests } from '../../helper';
import { addQuest } from '../../actions';


export class Main extends Component {
  state = {
    query: '',
    results: null,
  }

  handleChange = e => {
    let query = e.target.value;
    if (!query) { 
      this.setState({ results: null })  
    }
    this.setState({ query });
  }

  clearResults = () => {
    this.setState({ results: null });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const results = searchQuests(this.state.query, this.props.quests);
    this.setState({ results });
  }
  
  render() {
    const { quests } = this.props;
    const { results } = this.state;
    const popup = this.props.popup.bool ? <Dialog /> : null;
    const viewAll = results && results.length !== quests.length ? (
      <p
        className="page-title view-all"
        role="button"
        onClick={this.clearResults}
      >
        View All Quests
      </p>
    ) : null;

    return (
      <main className="Main">
        {popup}
        <div className="main-header">
          <h1 className="page-title">My Quests</h1>
          <div className="controls">
            {viewAll}
            <form className="search-bar" onSubmit={this.handleSubmit}>
              <input
                className="search-input"
                placeholder="Search your quests..."
                onChange={this.handleChange}
              />
              <button type='submit' className="search-btn-container">
                <i className="fas fa-search" role="button" />
              </button>
            </form>
            <select className="quest-filter" />
          </div>
        </div>
        <QuestContainer results={this.state.results} />
        <NavLink to="/new-note" className="add-quest-btn" type="button">
          <i className="fas fa-plus" />
        </NavLink>
      </main>
    );
  }
}

export const mapStateToProps = state => ({
  popup: state.popup,
  quests: state.quests
})

export const mapDispatchToProps = dispatch => ({
  addQuest: quest => dispatch(addQuest(quest))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
