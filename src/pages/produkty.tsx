import React, { useEffect, useState, useMemo } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ALL_PRODUCTS_FILTERS } from 'utils/filtersValues';
import { ProductType } from 'types/ProductType';
import { PRODUCTS_QUERY } from 'graphql/queries';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { useQuery } from '@apollo/client';
import HeadComponent from 'components/Head/Head';
import ProductTile from 'components/ProductTile/ProductTile';
import FiltersBar from 'components/FiltersBar/FiltersBar';

function Produkty() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);
  const [category, setCategory] = useState<string | string[]>(ALL_PRODUCTS_FILTERS);

  const router = useRouter();

  const allProducts = useMemo(
    () => (data?.produkts?.data as ProductType[]) || [],
    [data?.produkts?.data]
  );
  const filteredProducts = useMemo(
    () =>
      allProducts.filter((item) => {
        if (category === ALL_PRODUCTS_FILTERS) return item;
        else return item?.attributes.kategoria?.data?.attributes.Link === category;
      }),
    [category, allProducts]
  );

  useEffect(() => {
    if (router.query.kategoria) setCategory(router.query.kategoria);
    else setCategory(ALL_PRODUCTS_FILTERS);
  }, [router.query]);

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
