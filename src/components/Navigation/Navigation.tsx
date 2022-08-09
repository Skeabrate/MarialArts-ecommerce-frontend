import React from 'react';
import Link from 'next/link';
import { StyledNav } from './Navigation.styles';
import { useShoppingCart } from 'hooks/useShoppingCart';

export default function Navigation() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <StyledNav>
      <h2>
        <Link href='/'>
          <a>Sauny24</a>
        </Link>
      </h2>

      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/produkty'>
            <a>Produkty</a>
          </Link>
        </li>
        <li>
          <Link href='/kontakt'>
            <a>Kontakt</a>
          </Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link href='/profil'>
            <a>Profil</a>
          </Link>
        </li>
        <li>
          <button onClick={openCart}>Koszyk</button>
          {cartQuantity}x
        </li>
      </ul>
    </StyledNav>
  );
}
