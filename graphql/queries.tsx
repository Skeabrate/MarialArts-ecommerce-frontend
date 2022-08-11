import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query AllProducts {
    kategorias {
      data {
        id
        attributes {
          Tytul
          Link
        }
      }
    }
    produkts {
      data {
        id
        attributes {
          Tytul
          Opis
          Galeria {
            data {
              id
              attributes {
                width
                height
                alternativeText
                url
              }
            }
          }
          kategoria {
            data {
              attributes {
                Tytul
                Link
              }
            }
          }
          Wymiary {
            id
            Wymiary
            Cena
            Promocja
          }
          Dostepnosc
          SEO {
            Meta_Title
            Meta_Description
            Meta_Keywords
          }
          Link
        }
      }
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query Categories {
    kategorias {
      data {
        id
        attributes {
          Tytul
          Link
        }
      }
    }
  }
`;

export const SINGLEPRODUCT_QUERY = gql`
  query Produkt($slug: String!) {
    produkts(filters: { Link: { eq: $slug } }) {
      data {
        id
        attributes {
          Tytul
          Opis
          Galeria {
            data {
              id
              attributes {
                width
                height
                alternativeText
                url
              }
            }
          }
          kategoria {
            data {
              attributes {
                Tytul
              }
            }
          }
          Wymiary {
            id
            Wymiary
            Cena
            Promocja
          }
          Dostepnosc
          SEO {
            Meta_Title
            Meta_Description
            Meta_Keywords
          }
        }
      }
    }
  }
`;
