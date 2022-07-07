import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowsLeftRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from '@shopify/hydrogen/client';
import React from 'react'

export default function ProductCardTop({selectedVariant}: any) {
  return (
    <div className="xl:h-64 relative flex items-center justify-center overflow-hidden object-cover h-96">
      <ProductCardTopImage selectedVariant={selectedVariant} />
      <ProductCardTopWishList />
    </div>
  );
}

function ProductCardTopImage({selectedVariant}: any) {
  return (
    <>
      {selectedVariant.image ? (
        <Image
          alt='product top card image'
          className="bg-white absolute xl:h-64 w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover object-center object-contain"
          data={selectedVariant.image}
        />
      ) : null}
      {!selectedVariant?.availableForSale && (
        <div className="absolute tracking-wide top-8 left-0 text-sm font-bold bg-black text-white py-2 px-4">
          Out of stock
        </div>
      )}
    </>
  );
}

function ProductCardTopWishList() {
  return (
    <ul className="absolute top-5 -right-[200px] group-hover:right-3 transition-all duration-700">
      <li className="mb-[10px] p-[10px] bg-white">
        <FontAwesomeIcon className="w-4" icon={faHeart} />
      </li>
      <li className="mb-[10px] p-[10px] bg-white">
        <FontAwesomeIcon className="w-4" icon={faArrowsLeftRight} />
      </li>
      <li className="mb-[10px] p-[10px] bg-white">
        <FontAwesomeIcon className="w-4" icon={faMagnifyingGlass} />
      </li>
    </ul>
  );
}
