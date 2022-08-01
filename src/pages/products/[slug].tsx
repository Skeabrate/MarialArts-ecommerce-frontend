import React, { useEffect } from 'react';
import { Data } from 'src/Data';
import { formatValue } from 'utils/formatValue';
import client from 'graphql/apollo';
import { gql } from '@apollo/client';

function Porduct({ data }: any) {
  console.log(data);

  const productExist = Data.find((item) => item.id === 1);

  return (
    <main>
      {false ? (
        <div>
          <h1>Produkt: {'test'}</h1>

          {/* <p>Cena: {formatValue(productExist?.price)}</p>
          <p>Opis: {productExist.description}</p> */}
        </div>
      ) : (
        <div>
          <h1>Produkt nie został znaleziony.</h1>
        </div>
      )}
    </main>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        produkts {
          data {
            attributes {
              Link
            }
          }
        }
      }
    `,
  });

  const paths = data.produkts.data.map(({ attributes: { Link } }: any) => {
    return {
      params: { slug: Link },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const slug = context.params.slug;

  const { data } = await client.query({
    query: gql`
      query Products {
        produkts(filters: { Link: { eq: "${slug}" } }) {
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
      data: data.produkts.data[0].attributes,
      revalidate: 5,
    },
  };
}

export default Porduct;
