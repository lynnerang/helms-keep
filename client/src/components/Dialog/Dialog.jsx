import React from 'react';
import { NavLink } from 'react-router-dom';

const Dialog = () => {
  return (
    <div className="dialog-overlay">
      <div className="popup">
        <p>
          Are you sure you want to delete this card?
        </p>
        <NavLink className="dialog-btns" exact to="/">
          <button className="dialog-btn" type="button" >
            Cancel
          </button>
          {/* can add delete method to button below */}
          <button className="dialog-btn delete-quest-btn" type="button" >
            Delete
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Dialog;