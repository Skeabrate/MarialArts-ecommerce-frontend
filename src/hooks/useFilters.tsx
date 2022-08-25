import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { ProductType } from 'types/ProductType';
import { ALL_PRODUCTS, SORT_PRICE_ASCENDING, SORT_PRICE_DESCENDING } from 'utils/filtersValues';
import {
  findLowestOrHighestPrice,
  HIGHEST_PRICE,
  LOWEST_PRICE,
} from 'utils/findLowestOrHighestPrice';

export const useFilters = (allProducts: ProductType[]) => {
  const {
    attributes: { Link: allProductsCategory },
  } = ALL_PRODUCTS;

  const [category, setCategory] = useState<string | string[]>(allProductsCategory);
  const [sortPrice, setSortPrice] = useState<string | string[]>('');

  const router = useRouter();

  const filteredProducts = useMemo(
    () =>
      allProducts.filter((item: ProductType) => {
        if (category === allProductsCategory) return item;
        else return item?.attributes.kategoria?.data?.attributes.Link === category;
      }),
    [category, allProducts]
  );

  useEffect(() => {
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
  }, [sortPrice]);

  useEffect(() => {
    if (router.query.kategoria) setCategory(router.query.kategoria);
    else {
      setCategory(allProductsCategory);
      router.push(`/produkty?kategoria=${allProductsCategory}`);
    }

    if (router.query.cena) setSortPrice(router.query.cena);
  }, [router.query]);

  return { filteredProducts };
};
