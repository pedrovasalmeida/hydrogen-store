import filterUtils from "../../../../routes/collections/utils/filterUtils"
import { IGeneralInfo } from "../../../FeaturedProducts/types/interfaces"

interface IFilters {
  target: string | null
  products: IGeneralInfo[]
  filterName: string
}

export default function useFilters() {

  const handleFilter = (target: any, products: IGeneralInfo[], filterName: string) => {
    const data = {
      target,
      products,
      filterName
    }

    return filters(data);
  }

  const filters = ({ target, products, filterName }: IFilters) => {
    return products.filter((product: any) => {
      const { filterColors, filterSizes, filterTags, getProductVariants } = filterUtils()

      const variants = getProductVariants(product)

      let Arr: string[] = []

      if (filterName === "category") {
        Arr = filterTags(variants)
      } else if (filterName === "colors") {
        Arr = filterColors(variants)
      } else if (filterName === "sizes") {
        Arr = filterSizes(variants)
      }

      return Arr.find(element => element.toUpperCase() === target?.toUpperCase()) && product
    })
  }

  return { handleFilter }
}