import React, { useState } from 'react'
import MobileNav from './MobileNav';

export default function MobileNavigation() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div id='mobile-navbar-container'>
      <div id='mobile-navbar-background-cover' onClick={() => setIsNavOpen(false)} className={`w-screen h-screen bg-black fixed left-0 top-0 ${isNavOpen ? 'pointer-events-auto' : 'pointer-events-none'} ${isNavOpen ? 'opacity-50' : 'opacity-0'} transition-opacity duration-500`} />
      <button id='mobile-navbar-toggle' className='border border-black rounded-sm h-9 w-9' onClick={() => setIsNavOpen(!isNavOpen)}>
        <div className="flex flex-col items-center">
          <div className="w-5 h-1 mb-1 bg-black rounded-sm" />
          <div className="w-5 h-1 mb-1 bg-black rounded-sm" />
          <div className="w-5 h-1 bg-black rounded-sm" />
        </div>
      </button>
      <MobileNav isNavOpen/>
    </div>
  )
}