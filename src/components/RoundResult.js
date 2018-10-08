import React from 'react';
import Button from './Button';

const RoundResult = ({ result, roundAdvance }) => {
  return (
    <div className="round-result">
      <h3>You {result}</h3>
      <Button
        className="btn btn__advance"
        label="Next Round"
        onClick={() => {
          roundAdvance(result);
        }}
      />
    </div>
  );
};

export default RoundResult;
