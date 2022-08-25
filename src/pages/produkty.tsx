import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import { PRODUCTS_QUERY } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import HeadComponent from 'components/Head/Head';
import ProductTile from 'components/ProductTile/ProductTile';
import FiltersBar from 'components/FiltersBar/FiltersBar';
import { useFilters } from 'hooks/useFilters';
import { FiltersContext } from 'context/FiltersContext';

function Produkty() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  const { filteredProducts, loadingFilters, filtersHandler } = useFilters(data.produkts.data);

  const value = useMemo(
    () => ({
      filtersHandler,
      categories: data.kategorias.data,
    }),
    [filtersHandler, data]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts.</div>;

  return (
    <FiltersContext.Provider value={value}>
      <main>
        <HeadComponent
          title='Sauny24 - Produkty'
          description='Producent saun fińskich, infrared, combi. Od Ponad 18 lat w Polsce.'
          keywords='producent saun fińskich, infrared, combi, ogrodowych.'
        />

        <h1>Produkty</h1>

        <FiltersBar />

        <section>
          {loadingFilters ? (
            <div>
              <h2>Ładowanie ...</h2>
            </div>
          ) : (
            <>
              {filteredProducts.length ? (
                filteredProducts.map((item) => (
                  <React.Fragment key={item?.id}>
                    {item?.attributes?.kategoria?.data?.attributes.Tytul &&
                    item?.attributes.Dostepnosc ? (
                      <ProductTile product={item} />
                    ) : null}
                  </React.Fragment>
                ))
              ) : (
                <h2>Nie znaleziono produktów.</h2>
              )}
            </>
          )}
        </section>
      </main>
    </FiltersContext.Provider>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PRODUCTS_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Produkty as NextPage;
