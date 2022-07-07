import { gql, useShop, useShopQuery } from '@shopify/hydrogen'
import React from 'react'
import Breadcrumbs from '../../components/Layout/Breadcrumbs/Breadcrumbs.client'
import Layout from '../../components/Layout/Layout.server'
import FilterBar from '../../components/PLP/FilterBar/FilterBar.server'
import { IPLPQuery } from '../../components/PLP/FilterBar/types/interfaces'
import ProductsList from '../../components/PLP/ProductsList/ProductsList.client'
import { filterUtils } from './utils/filterUtils'

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
      <section className='flex flex-col xl:flex-row'>
        <FilterBar tags={tags} sizes={sizes} colors={colors}/>
        <div>
          <div>
            <div>
              <p>
                Showing 1–12 of 126 results
              </p>
            </div>
            <div>
              Sort by:
              <div>
                <span>Price(Descending)</span>
                <ul>
                  <li>Price(Ascending)</li>
                  <li>Popularity</li>
                  <li>Newest Releases</li>
                  <li>Biggest Discounts</li>
                </ul>
              </div>
            </div>
          </div>
          <ProductsList products={Products} />
          <div>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>
          </div>
        </div>
      </section>
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