import { IFeaturedProductsQuery } from "../../../FeaturedProducts/types/interfaces";

export interface IPLPQuery extends IFeaturedProductsQuery {
  compareAtPriceRange: {
    maxVariantPrice: {
      currencyCode: "BRL",
      amount: "99.95"
    },
    minVariantPrice: {
      currencyCode: "BRL",
      amount: "99.95"
    }
  }
}