import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

interface IMobileNavProps {
  isNavOpen: boolean
}

export default function MobileNav({ isNavOpen }: IMobileNavProps) {

  return (
    <nav id='mobile-navbar' className={`fixed ${isNavOpen ? 'left-0' : '-left-full'} top-0 w-2/3 pt-[50px] pr-5 pb-[30px] pl-[30px] bg-zinc-50 h-screen transition-all duration-500`}>
      <MobileNavLinks />
      <MobileNavSearch />
      <MiniMenu />
    </nav>
  )
}

function MobileNavLinks() {
  return (
    <div id='mobile-navbar-links' className='mb-[30px]'>
      <ul className='w-full flex justify-between px-3'>
        <li className='font-semibold uppercase tracking-widest'>Sign In</li>
        <li className='font-semibold uppercase tracking-widest'>FAQS</li>
        <li className='font-semibold uppercase tracking-widest'>USD</li>
      </ul>
    </div>
  )
}

function MobileNavSearch() {
  return (
    <div id='mobile-navbar-search' className='mb-6'>
      <ul className="flex md:hidden items-center justify-center text-xs">
        <li className="w-fit text-base mr-[26px]">
          <a className="group py-5 text-black" href='/'>
            <FontAwesomeIcon className="w-4" icon={faMagnifyingGlass} />
          </a>
        </li>
        <li className="w-fit text-base mr-[26px]">
          <a className="group py-5 text-black" href='/'>
            <FontAwesomeIcon className="w-4" icon={faHeart} />
          </a>
        </li>
      </ul>
    </div>
  )
}

function MiniMenu() {
  const [isMiniMenuOpen, setIsMiniMenuOpen] = useState(false);

  return (
    <div id='mobile-navbar-minimenu' className={`bg-zinc-600 p-[5px] text-zinc-50 ${isMiniMenuOpen ? "max-h-56" : "max-h-14"} transition-all duration-500`}>
      <button onClick={() => setIsMiniMenuOpen(!isMiniMenuOpen)} className='bg-zinc-800 float-right m-[5px] py-1.5 px-3 flex items-center rounded'>
        <span className='mr-2 uppercase font-bold'>Menu</span>
        <div className="flex flex-col items-center">
          <div className="w-5 h-0.5 mb-1 bg-zinc-50 rounded-sm" />
          <div className="w-5 h-0.5 mb-1 bg-zinc-50 rounded-sm" />
          <div className="w-5 h-0.5 bg-zinc-50 rounded-sm" />
        </div>
      </button>
      <div className="clear-both" >
        <ul className='ml-5'>
          <li className='py-[5px] px-[10px] my-[2px] mx-[5px] text-sm'>Home</li>
          <li className='py-[5px] px-[10px] my-[2px] mx-[5px] text-sm'>Shop</li>
          <li className='py-[5px] px-[10px] my-[2px] mx-[5px] text-sm'>Pages</li>
          <li className='py-[5px] px-[10px] my-[2px] mx-[5px] text-sm'>Blog</li>
          <li className='py-[5px] px-[10px] my-[2px] mx-[5px] text-sm'>Contacts</li>
        </ul>
      </div>
    </div>
  )
}