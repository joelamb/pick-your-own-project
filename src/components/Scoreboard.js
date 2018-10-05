import React from 'react';
import '../styles/components/scoreboard.scss';

const Scoreboard = ({ playerCards, computerCards, round }) => {
  return (
    <div className="scoreboard">
      <p className="scoreboard__player">You <span>{playerCards}</span></p>
      <p className="scoreboard__computer">Computer <span>{computerCards}</span></p>
      <p className="scoreboard__round">Round <span>{round}</span></p>
    </div>

  )
}

export default Scoreboard;