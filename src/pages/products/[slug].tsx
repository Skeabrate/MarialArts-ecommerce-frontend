import React from 'react';
import { useRouter } from 'next/router';

function Porduct() {
  const router = useRouter();
  const { slug } = router.query;
  const productTitle = typeof slug === 'string' && slug.split(':')[0];
  const productID = typeof slug === 'string' && slug.split(':')[1];

  return (
    <main>
      <h2>Product: {productTitle}</h2>
      <p>ID: {productID}</p>
    </main>
  );
}

export default Porduct;
