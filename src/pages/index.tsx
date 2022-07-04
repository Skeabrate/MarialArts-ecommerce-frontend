import type { NextPage } from 'next';
import HeadComponent from 'components/Head/Head';

const data = [
  {
    id: 0,
    title: 'Basic',
    category: 'finskie',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    price: 13165,
    images: [],
  },
  {
    id: 1,
    title: 'Diamond',
    category: 'finskie',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    price: 16990,
    images: [],
  },
  {
    id: 2,
    title: 'Oasis',
    category: 'infrared',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    price: 15200,
    images: [],
  },
  {
    id: 3,
    title: 'Duo',
    category: 'infrared',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde dicta earum cumque repellat maiores qui quae est cupiditate reiciendis, odio tempora dolores asperiores quidem? Ullam veniam vel consequuntur odit velit adipisci autem est harum commodi voluptatibus? Tempore rerum sunt adipisci.',
    price: 10990,
    images: [],
  },
];

const Home: NextPage = () => {
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
              <button>Dodaj do koszyka</button>
              <button>Dodaj do ulubionych</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
