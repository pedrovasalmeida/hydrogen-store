export interface IFeaturedCollectionsBoxQuery {
  collections: IEdges
}

interface IEdges {
  edges: IEdgesArr[]
}

interface IEdgesArr {
  node: {
    collections: ICollections
  }
}

export interface ICollections {
  handle: string
  id: string
  title: string
  image: {
    id: string
    url: string
    altText: any
    width: number
    height: number
  }
  products: IProductsEdges
}

interface IProductsEdges {
  edges: IProductsEdgesArr[]
}

interface IProductsEdgesArr {
  node: {
    handle: string
    id: string
    title: string
    variants: IVariantEdges
  }
}

interface IVariantEdges {
  edges: IVariantEdgesArr[]
}

interface IVariantEdgesArr {
  node: {
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
}

export interface IFeaturedCollectionProps {
  collections: ICollections[]
}

export interface ICollectionElementProps {
  collection: ICollections
  isAbsolute: boolean
  order?: string
}