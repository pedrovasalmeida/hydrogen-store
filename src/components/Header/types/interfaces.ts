import { UseShopQueryResponse } from "@shopify/hydrogen";

export interface IMenuHeaderDataProps extends UseShopQueryResponse<unknown> {
  menu: IItems
}

export interface IItems {
  items: IItemsArr[]
}

export interface IItemsArr {
  id: string
  tags: any[]
  title: string
  url: string
}