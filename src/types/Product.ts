export interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
}

interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}
export interface IProduct {
  description: string;
  compareAtPriceRange: {
    maxVariantPrice: {
      currencyCode: string;
      amount: string;
    };
    minVariantPrice: {
      currencyCode: string;
      amount: string;
    };
  };
  featuredImage: {
    url: string;
    width: number;
    height: number;
    altText: string | null;
  };
  handle: string;
  id: string;
  media: {
    edges: {
      node: {
        mediaContentType: string;
        image: ProductImage;
      };
    }[];
  };
  priceRange: {
    maxVariantPrice: {
      currencyCode: string;
      amount: string;
    };
    minVariantPrice: {
      currencyCode: string;
      amount: string;
    };
  };
  seo: {
    description: string | null;
    title: string | null;
  };
  title: string;
  variants: {
    edges: {
      node: {
        availableForSale: boolean;
        compareAtPriceV2: any;
        id: string;
        image: ProductImage;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        selectedOptions: {
          name: string;
          value: string;
        }[];
        sku: string;
        title: string;
        unitPrice: any;
      };
    }[];
  };
  vendor: string;
}
