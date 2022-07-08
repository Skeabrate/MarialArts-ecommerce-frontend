import { useEffect, useState } from 'react';
import { CartItemProps } from 'context/types';
import { Data } from 'src/Data';

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
  const [cartState, setCartState] = useState<T>(() => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue && tryParseJSONObject(localStorageValue)) {
      const checkedLocalStorageValue = JSON.parse(localStorageValue).filter(
        (localStorageItem: CartItemProps) =>
          Data.find(
            (dataBaseItem) =>
              dataBaseItem.id === localStorageItem.id &&
              typeof localStorageItem.quantity === 'number' &&
              localStorageItem.quantity >= 1 &&
              localStorageItem.quantity <= 100
          )
      );
      return checkedLocalStorageValue;
    } else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cartState));
  }, [key, cartState]);

  return [cartState, setCartState] as [typeof cartState, typeof setCartState];
}
