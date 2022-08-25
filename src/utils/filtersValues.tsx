export const ALL_PRODUCTS = {
  __typename: 'KategoriaEntity',
  id: 'wszystkie-produkty',
  attributes: { Tytul: 'Wszystkie Produkty', Link: 'wszystkie-produkty' },
};
export const ALL_PRODUCTS_LINK = `/produkty?kategoria=${ALL_PRODUCTS.attributes.Link}`;

export const SORT_PRICE_ASCENDING = 'od-najnizszej';
export const SORT_PRICE_DESCENDING = 'od-najwyzszej';
