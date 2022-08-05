import type { NextPage } from 'next';
import Link from 'next/link';
import HeadComponent from 'components/Head/Head';
import client from 'graphql/apollo';
import { gql } from '@apollo/client';
import { ProductsQuery } from 'generated';
import { formatValue } from 'utils/formatValue';
import React from 'react';
import Image from 'next/image';

const Home: NextPage = ({ produkts }: ProductsQuery) => {
  React.useEffect(() => {
    produkts?.data.map(({ attributes }) => {
      console.log(attributes?.Dostepnosc);
    });
  }, [produkts]);

  return (
    <main>
      <HeadComponent
        title='Sauny24'
        description='Producent saun fińskich, infrared, combi. Od Ponad 18 lat w Polsce.'
        keywords='producent saun fińskich, infrared, combi, ogrodowych.'
      />

      <h1>Home Page</h1>

      <section>
        {produkts?.data?.map(({ id, attributes }) => {
          if (!attributes?.kategoria?.data?.attributes?.Tytul || !attributes?.Dostepnosc)
            return null;
          else
            return (
              <article
                key={id}
                style={{ border: '1px solid grey', padding: '20px', margin: '20px' }}
              >
                <div>
                  {attributes?.Galeria?.data.length ? (
                    <Image
                      src={
                        attributes?.Galeria?.data[0].attributes?.url
                          ? process.env.STRAPI_URL + attributes?.Galeria?.data[0].attributes?.url
                          : ''
                      }
                      alt={attributes?.Galeria?.data[0].attributes?.alternativeText || 'sauny24'}
                      width={attributes?.Galeria?.data[0].attributes?.width || 'auto'}
                      height={attributes?.Galeria?.data[0].attributes?.height || 'auto'}
                    />
                  ) : null}
                </div>

                <div>
                  <h2>{attributes.Tytul}</h2>
                  <p>{attributes.kategoria.data.attributes.Tytul}</p>
                  <Link href={`/products/${attributes.Link}`}>
                    <a>Przejdź to strony produktu</a>
                  </Link>
                </div>
              </article>
            );
        })}
      </section>
    </main>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Products {
        produkts {
          data {
            id
            attributes {
              Meta_title
              Meta_description
              Link
              Dostepnosc
              Tytul
              Opis
              Galeria {
                data {
                  id
                  attributes {
                    width
                    height
                    alternativeText
                    formats
                    url
                  }
                }
              }
              kategoria {
                data {
                  attributes {
                    Tytul
                  }
                }
              }
              Wymiary {
                id
                Wymiary
                Cena
                Promocja
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      produkts: data.produkts,
    },
  };
}

export default Home;
