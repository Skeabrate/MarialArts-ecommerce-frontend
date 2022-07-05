export type Product = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type Action =
  | { type: 'addProduct'; payload: Product }
  | { type: 'deleteProduct'; payload: Product }
  | { type: 'openMenu' }
  | { type: 'closeMenu' };

export type State = {
  readonly products: Array<Product>;
  readonly totalPrice: number;
  readonly quantity: number;
  readonly isOpen: boolean;
};
