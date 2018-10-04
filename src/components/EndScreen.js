import React from 'react';
import '../styles/components/endscreen.scss';

const EndScreen = ({ winner, startGame, allCards, numCards, hiScore }) => {

    return (
        <React.Fragment>

            {winner === 'player' &&
                <div className="result">
                    <h2 className="result__title">Winner you are!</h2>
                    <h3 className="result__strapline">The Force is strong in you.</h3>
                    <p className="result__score">Your Star Trump Score is {hiScore}</p>
                    <button className='btn btn__again' onClick={e => startGame(allCards, numCards)}>Play Again</button>
                </div>
            }
            {
                winner === 'computer' &&
                <div>
                    <h2 className="result__title">Lost you have, young Jedi!</h2>
                    <h3 className="result__strapline">Trust in the Force you must.</h3>
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