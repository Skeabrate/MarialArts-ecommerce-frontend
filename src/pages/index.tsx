import type { NextPage } from 'next';
import HeadComponent from 'components/Head/Head';

const Home: NextPage = () => {
  return (
    <main style={{ height: '70vh' }}>
      <HeadComponent title='Sauny24' />

      <h1>Home Page</h1>
    </main>
  );
};

export default Home;
