import { getTempTask, updateTempTask } from "../../application/task.js";

// creates category list items.
export const createCategoryItem = (item, categoryId, id) => {
  const button = document.createElement("button");
  button.className = "category-selection__item";
  // default selection
  if (categoryId == id) {
    button.classList.add("category-selection__item--active");
  }
  button.setAttribute("data-id", categoryId);
  button.innerHTML = `${item}`;

  button.addEventListener("click", (event) => {
    const categoryId = event.currentTarget.dataset.id;
    const tempTask = getTempTask();

    if (tempTask) {
      tempTask.categoryId = categoryId;
      updateTempTask(tempTask);
    }
  });

  return button;
};
