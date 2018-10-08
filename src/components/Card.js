import React from 'react';
import cx from 'classnames';
import Bid from './Bid';

import '../styles/components/card.scss';

const Card = ({ img, value, children }) => {
  // add conditional style to put computer's card at back

  const cardClass = cx('card', {
    card__computer: !children
  });

  return (
    <div className={cardClass}>
      <img className="card__image" src={img} alt="" />
      {children}
    </div>
  );
};

export default Card;
