export type CategoryType = {
  __typename?: 'KategoriaEntity';
  id?: string | null;
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
};
