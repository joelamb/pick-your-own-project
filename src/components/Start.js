import React from 'react';

import '../styles/components/start.scss';

class Start extends React.Component {
  constructor() {
    super();
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer() {}
  render() {
    return (
      <div className="start">
        <h1 className="start__title">Play Your Cards Right</h1>
        <div className="start__images">
          {this.props.allCards.map((card, i) => {
            return (
              i <= 4 && <img key={i} src={card.img} className="start__image" />
            );
          })}
        </div>
        <h3>How to play</h3>
        <ol className="start__instructions">
          <li>You get dealt 3 cards</li>
          <li>You’ll be shown your top card</li>
          <li>
            Do you think your card’s higher, lower or the same as the
            computer’s?
          </li>
          <li>Were you right?</li>
          <li>Scroll down to see the computer's card</li>
          <li>If you win, you get both cards</li>
          <li>If you lose, the computer gets both cards</li>
          <li>The game ends when you or the computer has all the cards</li>
        </ol>

        {this.props.ready && (
          <button
            className="btn btn__start"
            onClick={e =>
              this.props.startGame(this.props.allCards, this.props.numCards)
            }
          >
            Start
          </button>
        )}
      </div>
    );
  }
}

export default Start;
