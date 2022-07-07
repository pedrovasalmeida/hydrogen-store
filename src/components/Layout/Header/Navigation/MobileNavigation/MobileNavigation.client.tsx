import React, {useState} from 'react';
import {IItems} from '../../types/interfaces';
import MobileNav from './MobileNav';

interface IMobileNavComponentsProps {
  setIsNavOpen: (boolean: boolean) => void;
  isNavOpen: boolean;
}

export default function MobileNavigation({items}: IItems) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div id="mobile-navbar-container">
      <BackgroundCover isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <NavToggle isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <MobileNav isNavOpen={isNavOpen} items={items} />
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
