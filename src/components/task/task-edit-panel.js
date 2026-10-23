// data
import { getCurrentTask } from "../../application/task.js";
// operations
import { setTaskManagementStep, saveEditedTask } from "../../application/task.js";
// components
// modal component
import { createModalShell } from "../shared/modal-shell.js";
// category component
import { createCategorySelection } from "../category/category-selector.js";
// date component
import { createDueDate } from "../task-organization/date-picker.js";
// priority component
import { createPriority } from "../task-organization/priority-selector.js";

const closeModal = (overlay) => {
  overlay.classList.add("modal-overlay--creation--close");
  overlay.classList.remove(
    "modal-overlay--creation--active",
    "modal-overlay--creation--close",
  );

  setTimeout(() => {
    setTaskManagementStep({ step: "list" });
  }, 200);
};



export const createTaskEditModal = () => {
  setTimeout(() => {
      const overlay = document.querySelector(".modal-overlay--creation");
      overlay.classList.add("modal-overlay--creation--active");
    }, 50);

  const task = getCurrentTask();
  console.log(task)
  const form = document.createElement("form");
  form.className = "form-creation";

  form.innerHTML = "";

  // label for title
  const labelTitle = document.createElement("label");
  labelTitle.className = "form-creation__title";
  labelTitle.setAttribute("for", "form-creation-title");
  labelTitle.textContent = "Title";

  const inputTitle = document.createElement("input");
  inputTitle.type = "text";
  inputTitle.placeholder = "What needs to be done?";
  inputTitle.required = true;
  inputTitle.id = "form-creation-title";
  inputTitle.className = "form-creation__input";
  inputTitle.value = task.title;

  const taskFormTitleContainer = document.createElement("section");
  taskFormTitleContainer.classList = "form-creation__title-container";
  taskFormTitleContainer.append(labelTitle, inputTitle);

  // label for description
  const labelDescription = document.createElement("label");
  labelDescription.className = "form-creation__description-label";
  labelDescription.setAttribute("for", "form-creation-description");
  labelDescription.textContent = "Description";

  const inputDescription = document.createElement("textarea");
  inputDescription.placeholder = "Add details (optional)";
  inputDescription.id = "form-creation-description";
  inputDescription.className = "form-creation__description";
  inputDescription.textContent = task.description;

  const taskFormDescriptionContainer = document.createElement("section");
  taskFormDescriptionContainer.classList =
    "form-creation__description-container";
  taskFormDescriptionContainer.append(labelDescription, inputDescription);

  // buttons
  const buttonSave = document.createElement("button");
  buttonSave.className = "form-creation__create-btn";
  buttonSave.textContent = "Save";

  const buttonCancel = document.createElement("button");
  buttonCancel.className = "form-creation__cancel-btn";
  buttonCancel.textContent = "Cancel";

  const buttonContainer = document.createElement("section");
  buttonContainer.className = "form-creation__button-container";
  buttonContainer.append(buttonCancel, buttonSave);

  form.append(taskFormTitleContainer);
  form.append(taskFormDescriptionContainer);
  form.append(createCategorySelection(task.categoryId));
  form.append(createDueDate(task.duedate));
  form.append(createPriority(task.priority));
  form.append(buttonContainer);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  buttonCancel.addEventListener("click", () => {
    const overlay = document.querySelector(".modal-overlay--creation");
    closeModal(overlay);
  });

  buttonSave.addEventListener("click", () => {
    const selectedCategory = form.querySelector(".category-selection__list");
    const date = new Date(task.date);
    const selectedPriority = form.querySelector(".priority__list");

    const isSuccess = saveEditedTask(
      task.id,
      inputTitle,
      inputDescription,
      selectedCategory,
      date,
      selectedPriority,
    );

    if (isSuccess) {
      const overlay = document.querySelector(".modal-overlay--creation");
      closeModal(overlay);
    }
  });

  return createModalShell({
    title: "Edit Task",
    content: form,
    onClose: closeModal,
    variant: "creation",
  });
};

// { title, content, onClose, variant }