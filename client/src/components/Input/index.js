import React from 'react';

const Input = (props) => {
  return (
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
