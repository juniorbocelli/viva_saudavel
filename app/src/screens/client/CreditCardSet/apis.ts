import { UseFormReturn } from 'react-hook-form';
import { AxiosError } from 'axios';

import { IUseStates } from './states';
import { CreditCardFormData } from './types';
import { CreditCard } from '../../../globals/interfaces/creditCard';

import {
  getCreditCardsAPI,
  getCreditCardAPI,
  newCreditCardAPI,
  updateCreditCardAPI,
} from '../../../services/creditCard';

export interface IUseAPIs {
  getCreditCards: (clientId: string) => void;
  getCreditCard: (clientId: string, id: string) => void;
  newCreditCard: (clientid: string, creditCard: CreditCard) => void;
  updateCreditCard: (clientId: string, credictCard: CreditCard) => void;
};

export default function useAPIs(states: IUseStates, methods: UseFormReturn<CreditCardFormData>): IUseAPIs {
  const getCreditCards = (clientId: string) => {
    states.setIsQueryingAPI(true);

    getCreditCardsAPI(clientId)
      .then((response) => {
        console.log('response => getCreditCardsAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const creditCards = response.data.creditCards;

        states.setCards(creditCards)
      })
      .catch((error: any) => {
        console.error('error => getCreditCardsAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const getCreditCard = (clientId: string, id: string) => {
    states.setIsQueryingAPI(true);

    getCreditCardAPI(id, clientId)
      .then((response) => {
        console.log('response => getCreditCardAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
      })
      .catch((error: AxiosError) => {
        console.error('error => getCreditCardAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const newCreditCard = (clientId: string, creditCard: CreditCard) => {
    states.setIsQueryingAPI(true);

    newCreditCardAPI(clientId, creditCard)
      .then((response) => {
        console.log('response => newCreditCardAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const creditCard: CreditCard = response.data.creditCard;

        // Success message
        states.setDialogMessage({ title: "Sucesso", message: `Seu cartão de número final ${creditCard.number[3]} foi cadastrado com sucesso!` })

        // Reset form
        methods.reset();

        // Append new card
        states.setCards(cards => [...cards, creditCard]);
      })
      .catch((error: AxiosError) => {
        console.error('error => newCreditCardAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const updateCreditCard = (clientId: string, credictCard: CreditCard) => {
    states.setIsQueryingAPI(true);

    updateCreditCardAPI(clientId, credictCard)
      .then((response) => {
        console.log('response => updateCreditCardAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
      })
      .catch((error: AxiosError) => {
        console.error('error => updateCreditCardAPI', error);
        states.setDialogMessage({ title: "Erro", message: error.message });
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  return {
    getCreditCards,
    getCreditCard,
    newCreditCard,
    updateCreditCard,
  };
};