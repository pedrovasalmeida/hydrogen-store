import { IGeneralInfo } from './../../../components/FeaturedProducts/types/interfaces';

export default function filterUtils() {
  const getVariants = (products: any) =>
    products.map((product: any) => getProductVariants(product));

  const getProductVariants = (product: any) => product.variants.edges.map((edge: any) => edge.node)

  const getSizes = (variants: any) => {
    const sizesArr = variants.flatMap((variant: any): String[] => variant.map((variantSubItem: any) => variantSubItem.title.split(' / ')[0]))

    return Array.from(new Set<string>(sizesArr))
  }

  const getColors = (variants: any) => {
    const colorsArr = variants.flatMap((variant: any) => variant.map((variantSubItem: any) => variantSubItem.title.split(' / ')[1]))

    return Array.from(new Set<string>(colorsArr))
  }

  const getTags = (variants: any) => {
    const tagsArr = variants.flatMap((variant: any) => {
      return variant.flatMap((variantSubItem: any) => variantSubItem.product.tags)
    })
    return Array.from(new Set<string>(tagsArr))
  }

  const filterSizes = (variants: IGeneralInfo[]): string[] =>
    variants.map((variant: IGeneralInfo) => variant.title.split(' / ')[0]);
  const filterColors = (variants: IGeneralInfo[]): string[] =>
    variants.map((variant: any) => variant.title.split(' / ')[1]);
  const filterTags = (variants: IGeneralInfo[]): string[] =>
    variants.map((variant: any) => variant.product.tags).flat();

  return { getVariants, getProductVariants, getSizes, getColors, getTags, filterColors, filterSizes, filterTags }
}