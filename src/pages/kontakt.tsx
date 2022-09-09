import React from 'react';
import type { NextPage } from 'next';
import HeadComponent from 'components/Head/HeadComponent';

const Kontakt: NextPage = () => {
  return (
    <main>
      <HeadComponent
        title='Sauny24 - Kontakt'
        description='Producent saun fińskich, infrared, combi. Od Ponad 18 lat w Polsce.'
      />

      <h1>Skontaktuj się z nami</h1>
    </main>
  );
};

export default Kontakt;
