import React, { useState } from 'react'
import { IGeneralInfo } from '../../../FeaturedProducts/types/interfaces'
import useFilters from '../hooks/useFilters'

interface IColorsListProps {
  colors: string[]
  setFilteredProducts: (products: IGeneralInfo[]) => void
  products: IGeneralInfo[]
}

function ColorsList({ colors, setFilteredProducts, products }: IColorsListProps) {
  const [isMenuOpen, setisMenuOpen] = useState(true)

  const { handleFilter } = useFilters()

  const handleClick = (e: any) => {
    setFilteredProducts(handleFilter(e.target.id, products, "colors"))
  }

  return (
    <div>
      <button onClick={() => setisMenuOpen(!isMenuOpen)} className='uppercase font-bold text-base'>
        Colors
      </button>
      <div className='pt-[10px] pb-5'>
        <ul className={`${isMenuOpen ? `max-h-56` : `max-h-0`} transition-all duration-500 flex flex-wrap xl:justify-end space-x-4`} >
          {colors.map((color: string) => (
            <div className="pt-[15px] mb-[10px]" key={color}>
              <button
                className="relative rounded-full w-[30px] h-[30px] after:content-[''] after:w-9 after:h-9 after:absolute after:-top-[3px] after:-left-[3px] after:border-[1px] after:border-gray-400 after:rounded-full"
                style={{ backgroundColor: color }}
                id={color}
                onClick={(e) => handleClick(e)}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ColorsList