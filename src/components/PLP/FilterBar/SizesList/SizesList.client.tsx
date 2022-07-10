import React, { useState } from 'react'
import { IGeneralInfo } from '../../../FeaturedProducts/types/interfaces'
import useFilters from '../hooks/useFilters'

interface ISizesListProps {
  sizes: string[]
  setFilteredProducts: (products: IGeneralInfo[]) => void
  products: IGeneralInfo[]
}

function SizesList({ sizes, setFilteredProducts, products }: ISizesListProps) {
  const [isMenuOpen, setisMenuOpen] = useState(true)

  const { handleFilter } = useFilters()

  const handleClick = (e: any) => {
    const { textContent: content } = e.target as HTMLButtonElement
    setFilteredProducts(handleFilter(content, products, "sizes"))
  }

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
              onClick={(e) => handleClick(e)}
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