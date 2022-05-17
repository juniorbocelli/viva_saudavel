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
  activateCreditCardAPI,
} from '../../../services/creditCard';

import SanitizerString from '../../../features/utils/SanitizerString';
import MaskApply from '../../../features/utils/MaskApply';

import * as CardUtils from './cardUtils';

export interface IUseAPIs {
  getCreditCards: (clientId: string) => void;
  getCreditCard: (clientId: string, id: string) => void;
  newCreditCard: (clientid: string, creditCard: CreditCard) => void;
  updateCreditCard: (clientId: string, credictCard: CreditCard) => void;
  activateCreditCard: (clientId: string, id: string) => void;
};

export default function useAPIs(states: IUseStates, methods: UseFormReturn<CreditCardFormData>): IUseAPIs {
  const cardsComparasion = (a: CreditCard, b: CreditCard): number => {
    if (a.isActive && !b.isActive)
      return 1;

    if (!a.isActive && b.isActive)
      return -1;

    if (typeof (a.createdAt) !== 'undefined' && typeof (b.createdAt) !== 'undefined')
      if (a.createdAt > b.createdAt)
        return 1;
      else if (a.createdAt < b.createdAt)
        return -1

    return 0;
  };

  const sortCards = (c: Array<CreditCard>): Array<CreditCard> => {
    let cards = c.slice();
    cards.sort(cardsComparasion);

    return cards.reverse();
  };

  const fetchNewCardList = (receivedCards: Array<CreditCard>) => {
    let cards: Array<CreditCard> = [];

    receivedCards.forEach(card => {
      card.expiry = new Date(card.expiry);

      cards.push(card);
    });

    states.setCards(sortCards(cards));
  };

  const resetForm = () => {
    // Reset form
    methods.reset();

    // Reset states from card model
    states.setCardValues({
      number: '',
      name: '',
      expiry: '',
      cvc: '',

      issuer: 'unknown',
      isValid: false,

      focused: null,
    });
  };

  const getCreditCards = (clientId: string) => {
    states.setIsQueryingAPI(true);

    getCreditCardsAPI(clientId)
      .then((response) => {
        console.log('response => getCreditCardsAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };

        const creditCards: Array<CreditCard> = response.data.creditCards;

        // Populate cards list
        fetchNewCardList(creditCards);
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

        const creditCard: CreditCard = response.data.creditCard;
        creditCard.expiry = new Date(creditCard.expiry);

        // Set values form
        methods.setValue('number', CardUtils.formatCreditCardNumber(SanitizerString.onlyNumbers(creditCard.number.join())));
        methods.setValue('name', SanitizerString.stringOrEmpty(creditCard.name));
        methods.setValue('expiry', MaskApply.printMonthYearFromTimestamp(creditCard.expiry));
        methods.setValue('cvc', SanitizerString.onlyNumbers(creditCard.cvc));

        // Set state for card model
        states.setCardValues({
          ...states.cardValues,
          number: SanitizerString.onlyNumbers(creditCard.number.join()),
          name: SanitizerString.stringOrEmpty(creditCard.name),
          expiry: MaskApply.printMonthYearFromTimestamp(creditCard.expiry),
          cvc: SanitizerString.onlyNumbers(creditCard.cvc),

          issuer: creditCard.brand,
        });
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
        states.setDialogMessage({ title: "Sucesso", message: `Seu cartão de número final ${creditCard.number[3]} foi cadastrado com sucesso!` });

        // Append new card
        let cards: Array<CreditCard> = [];
        states.cards.forEach(card => {
          card.isActive = false;
          cards.push(card);
        });
        creditCard.expiry = new Date(creditCard.expiry);
        cards.push(creditCard);
        states.setCards(sortCards(cards));

        // Reset form and card model data
        resetForm();
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

  const activateCreditCard = (clientId: string, id: string) => {
    states.setIsQueryingAPI(true);

    activateCreditCardAPI(clientId, id)
      .then((response) => {
        console.log('response => activateCreditCardAPI', response);

        if (typeof (response.data.error) !== 'undefined') {
          states.setDialogMessage({ title: "Erro", message: response.data.error });
          return;
        };
      })
      .catch((error: AxiosError) => {
        console.error('error => activateCreditCardAPI', error);
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
    activateCreditCard,
  };
};