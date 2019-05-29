import React, { Component } from 'react';
import ChallengeContainer from '../../components/ChallengeContainer/ChallengeContainer';
import { fetchEditQuest } from '../../api/fetch/fetchEditQuest';
import { connect } from "react-redux";
import { editQuest, showPopup } from '../../actions';
import { NavLink } from 'react-router-dom';


export class Quest extends Component {
	constructor(props) {
		super(props);
		this.state = {
      showCompleted: false,
      showColors: false
		};
	}

	toggleShowCompleted = () => {
		this.setState({ showCompleted: !this.state.showCompleted });
  };

  addChallenge = challenge => {
    const quest = { ...this.props.data };

    quest.challenges.push(challenge);
    this.updateQuest(quest)
  };

  deleteChallenge = id => {
    const quest = { ...this.props.data };

    quest.challenges.splice(quest.challenges.findIndex(chal => chal.id === id), 1);
    this.updateQuest(quest);
  }

  updateChallenge = challenge => {
    const quest = { ...this.props.data };
    const chalIndex = quest.challenges.findIndex(chal => chal.id === challenge.id);

    quest.challenges[chalIndex] = challenge;
    this.updateQuest(quest);
  }
  
  showDeleteWarning = () => {
    const { id } = this.props.data;
    this.props.showPopup(true, id, 'delete');
  }

  updateQuest = quest => {
    this.props.updateQuest(quest);
    fetchEditQuest(quest);
  }

  updateTitle = e => {
    const quest = {...this.props.data};
    
    if (e.key === "Enter" || e.type === 'blur') {
      e.preventDefault();
      quest.title = e.target.innerText;
      this.updateQuest(quest);
      e.target.blur();
    }
  }

  pickColor = color => {
    const quest = { ...this.props.data };

    quest.color = color;
    this.updateQuest(quest);
    this.setState({ showColors: false });
  }

  render() {
    console.log(this.props.data)
    const { title, challenges } = this.props.data;
    const color = this.props.data.color || 'green';
    const completedChallenges = challenges.filter(chal => chal.isCompleted);
    const incompleteChallenges = challenges.filter(chal => !chal.isCompleted);
    const verb = !this.state.showCompleted ? '+ Show' : '- Hide';

    const completed = this.state.showCompleted && completedChallenges.length ?    <>
        <h4 className="divider">Completed</h4>
        <ChallengeContainer
          viewType="list"
          challengeType="complete"
          challenges={completedChallenges}
          addChallenge={this.addChallenge}
          updateChallenge={this.updateChallenge}
          deleteChallenge={this.deleteChallenge}
        />
      </>
      : null;

    const link = completedChallenges.length ?
      <p 
        role="button" 
        className="show-completed" 
        onClick={this.toggleShowCompleted}
      >
        {verb} {completedChallenges.length} completed
      </p>
      : null;
    
    const colorPicker = this.state.showColors ? (
      <div className="color-options">
        <button className="color-picker"><img className="coin" src={require(`../../assets/greencoin.png`)} type="button" onClick={() => this.pickColor('green')}/></button>
        <button className="color-picker"><img className="coin" src={require(`../../assets/yellowcoin.png`)} type="button" onClick={() => this.pickColor('yellow')}/></button>
        <button className="color-picker"><img className="coin" src={require(`../../assets/redcoin.png`)} type="button" onClick={() => this.pickColor('red')}/></button>
        <button className="color-picker"><img className="coin" src={require(`../../assets/bluecoin.png`)} type="button" onClick={() => this.pickColor('blue')}/></button>
        <button className="close-colors" type="button"onClick={() => this.setState({showColors: false})}><i className="fas fa-times"></i></button>
      </div>
    ) : null;
    
		return (
      <article className={`Quest ${color}-quest`}>
        <div className={`card-header ${color}-header`}>
          <button className="color-picker" type="button" onClick={() => this.setState({ showColors: !this.state.showColors })}><img className="coin title-coin" src={require(`../../assets/${color}coin.png`)}/></button>
          {colorPicker}
          <h2
            className="card-title"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onKeyDown={this.updateTitle}
            onBlur={this.updateTitle}
          >
            {title}
          </h2>
          <NavLink to={`/quests/${this.props.data.id}`} key={this.props.data.id} className="expand-btn"><i className="fas fa-expand"></i></NavLink>
        </div>
        <div className="card-body">
          <ChallengeContainer
            viewType="list"
            challengeType="incomplete"
            challenges={incompleteChallenges}
            addChallenge={this.addChallenge}
            updateChallenge={this.updateChallenge}
            deleteChallenge={this.deleteChallenge}
          />
          {completed}
        </div>
        <div className={`card-footer ${color}-footer`}>
          <div>{link}</div>
          <button className="delete-btn" type="button">
            <i className="fas fa-trash" onClick={this.showDeleteWarning}/>
          </button>
        </div>
      </article>
    );
	}
}

export const mapDispatchToProps = dispatch => ({
  updateQuest: quest => dispatch(editQuest(quest)),
  showPopup: (bool, id, type) => dispatch(showPopup(bool, id, type))
})

export default connect(null, mapDispatchToProps)(Quest);
