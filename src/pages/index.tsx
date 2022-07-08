import type { NextPage } from 'next';
import Link from 'next/link';
import { formatValue } from 'utils/formatValue';
import { Data } from 'src/Data';
import { useShoppingCart } from 'hooks/useShoppingCart';
import HeadComponent from 'components/Head/Head';

const Home: NextPage = () => {
  const { increaseCartQuantity, openCart } = useShoppingCart();

  const addToCart = (id: number) => {
    openCart();
    increaseCartQuantity(id);
  };

  return (
    <main>
      <HeadComponent title='Sauny24' />

      <h1>Home Page</h1>

      <section>
        {Data.map((item) => (
          <article
            key={item.id}
            style={{ border: '1px solid grey', padding: '20px', margin: '20px' }}
          >
            <header>
              <h2>{item.title}</h2>
              <p>{item.category}</p>
              <Link href={`/products/${item.title}:${item.id}`}>
                <a>Przejdź to strony produktu</a>
              </Link>
            </header>

            <p>{item.description}</p>

            <p>{formatValue(item.price)}</p>

            <div>
              <button onClick={() => addToCart(item.id)}>Dodaj do koszyka</button>
              <button>Dodaj do ulubionych</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
