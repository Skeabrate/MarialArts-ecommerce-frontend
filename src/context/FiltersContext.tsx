import React from 'react';
import { CategoryType } from 'types/CategoryType';

type FiltersContextProps = {
  filtersHandler: (query: string, param: string) => void;
  categories: CategoryType[] | undefined;
};

export const FiltersContext = React.createContext({} as FiltersContextProps);
