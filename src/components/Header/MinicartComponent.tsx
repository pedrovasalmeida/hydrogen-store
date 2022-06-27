import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function MinicartComponent() {
  return (
    <div id='mobile-navbar-search' className='mb-6 md:mb-0 md:flex-a-quarter md:max-w-a-quarter'>
      <ul className="flex items-center justify-center text-xs space-x-7">
        <li className="w-fit text-base">
          <a className="group py-5 text-black" href='/'>
            <FontAwesomeIcon className="w-4" icon={faMagnifyingGlass} />
          </a>
        </li>
        <li className="w-fit text-base">
          <a className="group py-5 text-black" href='/'>
            <FontAwesomeIcon className="w-4" icon={faHeart} />
          </a>
        </li>
      </ul>
    </div>
  )
}