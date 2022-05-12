import React from 'react';

import Cards from 'react-credit-cards';
import "react-credit-cards/es/styles-compiled.css";

const CreditCard = ({ number, name, expiry, cvc, focus }) => {
  return (
    <Cards
      number={number}
      name={name}
      expiry={expiry}
      cvc={cvc}
      focused={focus}
    />
  );
};

export default CreditCard;