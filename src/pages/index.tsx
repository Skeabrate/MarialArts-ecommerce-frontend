import type { NextPage } from 'next';
import { formatValue } from 'utils/formatValue';
import { Data } from 'src/Data';
import HeadComponent from 'components/Head/Head';
import { useShoppingCart } from 'hooks/useShoppingCart';
import Link from 'next/link';

const Home: NextPage = () => {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();

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
                <a>Go to product page</a>
              </Link>
            </header>

            <p>{item.description}</p>

            <p>{formatValue(item.price)}</p>

            <div>
              <button onClick={() => increaseCartQuantity(item.id)}>Dodaj do koszyka</button>
              <button onClick={() => decreaseCartQuantity(item.id)}>Usun z koszyka</button>
              <button>Dodaj do ulubionych</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
