import React from 'react';

import '../styles/components/start.scss';

class Start extends React.Component {
  constructor() {
    super();
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer() {

  }
  render() {
    return (
      <div className='start'>
        <h1 className='start__title'>Play Your Cards Right</h1>
        <h3>How to play</h3>
        <ol className='start__instructions'>
          <li>You get dealt 3 cards</li>
          <li>You’ll be shown your top card</li>
          <li>Choose if you think it’s higher, lower or the same as the computer’s card (which you can’t see)</li>
          <li>See if you guessed right... did you win?</li>
          <li>You can check the computer's card by scrolling down</li>
          <li>If you win you get both cards and they go to the bottom of your cards</li>
          <li>If you lose the computer gets both cards</li>
          <li>You win the game when you have all the cards</li>
        </ol>

        {
          this.props.ready &&
          <button className='btn btn__start' onClick={e => this.props.startGame(this.props.allCards, this.props.numCards)}>Start</button>
        }
      </div >

    );
  }
}

export default Start;