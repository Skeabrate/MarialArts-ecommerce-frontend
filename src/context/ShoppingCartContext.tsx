import { createContext, useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { ShoppingCartProviderProps, ShoppingCartContextProps, CartItemProps } from './types';
import CartModal from 'components/CartModal/CartModal';

export const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export default function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>('shopping-cart', []);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const increaseCartQuantity = useCallback(
    (cartItemId: string, productId: string, size: string) => {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.productId === productId && item.size === size) == null) {
          return [...currItems, { cartItemId, productId, size, quantity: 1 }];
        } else {
          return currItems.map((item) => {
            if (item.productId === productId && item.size === size) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          });
        }
      });
    },
    [setCartItems]
  );

  const decreaseCartQuantity = useCallback(
    (cartItemId: string) => {
      setCartItems((currItems) => {
        if (currItems.find((item) => item.cartItemId === cartItemId)?.quantity === 1) {
          return currItems.filter((item) => item.cartItemId !== cartItemId);
        } else {
          return currItems.map((item) => {
            if (item.cartItemId === cartItemId) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          });
        }
      });
    },
    [setCartItems]
  );

  const removeFromCart = useCallback(
    (cartItemId: string) => {
      setCartItems((currItems) => {
        return currItems.filter((item) => item.cartItemId !== cartItemId);
      });
    },
    [setCartItems]
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <CartModal isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
