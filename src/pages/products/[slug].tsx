import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Data } from 'src/Data';
import { formatValue } from 'utils/formatValue';

function Porduct() {
  const router = useRouter();
  const { slug } = router.query;
  const productTitle = typeof slug === 'string' && slug.split(':')[0];
  const productID = typeof slug === 'string' && slug.split(':')[1];

  const productExist = Data.find((item) => item.id === +productID);

  if (productExist)
    return (
      <main>
        <h1>Produkt: {productTitle}</h1>
        <p>ID: {productID}</p>

        <p>Cena: {formatValue(productExist.price)}</p>
        <p>Opis: {productExist.description}</p>
      </main>
    );
  else return <h1>Produkt nie został znaleziony.</h1>;
}

export default Porduct;
