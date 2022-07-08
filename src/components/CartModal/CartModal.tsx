import React, { useMemo } from 'react';
import Link from 'next/link';
import { formatValue } from 'utils/formatValue';
import { StyledCartModal, StyledCloseButton } from './CartModal.styles';
import { useShoppingCart } from 'hooks/useShoppingCart';
import { Data } from 'src/Data';
import CartItem from './Cartitem/CartItem';

type CartProps = {
  isOpen: boolean;
};

function CartModal({ isOpen }: CartProps) {
  const { closeCart, cartItems, cartQuantity } = useShoppingCart();

  const totalItems = useMemo(
    () =>
      formatValue(
        cartItems.reduce((total, cartItem) => {
          const item = Data.find((i) => i.id === cartItem.id);
          return total + (item?.price || 0) * cartItem.quantity;
        }, 0)
      ),
    [cartItems]
  );

  return (
    <StyledCartModal $isOpen={isOpen}>
      <StyledCloseButton onClick={closeCart} />

      <h2>Koszyk</h2>

      <div style={{ margin: '30px' }}>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <h3>Total Quantity: {cartQuantity}x</h3>
      <h3>Total Price: {totalItems}</h3>

      <Link href='/koszyk'>
        <h3 onClick={closeCart}>Przejdź do płatności</h3>
      </Link>
    </StyledCartModal>
  );
}

export default CartModal;
