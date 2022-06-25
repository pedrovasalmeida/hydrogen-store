import { Image } from '@shopify/hydrogen/client'
import React from 'react'
import MobileNavigation from './MobileNavigation/MobileNavigation.client'

export default function Header() {
  return (
    <header id='header' className='fixed w-full h-20 px-4 py-8 flex justify-between items-center bg-zinc-50 z-[1]'>      
      <section>
        <div>
          <a href="/" className="font-black uppercase text-3xl tracking-widest md:px-[15px]">
            <Image
              src="https://cdn.shopify.com/s/files/1/0610/1870/1985/files/header.webp?v=1650223175"
              width={196}
              height={18}
              alt="site logo"
            />
          </a>
        </div>
        <div className='hidden'>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>Pages</li>
            <li>Blog</li>
            <li>Contacts</li>
          </ul>
        </div>
      </section>
      <section>
        <MobileNavigation />
      </section>
    </header>
  )
}