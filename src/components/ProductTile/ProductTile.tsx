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

export default function ProductTile({ product }: { product: ProductType }) {
  const finalPrice = useMemo(
    () => findLowestOrHighestPrice(product?.attributes?.size, LOWEST_PRICE),
    [product]
  );

  const highestAvailablePrice = formatValue(
    findLowestOrHighestPrice(product?.attributes?.size, HIGHEST_PRICE).price
  );

  console.log(product);

  if (!product?.attributes) return null;

  const { title, description, category, size, galery, slug } = product.attributes;

  return (
    <Link href={slug}>
      <a style={{ textDecoration: 'none' }}>
        <article
          style={{
            border: '1px solid grey',
            padding: '20px',
            margin: '20px',
          }}
        >
          <div>
            {galery?.data.length ? (
              <Image
                src={
                  galery.data[0].attributes?.url
                    ? process.env.STRAPI_URL + galery.data[0].attributes.url
                    : ''
                }
                alt={galery.data[0].attributes?.alternativeText || 'sauny24'}
                width={galery.data[0].attributes?.width || 300}
                height={galery.data[0].attributes?.height || 300}
              />
            ) : null}
          </div>

          <div>
            <h2>{title}</h2>
            <p>{category?.data?.attributes?.category}</p>
            <p style={{ display: 'flex', flexDirection: 'column', marginBlock: '6px' }}>
              {finalPrice.sale ? (
                <span style={{ color: 'red', fontWeight: 'bold' }}>Promocja!</span>
              ) : null}
              <span>
                {size.length > 1 ? 'Od ' : null}
                {formatValue(finalPrice.price)}
                {size.length > 1 ? ` do ${highestAvailablePrice}` : null}
              </span>
            </p>
            <p>Dostępne rozmiary:</p>
            <ul>
              {size.map((item) => (
                <li key={item?.id}>{item?.size}</li>
              ))}
            </ul>
          </div>
        </article>
      </a>
    </Link>
  );
}
