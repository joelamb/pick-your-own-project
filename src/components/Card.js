import React from 'react';
import Property from './Property';
import cx from 'classnames';

import '../styles/components/card.scss';

const Card = ({ img, value, handleBidClick }) => {
  // add conditional style to put computer's card at back

  const cardClass = cx('card', {
    card__computer: !handleBidClick
  });

  return (
    <div className={cardClass}>
      {/* <h2 className="card__title">{title}</h2> */}
      <img className="card__image" src={img} alt="" />

      {handleBidClick && (
        <div className="card__options">
          <button
            className="btn btn__higher"
            onClick={() => handleBidClick(value, 'higher')}
          >
            <i class="far fa-hand-point-up" />
          </button>
          <button
            className="btn btn__lower"
            onClick={() => handleBidClick(value, 'lower')}
          >
            <i class="far fa-hand-point-down" />
          </button>
          <button
            className="btn btn__same"
            onClick={() => handleBidClick(value, 'same')}
          >
            <i class="far fa-hand-rock" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
