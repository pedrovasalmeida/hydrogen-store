import React, { Suspense } from 'react'
import BoxFallback from '../components/Layout/BoxFallback/BoxFallback'
import FeaturedCollectionBox from '../components/FeaturedCollections/FeaturedCollectionsBox.server'
import FeaturedProductsBox from '../components/FeaturedProducts/FeaturedProducts.server'
import Layout from '../components/Layout/Layout.server'
import SliderHero from '../components/Layout/SliderHero/SliderHero.server'

export default function Home({ country = { isoCode: 'US' } }) {
  return (
    <Layout hero={<SliderHero />}>
      <Suspense fallback={<BoxFallback />}>
        <FeaturedCollectionBox country={country} />
      </Suspense>
      <Suspense fallback={<BoxFallback />}>
        <FeaturedProductsBox />
      </Suspense>
    </Layout>
  )
}