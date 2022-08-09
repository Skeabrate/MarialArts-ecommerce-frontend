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
  wymiary,
  quantity,
}: CartItemPropsWithData) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();

  const cartItem = useMemo(
    () =>
      data?.produkts?.data.find(
        (item) =>
          item.id === productId &&
          item.attributes?.Wymiary.find((item) => item?.Wymiary === wymiary)
      ),
    [data, productId, wymiary]
  );

  const wybraneWymiary = useMemo(
    () => cartItem?.attributes?.Wymiary.find((item) => item?.Wymiary === wymiary),
    [cartItem, wymiary]
  );

  const cena = wybraneWymiary?.Promocja ? wybraneWymiary.Promocja : wybraneWymiary?.Cena;

  return (
    <div>
      <h3>
        {cartItem?.attributes?.Tytul} {wybraneWymiary?.Promocja ? '(PROMOCJA)' : null}
      </h3>
      <Link href={`/products/${cartItem?.attributes?.Link}`}>
        <a>Przejdź to strony produktu</a>
      </Link>
      <p>Wymiary: {wybraneWymiary?.Wymiary}</p>
      <p>Cena: {cena && formatValue(cena)}</p>
      <p>Ilość: {quantity}</p>
      <p>Łączna cena: {cena && formatValue(cena * quantity)}</p>

      <div>
        <button onClick={() => decreaseCartQuantity(cartItemId)}>
          {quantity > 1 ? '-' : 'Usun'}
        </button>
        {quantity}
        <button
          onClick={() =>
            cartItem &&
            wybraneWymiary &&
            cartItem.id &&
            increaseCartQuantity(cartItemId, cartItem.id, wybraneWymiary.Wymiary)
          }
        >
          +
        </button>
      </div>

      <button onClick={() => removeFromCart(cartItemId)}>Usun</button>
    </div>
  );
}
