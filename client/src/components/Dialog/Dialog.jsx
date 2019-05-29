import React, { Component } from 'react';
import { showPopup, deleteQuest } from '../../actions';
import { connect } from 'react-redux';
import { fetchDeleteNote } from '../../api/fetch/fetchDeleteNote';
import PropTypes from 'prop-types';

export class Dialog extends Component {

  handleClick = e => {
    const { id } = this.props.popup;
    this.props.showPopup(false);
    if (e.target.classList.contains('delete-quest-btn')) {
      fetchDeleteNote(id);
      this.props.deleteQuest(id);
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

export const mapStateToProps = state => ({
  popup: state.popup
})

export const mapDispatchToProps = dispatch => ({
  showPopup: bool => dispatch(showPopup(bool)),
  deleteQuest: id => dispatch(deleteQuest(id))
})

Dialog.propTypes = {
  deleteQuest: PropTypes.func,
  popup: PropTypes.object,
  showPopup: PropTypes.func
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);