import React, { Component } from 'react';

import { default as GrommetApp } from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Button from 'grommet/components/Button';
import VolumeIcon from 'grommet/components/icons/base/Volume';

import data from './words';
const WORDS = data.words;

// thanks: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// shuffle words
shuffle(WORDS);

// component styles
const appStyle = {
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: '#865CD6',
};

const headlineStyle = {
  cursor: 'pointer',
  color: '#fff',
};

// App component
class App extends Component {
  constructor(props) {
    super(props);
    this.handleHeadlineClick = this.handleHeadlineClick.bind(this);
    this.handleSayWordClick = this.handleSayWordClick.bind(this);
    this.state = {
      position: 0,
    };
  }

  handleHeadlineClick() {
    const determinePosition =
      this.state.position + 1 === WORDS.length ? 0 : this.state.position + 1;
    this.setState({ position: determinePosition });
  }

  handleSayWordClick() {
    const msg = new SpeechSynthesisUtterance(WORDS[this.state.position]);
    window.speechSynthesis.speak(msg);
  }

  render() {
    return (
      <GrommetApp style={appStyle}>
        <Box justify="center" align="center" pad="small" margin="small">
          <Headline
            align="center"
            margin="medium"
            size="xlarge"
            onClick={this.handleHeadlineClick}
            style={headlineStyle}
          >
            {WORDS[this.state.position]}
          </Headline>
          <Button
            icon={<VolumeIcon size="medium" />}
            primary={true}
            onClick={this.handleSayWordClick}
          />
        </Box>
      </GrommetApp>
    );
  }
}

export default App;
