import { useMemo } from 'react';
import Link from 'next/link';
import { ProductsQuery } from 'generated';
import { CartItemProps } from 'context/types';
import { useShoppingCart } from 'hooks/useShoppingCart';
import { formatValue } from 'utils/formatValue';

interface CartItemPropsWithData extends CartItemProps {
  data: ProductsQuery;
}

export default function CartItem({
  data,
  cartItemId,
  productId,
  size,
  quantity,
}: CartItemPropsWithData) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

  const cartItem = useMemo(
    () =>
      data?.products?.data.find(
        (item) => item.id === productId && item.attributes?.size.find((item) => item?.size === size)
      ),
    [data, productId, size]
  );

  data.products?.data.forEach((item) => {
    console.log(item);
  });

  const selectedSize = useMemo(
    () => cartItem?.attributes?.size.find((item) => item?.size === size),
    [cartItem, size]
  );

  const price = selectedSize?.sale || selectedSize?.price;

  return (
    <div>
      <h3>
        {cartItem?.attributes?.title} {selectedSize?.sale ? '(PROMOCJA)' : null}
      </h3>
      <Link href={cartItem?.attributes?.slug || ''}>
        <a>Przejdź to strony produktu</a>
      </Link>
      <p>size: {selectedSize?.size}</p>
      <p>Cena: {price && formatValue(price)}</p>
      <p>Ilość: {quantity}</p>
      <p>Łączna cena: {price && formatValue(price * quantity)}</p>

      <div>
        <button onClick={() => decreaseCartQuantity(cartItemId)}>
          {quantity > 1 ? '-' : 'Usun'}
        </button>
        {quantity}
        <button
          onClick={() =>
            cartItem?.id &&
            selectedSize &&
            increaseCartQuantity(cartItemId, cartItem.id, selectedSize.size)
          }
        >
          +
        </button>
      </div>

      <button onClick={() => removeFromCart(cartItemId)}>Usun</button>
    </div>
  );
}
