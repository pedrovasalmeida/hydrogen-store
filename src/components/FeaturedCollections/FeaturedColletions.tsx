import React from 'react'
import { Image } from '@shopify/hydrogen';
import { ICollectionElementProps, ICollections } from './types/interfaces';

export default function FeaturedCollection({ collections }: any) {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap items-center pb-16 xl:max-w-[1170px] xl:mx-auto xl:px-4">
      {collections.map((collection: ICollections) => {
        if (collections.indexOf(collection) % 2 === 0) {
          if (collections.indexOf(collection) === 0) {
            return (
              <CollectionElement
                key={collection.id}
                collection={collection}
                isAbsolute={true}
                order={'1'}
              />
            );
          } else {
            return (
              <CollectionElement
                key={collection.id}
                collection={collection}
                isAbsolute={true}
                order={'2'}
              />
            );
          }
        } else {
          return (
            <CollectionElement
              key={collection.id}
              collection={collection}
              isAbsolute={false}
              order={'3'}
            />
          );
        }
      })}
    </div>
  );
}

function CollectionElement({collection, isAbsolute, order}: ICollectionElementProps) {
  return (
    <div
      className={
        order === '1'
          ? 'px-4 mt-10 flex flex-col md:relative items-center bg-white overflow-hidden md:w-full md:flex xl:flex-[58.333333%] xl:max-w-[58.333333%] xl:ml-[33%]'
          : order === '2'
          ? 'px-4 mt-10 xl:mt-24 flex flex-col md:relative items-center bg-white overflow-hidden md:w-full md:flex xl:flex-[58.333333%] xl:max-w-[58.333333%]'
          : 'px-4 mt-10 flex flex-col md:relative items-center bg-white overflow-hidden md:w-full md:flex xl:flex-[41.666667%] xl:max-w-[41.666667%] xl:-mt-20'
      }
    >
      <CollectionElementImage collection={collection} isAbsolute={isAbsolute} />
      <CollectionElementText collection={collection} isAbsolute={isAbsolute} />
    </div>
  );
}

function CollectionElementImage({isAbsolute, collection}: ICollectionElementProps) {
  return (
    <>
      {isAbsolute ? (
        <Image className="md:float-right md:self-end" data={collection.image} alt="collection box image"/>
      ) : (
        <Image
          className="md:float-right md:self-start"
          alt="collection box image"
          data={collection.image}
        />
      )}
    </>
  );
}

function CollectionElementText({isAbsolute, collection}: ICollectionElementProps) {
  return (
    <>
      {isAbsolute ? (
        <div className="w-full pt-6 lg:py-0 md:absolute md:bottom-1/2 md:left-[25px]">
          <h2 className="text-black text-4xl font-bold mb-3">
            {collection.title}
          </h2>
          <a
            href={`/collections/${collection.handle}`}
            className="inline-block bg-transparent text-black text-sm font-bold tracking-widest uppercase
          border-b-2 border-black hover:border-red-900"
          >
            Shop Now
          </a>
        </div>
      ) : (
        <div className="w-full pt-6 lg:py-0 md:relative">
          <h2 className="text-black text-4xl font-bold mb-3">
            {collection.title}
          </h2>
          <a
            href={`/collections/${collection.handle}`}
            className="inline-block bg-transparent text-black text-sm font-bold tracking-widest uppercase
          border-b-2 border-black hover:border-red-900"
          >
            Shop Now
          </a>
        </div>
      )}
    </>
  );
}