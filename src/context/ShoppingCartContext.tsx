import { createContext, useMemo, useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { ShoppingCartProviderProps, ShoppingCartContextProps, CartItemProps } from './types';
import CartModal from 'components/CartModal/CartModal';

export const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export default function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>('shopping-cart', []);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function increaseCartQuantity(cartItemId: string, productId: string, wymiary: string) {
    setCartItems((currItems) => {
      if (
        currItems.find((item) => item.productId === productId && item.wymiary === wymiary) == null
      ) {
        return [...currItems, { cartItemId, productId, wymiary, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.productId === productId && item.wymiary === wymiary) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(productId: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.productId === productId)?.quantity === 1) {
        return currItems.filter((item) => item.productId !== productId);
      } else {
        return currItems.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(cartItemId: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.cartItemId !== cartItemId);
    });
  }

  const value = useMemo(
    () => ({
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
      openCart,
      closeCart,
      cartItems,
      cartQuantity,
    }),
    [
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
      openCart,
      closeCart,
      cartItems,
      cartQuantity,
    ]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
      <CartModal isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
