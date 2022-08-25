import React from 'react';
import { CategoryType } from 'types/CategoryType';

type FiltersContextProps = {
  filtersHandler: (query: string, param: string) => void;
  categories: CategoryType[];
};

export const FiltersContext = React.createContext({} as FiltersContextProps);
