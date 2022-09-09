import ProductTile from 'components/ProductTile/ProductTile';
import { FiltersContext } from 'context/FiltersContext/FiltersContext';
import React, { useContext } from 'react';

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
            filteredProducts.map((item) => (
              <React.Fragment key={item?.id}>
                <ProductTile product={item} />
              </React.Fragment>
            ))
          ) : (
            <h2>Nie znaleziono produktów.</h2>
          )}
        </>
      )}
    </section>
  );
};

export default AllProducts;
