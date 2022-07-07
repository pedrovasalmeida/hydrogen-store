import React from 'react'
import FilterBar from './FilterBar/FilterBar'
import OrderBar from './OrderBar/OrderBar.client'
import PLPPagination from './Pagination/PLPPagination'
import ProductsList from './ProductsList/ProductsList.client'
import { IPlpProps } from './types/interfaces'

export default function PLP({ tags, sizes, colors, Products }: IPlpProps) {
  return (
    <section className='flex flex-col xl:flex-row xl:max-w-[1170px] xl:mx-auto'>
      <FilterBar tags={tags} sizes={sizes} colors={colors} />
      <div className='flex flex-col justify-center items-center'>
        <OrderBar/>
        <ProductsList products={Products} />
        <PLPPagination />
      </div>
    </section>
  )
}
