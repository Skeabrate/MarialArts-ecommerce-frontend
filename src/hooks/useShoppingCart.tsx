import { useContext } from 'react';
import { ShoppingCartContext } from 'context/ShoppingCartContext/ShoppingCartContext';

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
