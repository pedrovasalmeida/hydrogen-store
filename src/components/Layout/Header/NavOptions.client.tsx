import React from 'react';
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {
  faCartShopping,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { useCart } from '../../../hooks/cartContext.client';

export default function NavOptions() {
  const {hooks} = useCart();
  const {toggleCart} = hooks;

  const navOptions = [
    {
      name: 'search',
      icon: faMagnifyingGlass,
      href: '/',
    },
    {
      name: 'wishlist',
      icon: faHeart,
      href: '/',
    },
    {
      name: 'cart',
      icon: faCartShopping,
      href: '#',
    },
  ];

  return (
    <div id="mobile-navbar-search" className="mb-6 md:mb-0 flex self-center">
      <ul className="flex items-center justify-center text-xs space-x-7">
        {navOptions.map((option) => (
          <li key={option.name} className="w-fit text-base">
            <a className="group py-5 text-black" href={option.href}>
              <FontAwesomeIcon
                className="w-4"
                icon={option.icon}
                onClick={
                  option.name === 'cart' ? () => toggleCart() : undefined
                }
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
