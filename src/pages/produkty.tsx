import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import HeadComponent from 'components/Head/Head';
import ProductTile from 'components/ProductTile/ProductTile';
import FiltersBar from 'components/FiltersBar/FiltersBar';
import { useFilters } from 'hooks/useFilters';
import { FiltersContext } from 'context/FiltersContext';
import { CategoriesDocument, CategoriesQuery, ProductsDocument, ProductsQuery } from 'generated';
import { QueryTypes } from 'types/QueryTypes';

interface ProductsType extends QueryTypes {
  data: ProductsQuery | undefined;
}

interface CategoriesType extends QueryTypes {
  data: CategoriesQuery | undefined;
}

function Produkty() {
  const {
    loading: loadingProducts,
    error: errorProducts,
    data: products,
  }: ProductsType = useQuery(ProductsDocument);
  const { data: categories }: CategoriesType = useQuery(CategoriesDocument);

  /* const { filteredProducts, loadingFilters, filtersHandler } = useFilters(products?.products?.data); */

  /* const value = useMemo(
    () => ({
      filtersHandler,
      categories: categories,
    }),
    [filtersHandler, categories]
  ); */

  if (loadingProducts) return <div>Loading...</div>;
  if (errorProducts) return <div>Error loading posts.</div>;

  return (
    <FiltersContext.Provider
      value={{
        filtersHandler: () => {},
        categories: categories?.categories?.data,
      }}
    >
      <main>
        <HeadComponent
          title='Sauny24 - Produkty'
          description='Producent saun fińskich, infrared, combi. Od Ponad 18 lat w Polsce.'
          keywords='producent saun fińskich, infrared, combi, ogrodowych.'
        />

        <h1>Produkty</h1>

        {/* <FiltersBar /> */}

        {/* <section>
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
        </section> */}

        <section>
          {products?.products?.data.map((item) => (
            <ProductTile key={item.id} product={item} />
          ))}
        </section>
      </main>
    </FiltersContext.Provider>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ProductsDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Produkty as NextPage;
