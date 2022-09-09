export const ALL_PRODUCTS = {
  id: 'wszystkie-produkty',
  attributes: { category: 'Wszystkie Produkty' },
};
export const ALL_PRODUCTS_LINK = `/produkty?kategoria=${ALL_PRODUCTS.attributes.category}`;

export const SORT_PRICE_ASCENDING = {
  id: '0',
  attributes: { category: 'Cena: od najniższej' },
};
export const SORT_PRICE_DESCENDING = {
  id: '1',
  attributes: { category: 'Cena: od najwyższej' },
};
