
// creates category list items.
export const createCategoryItem = (item, categoryId, index, id) => {
  const button = document.createElement("button");
  button.className = "category-selection__item";
  // default selection
  if (categoryId == id) {
    button.classList.add("category-selection__item--active");
  }
  button.setAttribute("data-id", categoryId);
  button.innerHTML = `${item}`;

  return button;
}