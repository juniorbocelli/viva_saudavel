import React from 'react';

import Cards from 'react-credit-cards';
import "react-credit-cards/es/styles-compiled.css";

const Card = ({ number, name, expiry, cvc, focus, callback }) => {
  return (
    <Cards
      number={number}
      name={name}
      expiry={expiry}
      cvc={cvc}
      focused={focus}
      callback={callback}
    />
  );
};

export default Card;