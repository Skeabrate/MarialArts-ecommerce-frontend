import { useEffect, useState, useMemo } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import client from 'graphql/apollo';
import { gql } from '@apollo/client';
import { CategoriesQuery, ProductsQuery } from 'generated';
import HeadComponent from 'components/Head/Head';
import ProductTile from 'components/ProductTile/ProductTile';

type PropsType = {
  produkts: ProductsQuery;
  kategorias: CategoriesQuery;
};

const ALL_PRODUCTS_FILTERS = 'wszystkie-produkty';

function Produkty({ produkts, kategorias }: PropsType) {
  const [category, setCategory] = useState<string | string[]>(ALL_PRODUCTS_FILTERS);
  const products = useMemo(
    () =>
      produkts.produkts?.data?.filter((item) => {
        if (category === ALL_PRODUCTS_FILTERS) return item;
        else return item.attributes?.kategoria?.data?.attributes?.Link === category;
      }),
    [category, produkts]
  );

  const categories = kategorias.kategorias?.data;
  const router = useRouter();

  const handleCategory = (param: string) => {
    router.query.kategoria = param;
    router.push(router);
  };

  const handlePriceSort = (param: string) => {
    router.query.cena = param;
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

        <div>
          <h3>Kategoria:</h3>
          <ul>
            <li>
              <button onClick={() => handleCategory(ALL_PRODUCTS_FILTERS)}>
                Wszystkie produkty
              </button>
            </li>
            {categories?.map(({ id, attributes }) => (
              <li key={id}>
                <button onClick={() => handleCategory(attributes?.Link || '')}>
                  {attributes?.Tytul}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Cena:</h3>
          <ul>
            <li>
              <button onClick={() => handlePriceSort('asc')}>Rosnąco</button>
            </li>
            <li>
              <button onClick={() => handlePriceSort('desc')}>Malejąco</button>
            </li>
          </ul>
        </div>
      </div>

      <section>
        {products?.length ? (
          products.map(({ id, attributes }) => (
            <>
              {attributes?.kategoria?.data?.attributes?.Tytul && attributes?.Dostepnosc ? (
                <ProductTile key={id} data={attributes} />
              ) : null}
            </>
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
      produkts: data,
      kategorias: data,
    },
  };
};

export default Produkty as NextPage;
