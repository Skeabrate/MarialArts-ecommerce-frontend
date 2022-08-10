import React, { useEffect, useState, useMemo } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import client from 'graphql/apollo';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { ALL_PRODUCTS_FILTERS } from 'utils/filtersValues';
import { ProductType } from 'src/Types/ProductType';
import { CategoryType } from 'src/Types/CategoryType';
import HeadComponent from 'components/Head/Head';
import ProductTile from 'components/ProductTile/ProductTile';
import FiltersBar from 'components/FiltersBar/FiltersBar';

type PropsType = {
  products: ProductType[];
  categories: CategoryType[];
};

function Produkty({ products, categories }: PropsType) {
  const [category, setCategory] = useState<string | string[]>(ALL_PRODUCTS_FILTERS);
  const filteredProducts = useMemo(
    () =>
      products.filter((item) => {
        if (category === ALL_PRODUCTS_FILTERS) return item;
        else return item?.attributes.kategoria?.data?.attributes.Link === category;
      }),
    [category, products]
  );

  const router = useRouter();

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

      <FiltersBar categories={categories} />

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
      products: data.produkts.data,
      categories: data.kategorias.data,
    },
  };
};

export default Produkty as NextPage;
