import React, { useState } from 'react'

interface ICategoryListProps {
  tags: string[]
}

function CategoryList({ tags }: ICategoryListProps) {
  const [isMenuOpen, setisMenuOpen] = useState(true)

  return (
    <div>
      <button onClick={() => setisMenuOpen(!isMenuOpen)} className='uppercase font-bold text-base'>
        Categories
      </button>
      <div className='pt-[10px] pb-5'>
        <ul className={`${isMenuOpen ? `max-h-56` : `max-h-0`} overflow-y-scroll transition-all duration-500`} >
          {tags.map((tag: string) => (
            <li>
              <p className='text-base leading-8'>{tag.charAt(0).toUpperCase() + tag.slice(1)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CategoryList