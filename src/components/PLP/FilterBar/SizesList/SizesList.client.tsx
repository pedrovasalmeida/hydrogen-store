import React, { useState } from 'react'

interface ISizesListProps {
  sizes: string[]
}

function SizesList({ sizes }: ISizesListProps) {
  const [isMenuOpen, setisMenuOpen] = useState(true)

  return (
    <div>
      <button onClick={() => setisMenuOpen(!isMenuOpen)} className='uppercase font-bold text-base'>
        Sizes
      </button>
      <div className='pt-[10px] pb-5'>
        <ul className={`${isMenuOpen ? `max-h-56` : `max-h-0`} overflow-y-scroll transition-all duration-500`} >
          {sizes.map((size: string) => (
            <button
              className="min-w-[70px] px-[25px] py-[6px] border-[1px] border-gray-400 mb-[10px] mr-[5px]"
              key={size}
            // onClick={(e) => handleSizeFilter(e.target.textContent)}
            >
              <p className="text-[15px] font-bold text-center">{size}</p>
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SizesList