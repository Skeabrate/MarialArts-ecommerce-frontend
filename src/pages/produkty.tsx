import type { NextPage } from 'next';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import { CategoriesDocument, ProductsDocument } from 'generated';
import HeadComponent from 'components/Head/HeadComponent';
import FiltersBar from 'components/FiltersBar/FiltersBar';
import FiltersProvider from 'context/FiltersContext/FiltersContext';
import AllProducts from 'components/AllProducts/AllProducts';

function Produkty() {
  return (
    <FiltersProvider>
      <main>
        <HeadComponent
          title='Sauny24 - Produkty'
          description='Producent saun fińskich, infrared, combi. Od Ponad 18 lat w Polsce.'
        />

        <h1>Produkty</h1>

        <FiltersBar />

        <AllProducts />
      </main>
    </FiltersProvider>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ProductsDocument,
  });

  await apolloClient.query({
    query: CategoriesDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Produkty as NextPage;
