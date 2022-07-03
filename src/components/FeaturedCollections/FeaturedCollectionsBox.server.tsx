import React from 'react'
import { flattenConnection, gql, useShop, useShopQuery } from "@shopify/hydrogen";
import FeaturedCollection from "./FeaturedColletions";
import { IFeaturedCollectionsBoxQuery } from './types/interfaces';

export default function FeaturedCollectionBox({country}: any) {
  const {defaultLanguageCode} = useShop();

  const data = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: defaultLanguageCode,
    },
    preload: true,
  }).data as IFeaturedCollectionsBoxQuery;
  

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollections =
    collections && collections.length > 1 ? collections : collections[0]
  
  return <FeaturedCollection collections={featuredCollections} />;
}

const QUERY = gql`
  query indexContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 3) {
      edges {
        node {
          handle
          id
          title
          image {
            id
            url
            altText
            width
            height
          }
          products(first: 3) {
            edges {
              node {
                handle
                id
                title
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
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
    }
  }
`;
