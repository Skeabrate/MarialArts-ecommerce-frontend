import client from 'graphql/apollo';
import { gql } from '@apollo/client';
import { formatValue } from 'utils/formatValue';
import HeadComponent from 'components/Head/Head';
import { ProductsQuery } from 'generated';

type ContextType = {
  params: {
    slug: string;
  };
};

type LinkType = {
  attributes: {
    Link: string;
  };
};

function Porduct({ produkts }: ProductsQuery) {
  const product = produkts?.data[0].attributes;
  if (!product) return null;
  console.log(product);
  const {
    Meta_title,
    Meta_description,
    Meta_keywords,
    kategoria,
    Wymiary,
    Dostepnosc,
    Tytul,
    Opis,
  } = product;

  return (
    <main style={{ minHeight: '700px', padding: '40px' }}>
      <HeadComponent
        title={Meta_title || 'Sauny24'}
        description={
          Meta_description || 'Producent saun fińskich, infrared, combi. Od Ponad 18 lat w Polsce.'
        }
        keywords={Meta_keywords || 'producent saun fińskich, infrared, combi, ogrodowych.'}
      />

      <div>
        <h1>{Tytul}</h1>

        <h2 style={{ paddingBlock: '10px' }}>
          Kategoria: {kategoria?.data?.attributes?.Tytul || 'Nieokreślona'}
        </h2>

        <div style={{ paddingBlock: '20px' }}>
          {Dostepnosc ? (
            <>
              <h2>Dostępne wymiary:</h2>

              <div>
                <table>
                  <tbody>
                    <tr>
                      <th>Wymiary:</th>
                      <th>Cena:</th>
                      <th></th>
                    </tr>
                    {Wymiary.map(({ id, Wymiary, Cena, Promocja }: any) => (
                      <tr key={id}>
                        <td style={{ padding: '10px' }}>{Wymiary}</td>
                        <td style={{ padding: '10px' }}>
                          {Promocja ? (
                            <>
                              <span style={{ display: 'block', color: 'grey' }}>
                                <s>{formatValue(Cena)}</s>
                              </span>
                              <span>{formatValue(Promocja)}</span>
                            </>
                          ) : (
                            <>{formatValue(Cena)}</>
                          )}
                        </td>
                        <td style={{ padding: '10px' }}>
                          <button>Dodaj do koszyka</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div>{Opis}</div>
              </div>
            </>
          ) : (
            <>
              <h2>Produkt jest aktualnie niedostępny</h2>
              <p>Zapytaj o dostępność</p>
            </>
          )}
        </div>
      </div>
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

  const paths = data.produkts.data.map(({ attributes: { Link } }: LinkType) => {
    return {
      params: { slug: Link },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: ContextType) {
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
							Meta_keywords
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
      revalidate: 5,
    },
  };
}

export default Porduct;
