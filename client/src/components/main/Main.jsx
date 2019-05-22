import React, { Component } from './node_modules/react';
import QuestContainer from '../questContainer/QuestContainer';
import QuestForm from '../QuestForm/QuestForm';

export class Main extends Component {
  state = {
    showForm: false
  }
  
  closeForm = () => {
    this.setState({ showForm: false })
  }

  render() {
    const form = this.state.showForm ? <QuestForm closeForm={this.closeForm} /> : null;

    return (
      <main className="Main">
        {form}
        <div className="main-header">
          <h1 className="page-title">My Quests</h1>
          <div className="controls">
            <div className="search-bar">
              <input className="search-input" placeholder="Search your quests..."/>
              <i className="fas fa-search" />
            </div>
            <select className="quest-filter"></select>
          </div>
        </div>
        <QuestContainer />
        <button className="add-quest-btn" type="button"><i className="fas fa-plus" onClick={() => this.setState({showForm: true})}></i></button>
      </main>
    )
  }
}

export default Main
