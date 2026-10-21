// data
import { getCategoryData } from "../../application/category.js";
// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
// components
import { createCategoryItem } from "./category-item.js";

// set category active style.
const setCategoryItemActive = (element) => {
  try {
    const allCategoryItems = element.querySelectorAll(".category-selection__item");

      allCategoryItems.forEach((categoryItem) => {
        categoryItem.addEventListener("click", (event) => {
          allCategoryItems.forEach((categoryItem) => {
            categoryItem.classList.remove("category-selection__item--active");
          })

          const category = event.currentTarget;
          category.classList.add("category-selection__item--active");
        })
      })

  } catch (error) {
    console.error("Set_Category_Item_Active: Failed to set.", error);
  }
} 

// category list component.
const createCategoryList = (categories) => {
  const list = document.createElement("div");
  list.className = "category-selection__list";
  list.setAttribute("data-id", "2");

  categories.forEach((category, index) => {
    list.append(createCategoryItem(category.name, category.id, index));
  });

  list.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    list.setAttribute("data-id", id);
  });

  setCategoryItemActive(list);

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
