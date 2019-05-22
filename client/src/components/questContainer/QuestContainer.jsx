import React, { Component } from 'react';
import { mockNote } from '../../api/utilities';
import Quest from '../Quest/Quest';
import { connect } from 'react-redux';

const mockQuestList = [ mockNote, mockNote, mockNote ];

export class QuestContainer extends Component {
  render() {
    console.log(this.props.quests)
    const questCards = this.props.quests.length && this.props.quests.map(quest => <Quest data={quest} key={quest.id} />);
    
		return <section className="QuestContainer">{questCards}</section>;
	}
}

export const mapStateToProps = state => ({
  quests: state.quests
})

export default connect(mapStateToProps)(QuestContainer);