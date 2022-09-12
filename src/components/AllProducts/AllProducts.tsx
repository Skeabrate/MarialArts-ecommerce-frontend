import React, { useContext } from 'react';
import ProductTile from 'components/ProductTile/ProductTile';
import { FiltersContext } from 'context/FiltersContext/FiltersContext';

const AllProducts = () => {
  const { loadingFilters, filteredProducts } = useContext(FiltersContext);

  return (
    <section>
      {loadingFilters ? (
        <div>
          <h2>Ładowanie ...</h2>
        </div>
      ) : (
        <>
          {filteredProducts?.length ? (
            filteredProducts.map((item) => <ProductTile key={item?.id} product={item} />)
          ) : (
            <h2>Nie znaleziono produktów.</h2>
          )}
        </>
      )}
    </section>
  );
};

export default AllProducts;
