import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { ProductType } from 'types/ProductType';
import { ProductsDocument } from 'generated';
import {
  ALL_PRODUCTS,
  ALL_PRODUCTS_LINK,
  SORT_PRICE_ASCENDING,
  SORT_PRICE_DESCENDING,
} from 'utils/filtersValues';
import {
  findLowestOrHighestPrice,
  HIGHEST_PRICE,
  LOWEST_PRICE,
} from 'utils/findLowestOrHighestPrice';

export const useFilters = (allProducts: ProductType[]) => {
  const {
    attributes: { Link: ALL_PRODUCTS_CATEGORY },
  } = ALL_PRODUCTS;

  const [category, setCategory] = useState<string | string[]>(ALL_PRODUCTS_CATEGORY);
  const [sortPrice, setSortPrice] = useState<string | string[]>('');
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false);

  const router = useRouter();

  const filteredProducts = useMemo(
    () =>
      allProducts.filter((item: ProductType) => {
        if (category === ALL_PRODUCTS_CATEGORY) return item;
        else return item?.attributes.kategoria?.data?.attributes.Link === category;
      }),
    [category, allProducts, ALL_PRODUCTS_CATEGORY]
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

  if (sortPrice === SORT_PRICE_ASCENDING)
    filteredProducts.sort(
      (a, b) =>
        findLowestOrHighestPrice(a?.attributes.Wymiary, LOWEST_PRICE).price -
        findLowestOrHighestPrice(b?.attributes.Wymiary, LOWEST_PRICE).price
    );
  else if (sortPrice === SORT_PRICE_DESCENDING)
    filteredProducts.sort(
      (a, b) =>
        findLowestOrHighestPrice(b?.attributes.Wymiary, HIGHEST_PRICE).price -
        findLowestOrHighestPrice(a?.attributes.Wymiary, HIGHEST_PRICE).price
    );

  useEffect(() => {
    if (router.query.kategoria) setCategory(router.query.kategoria);
    else {
      setCategory(ALL_PRODUCTS_CATEGORY);
      router.push(ALL_PRODUCTS_LINK);
    }

    if (router.query.cena) setSortPrice(router.query.cena);
  }, [router, ALL_PRODUCTS_CATEGORY]);

  return { filteredProducts, loadingFilters, filtersHandler };
};
