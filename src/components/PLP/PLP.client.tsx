import React, { useState } from 'react'
import FilterBar from './FilterBar/FilterBar'
import OrderBar from './OrderBar/OrderBar.client'
import PLPPagination from './Pagination/PLPPagination'
import ProductsList from './ProductsList/ProductsList.client'
import { IPlpProps } from './types/interfaces'

export default function PLP({ tags, sizes, colors, Products }: IPlpProps) {

  const [filteredProducts, setFilteredProducts] = useState(Products)

  return (
    <section className='flex flex-col xl:flex-row xl:max-w-[1170px] xl:mx-auto'>
      <FilterBar tags={tags} sizes={sizes} colors={colors} products={Products} setFilteredProducts={setFilteredProducts
      } />
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <OrderBar />
        <ProductsList products={filteredProducts} />
        <PLPPagination />
      </div>
    </section>
  )
}
