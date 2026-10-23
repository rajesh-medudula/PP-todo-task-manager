// stores
import { getItem } from "./storage-manager.js";

export const categories = [
  {
    id: 1,
    name: "Personal",
    color: "#E0407E",
    canDelete: false,
  },
  {
    id: 2,
    name: "Work",
    color: "#2B7FFF",
    canDelete: false,
  },
  {
    id: 3,
    name: "Sport",
    color: "#009E60",
    canDelete: false,
  },
  {
    id: 4,
    name: "Travel",
    color: "#D96B00",
    canDelete: false,
  },
  {
    id: 5,
    name: "Health",
    color: "#9B5DE5",
    canDelete: false,
  }
];


export const getCategoryList = () => {
  const categoriesData = getItem("appData")?.data?.categories || categories;

  return categoriesData;
}

