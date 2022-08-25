import React, { useEffect, useState, useMemo } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PRODUCTS_QUERY } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { ProductType } from 'types/ProductType';
import { ALL_PRODUCTS, SORT_PRICE_ASCENDING, SORT_PRICE_DESCENDING } from 'utils/filtersValues';
import {
  findLowestOrHighestPrice,
  HIGHEST_PRICE,
  LOWEST_PRICE,
} from 'utils/findLowestOrHighestPrice';
import HeadComponent from 'components/Head/Head';
import ProductTile from 'components/ProductTile/ProductTile';
import FiltersBar from 'components/FiltersBar/FiltersBar';

function Produkty() {
  const { loading, error, data } = useQuery(PRODUCTS_QUERY);

  const {
    attributes: { Link: allProductsCategory },
  } = ALL_PRODUCTS;

  const [category, setCategory] = useState<string | string[]>(allProductsCategory);
  const [sortPrice, setSortPrice] = useState<string | string[]>('');

  const router = useRouter();

  const allProducts = useMemo(
    () => (data?.produkts?.data as ProductType[]) || [],
    [data?.produkts?.data]
  );

  const filteredProducts = useMemo(
    () =>
      allProducts.filter((item) => {
        if (category === allProductsCategory) return item;
        else return item?.attributes.kategoria?.data?.attributes.Link === category;
      }),
    [category, allProducts]
  );

  if (sortPrice === SORT_PRICE_ASCENDING)
    filteredProducts.sort(
      (a, b) =>
        findLowestOrHighestPrice(a?.attributes.Wymiary, LOWEST_PRICE).price -
        findLowestOrHighestPrice(b?.attributes.Wymiary, LOWEST_PRICE).price
    );
  else if (sortPrice === SORT_PRICE_DESCENDING)
    filteredProducts.sort(
      (a, b) =>
        findLowestOrHighestPrice(b?.attributes.Wymiary, HIGHEST_PRICE).price -
        findLowestOrHighestPrice(a?.attributes.Wymiary, HIGHEST_PRICE).price
    );

  useEffect(() => {
    if (router.query.kategoria) setCategory(router.query.kategoria);
    else setCategory(allProductsCategory);

    if (router.query.cena) setSortPrice(router.query.cena);
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
