import React from 'react';
import Link from 'next/link';
import { useCart } from 'hooks/useCart';
import { formatValue } from 'utils/formatValue';
import { StyledCartModal, StyledCloseButton } from './CartModal.styles';

function CartModal() {
  const { state, dispatch } = useCart();

  const closeMenuHandler = () => dispatch({ type: 'closeMenu' });

  return (
    <StyledCartModal $isOpen={state.isOpen}>
      <StyledCloseButton onClick={closeMenuHandler} />

      <h2>Koszyk</h2>

      <div style={{ margin: '30px' }}>
        {state.products?.map(({ id, title, price, quantity }) => (
          <div key={id}>
            <h3>{title}</h3>
            <p>{price}</p>
            <p>{quantity}x</p>
          </div>
        ))}
      </div>

      <h3>Total Quantity: {state.totalQuantity}x</h3>
      <h3>Total Price: {formatValue(state.totalPrice)}</h3>

      <Link href='/koszyk'>
        <h3 onClick={closeMenuHandler}>Przejdź do płatności</h3>
      </Link>
    </StyledCartModal>
  );
}

export default CartModal;
