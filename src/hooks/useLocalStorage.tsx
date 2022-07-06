import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [cartState, setCartState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue != null) return JSON.parse(localStorageValue);

      if (typeof initialValue === 'function') {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cartState));
  }, [key, cartState]);

  return [cartState, setCartState] as [typeof cartState, typeof setCartState];
}
