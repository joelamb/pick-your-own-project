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
          <li>It’s You vs Computer.</li>
          <li>You both get dealt 3 cards.</li>
          <li>Look at your card.</li>
          <li>What will the computer’s card be?</li>
          <li>
            Higher <i class="far fa-hand-point-up" />, Lower{' '}
            <i class="far fa-hand-point-down" />, Same{' '}
            <i class="far fa-hand-rock" />
          </li>

          <li>If you win, you get both cards</li>
          <li>If you lose, the computer gets both cards</li>
          <li>The winner is the one who gets all the cards</li>
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
