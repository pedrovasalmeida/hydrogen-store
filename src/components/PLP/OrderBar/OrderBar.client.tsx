import React from 'react'

export default function OrderBar() {
  return (
    <div className='self-start flex flex-col md:flex-row md:items-center md:justify-between space-y-5 md:space-y-0 px-4 mb-11'>
      <div>
        <p>
          Showing 1–12 of 126 results
        </p>
      </div>
      <div className='flex space-x-2'>
        <p>
          Sort by:
        </p>
        <div className='relative font-bold'>
          <button>
            <span>Price(Descending)</span>
            <ul className='absolute max-h-0 overflow-hidden'>
              <li>Price(Ascending)</li>
              <li>Popularity</li>
              <li>Newest Releases</li>
              <li>Biggest Discounts</li>
            </ul>            
          </button>
        </div>
      </div>
    </div>
  )
}