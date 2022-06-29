import { Image } from '@shopify/hydrogen/client'
import React from 'react'
import DesktopNavigation from './DesktopNavigation/DesktopNavigation.client'
import MinicartComponent from './MinicartComponent'
import MobileNavigation from './MobileNavigation/MobileNavigation.client'
import { IItems } from './types/interfaces'

export default function Header({ items }: IItems) {
  return (
    <header id='header' className='fixed w-full h-20 px-4 py-8 flex justify-between xl:justify-center items-center bg-zinc-50 z-[1]'>
      <section className='flex items-center justify-between md:px-1 xl:px-3 w-full md:max-w-[720px] xl:max-w-[1170px]'>
        <Logo />
        <DesktopNavigation items={items} />
        <MinicartComponent />
      </section>
      <section className='md:hidden'>
        <MobileNavigation items={items} />
      </section>
    </header>
  )
}

function Logo() {
  return (
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
  )
}