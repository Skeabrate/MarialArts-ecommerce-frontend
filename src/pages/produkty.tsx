import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import client from 'graphql/apollo';
import { gql } from '@apollo/client';
import HeadComponent from 'components/Head/Head';
import { CategoriesQuery, ProductsQuery } from 'generated';
import { useRouter } from 'next/router';
import { formatValue } from 'utils/formatValue';
import Link from 'next/link';

type PropsType = {
  produkts: ProductsQuery;
  kategorias: CategoriesQuery;
};

function Produkty({ produkts, kategorias }: PropsType) {
  const allProducts = produkts.produkts?.data;
  const categories = kategorias.kategorias?.data;

  const router = useRouter();

  const handleCategory = (link: string) => {
    router.query.kategoria = link;
    router.push(router);
  };

  return (
    <main>
      <HeadComponent
        title='Sauny24 - Produkty'
        description='Producent saun fińskich, infrared, combi. Od Ponad 18 lat w Polsce.'
        keywords='producent saun fińskich, infrared, combi, ogrodowych.'
      />

      <h1>Produkty</h1>

      <div>
        <h2>Filtry:</h2>

        <ul>
          {categories?.map(({ id, attributes }) => (
            <li key={id}>
              <button onClick={() => handleCategory(attributes ? attributes.Link : '')}>
                {attributes?.Tytul}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <section>
        {allProducts?.map(({ id, attributes }) => {
          let finalPrice = {
            price: 0,
            wymiary: '',
            promocja: false,
          };
          if (attributes?.Wymiary[0]) {
            finalPrice.price = attributes?.Wymiary[0]?.Cena;
            finalPrice.wymiary = attributes?.Wymiary[0]?.Wymiary;

            attributes?.Wymiary.forEach(({ Cena, Wymiary, Promocja }: any) => {
              if (Promocja && Promocja < finalPrice.price) {
                finalPrice.price = Promocja;
                finalPrice.wymiary = Wymiary;
                finalPrice.promocja = true;
              } else if (Cena < finalPrice.price) {
                finalPrice.price = Cena;
                finalPrice.wymiary = Wymiary;
              }
            });
          } else return null;

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
                  <p style={{ display: 'flex', flexDirection: 'column', marginBlock: '6px' }}>
                    {finalPrice.promocja ? (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>Promocja!</span>
                    ) : null}
                    <span>
                      {attributes.Wymiary.length > 1 ? 'Od ' : null}
                      {formatValue(finalPrice.price)}
                    </span>
                    <span>Wymiary: {finalPrice.wymiary}</span>
                  </p>
                  <Link href={attributes.Link}>
                    <a>Przejdź to strony produktu</a>
                  </Link>
                </div>
              </article>
            );
        })}
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        kategorias {
          data {
            attributes {
              Tytul
              Link
            }
          }
        }
        produkts {
          data {
            id
            attributes {
              Tytul
              Opis
              Galeria {
                data {
                  id
                  attributes {
                    width
                    height
                    alternativeText
                    url
                  }
                }
              }
              kategoria {
                data {
                  attributes {
                    Tytul
                    Link
                  }
                }
              }
              Wymiary {
                id
                Wymiary
                Cena
                Promocja
              }
              Dostepnosc
              SEO {
                Meta_Title
                Meta_Description
                Meta_Keywords
              }
              Link
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      produkts: data,
      kategorias: data,
    },
  };
};

export default Produkty as NextPage;
