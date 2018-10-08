import React from 'react';
import '../styles/components/buttons.scss';

const Button = ({ className, label, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
