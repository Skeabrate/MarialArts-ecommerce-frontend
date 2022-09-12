import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from 'types/ProductType';
import { formatValue } from 'utils/formatValue';
import { findProductPrices } from 'utils/findLowestOrHighestPrice';

export default function ProductTile({ product }: { product: ProductType }) {
  if (!product?.attributes) return null;
  const { title, category, size, price, galery, slug } = product.attributes;

  const finalPrice = findProductPrices(size, price);
  const minimalPrice = formatValue(finalPrice.minimalPrice);
  const maximalPrice = formatValue(finalPrice.maximalPrice);

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
                alt={galery.data[0].attributes?.alternativeText || ''}
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
              <span>{maximalPrice ? `Od: ${minimalPrice} do: ${maximalPrice}` : minimalPrice}</span>
            </p>
          </div>
        </article>
      </a>
    </Link>
  );
}
