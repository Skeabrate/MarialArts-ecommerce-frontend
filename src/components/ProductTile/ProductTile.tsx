import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from 'types/ProductType';
import { formatValue } from 'utils/formatValue';
import {
  findLowestOrHighestPrice,
  HIGHEST_PRICE,
  LOWEST_PRICE,
} from 'utils/findLowestOrHighestPrice';

type ProductTileProps = {
  product: ProductType;
};

export default function ProductTile({ product }: ProductTileProps) {
  const finalPrice = useMemo(
    () => findLowestOrHighestPrice(product?.attributes.Wymiary, LOWEST_PRICE),
    [product]
  );

  const highestAvailablePrice = formatValue(
    findLowestOrHighestPrice(product?.attributes.Wymiary, HIGHEST_PRICE).price
  );

  if (!product) return null;
  const { Wymiary, Galeria, Tytul, kategoria, Link: ProductUrl } = product.attributes;

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
                {Wymiary.length > 1 ? ` do ${highestAvailablePrice}` : null}
              </span>
              <span>Wymiary: {finalPrice.wymiary}</span>
            </p>
          </div>
        </article>
      </a>
    </Link>
  );
}
