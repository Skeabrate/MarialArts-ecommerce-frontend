export type ProductType = {
  __typename?: 'ProduktEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'Produkt';
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
  } | null;
};
