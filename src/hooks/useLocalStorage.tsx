import { useEffect, useState } from 'react';
import { CartItemProps } from 'context/ShoppingCartContext/types';
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
  const { data } = useProductsQuery();

  const [cartState, setCartState] = useState<T>(() => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue && tryParseJSONObject(localStorageValue)) {
      return JSON.parse(localStorageValue);
    } else return initialValue;
  });

  useEffect(() => {
    if (data && Array.isArray(cartState)) {
      const checkLocalStorage = cartState.filter((localStorageItem: CartItemProps, index, self) => {
        return (
          data.products?.data.find(
            (dbItem) =>
              dbItem.id === localStorageItem.productId &&
              dbItem.attributes?.size?.find((size) => size?.size === localStorageItem.size) &&
              localStorageItem.cartItemId &&
              typeof localStorageItem.quantity === 'number' &&
              localStorageItem.quantity >= 1
          ) &&
          index ===
            self.findIndex(
              (t) =>
                t.cartItemId === localStorageItem.cartItemId || t.size === localStorageItem.size
            )
        );
      });
      setCartState(checkLocalStorage as unknown as T);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cartState));
  }, [key, cartState]);

  return [cartState, setCartState] as [typeof cartState, typeof setCartState];
}
