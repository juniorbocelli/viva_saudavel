import React from 'react';

import { IUseStates } from '../../states';
import { CreditCard } from '../../../../../globals/interfaces/creditCard';
import './styles.css';
import MaskApply from '../../../../../features/utils/MaskApply';

import mastercardIcon from '../../../../../assets/images/payment-methods/mastercard.svg';
import visaIcon from '../../../../../assets/images/payment-methods/visa.svg';
import eloIcon from '../../../../../assets/images/payment-methods/elo.svg';
import americanExpressIcon from '../../../../../assets/images/payment-methods/american-express.svg';

import hipercardIcon from '../../../../../assets/images/payment-methods/hipercard.svg';
import jcbIcon from '../../../../../assets/images/payment-methods/jcb.svg';
import discoverIcon from '../../../../../assets/images/payment-methods/discover.svg';
import dinersIcon from '../../../../../assets/images/payment-methods/diners.svg';

interface ICardProps {
  card: CreditCard;

  selectedCard: IUseStates['selectedCard'];
  setSelectedCard: IUseStates['setSelectedCard'];

  setPayload: React.Dispatch<React.SetStateAction<{ cardNumber: string, cardId: string, action: 'activate' | 'remove' } | null>>;
};

const CardItemList: React.FC<ICardProps> = ({ card, selectedCard, setSelectedCard, setPayload }) => {
  const getCardStyle = (): React.CSSProperties => {
    if (card.isActive)
      return { background: '#3B3' };

    if (card.id === selectedCard)
      return {};

    return { background: '#555' };
  };

  const getIcon = () => {
    switch (card.brand) {
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

  return (
    <div className="container">
      <div className="sleeve">
        <div className={`credit-card ${card.id === selectedCard || (card.isActive && selectedCard === undefined) ? 'selected' : ''}`} style={getCardStyle()}>
          <div className={`card-company ${card.isActive && card.id !== selectedCard ? 'active' : card.id !== selectedCard ? 'inactive' : ''}`}>
            {
              card.isActive && card.id !== selectedCard ?
                "CARTÃO ATIVO"
                :
                card.id === selectedCard ?
                  "EDITANDO CARTÃO"
                  :
                  "CARTÃO INATIVO"
            }
          </div>
          <div className="card-number">
            <div className="digit-group">**** **** **** {card.number[card.number.length - 1]}</div>
          </div>
          <div className="card-expire">
            <span className="card-text">CVV</span> ***
            <span className="card-text">Expires</span> {MaskApply.printMonthYearFromTimestamp(card.expiry)}
          </div>
          <div className="card-holder">{card.name}</div>

          <div className="card-type">
            <img src={getIcon()} width='60px' alt='' />
          </div>

          <div className='card-buttons'>
            {
              !card.isActive &&
              <button style={{ marginRight: '3px' }} onClick={() => setPayload({ cardId: card.id!, cardNumber: card.number[card.number.length - 1], action: 'activate' })}>
                Ativar
              </button>
            }

            {
              card.id !== selectedCard ?
                <button style={{ marginRight: '3px' }} onClick={() => setSelectedCard(card.id)}>
                  Editar
                </button>
                :
                <button style={{ marginRight: '3px' }} onClick={() => setSelectedCard(undefined)}>
                  Cancelar
                </button>
            }
            <button onClick={() => setPayload({ cardId: card.id!, cardNumber: card.number[card.number.length - 1], action: 'remove' })}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItemList;