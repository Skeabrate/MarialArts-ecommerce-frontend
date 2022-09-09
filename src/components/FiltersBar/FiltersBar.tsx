import { useContext } from 'react';
import { ALL_PRODUCTS, SORT_PRICE_ASCENDING, SORT_PRICE_DESCENDING } from 'utils/filtersValues';
import { FiltersContext } from 'context/FiltersContext/FiltersContext';
import Combobox from 'components/Combobox/Combobox';

function FiltersBar() {
  const { categories = [] } = useContext(FiltersContext);

  const categoryFilters = [ALL_PRODUCTS, ...categories];
  const priceFilters = [SORT_PRICE_ASCENDING, SORT_PRICE_DESCENDING];

  return (
    <div>
      <h2>Filtry:</h2>

      <Combobox items={categoryFilters} filterType={'kategoria'} />
      <Combobox label={'Sortuj wg'} items={priceFilters} filterType={'cena'} />
    </div>
  );
}

export default FiltersBar;
