import { useEffect } from 'react';
import type { NextPage } from 'next';
import HeadComponent from 'components/Head/Head';
import { useCart } from 'hooks/useCart';

const data = [
  {
    id: 0,
    title: 'Basic',
    category: 'finskie',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    wymiary: '200/200/200',
    price: 2,
    images: [],
  },
  {
    id: 1,
    title: 'Basic',
    category: 'finskie',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    wymiary: '210/210/210',
    price: 5,
    images: [],
  },
  {
    id: 2,
    title: 'Diamond',
    category: 'finskie',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    wymiary: '220/230/240',
    price: 4,
    images: [],
  },
  {
    id: 3,
    title: 'Oasis',
    category: 'infrared',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    wymiary: '210/200/200',
    price: 3,
    images: [],
  },
  {
    id: 4,
    title: 'Duo',
    category: 'infrared',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    wymiary: '230/230/230',
    price: 6,
    images: [],
  },
  {
    id: 5,
    title: 'Duo',
    category: 'infrared',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    wymiary: '200/200/200',
    price: 7,
    images: [],
  },
];

const Home: NextPage = () => {
  const { state, dispatch } = useCart();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const addToCart = (id: number, title: string, price: number) =>
    dispatch({
      type: 'addProduct',
      payload: {
        id,
        title,
        price,
        quantity: 1,
      },
    });

  /* const removeFromCart = (id: number, title: string, price: number) =>
    dispatch({
      type: 'deleteProduct',
      payload: {
        id,
        title,
        price,
      },
    });
 */
  return (
    <main>
      <HeadComponent title='Sauny24' />

      <h1>Home Page</h1>

      <section>
        {data.map((item) => (
          <article
            key={item.id}
            style={{ border: '1px solid grey', padding: '20px', margin: '20px' }}
          >
            <header>
              <h2>{item.title}</h2>
              <p>{item.category}</p>
            </header>

            <p>{item.description}</p>

            <p>{item.price} zł</p>

            <div>
              <button onClick={() => addToCart(item.id, item.title, item.price)}>
                Dodaj do koszyka
              </button>
              <button /* onClick={() => removeFromCart(item.id, item.title, item.price)} */>
                Usun z koszyka
              </button>
              <button>Dodaj do ulubionych</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
