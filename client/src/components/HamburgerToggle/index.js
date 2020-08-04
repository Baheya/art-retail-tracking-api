import React from 'react';

const HamburgerToggle = (props) => {
  return (
    <>
      {props.isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-x"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="#7c7c7c"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-align-justified"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="#7c7c7c"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      )}
    </>
  );
};

export default HamburgerToggle;
