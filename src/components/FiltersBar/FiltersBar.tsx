import { useContext } from 'react';
import { ALL_PRODUCTS, SORT_PRICE_ASCENDING, SORT_PRICE_DESCENDING } from 'utils/filtersValues';
import { FiltersContext } from 'context/FiltersContext';
import Combobox from 'components/Combobox/Combobox';

function FiltersBar() {
  const { categories = [] } = useContext(FiltersContext);

  const categoryFilters = [ALL_PRODUCTS, ...categories];
  const priceFilters = [
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
  ];

  return (
    <div>
      <h2>Filtry:</h2>

      <div>
        <h3>Kategoria:</h3>
      </div>
      <Combobox items={categoryFilters} filterType={'kategoria'} />

      <div>
        <h3>Sortuj wg:</h3>
        <Combobox label={'Sortuj wg'} items={priceFilters} filterType={'cena'} />
      </div>
    </div>
  );
}

export default FiltersBar;
