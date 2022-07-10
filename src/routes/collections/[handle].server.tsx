import React from 'react'
import { gql, useShop, useShopQuery } from '@shopify/hydrogen'
import Breadcrumbs from '../../components/Layout/Breadcrumbs/Breadcrumbs.client'
import Layout from '../../components/Layout/Layout.server'
import { IPLPQuery } from '../../components/PLP/FilterBar/types/interfaces'
import PLP from '../../components/PLP/PLP.client'
import filterUtils from './utils/filterUtils'

export default function Collections(
  {
    country = { isoCode: 'US' },
    collectionProductCount = 9,
    params,
  }: any
) {
  const { defaultLanguageCode } = useShop();
  const { handle } = params

  const data = useShopQuery({
    query: PLPQUERY,
    variables: {
      handle,
      country: country.isoCode,
      language: defaultLanguageCode,
      numProducts: collectionProductCount,
      cursor: null,
    },
  }).data as IPLPQuery

  const collectionArr = data.collection;
  const ProductsCollection = collectionArr.products;

  const Products = ProductsCollection.edges.map(product => {
    return product.node
  });

  const { getColors, getSizes, getTags, getVariants } = filterUtils()

  const variants = getVariants(Products);
  const sizes = getSizes(variants);
  const colors = getColors(variants);
  const tags = getTags(variants);

  return (
    <Layout breadcrumbs={<Breadcrumbs />}>
      <PLP colors={colors} sizes={sizes} tags={tags} Products={Products} />
    </Layout>
  )
}

const PLPQUERY = gql`
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $numProducts: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      title
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $numProducts, after: $cursor) {
        edges {
          node {
            title
            handle
            compareAtPriceRange {
              maxVariantPrice {
                currencyCode
                amount
              }
              minVariantPrice {
                currencyCode
                amount
              }
            }
            variants(first: 10) {
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
                  product {
                    tags
                    priceRange {
                      maxVariantPrice {
                        amount
                      }
                      minVariantPrice {
                        amount
                      }
                    }
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;