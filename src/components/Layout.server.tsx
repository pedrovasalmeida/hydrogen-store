import { gql, LocalizationProvider, useShop, useShopQuery } from '@shopify/hydrogen';
import React, { ReactNode, Suspense } from 'react'
import Footer from './Footer/Footer.server';
import { IMenuFooterDataProps } from './Footer/types/interfaces';

interface ILayoutProps {
  children: ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  const { defaultLanguageCode } = useShop();

  const { shop, collections, products } = useShopQuery({
    query: QUERY,
    variables: {
      language: defaultLanguageCode,
      numCollections: 3,
    },
    preload: '*',
  }).data as IMenuFooterDataProps;

  const { data: menudata } = useShopQuery({
    query: MENUQUERY,
    variables: {
      menuName: 'main-menu',
    },
  }); 

  const flattenedCollections = collections.edges.flatMap((item) => item.node)
  const footerProductHandle = products.edges[0].node.handle
  const storeName = shop.name;

  return (
    <LocalizationProvider>
      <div className="min-h-screen max-w-screen text-gray-700 font-site">
        {/* TODO: Find out why Suspense needs to be here to prevent hydration errors. */}
        <Suspense fallback={null}>
          {/* <Header
            collections={collections}
            storeName={storeName}
            menuItems={menuItems}
          />
          <Cart /> */}
        </Suspense>
        <main role="main" id="mainContent" className="relative">
          {/* {hero} */}
          <div className="mx-auto max-w-7xl p-4 md:py-5 md:px-8 xl:pt-0">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </main>
        <Suspense>
          <Footer
            collectionHandle={flattenedCollections[0].handle}
            productHandle={footerProductHandle}
          />
        </Suspense>
      </div>
    </LocalizationProvider>
  );
}

const QUERY = gql`
  query layoutContent($language: LanguageCode, $numCollections: Int!)
  @inContext(language: $language) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
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
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;

const MENUQUERY = gql`
  query menucontext($menuName: String!) {
    menu(handle: $menuName) {
      items {
        id
        tags
        title
        url
      }
    }
  }
`;

export default Layout