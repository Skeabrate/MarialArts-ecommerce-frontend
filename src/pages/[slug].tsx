import client from 'graphql/apollo';
import { gql } from '@apollo/client';
import { v4 as uuid } from 'uuid';
import { formatValue } from 'utils/formatValue';
import { useShoppingCart } from 'hooks/useShoppingCart';
import { ProductType } from 'src/Types/ProductType';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import HeadComponent from 'components/Head/Head';

type ProductProps = {
  product: ProductType;
};

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

function Product({ product }: ProductProps) {
  const { increaseCartQuantity, openCart } = useShoppingCart();
  const { Tytul, Opis, kategoria, Galeria, Wymiary, Dostepnosc, SEO } = product.attributes;

  const addToCart = (cartItemId: string, productId: string, wymiary: string) => {
    openCart();
    increaseCartQuantity(cartItemId, productId, wymiary);
  };

  return (
    <main style={{ minHeight: '700px', padding: '40px' }}>
      <HeadComponent
        title={SEO.Meta_Title}
        description={SEO.Meta_Description}
        keywords={SEO.Meta_Keywords}
      />

      <div>
        <h1>{Tytul}</h1>

        <h2 style={{ paddingBlock: '10px' }}>Kategoria: {kategoria?.data?.attributes?.Tytul}</h2>

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
                          <button onClick={() => addToCart(uuid(), product.id, Wymiary)}>
                            Dodaj do koszyka
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <section>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    linkTarget={'_blank'}
                    components={{
                      a: ({ node, children, ...props }) => {
                        const linkProps = props;
                        if (props.target === '_blank') {
                          linkProps['rel'] = 'noopener noreferrer';
                        }
                        return <a {...linkProps}>{children}</a>;
                      },
                    }}
                    /* transformImageUri={}  */
                  >
                    {Opis || ''}
                  </ReactMarkdown>
                </section>
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
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: ContextType) {
  const slug = context.params.slug;

  const { data } = await client.query({
    query: gql`
      query Produkt {
        produkts(filters: { Link: { eq: "${slug}" } }) {
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
						}
					}
				}
      }
    `,
  });

  if (!data.produkts.data[0])
    return {
      notFound: true,
    };

  return {
    props: {
      product: data.produkts.data[0],
    },
  };
}

export default Product;
