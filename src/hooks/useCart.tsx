import { useMemo, useContext } from 'react';
import { ShoppingCartContext } from 'context/ShoppingCartContext';

export const useCart = () => {
  const context = useContext(ShoppingCartContext);

  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }

  return useMemo(() => context, [context]);
};
