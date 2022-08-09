import React from 'react';
import type { NextPage } from 'next';
import HeadComponent from 'components/Head/Head';

const Produkty: NextPage = () => {
  return (
    <main>
      <HeadComponent
        title='Sauny24 - Produkty'
        description='Producent saun fińskich, infrared, combi. Od Ponad 18 lat w Polsce.'
        keywords='producent saun fińskich, infrared, combi, ogrodowych.'
      />

      <h1>Produkty</h1>
    </main>
  );
};

export default Produkty;
