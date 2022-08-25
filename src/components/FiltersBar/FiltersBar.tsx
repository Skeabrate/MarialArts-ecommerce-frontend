import React from 'react';
import { ALL_PRODUCTS, SORT_PRICE_ASCENDING, SORT_PRICE_DESCENDING } from 'utils/filtersValues';
import { CategoryType } from 'types/CategoryType';
import Combobox from 'components/Combobox/Combobox';

type FiltersBarProps = {
  categories: CategoryType[];
};

function FiltersBar({ categories }: FiltersBarProps) {
  return (
    <div>
      <h2>Filtry:</h2>

      <div>
        <h3>Kategoria:</h3>
      </div>
      <Combobox items={[ALL_PRODUCTS, ...categories]} category={'kategoria'} />

      <div>
        <h3>Sortuj wg:</h3>
        <Combobox
          label={'Sortuj wg'}
          items={[
            {
              __typename: 'KategoriaEntity',
              id: '0',
              attributes: { Tytul: 'Cena: od najniższej', Link: SORT_PRICE_ASCENDING },
            },
            {
              __typename: 'KategoriaEntity',
              id: '1',
              attributes: { Tytul: 'Cena: od najwyższej', Link: SORT_PRICE_DESCENDING },
            },
          ]}
          category={'cena'}
        />
      </div>
    </div>
  );
}

export default FiltersBar;
