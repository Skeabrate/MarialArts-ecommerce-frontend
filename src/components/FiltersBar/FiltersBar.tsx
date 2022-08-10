import React from 'react';
import { useRouter } from 'next/router';
import { ALL_PRODUCTS_FILTERS } from 'utils/filtersValues';
import { CategoryType } from 'src/Types/CategoryType';

type Props = {
  categories: CategoryType[];
};

function FiltersBar({ categories }: Props) {
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
          {categories.map(({ id, attributes }) => (
            <li key={id}>
              <button onClick={() => handleCategory(attributes?.Link || '')}>
                {attributes?.Tytul}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Cena:</h3>
        <ul>
          <li>
            <button onClick={() => handlePriceSort('asc')}>Rosnąco</button>
          </li>
          <li>
            <button onClick={() => handlePriceSort('desc')}>Malejąco</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FiltersBar;
