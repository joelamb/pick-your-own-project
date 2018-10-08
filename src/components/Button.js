import React from 'react';

const Button = ({ className, label, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
