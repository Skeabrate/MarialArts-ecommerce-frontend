import React from 'react';
import { useRouter } from 'next/router';
import { ALL_PRODUCTS, SORT_PRICE_ASCENDING, SORT_PRICE_DESCENDING } from 'utils/filtersValues';
import { CategoryType } from 'types/CategoryType';
import Combobox from 'components/Combobox/Combobox';

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
      </div>
      <Combobox
        items={[
          {
            __typename: 'KategoriaEntity',
            id: 'first',
            attributes: { Tytul: 'Wszystkie Produkty', Link: ALL_PRODUCTS },
          },
          ...categories,
        ]}
        filtersHandler={(param: string) => filtersHandler('kategoria', param)}
      />

      <div>
        <h3>Sortuj wg:</h3>
        <ul>
          <li>
            <button onClick={() => filtersHandler('cena', SORT_PRICE_ASCENDING)}>
              Cena - od najniższej
            </button>
          </li>
          <li>
            <button onClick={() => filtersHandler('cena', SORT_PRICE_DESCENDING)}>
              Cena - od najwyższej
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FiltersBar;
