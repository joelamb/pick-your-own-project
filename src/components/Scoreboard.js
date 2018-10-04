import React from 'react';
import '../styles/components/scoreboard.scss';

const Scoreboard = ({ playerScore, computerScore, round }) => {
    return (
        <div className="scoreboard">
            <p className="scoreboard__player">You <span>{playerScore}</span></p>
            <p className="scoreboard__computer">Computer <span>{computerScore}</span></p>
            <p className="scoreboard__round">Round <span>{round}</span></p>
        </div>

    )
}

export default Scoreboard;