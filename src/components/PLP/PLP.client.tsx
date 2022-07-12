import React, { useState } from 'react'
import FilterBar from './FilterBar/FilterBar'
import OrderBar from './OrderBar/OrderBar.client'
import PLPPagination from './Pagination/PLPPagination'
import ProductsList from './ProductsList/ProductsList.client'
import { IPlpProps } from './types/interfaces'

export default function PLP({ tags, sizes, colors, Products }: IPlpProps) {
  const [filteredProducts, setFilteredProducts] = useState(Products)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(5)

  const lastProductIndex = currentPage * productsPerPage
  const firstProductIndex = lastProductIndex - productsPerPage
  const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex)

  const handlePaginate = (number: number) => setCurrentPage(number)

  return (
    <section className='flex flex-col xl:flex-row xl:max-w-[1170px] xl:mx-auto'>
      <FilterBar tags={tags} sizes={sizes} colors={colors} products={Products} setFilteredProducts={setFilteredProducts
      } />
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <OrderBar lastProductIndex={lastProductIndex} totalProducts={filteredProducts.length} firstProductIndex={firstProductIndex + 1} />
        <ProductsList products={currentProducts} />
        <PLPPagination handlePaginate={handlePaginate} productsPerPage={productsPerPage} totalPosts={filteredProducts.length} />
      </div>
    </section>
  )
}
