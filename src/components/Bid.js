import React from 'react';
import Button from './Button';

const Bid = ({ value, handleBidClick }) => {
  return (
    <div className="card__options">
      <Button
        className="btn btn__higher"
        onClick={() => {
          handleBidClick(value, 'higher');
        }}
        label={<i className="far fa-hand-point-up" />}
      />
      <Button
        className="btn btn__lower"
        onClick={() => {
          handleBidClick(value, 'lower');
        }}
        label={<i className="far fa-hand-point-down" />}
      />
      <Button
        className="btn btn__same"
        onClick={() => {
          handleBidClick(value, 'same');
        }}
        label={<i className="far fa-hand-rock" />}
      />
    </div>
  );
};

export default Bid;
