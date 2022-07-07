import React, {Suspense} from 'react';
import BoxFallback from '../components/BoxFallback/BoxFallback';
import FeaturedCollectionBox from '../components/FeaturedCollections/FeaturedCollectionsBox.server';
import FeaturedProductsBox from '../components/FeaturedProducts/FeaturedProducts.server';
import Layout from '../components/Layout.server';
import SliderHero from '../components/SliderHero/SliderHero.server';

export default function Home({country = {isoCode: 'US'}}) {
  return (
    <Layout hero={<SliderHero />}>
      <Suspense fallback={<BoxFallback />}>
        <FeaturedCollectionBox country={country} />
      </Suspense>
      <Suspense fallback={<BoxFallback />}>
        <FeaturedProductsBox />
      </Suspense>
    </Layout>
  );
}
