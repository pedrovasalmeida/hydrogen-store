import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryList from './CategoryList/CategoryList.client'
import SizesList from './SizesList/SizesList.client'
import ColorsList from './ColorsList/ColorsList.client'
import { IGeneralInfo } from '../../FeaturedProducts/types/interfaces'

interface IFilterBarProps {
  sizes: string[]
  colors: string[]
  tags: string[]
  products: IGeneralInfo[]
  setFilteredProducts: (products: IGeneralInfo[]) => void
}

export default function FilterBar({ sizes, colors, tags, products, setFilteredProducts }: IFilterBarProps) {
  return (
    <aside className='w-full px-4 xl:flex-a-quarter xl:max-w-a-quarter md'>
      <div className='mb-11'>
        <form action="" className='flex border border-zinc-400'>
          <input className='w-full h-10 pl-5 bg-white' type="text" name="" id="" placeholder='Search...' />
          <button className='w-1/6 bg-white text-zinc-400' type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div className='flex flex-col space-y-6'>
        <CategoryList setFilteredProducts={setFilteredProducts} products={products} tags={tags} />
        <SizesList setFilteredProducts={setFilteredProducts} products={products} sizes={sizes} />
        <ColorsList setFilteredProducts={setFilteredProducts} products={products} colors={colors} />
      </div>
    </aside>
  )
}