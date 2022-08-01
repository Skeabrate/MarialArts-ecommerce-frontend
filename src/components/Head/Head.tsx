import React from 'react';
import Head from 'next/head';

type Props = {
  title: string;
  description: string;
  keywords: string;
};

export default function HeadComponent({ title, description, keywords }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
