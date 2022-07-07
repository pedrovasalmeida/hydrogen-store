import React, {useState} from 'react';
import {IItems} from '../../types/interfaces';
import MobileNav from './MobileNav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {useCart} from '../../../../hooks/cartContext.client';
interface IMobileNavComponentsProps {
  setIsNavOpen: (boolean: boolean) => void;
  isNavOpen: boolean;
}

export default function MobileNavigation({items}: IItems) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const {hooks} = useCart();
  const {toggleCart} = hooks;

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      <FontAwesomeIcon
        icon={faCartShopping}
        onClick={toggleCart}
        className="w-6 h-6"
      />
      <div id="mobile-navbar-container">
        <BackgroundCover isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <NavToggle isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <MobileNav isNavOpen={isNavOpen} items={items} />
      </div>
    </div>
  );
}

function BackgroundCover({setIsNavOpen, isNavOpen}: IMobileNavComponentsProps) {
  return (
    <div
      id="mobile-navbar-background-cover"
      onClick={() => setIsNavOpen(false)}
      className={`w-screen h-screen bg-black fixed left-0 top-0 ${
        isNavOpen ? 'pointer-events-auto' : 'pointer-events-none'
      } ${
        isNavOpen ? 'opacity-50' : 'opacity-0'
      } transition-opacity duration-500`}
    />
  );
}

function NavToggle({isNavOpen, setIsNavOpen}: IMobileNavComponentsProps) {
  return (
    <button
      id="mobile-navbar-toggle"
      className="border border-black rounded-sm h-9 w-9"
      onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <div className="flex flex-col items-center">
        <div className="w-5 h-1 mb-1 bg-black rounded-sm" />
        <div className="w-5 h-1 mb-1 bg-black rounded-sm" />
        <div className="w-5 h-1 bg-black rounded-sm" />
      </div>
    </button>
  );
}
