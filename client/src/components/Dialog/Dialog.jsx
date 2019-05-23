import React, { Component } from 'react';
import { showPopup } from '../../actions';
import { connect } from 'react-redux';
// import { mapStateToProps } from '../Main/Main';
// import { mapDispatchToProps } from '../QuestForm/QuestForm';


export class Dialog extends Component {
  constructor(props) {
    super(props);

  }

  handleClick = e => {
    if (!e.target.classList.contains('delete-quest-btn')) {
      this.props.showPopup(false);
    }
  }

  render() {
    return (
      <div className="dialog-overlay">
        <div className="popup">
          <p>Are you sure you want to delete this card?</p>
          <button className="dialog-btn" type="button" onClick={this.handleClick}>
            Cancel
          </button>
          {/* can add delete method to button below */}
          <button className="dialog-btn delete-quest-btn" type="button" onClick={this.handleClick}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  showPopup: bool => dispatch(showPopup(bool))
})

export default connect(null, mapDispatchToProps)(Dialog);