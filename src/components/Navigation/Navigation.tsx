import React from 'react';
import Link from 'next/link';
import { StyledNav } from './Navigation.styles';
import { useShoppingCart } from 'hooks/useShoppingCart';

export default function Navigation() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <StyledNav>
      <h2>
        <Link href='/'>Sauny24</Link>
      </h2>

      <ul>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>Produkty</li>
        <li>
          <Link href='/kontakt'>Kontakt</Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link href='/ulubione'>Ulubione</Link>
        </li>
        <li>
          <Link href='/profil'>Profil</Link>
        </li>
        <li>
          <button onClick={openCart}>Koszyk</button>
          {cartQuantity}x
        </li>
      </ul>
    </StyledNav>
  );
}
