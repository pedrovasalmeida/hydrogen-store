import { UseShopQueryResponse } from "@shopify/hydrogen"

export interface IMenuFooterDataProps extends UseShopQueryResponse<unknown> {
  shop: {name: string}
  collections: ICollectionEdges
  products: IProductEdge
}

interface IProductEdge {
  edges: IProductNode[]
}

interface IProductNode {
  node: IProductHandle
}

interface IProductHandle {
  handle: string;
}

interface ICollectionEdges {
  edges: ICollectionNode[]
}

export interface ICollectionNode {
  node: ICollectionNodeInfo
}

interface ICollectionNodeInfo {
  description: string,
  handle: string,
  id: string,
  title: string
  image: IImage
}

interface IImage {
  id: string,
  url: string,
  altText: string | null,
  width: number,
  height: number
}

export interface IFooterProps {
  collectionHandle: string
  productHandle: string
}