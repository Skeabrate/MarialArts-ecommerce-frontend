import type { NextPage } from 'next';
import { PRODUCTS_QUERY } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import HeadComponent from 'components/Head/Head';
import ProductTile from 'components/ProductTile/ProductTile';
import FiltersBar from 'components/FiltersBar/FiltersBar';
import { useFilters } from 'hooks/useFilters';
import React from 'react';

function Produkty() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  const { filteredProducts } = useFilters(data.produkts.data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts.</div>;

  return (
    <main>
      <HeadComponent
        title='Sauny24 - Produkty'
        description='Producent saun fińskich, infrared, combi. Od Ponad 18 lat w Polsce.'
        keywords='producent saun fińskich, infrared, combi, ogrodowych.'
      />

      <h1>Produkty</h1>

      <FiltersBar categories={data.kategorias.data} />

      <section>
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
      </section>
    </main>
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
