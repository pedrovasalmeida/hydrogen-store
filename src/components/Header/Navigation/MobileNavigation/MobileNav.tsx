import React from 'react';
import NavOptions from '../../NavOptions.client';
import {IItems} from '../../types/interfaces';

interface IMobileNavProps extends IItems {
  isNavOpen: boolean;
}

export default function MobileNav({isNavOpen, items}: IMobileNavProps) {
  return (
    <nav
      id="mobile-navbar"
      className={`fixed ${
        isNavOpen ? 'left-0' : '-left-full'
      } top-0 w-2/3 pt-[50px] pr-5 pb-[30px] pl-[30px] bg-zinc-50 h-screen transition-all duration-500`}
    >
      <NavOptions />
      <MiniMenu items={items} />
    </nav>
  );
}

function MiniMenu({items}: IItems) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li className="text-base" key={item.id}>
          <a href={`${item.url}`}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}
