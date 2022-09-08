export type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

export type CartItemProps = {
  cartItemId: string;
  productId: string;
  size: string;
  quantity: number;
};

export type ShoppingCartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  increaseCartQuantity: (cartItemId: string, productId: string, size: string) => void;
  decreaseCartQuantity: (cartItemId: string) => void;
  removeFromCart: (cartItemId: string) => void;
  cartQuantity: number;
  cartItems: CartItemProps[];
};
