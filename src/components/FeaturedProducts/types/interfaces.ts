export interface IFeaturedProductsQuery {
  collection: {
    title: string
    products: IEdges
  }
}

export interface IFeaturedProductsProps {
  featuredProducts: IGeneralInfo[]
  uniqueCollections: string[]
}

export interface IFeaturedProductsTitlesProps {
  uniqueCollections: string[]
  activeCollections: string
  setActiveCollections: (e: string) => void
}

interface IEdges {
  edges: IEdgesProductArr[]
}

export interface IEdgesProductArr {
  node: IGeneralInfo
}

export interface IGeneralInfo {
  handle: string
  id: string
  title: string
  variants: IVariantEdges
}

interface IVariantEdges {
  edges: IVariantEdgesArr[]
}

export interface IVariantEdgesArr {
  node: IVariant
}

export interface IVariant {
  product: {
    collections: {
      edges: INodeTitleArr[]
    }
  }
  id: string
  title: string
  availableForSale: boolean
  image: {
    id: string
    url: string
    altText: any
    width: number
    height: number
  }
  priceV2: {
    currencyCode: string
    amount: string
  }
  compareAtPriceV2: any
}

interface INodeTitleArr {
  node: {
    title: string
  }
}

export interface IProductCardBottomAddToCartProps {
  title: string
}