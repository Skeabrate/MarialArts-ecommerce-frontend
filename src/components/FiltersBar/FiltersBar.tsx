import React from 'react';
import { useRouter } from 'next/router';
import { ALL_PRODUCTS, SORT_PRICE_ASCENDING, SORT_PRICE_DESCENDING } from 'utils/filtersValues';
import { CategoryType } from 'types/CategoryType';

type FiltersBarProps = {
  categories: CategoryType[];
};

function FiltersBar({ categories }: FiltersBarProps) {
  const router = useRouter();

  const filtersHandler = (query: string, param: string) => {
    router.push({
      pathname: typeof window !== 'undefined' ? window.location.pathname : '/produkty',
      query: {
        ...router.query,
        [query]: param,
      },
    });
  };

  return (
    <div>
      <h2>Filtry:</h2>

      <div>
        <h3>Kategoria:</h3>
        <ul>
          <li>
            <button onClick={() => filtersHandler('kategoria', ALL_PRODUCTS)}>
              Wszystkie produkty
            </button>
          </li>
          {categories.map((item) => (
            <li key={item?.id}>
              <button onClick={() => filtersHandler('kategoria', item?.attributes.Link || '')}>
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
            <button onClick={() => filtersHandler('cena', SORT_PRICE_ASCENDING)}>Rosnąco</button>
          </li>
          <li>
            <button onClick={() => filtersHandler('cena', SORT_PRICE_DESCENDING)}>Malejąco</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FiltersBar;
