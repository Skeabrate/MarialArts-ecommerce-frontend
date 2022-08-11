import type { NextPage } from 'next';
import { v4 as uuid } from 'uuid';
import { formatValue } from 'utils/formatValue';
import { useShoppingCart } from 'hooks/useShoppingCart';
import { ProductType } from '../types/ProductType';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { SINGLEPRODUCT_QUERY } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import HeadComponent from 'components/Head/Head';

type SlugType = {
  slug: String;
};

type ServerSidePropsType = {
  params: SlugType;
};

function Product({ slug }: SlugType) {
  const { loading, error, data } = useQuery(SINGLEPRODUCT_QUERY, {
    variables: { slug },
  });
  const { increaseCartQuantity, openCart } = useShoppingCart();

  const product = data?.produkts?.data[0] as ProductType;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts.</div>;
  if (!product) return <div>Nie znaleziono produktu.</div>;

  const addToCart = (cartItemId: string, productId: string, wymiary: string) => {
    openCart();
    increaseCartQuantity(cartItemId, productId, wymiary);
  };

  return (
    <main style={{ minHeight: '700px', padding: '40px' }}>
      <HeadComponent
        title={product.attributes.SEO.Meta_Title}
        description={product.attributes.SEO.Meta_Description}
        keywords={product.attributes.SEO.Meta_Keywords}
      />

      <div>
        <h1>{product.attributes.Tytul}</h1>

        <h2 style={{ paddingBlock: '10px' }}>
          Kategoria: {product.attributes.kategoria?.data?.attributes.Tytul || 'Nieokreślona'}
        </h2>

        <div style={{ paddingBlock: '20px' }}>
          {product.attributes.Dostepnosc ? (
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
                    {product.attributes.Wymiary.map(({ id, Wymiary, Cena, Promocja }) => (
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
                    /* transformImageUri={} */
                  >
                    {product.attributes.Opis || ''}
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

export async function getServerSideProps({ params }: ServerSidePropsType) {
  const { slug } = params;

  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: SINGLEPRODUCT_QUERY,
    variables: { slug },
  });

  return addApolloState(apolloClient, {
    props: { slug },
  });
}

export default Product as NextPage;
