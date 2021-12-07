import React from "react";

import {
  IsQueryingAPIState,
  ErrorMessageState,
} from './types';

export interface IUseModelPageState {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  errorMessage: ErrorMessageState;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;
};

export default function useModelPageStates(): IUseModelPageState {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>(undefined);

  return {
    isQueryingAPI: isQueryingAPI,
    setIsQueryingAPI: setIsQueryingAPI,

    errorMessage: errorMessage,
    setErrorMessage: setErrorMessage,
  };
};