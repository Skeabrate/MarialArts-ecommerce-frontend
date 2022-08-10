import { useEffect, useState } from 'react';
import { CartItemProps } from 'context/types';
import { useProductsQuery } from 'generated';

function tryParseJSONObject(jsonString: string) {
  try {
    var val = JSON.parse(jsonString);
    if (val && typeof val === 'object' && Array.isArray(val)) {
      return val;
    }
  } catch (err) {
    console.log(err);
  }

  return false;
}

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const { data, error } = useProductsQuery();

  const [cartState, setCartState] = useState<T>(() => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue && tryParseJSONObject(localStorageValue)) {
      return JSON.parse(localStorageValue);
    } else return initialValue;
  });

  useEffect(() => {
    if (data && !error && Array.isArray(cartState)) {
      const checkLocalStorage = cartState.filter((localStorageItem: CartItemProps, index, self) => {
        return (
          data.produkts?.data.find(
            (dbItem) =>
              dbItem.id === localStorageItem.productId &&
              dbItem.attributes?.Wymiary.find(
                (wymiary) => wymiary?.Wymiary === localStorageItem.wymiary
              ) &&
              localStorageItem.cartItemId &&
              typeof localStorageItem.quantity === 'number' &&
              localStorageItem.quantity >= 1
          ) &&
          index ===
            self.findIndex(
              (t) =>
                t.cartItemId === localStorageItem.cartItemId ||
                t.wymiary === localStorageItem.wymiary
            )
        );
      });
      setCartState(checkLocalStorage as unknown as T);
    }
  }, [data, error]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cartState));
  }, [key, cartState]);

  return [cartState, setCartState] as [typeof cartState, typeof setCartState];
}
