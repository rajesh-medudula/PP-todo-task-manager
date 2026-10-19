// data
import { getCategoryData } from "../../application/category.js";
// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
// components
import { createCategoryItem } from "./category-item.js";

const createCategoryList = (categories) => {
  const list = document.createElement("div");
  list.className = "category-selection__list";
  list.setAttribute("data-id", "2");

  categories.forEach((category) => {
    list.append(createCategoryItem(category.name, category.id));
  });

  list.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    list.setAttribute("data-id", id);
  });

  return list;
};

export const createCategorySelection = () => {
  // data
  const categories = getCategoryData();

  const body = document.createElement("section");
  body.className = "category-selection";

  const label = document.createElement("label");
  label.className = "category-selection__label";
  label.textContent = "Category";

  const addCategoryBtn = document.createElement("button");
  addCategoryBtn.classList = "category-selection__add-btn";
  addCategoryBtn.innerHTML = `${getGlobalAsset("plus-icon")} New category`;

  body.append(label);
  body.append(createCategoryList(categories));
  body.append(addCategoryBtn);

  return body;
};
