import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';
import HeadComponent from 'components/Head/Head';
import client from 'graphql/apollo';
import { gql } from '@apollo/client';
import { ProductsQuery } from 'generated';
import { formatValue } from 'utils/formatValue';

const Home: NextPage = ({ produkts }: ProductsQuery) => {
  return (
    <main>
      <HeadComponent
        title='Sauny24'
        description='Zapraszamy do zapoznania się z bogatą ofertą saun fińskich, Infrared, Combi, grot solnych. Prawie 20 lat doświadczenia na rynku saunowym w Europie.'
        keywords='producent saun fińskich, infrared, combi, ogrodowych.'
      />

      <h1>Kategorie: </h1>

      <section>
        {produkts?.data?.map(({ id, attributes }) => {
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
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Produkts {
        produkts {
          data {
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
      produkts: data.produkts,
    },
  };
}

export default Home;
