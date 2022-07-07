import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryList from './CategoryList/CategoryList.client'
import SizesList from './SizesList/SizesList.client'
import ColorsList from './ColorsList/ColorsList.client'

interface IFilterBarProps {
  sizes: string[]
  colors: string[]
  tags: string[]
}

export default function FilterBar({ sizes, colors, tags }: IFilterBarProps) {
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
        <CategoryList tags={tags} />
        <SizesList sizes={sizes} />
        <ColorsList colors={colors}/>
      </div>
    </aside>
  )
}