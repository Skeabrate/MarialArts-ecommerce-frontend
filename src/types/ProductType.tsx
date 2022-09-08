export type ProductType = {
  __typename?: 'ProductEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'Product';
    title: string;
    description?: string | null;
    slug: string;
    galery?: {
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
    size: Array<{
      __typename?: 'ComponentSizeSize';
      id: string;
      size: string;
      price: number;
      sale?: number | null;
    } | null>;
    category?: {
      __typename?: 'CategoryEntityResponse';
      data?: {
        __typename?: 'CategoryEntity';
        attributes?: { __typename?: 'Category'; category: string } | null;
      } | null;
    } | null;
    seo: {
      __typename?: 'ComponentSeoSeo';
      Meta_Title: string;
      Meta_Description: string;
      Meta_Keywords: string;
    };
  } | null;
} | null;
