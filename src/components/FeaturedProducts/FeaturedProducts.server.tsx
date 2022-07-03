import React from 'react'
import { gql, useShop, useShopQuery } from '@shopify/hydrogen';
import { IFeaturedProductsQuery, IVariantEdgesArr } from './types/interfaces';
import FeaturedProducts from './FeaturedProducts.client';

export default function FeaturedProductsBox({ country = { isoCode: 'US' } }) {
  const { defaultLanguageCode } = useShop();

  const data = useShopQuery({
    query: SALEPRODUCTS,
    variables: {
      country: country.isoCode,
      language: defaultLanguageCode,
    },
    preload: true,
  }).data as IFeaturedProductsQuery;

  const collectionArr = data.collection;
  const featuredProductsCollection = collectionArr.products;

  const featuredProducts = featuredProductsCollection.edges.map(product => {
    return product.node
  });

  const collections = featuredProducts
    .map((product) => {
      return product.variants.edges
    })
    .flat()
    .map((variant: IVariantEdgesArr) => {      
      return variant.node.product.collections.edges[0].node.title
    })
  
  collections.push(data.collection.title);
  const uniqueCollections = [...new Set(collections)].reverse();

  return (
    <div className="bg-white px-4 xl:max-w-[1170px] mx-auto">
      {featuredProductsCollection ? (
        <FeaturedProducts
          uniqueCollections={uniqueCollections}
          featuredProducts={featuredProducts}
        />
      ) : null}
    </div>
  );
}

const SALEPRODUCTS = gql`
  query indexSaleContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collection(handle: "sale") {
      title
      products(first: 10) {
        edges {
          node {
            handle
            id
            title
            variants(first: 1) {
              edges {
                node {
                  product {
                    collections(first: 1) {
                      edges {
                        node {
                          title
                        }
                      }
                    }
                  }
                  id
                  title
                  availableForSale
                  sku
                  image {
                    id
                    url
                    altText
                    width
                    height
                  }
                  priceV2 {
                    currencyCode
                    amount
                  }
                  compareAtPriceV2 {
                    currencyCode
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
