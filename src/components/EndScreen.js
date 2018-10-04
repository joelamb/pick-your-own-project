import React from 'react';

const EndScreen = ({ winner, startGame, allCards, numCards, hiScore }) => {

    return (
        <React.Fragment>
            {winner === 'player' &&
                <React.Fragment>
                    <h2>Winner you are!</h2>
                    <h3>The Force is strong in you.</h3>
                    <p>Your Star Trump Score is {hiScore}</p>
                    <button className='btn btn__again' onClick={e => startGame(allCards, numCards)}>Play Again</button>
                </React.Fragment>
            }
            {
                winner === 'computer' &&
                <React.Fragment>
                    <h2>Lost you have, young Jedi!</h2>
                    <h3>Trust in the Force you must.</h3>
                    <button
                        className='btn btn__again'
                        onClick={e => startGame(allCards, numCards)}> Play Again
                        </button>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default EndScreen;