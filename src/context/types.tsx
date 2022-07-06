export type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

export type CartItemProps = {
  id: number;
  quantity: number;
};

export type ShoppingCartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItemProps[];
};
