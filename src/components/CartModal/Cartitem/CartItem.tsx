import { useShoppingCart } from 'hooks/useShoppingCart';
import React from 'react';
import { Data } from 'src/Data';
import { formatValue } from 'utils/formatValue';

type CartItemProps = {
  id: number;
  quantity: number;
};

function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  const item = Data.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div>
      <h3>{item.title}</h3>
      <p>{formatValue(item.price)}</p>
      <p>{quantity}x</p>

      <button onClick={() => removeFromCart(item.id)}>remove</button>
    </div>
  );
}

export default CartItem;
