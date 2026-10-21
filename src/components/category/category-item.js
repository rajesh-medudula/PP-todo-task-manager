
// creates category list items.
export const createCategoryItem = (item, id, index) => {
  const button = document.createElement("button");
  button.className = "category-selection__item";
  // default selection
  if (index === 1) {
    button.classList.add("category-selection__item--active");
  }
  button.setAttribute("data-id", id);
  button.innerHTML = `${item}`;

  return button;
}