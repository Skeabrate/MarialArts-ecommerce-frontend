import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Data } from 'src/Data';
import { formatValue } from 'utils/formatValue';

function Porduct() {
  const router = useRouter();
  const { slug } = router.query;

  const productExist = Data.find((item) => item.id === 1);

  return (
    <main>
      {false ? (
        <div>
          <h1>Produkt: {'test'}</h1>
          <p>ID: {1}</p>

          {/* <p>Cena: {formatValue(productExist?.price)}</p>
          <p>Opis: {productExist.description}</p> */}
        </div>
      ) : (
        <div>
          <h1>Produkt nie został znaleziony.</h1>
        </div>
      )}
    </main>
  );
}

export default Porduct;
