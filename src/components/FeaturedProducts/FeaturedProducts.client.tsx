import React, { Suspense, useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { IFeaturedProductsProps, IFeaturedProductsTitlesProps, IGeneralInfo } from './types/interfaces';

export default function FeaturedProducts({
  featuredProducts,
  uniqueCollections,
}: IFeaturedProductsProps) {
  const [collections, setCollections] = useState<IGeneralInfo[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<IGeneralInfo[]>([]);
  const [activeCollections, setActiveCollections] = useState('SALE');

  useEffect(() => {
    setCollections(featuredProducts);
    setFilteredCollections(featuredProducts);
  }, [featuredProducts]);

  useEffect(() => {
    if (activeCollections === 'SALE') {
      setFilteredCollections(collections);
      return;
    }

    const filteredProducts = collections.filter((collection: IGeneralInfo) => {
      const filteredVariants = collection.variants.edges[0].node

      const filteredCollectionsTitle = filteredVariants.product.collections.edges[0].node.title

      return filteredCollectionsTitle === activeCollections;
    });

    setFilteredCollections(filteredProducts);
  }, [activeCollections, collections]);

  return (
    <>
      <FeaturedProductsTitles
        activeCollections={activeCollections}
        setActiveCollections={setActiveCollections}
        uniqueCollections={uniqueCollections}
      />
      <Suspense>
        <motion.div
          layout
          className="flex flex-col md:flex-row flex-wrap mb-8"
        >
          <AnimatePresence>
            {filteredCollections.map((product: IGeneralInfo) => (
              <ProductCard key={product.id} handle={product.handle} title={product.title} variants={product.variants} id={product.id} />
            ))}
          </AnimatePresence>
        </motion.div>
      </Suspense>
    </>
  );
}

function FeaturedProductsTitles({
  uniqueCollections,
  activeCollections,
  setActiveCollections,
}: IFeaturedProductsTitlesProps) {
  const handleSelectCollections = (e: any) => {
    setActiveCollections(e.target.textContent);
  };

  return (
    <div className="flex items-center justify-between md:justify-center mb-11 text-md font-bold">
      {uniqueCollections.map((uniqueCollection: string) => (
        <button
          onClick={(e) => handleSelectCollections(e)}
          key={uniqueCollection}
          className={
            activeCollections === uniqueCollection
              ? 'text-black text-xl font-bold mr-4 md:mr-[88px] last:mr-0 md:last:mr-0'
              : 'text-gray-400 text-xl font-bold mr-4 md:mr-[88px] last:mr-0 md:last:mr-0'
          }
        >
          {uniqueCollection}
        </button>
      ))}
    </div>
  );
}
