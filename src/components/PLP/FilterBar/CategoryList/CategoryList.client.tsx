import React, { useState } from 'react'
import { IGeneralInfo } from '../../../FeaturedProducts/types/interfaces'
import useFilters from '../hooks/useFilters'

interface ICategoryListProps {
  tags: string[]
  setFilteredProducts: (products: IGeneralInfo[]) => void
  products: IGeneralInfo[]
}

function CategoryList({ tags, setFilteredProducts, products }: ICategoryListProps) {
  const [isMenuOpen, setisMenuOpen] = useState(true)

  const { handleFilter } = useFilters()

  const handleClick = (e: any) => {
    const { textContent: content } = e.target as HTMLButtonElement
    setFilteredProducts(handleFilter(content, products, "category"))
  }

  return (
    <div>
      <button onClick={() => setisMenuOpen(!isMenuOpen)} className='uppercase font-bold text-base'>
        Categories
      </button>
      <div className='pt-[10px] pb-5'>
        <ul className={`${isMenuOpen ? `max-h-56` : `max-h-0`} overflow-y-scroll transition-all duration-500`} >
          {tags.map((tag: string) => (
            <li key={tags.indexOf(tag)}>
              <button onClick={(e) => handleClick(e)
              } className='text-base leading-8'>{tag.charAt(0).toUpperCase() + tag.slice(1)}</button>
            </li>
          ))}
        </ul>
      </div>
    </div >
  )
}

export default CategoryList