import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import cotw from '../enums/enums.jsx';
import Attributes from './components/attributes.jsx';
import GameDifficulty from './components/gameDifficulty.jsx';
import Gender from './components/gender.jsx';

var CharCreation = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState() {
    return {
      name: "Testing",
      difficulty: cotw.DifficultyLevel.Easy,
      attributes:{}
    }
  },
  setDifficulty(level) {
    this.setState({difficulty: level});
  },
  setAttributes(attributes) {
    this.setState({attributes: attributes});
  },
  setGender() {
    console.debug('Calling set gender');
  },
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="ui one column">
          <div className="ui stacked vertical segment">
            <div className="ui vertical segment">
              <div className="ui labeled fluid input">
                <div className="ui label">Character Name:</div>
                <input type="text" name="name" placeholder="What word did your mother utter as you came kicking and screaming into this world?" valueLink={this.linkState('name')}/>
              </div>
            </div>
            <Attributes onSetAttributes={this.setAttributes} />
            <div className="ui horizontal segments">
              <div className="ui segment">Character Gender</div>
              <Gender gender="male" setGender={this.setGender}/>
              <div className="ui segment">Custom Character Icon</div>
            </div>
            <GameDifficulty onSetDifficulty={this.setDifficulty}/>
            <div className="ui button primary">Ok</div>
            <div className="ui button">Cancel</div>
            <div className="ui button">View Icon</div>
            <div className="ui button">Help</div>
          </div>
          <pre>{JSON.stringify(this.state)}</pre>
        </div>
      </div>
    )
  }
});

export default CharCreation