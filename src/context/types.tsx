export type Product = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

export type Action =
  | { type: 'addProduct'; payload: Product }
  | { type: 'deleteProduct'; payload: { id: Product['id'] } }
  | { type: 'openMenu' }
  | { type: 'closeMenu' };

export type State = {
  readonly products: Array<Product>;
  readonly totalPrice: number;
  readonly totalQuantity: number;
  readonly isOpen: boolean;
};
