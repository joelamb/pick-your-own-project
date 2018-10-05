import React from 'react';
import '../styles/components/endscreen.scss';

const EndScreen = ({ winner, startGame, allCards, numCards, hiScore }) => {

  return (
    <React.Fragment>

      {winner === 'player' &&
        <div className="result">
          <h2 className="result__title">You’ve Won!</h2>
          <h3 className="result__strapline">“Didn’t you do well”</h3>
          <p className="result__score">Your Brucie Bonus Score is {hiScore}</p>
          <button className='btn btn__again' onClick={e => startGame(allCards, numCards)}>Play Again</button>
        </div>
      }
      {
        winner === 'computer' &&
        <div className="result">
          <h2 className="result__title">Bad luck, you’ve lost</h2>
          <h3 className="result__strapline">“Better luck next time.”</h3>
          <button
            className='btn btn__again'
            onClick={e => startGame(allCards, numCards)}> Play Again
                        </button>
        </div>
      }
    </React.Fragment>
  )
}

export default EndScreen;