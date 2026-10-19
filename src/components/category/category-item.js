
// creates category list items.
export const createCategoryItem = (item, id) => {
  const button = document.createElement("button");
  button.className = "category-selection__item";
  button.setAttribute("data-id", id);
  button.innerHTML = `${item}`;

  return button;
}