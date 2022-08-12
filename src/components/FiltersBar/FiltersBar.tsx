import React from 'react';
import { useRouter } from 'next/router';
import {
  ALL_PRODUCTS_FILTERS,
  SORT_PRICE_ASCENDING,
  SORT_PRICE_DESCENDING,
} from 'utils/filtersValues';
import { CategoryType } from 'types/CategoryType';

type FiltersBarProps = {
  categories: CategoryType[];
};

function FiltersBar({ categories }: FiltersBarProps) {
  const router = useRouter();

  const handleCategory = (param: string) => {
    router.query.kategoria = param;
    router.push(router);
  };

  const handlePriceSort = (param: string) => {
    router.query.cena = param;
    router.push(router);
  };

  return (
    <div>
      <h2>Filtry:</h2>

      <div>
        <h3>Kategoria:</h3>
        <ul>
          <li>
            <button onClick={() => handleCategory(ALL_PRODUCTS_FILTERS)}>Wszystkie produkty</button>
          </li>
          {categories.map((item) => (
            <li key={item?.id}>
              <button onClick={() => handleCategory(item?.attributes.Link || '')}>
                {item?.attributes.Tytul}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Cena:</h3>
        <ul>
          <li>
            <button onClick={() => handlePriceSort(SORT_PRICE_ASCENDING)}>Rosnąco</button>
          </li>
          <li>
            <button onClick={() => handlePriceSort(SORT_PRICE_DESCENDING)}>Malejąco</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FiltersBar;
