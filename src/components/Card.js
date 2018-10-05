import React from 'react';
import Property from './Property';

import '../styles/components/card.scss';

const Card = ({ img, value, handleBidClick }) => {
  return (
    <div className="card">
      {/* <h2 className="card__title">{title}</h2> */}
      <img className="card__image" src={img} alt="" />
      <div className="card__options">
        <button className="btn btn__higher" onClick={() => handleBidClick(value, 'higher')}>higher</button>
        <button className="btn btn__lower" onClick={() => handleBidClick(value, 'lower')}>lower</button>
        <button className="btn btn__same" onClick={() => handleBidClick(value, 'same')}>same</button>
      </div>
    </div >
  )
}

export default Card;