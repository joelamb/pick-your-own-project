import React from 'react';
import '../styles/components/endscreen.scss';

const EndScreen = ({ winner, startGame, allCards, numCards, hiScore }) => {
  return (
    <React.Fragment>
      {winner === 'player' && (
        <div className="result">
          <h2 className="result__title">Congratulations!</h2>
          <h3 className="result__strapline">“Didn’t you do well”</h3>
          <div className="result__bonus">
            <h4>Your Brucie Bonus Score</h4>
            <p>{hiScore}</p>
          </div>
          <button
            className="btn btn__again"
            onClick={e => startGame(allCards, numCards)}
          >
            Play Again
          </button>
        </div>
      )}
      {winner === 'computer' && (
        <div className="result">
          <h2 className="result__title">Bad luck, you’ve lost</h2>
          <h3 className="result__strapline">“Better luck next time.”</h3>
          <button
            className="btn btn__again"
            onClick={e => startGame(allCards, numCards)}
          >
            {' '}
            Play Again
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default EndScreen;
