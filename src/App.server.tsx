import React from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, FileRoutes, ShopifyProvider} from '@shopify/hydrogen';
import {Suspense} from 'react';
import MiniCart from './components/MiniCart/index';

import shopifyConfig from '../hydrogen.config';
import {CartProvider} from './hooks/cartContext.client';

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider shopifyConfig={shopifyConfig.shopify}>
        <CartProvider>
          <MiniCart />
          <Router>
            <FileRoutes />
          </Router>
        </CartProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
