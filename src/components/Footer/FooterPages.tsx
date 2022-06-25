import React from 'react'
import { IFooterProps } from './types/interfaces';

export default function FooterPages({collectionHandle,productHandle}: IFooterProps) {
  return (
    <div className="mb-[30px] md:flex-a-quarter md:max-w-a-quarter md:px-[15px] xl:flex-16 xl:max-w-16 xl:px-[15px] xl:ml-[8%]">
      <h2 className="text-md font-medium uppercase mb-4">Templates</h2>
      <ul className="mt-8 space-y-4 text-gray-400">
        <li className="flex items-center text-sm font-medium hover:text-gray-900">
          <a href="/home">Home</a>
        </li>
        <li className="flex items-center text-sm font-medium hover:text-gray-900">
          <a href={`/products/${productHandle}`}>Product</a>
        </li>
        <li className="flex items-center text-sm font-medium hover:text-gray-900">
          <a href={`/collections/${collectionHandle}`}>Collection</a>
        </li>
        <li className="flex items-center text-sm font-medium hover:text-gray-900">
          <a href="/404">404</a>
        </li>
      </ul>
    </div>
  );
}