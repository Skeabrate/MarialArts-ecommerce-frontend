import { CategoriesQuery, ProductsQuery } from 'generated';
import { CategoryType } from 'types/CategoryType';
import { ProductType } from 'types/ProductType';
import { QueryTypes } from 'types/QueryTypes';

export type FiltersProviderProps = {
  children: React.ReactNode;
};

export type FiltersContextProps = {
  loadingFilters: boolean;
  filtersHandler: (query: string, param: string) => void;
  filteredProducts: ProductType[] | undefined;
  categories: CategoryType[] | undefined;
};

export interface ProductsType extends QueryTypes {
  data: ProductsQuery | undefined;
}

export interface CategoriesType extends QueryTypes {
  data: CategoriesQuery | undefined;
}
