import { CacheLong, gql, LocalizationProvider, useShop, useShopQuery } from '@shopify/hydrogen';
import React, { ReactNode, Suspense } from 'react'
import BoxFallback from './BoxFallback/BoxFallback';
import Footer from './Footer/Footer.server';
import { IMenuFooterDataProps } from './Footer/types/interfaces';
import Header from './Header/Header.server';
import { IMenuHeaderDataProps } from './Header/types/interfaces';

interface ILayoutProps {
  children: ReactNode
  hero?: ReactNode
  breadcrumbs?: ReactNode
}

const Layout = ({ children, hero, breadcrumbs }: ILayoutProps) => {
  const { defaultLanguageCode } = useShop();

  const { collections, products } = useShopQuery({
    query: QUERY,
    variables: {
      language: defaultLanguageCode,
      numCollections: 3,
    },
    preload: '*',
    cache: CacheLong()
  }).data as IMenuFooterDataProps;

  const { menu } = useShopQuery({
    query: MENUQUERY,
    variables: {
      menuName: 'main-menu',
    },
    cache: CacheLong()
  }).data as IMenuHeaderDataProps;

  const flattenedCollections = collections.edges.flatMap((item) => item.node)
  const footerProductHandle = products.edges[0].node.handle
  const headerMenuItems = menu.items.map(item => (item))

  return (
    <LocalizationProvider>
      <div className="min-h-screen max-w-screen text-gray-700 font-site">
        <Suspense fallback={<BoxFallback />}>
          <Header items={headerMenuItems}/>
        </Suspense>
        <main role="main" id="mainContent" className="relative">
          <Suspense fallback={<BoxFallback />}>
            {hero}
          </Suspense>
          <Suspense>
            {breadcrumbs}
          </Suspense>
          <div className="mx-auto max-w-7xl p-4 md:px-8 xl:pt-[100px] pb-[55px]">
            <Suspense fallback={<BoxFallback />}>{children}</Suspense>
          </div>
        </main>
        <Suspense fallback={<BoxFallback />}>
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