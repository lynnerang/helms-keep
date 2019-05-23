import React from 'react';
import QuestContainer from '../QuestContainer/QuestContainer';
import { NavLink } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';

const Main = () => {
  return (
    <main className="Main">
      <Dialog />
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

export default Main;
