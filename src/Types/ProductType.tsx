export type ProductType = {
  __typename?: 'ProduktEntity';
  id: string;
  attributes: {
    __typename?: 'Produkt';
    Tytul: string;
    Opis?: string | null;
    Dostepnosc: boolean;
    Link: string;
    Galeria?: {
      __typename?: 'UploadFileRelationResponseCollection';
      data: Array<{
        __typename?: 'UploadFileEntity';
        id: string;
        attributes: {
          __typename?: 'UploadFile';
          width: number;
          height: number;
          alternativeText?: string | null;
          url: string;
        };
      }>;
    } | null;
    kategoria?: {
      __typename?: 'KategoriaEntityResponse';
      data?: {
        __typename?: 'KategoriaEntity';
        attributes: {
          __typename?: 'Kategoria';
          Tytul: string;
          Link: string;
        };
      } | null;
    } | null;
    Wymiary: Array<{
      __typename?: 'ComponentWymiaryWymiary';
      id: string;
      Wymiary: string;
      Cena: number;
      Promocja?: number | null;
    }>;
    SEO: {
      __typename?: 'ComponentSeoSeo';
      Meta_Title: string;
      Meta_Description: string;
      Meta_Keywords: string;
    };
  };
} | null;
