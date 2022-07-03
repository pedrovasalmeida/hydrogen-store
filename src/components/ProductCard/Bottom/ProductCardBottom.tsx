import React from 'react'
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProductCardBottomAddToCartProps, IVariant } from '../../FeaturedProducts/types/interfaces';
import MoneyCompareAtPrice from '../../MoneyComponents/CompareAtPrice';
import MoneyPrice from '../../MoneyComponents/MoneyPrice';

interface IProductCardBottomProps {
  title: string
  selectedVariant: IVariant
}

export default function ProductCardBottom({ title, selectedVariant }: IProductCardBottomProps) {
  return (
    <div className="pt-7 relative">
      <ProductCardBottomAddToCart title={title}/>
      <ProductCardBottomRating />
      <ProductCardBottomPrice selectedVariant={selectedVariant} />
    </div>
  );
}

function ProductCardBottomAddToCart({title}: IProductCardBottomAddToCartProps) {
  return (
    <>
      <h6 className="text-black font-semibold text-base mt-1 group-hover:opacity-0 transition-all duration-300">
        {title}
      </h6>
      <button className="absolute text-red-500 font-bold text-base -translate-y-16 opacity-0 group-hover:opacity-100 group-hover:-translate-y-7 transition-all duration-300">
        + Add to cart
      </button>
    </>
  );
}

function ProductCardBottomPrice({ selectedVariant }: any) {
  return (
    <div className="flex ">
      {selectedVariant.compareAtPriceV2 && (
        <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
      )}
      <MoneyPrice money={selectedVariant.priceV2} />
    </div>
  );
}

function ProductCardBottomRating() {
  return (
    <div className="flex mb-[6px]">
      <FontAwesomeIcon className="w-4" icon={faStar} />
      <FontAwesomeIcon className="w-4" icon={faStar} />
      <FontAwesomeIcon className="w-4" icon={faStar} />
      <FontAwesomeIcon className="w-4" icon={faStar} />
      <FontAwesomeIcon className="w-4" icon={faStar} />
    </div>
  );
}