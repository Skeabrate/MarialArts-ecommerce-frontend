import { gql } from '@apollo/client';

export const SINGLE_PRODUCT_QUERY = gql`
  query Product($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          description
          galery {
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
          size {
            id
            size
            price
            sale
          }
          category {
            data {
              attributes {
                category
              }
            }
          }
          slug
          seo {
            Meta_Title
            Meta_Description
            Meta_Keywords
          }
        }
      }
    }
  }
`;
