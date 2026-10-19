import { getCategoryList } from "../data/category-persistence.js"

export const getCategoryData = () => {
  return getCategoryList();
}