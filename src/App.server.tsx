import React from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, FileRoutes, ShopifyProvider} from '@shopify/hydrogen';
import {Suspense} from 'react';
import shopifyConfig from '../hydrogen.config';
import {CartProvider} from './hooks/cartContext.client';
import 'dotenv/config';
import BoxFallback from './components/BoxFallback/BoxFallback';

function App() {
  return (
    <Suspense fallback={<BoxFallback />}>
      <ShopifyProvider shopifyConfig={shopifyConfig.shopify}>
        <CartProvider>
          <Router>
            <FileRoutes />
          </Router>
        </CartProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
