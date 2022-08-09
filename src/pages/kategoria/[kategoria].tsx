import client from 'graphql/apollo';
import { gql } from '@apollo/client';
import HeadComponent from 'components/Head/Head';
import { CategoriesQuery, ProductsQuery } from 'generated';

type ContextType = {
  params: {
    kategoria: string;
  };
};

type LinkType = {
  attributes: {
    Link: string;
  };
};

type PropsType = {
  produkts: ProductsQuery;
  kategorias: CategoriesQuery;
};

function Kategoria({ produkts, kategorias }: PropsType) {
  const allProducts = produkts.produkts?.data;
  const category = kategorias.kategorias?.data[0].attributes;
  const productsSortedByCategory = allProducts?.filter(
    ({ attributes }) => attributes?.kategoria?.data?.attributes?.Link === category?.Link
  );

  if (!category) return null;

  return (
    <main style={{ minHeight: '700px', padding: '40px' }}>
      <HeadComponent
        title={category.SEO.Meta_Title}
        description={category.SEO.Meta_Description}
        keywords={category.SEO.Meta_Keywords}
      />

      <h1>Kategoria: {category.Tytul}</h1>

      <h2>Produkty:</h2>
      <section>
        {productsSortedByCategory?.length ? (
          <>
            {productsSortedByCategory.map((item) => (
              <article key={item.id}>
                <h3>{item.attributes?.Tytul}</h3>
              </article>
            ))}
          </>
        ) : (
          <div>
            <h3>Nie znaleziono produktów w kategorii: {category.Tytul}</h3>
          </div>
        )}
      </section>
    </main>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Categories {
        kategorias {
          data {
            id
            attributes {
              Link
            }
          }
        }
      }
    `,
  });

  const paths = data.kategorias.data.map(({ attributes: { Link } }: LinkType) => {
    return {
      params: { kategoria: Link },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: ContextType) {
  const kategoriaLink = context.params.kategoria;

  const { data } = await client.query({
    query: gql`
      query CategoriesAndProducts {
				kategorias(filters: { Link: { eq: "${kategoriaLink}" } }){
					data{
						attributes{
							Tytul
							SEO{
								Meta_Title
								Meta_Description
								Meta_Keywords
							}
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

  if (!data.kategorias.data.length)
    return {
      notFound: true,
    };

  return {
    props: {
      produkts: data,
      kategorias: data,
    },
  };
}

export default Kategoria;
