import React from 'react';

import { IUseStates } from '../../states';
import { CreditCard } from '../../../../../globals/interfaces/creditCard';
import './styles.css';

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
          <div className="card-expire"><span className="card-text">CVV</span> *** <span className="card-text">Expires</span> 12/24</div>
          <div className="card-holder">{card.name}</div>
          <div className="card-type">
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