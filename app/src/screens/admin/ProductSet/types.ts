import { ImageListType } from 'react-images-uploading';

import { Product } from '../../../globals/interfaces/product';

export type ProductFormData = {
  name: string;
  producer: string;
  measure: string;
  description: string;
  ingredients: string;
  validate: string;

  isKosher: boolean;
  isA2A2: boolean;
  isGlutenFree: boolean;
  isSugarFree: boolean;
  isNatural: boolean;
  isLactoseFree: boolean;

  producerCode: string;
  category: string;

  price: string;
  isActive: boolean;
  quantity: string;
};

export type ProductIdState = string | undefined;

// List of images from registered products
export type ProductImagesState = Product['images'];

// List of new images
export type ImagesState = ImageListType;