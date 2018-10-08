import React from 'react';

const Bid = ({ value, handleBidClick }) => {
  return (
    <div className="card__options">
      <button
        className="btn btn__higher"
        onClick={() => {
          handleBidClick(value, 'higher');
        }}
      >
        <i className="far fa-hand-point-up" />
      </button>
      <button
        className="btn btn__lower"
        onClick={() => {
          handleBidClick(value, 'lower');
        }}
      >
        <i className="far fa-hand-point-down" />
      </button>
      <button
        className="btn btn__same"
        onClick={() => {
          handleBidClick(value, 'same');
        }}
      >
        <i className="far fa-hand-rock" />
      </button>
    </div>
  );
};

export default Bid;
