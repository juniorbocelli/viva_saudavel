import React from 'react';

import {
  IsQueryingAPIState,
  DialogMessageState,
} from '../../../ui/components/pages/AdminMainContentBox/types';

import { ProductIdState, ProductImagesState } from './types';

export interface IUseStates {
  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  dialogMessage: DialogMessageState;
  setDialogMessage: React.Dispatch<React.SetStateAction<DialogMessageState>>;

  productId: ProductIdState;
  setProductId: React.Dispatch<React.SetStateAction<ProductIdState>>;

  productImages: ProductImagesState;
  setProductImages: React.Dispatch<React.SetStateAction<ProductImagesState>>;
};

export default function useStates(): IUseStates {
  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [dialogMessage, setDialogMessage] = React.useState<DialogMessageState>(undefined);

  const [productId, setProductId] = React.useState<ProductIdState>(undefined);
  const [productImages, setProductImages] = React.useState<ProductImagesState>([]);

  return {
    isQueryingAPI,
    setIsQueryingAPI,

    dialogMessage,
    setDialogMessage,

    productId,
    setProductId,

    productImages,
    setProductImages,
  };
};