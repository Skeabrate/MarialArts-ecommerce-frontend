import type { NextPage } from 'next';
import Link from 'next/link';
import { formatValue } from 'utils/formatValue';
import { useShoppingCart } from 'hooks/useShoppingCart';
import HeadComponent from 'components/Head/Head';
import { gql } from '@apollo/client';
import client from 'graphql/apollo';
import { ProductsQuery } from 'generated';

const Home: NextPage = ({ produkts }: ProductsQuery) => {
  const { increaseCartQuantity, openCart } = useShoppingCart();

  const addToCart = (id: number) => {
    openCart();
    increaseCartQuantity(id);
  };

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
          if (!attributes?.kategoria?.data?.attributes?.Tytul) return null;
          else
            return (
              <article
                key={id}
                style={{ border: '1px solid grey', padding: '20px', margin: '20px' }}
              >
                <header>
                  <h2>{attributes.Tytul}</h2>
                  <p>{attributes.kategoria.data.attributes.Tytul}</p>
                  <Link href={`/products/${attributes.Link}`}>
                    <a>Przejdź to strony produktu</a>
                  </Link>
                </header>

                {/* {Galeria?.data ? (
                  <div>
                    <img
                      src={`http://localhost:8082${Galeria.data[0].attributes.formats.small.url}`}
                      alt=''
                    />
                  </div>
                ) : null} */}

                {/* <p>{item.description}</p>

            <p>{formatValue(item.price)}</p> */}

                {id && (
                  <div>
                    <button onClick={() => addToCart(+id)}>Dodaj do koszyka</button>
                    <button>Dodaj do ulubionych</button>
                  </div>
                )}
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
