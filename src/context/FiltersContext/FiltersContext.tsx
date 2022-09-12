import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { CategoriesType, FiltersContextProps, FiltersProviderProps, ProductsType } from './types';
import {
  ALL_PRODUCTS,
  ALL_PRODUCTS_LINK,
  SORT_PRICE_ASCENDING,
  SORT_PRICE_DESCENDING,
} from 'utils/filtersValues';
import { CategoriesDocument, ProductsDocument } from 'generated';
import { findProductPrices } from 'utils/findLowestOrHighestPrice';

export const FiltersContext = React.createContext({} as FiltersContextProps);

export default function FiltersProvider({ children }: FiltersProviderProps) {
  const {
    attributes: { category: ALL_PRODUCTS_CATEGORY },
  } = ALL_PRODUCTS;

  const { data: products }: ProductsType = useQuery(ProductsDocument);
  const { data: categories }: CategoriesType = useQuery(CategoriesDocument);

  const [category, setCategory] = useState<string | string[]>(ALL_PRODUCTS_CATEGORY);
  const [sortPrice, setSortPrice] = useState<string | string[]>('');
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false);

  const router = useRouter();

  const filteredProducts = useMemo(
    () =>
      products?.products?.data.filter((item) => {
        if (category === ALL_PRODUCTS_CATEGORY) return item;
        else return item?.attributes?.category?.data?.attributes?.category === category;
      }) || [],
    [category, products, ALL_PRODUCTS_CATEGORY]
  );

  const filtersHandler = (query: string, param: string) => {
    setLoadingFilters(true);
    router
      .push({
        pathname: typeof window !== 'undefined' ? window.location.pathname : ALL_PRODUCTS_LINK,
        query: {
          ...router.query,
          [query]: param,
        },
      })
      .then(() => setLoadingFilters(false));
  };

  if (sortPrice === SORT_PRICE_ASCENDING.attributes.category)
    filteredProducts.sort(
      (a, b) =>
        findProductPrices(a.attributes?.size, a.attributes?.price).minimalPrice -
        findProductPrices(b.attributes?.size, b.attributes?.price).minimalPrice
    );
  else if (sortPrice === SORT_PRICE_DESCENDING.attributes.category)
    filteredProducts.sort(
      (a, b) =>
        findProductPrices(b.attributes?.size, b.attributes?.price).maximalPrice -
        findProductPrices(a.attributes?.size, a.attributes?.price).maximalPrice
    );

  useEffect(() => {
    if (router.query.kategoria) setCategory(router.query.kategoria);
    else {
      setCategory(ALL_PRODUCTS_CATEGORY);
      router.push(ALL_PRODUCTS_LINK);
    }

    if (router.query.cena) setSortPrice(router.query.cena);
  }, [router, ALL_PRODUCTS_CATEGORY]);

  return (
    <FiltersContext.Provider
      value={{
        loadingFilters,
        filtersHandler,
        filteredProducts,
        categories: categories?.categories?.data,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
