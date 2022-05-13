import React from 'react';

import Cards from 'react-credit-cards';
import "react-credit-cards/es/styles-compiled.css";

const Card = ({ number, name, expiry, cvc, focus }) => {
  return (
    <Cards
      number={number}
      name={name}
      expiry={expiry}
      cvc={cvc}
      focused={focus}
      callback={(issuer, maxLength) => console.log(issuer)}
    />
  );
};

export default Card;