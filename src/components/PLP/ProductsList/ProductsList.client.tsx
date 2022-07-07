import React from 'react'
import { IGeneralInfo } from '../../FeaturedProducts/types/interfaces'
import ProductCard from '../../ProductCard/ProductCard';

interface IProductListProps {
  products: IGeneralInfo[]
}

function ProductsList({ products }: IProductListProps) {
  return (
    <div className='space-y-10 flex flex-col justify-center md:flex-row md:flex-wrap md:space-y-0 w-full px-4'>
      {products.map(product => (
        <div className='w-full md:max-w-1/2 md:flex-half xl:flex-33 xl:max-w-33' key={product.id}>
          <ProductCard key={product.id} handle={product.handle} id={product.id} title={product.title} variants={product.variants} flex='full' maxWidth='full' />
        </div>
      ))}
    </div>
  )
}

export default ProductsList