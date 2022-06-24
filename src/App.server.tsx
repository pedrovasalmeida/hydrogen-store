import React from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, FileRoutes, ShopifyProvider} from '@shopify/hydrogen';
import {Suspense} from 'react';
import MiniCart from './components/MiniCart/index';

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <MiniCart />
        <Router>
          <FileRoutes />
        </Router>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
