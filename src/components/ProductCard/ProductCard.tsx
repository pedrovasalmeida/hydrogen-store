import React from 'react'
import ProductCardTop from './Top/ProductCardTop';
import ProductCardBottom from './Bottom/ProductCardBottom';
import { motion } from 'framer-motion';
import { IGeneralInfo } from '../FeaturedProducts/types/interfaces';

export default function ProductCard({ variants, handle, title, maxWidth = "a-quarter", flex = "a-quarter" }: IGeneralInfo) {
  const selectedVariant = variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      className={`text-md md:px-4 mb-4 md:mb-10 relative group w-full md:flex-half xl:flex-${flex} xl:max-w-${maxWidth}`}
    >
      <a href={`/products/${handle}`}>
        <ProductCardTop selectedVariant={selectedVariant} />
        <ProductCardBottom
          title={title}
          selectedVariant={selectedVariant}
        />
      </a>
    </motion.div>
  );
}
