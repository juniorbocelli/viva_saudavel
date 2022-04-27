import { Client } from '../../../globals/interfaces/client';

export type ClientsState = Array<Client>;

export interface FilterSearch {
  isActive: boolean;
};

export type FilterSearchState = FilterSearch | null;