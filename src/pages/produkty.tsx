import React, { useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import client from 'graphql/apollo';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { CategoriesQuery, ProductsQuery } from 'generated';
import HeadComponent from 'components/Head/Head';
import ProductTile from 'components/ProductTile/ProductTile';

type PropsType = {
  produkts: ProductsQuery;
  kategorias: CategoriesQuery;
};

const ALL_PRODUCTS_FILTERS = 'wszystkie-produkty';

function Produkty({ produkts, kategorias }: PropsType) {
  const [category, setCategory] = useState<any>(ALL_PRODUCTS_FILTERS);
  const products = produkts.produkts?.data?.filter((item) => {
    if (category === ALL_PRODUCTS_FILTERS) return item;
    else return item.attributes?.kategoria?.data?.attributes?.Link === category;
  });
  const categories = kategorias.kategorias?.data;

  const router = useRouter();

  const handleCategory = (link: string) => {
    router.query.kategoria = link;
    router.push(router);
  };

  useEffect(() => {
    if (router.query.kategoria) setCategory(router.query.kategoria);
    else setCategory(ALL_PRODUCTS_FILTERS);
  }, [router.query]);

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
          <li>
            <button onClick={() => handleCategory(ALL_PRODUCTS_FILTERS)}>Wszystkie produkty</button>
          </li>
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
        {products?.map(({ id, attributes }) => {
          if (!attributes?.kategoria?.data?.attributes?.Tytul || !attributes?.Dostepnosc)
            return null;
          else return <ProductTile key={id} data={attributes} />;
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
            id
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
