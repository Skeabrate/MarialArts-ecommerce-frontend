import React, { createContext, ReactNode, useMemo, useReducer } from 'react';
import { cartReducer } from './shoppingCartReducer';
import { Action, State } from './types';

type ShoppingCartProviderType = {
  children: ReactNode;
};

type Dispatch = (action: Action) => void;

export const ShoppingCartContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

const initialState: State = { products: [], totalPrice: 0, totalQuantity: 0, isOpen: false };

export function ShoppingCartProvider({ children }: ShoppingCartProviderType) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>;
}
