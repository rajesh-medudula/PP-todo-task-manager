import { getItem } from "../../data/storage-manager.js";
import { getGlobalAsset } from "../../assets/svg/global.js";
import { createCategoryItem } from "./category-item.js";

const categories = getItem("appData").data.categories;

const body = document.createElement("section");
body.className = "category-selection";

const createCategoryList = () => {
  const list = document.createElement("div");
  list.className = "category-selection__list";
  list.setAttribute("data-id", "2");
  
  categories.forEach(category => {
    list.append(createCategoryItem(category.name, category.id));
  });

  list.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    list.setAttribute("data-id", id);
  })

  return list;
}

export const createCategorySelection = () => {
  const label = document.createElement("label");
  label.className = "category-selection__label";
  label.textContent = "Category";

  const button = document.createElement("button");
  button.classList = "category-selection__add-btn";
  button.innerHTML = `${getGlobalAsset("plus-icon")} New category`; 

  body.append(label);
  body.append(createCategoryList());
  body.append(button);

return body;
}



