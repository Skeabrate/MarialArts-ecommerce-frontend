import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatValue } from 'utils/formatValue';
import { ProductType } from '../../types/ProductType';

type ProductTileProps = {
  product: ProductType;
};

export default function ProductTile({ product }: ProductTileProps) {
  if (!product) return null;
  const { Wymiary, Galeria, Tytul, kategoria, Link: ProductUrl } = product.attributes;

  const finalPrice = {
    price: Wymiary[0].Cena,
    wymiary: Wymiary[0].Wymiary,
    promocja: false,
  };

  Wymiary.forEach(({ Cena, Wymiary, Promocja }) => {
    if (Promocja) finalPrice.promocja = true;
    if (Promocja && Promocja < finalPrice.price) {
      finalPrice.price = Promocja;
      finalPrice.wymiary = Wymiary;
    } else if (Cena < finalPrice.price) {
      finalPrice.price = Cena;
      finalPrice.wymiary = Wymiary;
    }
  });

  return (
    <Link href={ProductUrl}>
      <a style={{ textDecoration: 'none' }}>
        <article
          style={{
            border: '1px solid grey',
            padding: '20px',
            margin: '20px',
          }}
        >
          <div>
            {Galeria?.data.length ? (
              <Image
                src={
                  Galeria.data[0].attributes?.url
                    ? process.env.STRAPI_URL + Galeria.data[0].attributes.url
                    : ''
                }
                alt={Galeria.data[0].attributes?.alternativeText || 'sauny24'}
                width={Galeria.data[0].attributes.width}
                height={Galeria.data[0].attributes.height}
              />
            ) : null}
          </div>

          <div>
            <h2>{Tytul}</h2>
            <p>{kategoria?.data?.attributes.Tytul}</p>
            <p style={{ display: 'flex', flexDirection: 'column', marginBlock: '6px' }}>
              {finalPrice.promocja ? (
                <span style={{ color: 'red', fontWeight: 'bold' }}>Promocja!</span>
              ) : null}
              <span>
                {Wymiary.length > 1 ? 'Od ' : null}
                {formatValue(finalPrice.price)}
              </span>
              <span>Wymiary: {finalPrice.wymiary}</span>
            </p>
          </div>
        </article>
      </a>
    </Link>
  );
}
