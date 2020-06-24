import React from 'react';

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      <p>{props.displayText}</p>
    </button>
  );
};

export default Button;
