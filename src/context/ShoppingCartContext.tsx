import { createContext, useMemo, useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import CartModal from 'components/CartModal/CartModal';
import { ShoppingCartProviderProps, ShoppingCartContextProps, CartItemProps } from './types';

export const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export default function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>('shopping-cart', []);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            if (item.quantity >= 100) return { ...item, quantity: item.quantity };
            else return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
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
