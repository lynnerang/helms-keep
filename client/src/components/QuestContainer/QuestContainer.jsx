import React, { Component } from 'react';
import Quest from '../Quest/Quest';
import { connect } from 'react-redux';

export class QuestContainer extends Component {
  render() {
    const questCards = this.props.quests.length && this.props.quests.map(quest => <Quest data={quest} key={quest.id} />);
    
		return <section className="QuestContainer">{questCards}</section>;
	}
}

export const mapStateToProps = state => ({
  quests: state.quests
})

export default connect(mapStateToProps)(QuestContainer);
