import Link from 'next/link';
import type { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { CategoryType } from 'globalTypes/CategoryType';
import { CATEGORIES_QUERY } from 'graphql/queries';
import { addApolloState, initializeApollo } from 'lib/apolloClient';
import HeadComponent from 'components/Head/Head';

function Home() {
  const { loading, error, data } = useQuery(CATEGORIES_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts.</div>;

  const categories = data?.kategorias?.data as CategoryType[];

  return (
    <main>
      <HeadComponent
        title='Sauny24'
        description='Zapraszamy do zapoznania się z bogatą ofertą saun fińskich, Infrared, Combi, grot solnych. Prawie 20 lat doświadczenia na rynku saunowym w Europie.'
        keywords='producent saun fińskich, infrared, combi, ogrodowych.'
      />

      <h1>Kategorie: </h1>

      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', padding: '30px' }}>
        {categories.length ? (
          categories.map((item) => (
            <Link key={item?.id} href={`/produkty?kategoria=${item?.attributes.Link}`}>
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
                  <h2>{item?.attributes.Tytul}</h2>
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
    query: CATEGORIES_QUERY,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Home as NextPage;
