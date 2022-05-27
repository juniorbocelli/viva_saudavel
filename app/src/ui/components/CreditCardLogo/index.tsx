import React from 'react';

import mastercardIcon from '../../../assets/images/payment-methods/mastercard.svg';
import visaIcon from '../../../assets/images/payment-methods/visa.svg';
import eloIcon from '../../../assets/images/payment-methods/elo.svg';
import americanExpressIcon from '../../../assets/images/payment-methods/american-express.svg';

import hipercardIcon from '../../../assets/images/payment-methods/hipercard.svg';
import jcbIcon from '../../../assets/images/payment-methods/jcb.svg';
import discoverIcon from '../../../assets/images/payment-methods/discover.svg';
import dinersIcon from '../../../assets/images/payment-methods/diners.svg';

interface ICreditCardLogoProps {
  brand: string;
  style?: React.CSSProperties;
};

const CreditCardLogo: React.FC<ICreditCardLogoProps> = ({ brand, style }) => {
  const getLogo = (brand: string) => {
    switch (brand) {
      case 'visa':
        return visaIcon;

      case 'mastercard':
        return mastercardIcon;

      case 'elo':
        return eloIcon;

      case 'hipercard':
        return hipercardIcon;

      case 'discover':
        return discoverIcon;

      case 'amex':
        return americanExpressIcon;

      case 'jcb':
        return jcbIcon;

      case 'dinersclub':
        return dinersIcon;

      default:
        return undefined;
    };
  };
  return <img src={getLogo(brand)} style={style} alt={`Logo de ${brand}`} />
};

export default CreditCardLogo;