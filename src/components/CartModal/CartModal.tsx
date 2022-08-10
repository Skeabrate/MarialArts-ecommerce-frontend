import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useProductsQuery } from 'generated';
import { useShoppingCart } from 'hooks/useShoppingCart';
import { formatValue } from 'utils/formatValue';
import { StyledCartModal, StyledCloseButton } from './CartModal.styles';
import CartItem from './Cartitem/CartItem';

type CartProps = {
  isOpen: boolean;
};

function CartModal({ isOpen }: CartProps) {
  const { closeCart, cartItems, cartQuantity } = useShoppingCart();
  const { data, loading, error } = useProductsQuery();
  const router = useRouter();

  const totalItemsPrice = useMemo(
    () =>
      formatValue(
        cartItems.reduce((total, cartItem) => {
          const itemInDatabase = data?.produkts?.data.find(
            (dbItem) =>
              dbItem.id === cartItem.productId &&
              dbItem.attributes?.Wymiary.find((wymiary) => wymiary?.Wymiary === cartItem.wymiary)
          );
          let finalPrice = 0;

          itemInDatabase?.attributes?.Wymiary.forEach((wymiary) => {
            if (wymiary?.Wymiary === cartItem.wymiary) {
              if (wymiary.Promocja) return (finalPrice = wymiary.Promocja);
              else finalPrice = wymiary.Cena;
            }
          });

          return total + cartItem.quantity * finalPrice;
        }, 0)
      ),
    [cartItems, data]
  );

  const cartItemsJSX = useMemo(() => {
    if (error) {
      return <div>Nie udało się załadować produktów.</div>;
    } else if (loading) {
      return <div>Ładowanie ...</div>;
    } else if (data)
      return (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.cartItemId} data={data} {...item} />
          ))}
        </div>
      );
  }, [error, loading, data, cartItems]);

  useEffect(() => {
    if (isOpen) closeCart(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <StyledCartModal $isOpen={isOpen}>
      <StyledCloseButton onClick={closeCart} />

      <h2>Koszyk</h2>

      <div style={{ margin: '30px' }}>{cartItemsJSX}</div>

      <h3>Łączna ilość: {cartQuantity}x</h3>
      <h3>Łączna cena: {totalItemsPrice}</h3>

      <Link href='/koszyk'>
        <a>Przejdź do płatności</a>
      </Link>
    </StyledCartModal>
  );
}

export default CartModal;
