import React from 'react';
import { useShoppingCart } from 'hooks/useShoppingCart';
import { formatValue } from 'utils/formatValue';
import { Data } from 'src/Data';
import Link from 'next/link';

type CartItemProps = {
  id: number;
  quantity: number;
};

export default function CartItem({ id, quantity }: CartItemProps) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

  const item = Data.find((i) => i.id === id);
  if (!item) return null;

  return (
    <div>
      <h3>{item.title}</h3>
      <Link href={`/products/${item.title}:${item.id}`}>
        <a>Przejdź to strony produktu</a>
      </Link>
      <p>Cena: {formatValue(item.price)}</p>
      <p>Łączna cena: {formatValue(item.price * quantity)}</p>

      <div>
        <button onClick={() => decreaseCartQuantity(item.id)}>{quantity > 1 ? '-' : 'Usun'}</button>
        {quantity}
        <button onClick={() => increaseCartQuantity(item.id)}>+</button>
      </div>

      <button onClick={() => removeFromCart(item.id)}>Usun</button>
    </div>
  );
}
