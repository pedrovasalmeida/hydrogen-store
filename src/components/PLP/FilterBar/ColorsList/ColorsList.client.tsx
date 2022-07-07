import React, { useState } from 'react'

interface IColorsListProps {
  colors: string[]
}

function ColorsList({ colors }: IColorsListProps) {
  const [isMenuOpen, setisMenuOpen] = useState(true)

  return (
    <div>
      <button onClick={() => setisMenuOpen(!isMenuOpen)} className='uppercase font-bold text-base'>
        Colors
      </button>
      <div className='pt-[10px] pb-5'>
        <ul className={`${isMenuOpen ? `max-h-56` : `max-h-0`} overflow-y-scroll transition-all duration-500 flex space-x-4`} >
          {colors.map((color: string) => (
            <div className="pt-[15px] mb-[10px]" key={color}>
              <button
                className="relative rounded-full w-[30px] h-[30px] after:content-[''] after:w-9 after:h-9 after:absolute after:-top-[3px] after:-left-[3px] after:border-[1px] after:border-gray-400 after:rounded-full"
                style={{ backgroundColor: color }}
                id={color}
                // onClick={(e) => handleColorFilter(e.target.id)}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ColorsList