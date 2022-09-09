import Link from 'next/link';
import type { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { CategoriesDocument } from 'generated';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import HeadComponent from 'components/Head/HeadComponent';
import { CategoriesQuery } from 'generated';
import { QueryTypes } from 'types/QueryTypes';

interface DataType extends QueryTypes {
  data: CategoriesQuery | undefined;
}

function Home() {
  const { loading, error, data }: DataType = useQuery(CategoriesDocument);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts.</div>;

  const categories = data?.categories?.data;

  return (
    <main>
      <HeadComponent title='Martial Arts Ecommerce' description='Martial Arts Ecommerce' />

      <h1>Kategorie: </h1>

      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '35px', padding: '30px' }}>
        {categories?.length ? (
          categories.map((item) => (
            <Link key={item.id} href={`/produkty?kategoria=${item.attributes?.category}`}>
              <a>
                <article
                  style={{
                    width: '300px',
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid red',
                  }}
                >
                  <h2>{item.attributes?.category}</h2>
                </article>
              </a>
            </Link>
          ))
        ) : (
          <h2>Nie znaleziono kategorii</h2>
        )}
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: CategoriesDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Home as NextPage;
