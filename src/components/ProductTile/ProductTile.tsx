import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatValue } from 'utils/formatValue';

type ProductType = {
  data: {
    Tytul: string;
    Opis?: string | null;
    Dostepnosc: boolean;
    Link: string;
    Galeria?: {
      __typename?: 'UploadFileRelationResponseCollection';
      data: Array<{
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: {
          __typename?: 'UploadFile';
          width?: number | null;
          height?: number | null;
          alternativeText?: string | null;
          url: string;
        } | null;
      }>;
    } | null;
    kategoria?: {
      __typename?: 'KategoriaEntityResponse';
      data?: {
        __typename?: 'KategoriaEntity';
        attributes?: {
          __typename?: 'Kategoria';
          Tytul: string;
          Link: string;
          SEO: {
            __typename?: 'ComponentSeoSeo';
            Meta_Title: string;
            Meta_Description: string;
            Meta_Keywords: string;
          };
        } | null;
      } | null;
    } | null;
    Wymiary: Array<{
      __typename?: 'ComponentWymiaryWymiary';
      id: string;
      Wymiary: string;
      Cena: number;
      Promocja?: number | null;
    } | null>;
    SEO: {
      __typename?: 'ComponentSeoSeo';
      Meta_Title: string;
      Meta_Description: string;
      Meta_Keywords: string;
    };
  };
};

export default function ProductTile({ data }: ProductType) {
  const finalPrice = {
    price: 0,
    wymiary: '',
    promocja: false,
  };

  if (data.Wymiary[0]) {
    finalPrice.price = data.Wymiary[0].Cena;
    finalPrice.wymiary = data.Wymiary[0].Wymiary;

    data?.Wymiary.forEach(({ Cena, Wymiary, Promocja }: any) => {
      if (Promocja && Promocja < finalPrice.price) {
        finalPrice.price = Promocja;
        finalPrice.wymiary = Wymiary;
        finalPrice.promocja = true;
      } else if (Cena < finalPrice.price) {
        finalPrice.price = Cena;
        finalPrice.wymiary = Wymiary;
      }
    });
  } else return null;

  return (
    <article style={{ border: '1px solid grey', padding: '20px', margin: '20px' }}>
      <div>
        {data?.Galeria?.data.length ? (
          <Image
            src={
              data?.Galeria?.data[0].attributes?.url
                ? process.env.STRAPI_URL + data?.Galeria?.data[0].attributes?.url
                : ''
            }
            alt={data?.Galeria?.data[0].attributes?.alternativeText || 'sauny24'}
            width={data?.Galeria?.data[0].attributes?.width || 'auto'}
            height={data?.Galeria?.data[0].attributes?.height || 'auto'}
          />
        ) : null}
      </div>

      <div>
        <h2>{data.Tytul}</h2>
        <p>{data.kategoria?.data?.attributes?.Tytul}</p>
        <p style={{ display: 'flex', flexDirection: 'column', marginBlock: '6px' }}>
          {finalPrice.promocja ? (
            <span style={{ color: 'red', fontWeight: 'bold' }}>Promocja!</span>
          ) : null}
          <span>
            {data.Wymiary.length > 1 ? 'Od ' : null}
            {formatValue(finalPrice.price)}
          </span>
          <span>Wymiary: {finalPrice.wymiary}</span>
        </p>
        <Link href={data.Link}>
          <a>Przejdź to strony produktu</a>
        </Link>
      </div>
    </article>
  );
}
