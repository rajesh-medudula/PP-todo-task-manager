
import { notify, setCurrentState } from "../../application/application-state.js";
// shared shell
import { createModalShell } from "../shared/modal-shell.js";
// category
import { createCategorySelection } from "../category/category-selector.js";
// date
import { createDueDate } from "../task-organization/date-picker.js";
// priority
import { createPriority } from "../task-organization/priority-selector.js";
// operations
import { createTask } from "../../application/task.js";

const closeModal = (overlay) => {
  setCurrentState("taskManagement", {step: "list"});
  
  overlay.classList.add("modal-overlay--creation--close");
  setTimeout(() => {
    overlay.classList.remove("modal-overlay--creation--active", "modal-overlay--creation--close")
  }, 200);
}

export const createTaskCreationModal = () => {
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
  inputDescription.className = "form-creation__description"

  const taskFormDescriptionContainer = document.createElement("section");
  taskFormDescriptionContainer.classList = "form-creation__description-container";
  taskFormDescriptionContainer.append(labelDescription, inputDescription);

  // buttons
  const buttonCreate = document.createElement("button");
  buttonCreate.className = "form-creation__create-btn";
  buttonCreate.textContent = "Create";

  const buttonCancel = document.createElement("button");
  buttonCancel.className = "form-creation__cancel-btn";
  buttonCancel.textContent = "Cancel";

  const buttonContainer = document.createElement("section");
  buttonContainer.className = "form-creation__button-container";
  buttonContainer.append(buttonCancel, buttonCreate);


  form.append(taskFormTitleContainer);
  form.append(taskFormDescriptionContainer);
  form.append(createCategorySelection());
  form.append(createDueDate());
  form.append(createPriority());
  form.append(buttonContainer);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  })

  buttonCancel.addEventListener("click", () => {
    const overlay = document.querySelector(".modal-overlay--creation");
    closeModal(overlay);
  })


  buttonCreate.addEventListener("click", () => {
    const selectedCategory = form.querySelector(".category-selection__list");
    const date = new Date();
    const selectedPriority = form.querySelector(".priority__list");

   const isSuccess = createTask(
      inputTitle,
      inputDescription,
      selectedCategory,
      date,
      selectedPriority
    );

    if (isSuccess) {
      const overlay = document.querySelector(".modal-overlay--creation");
      closeModal(overlay);
    }
  });

  return createModalShell({
    title: "New Task",
    content: form,
    onClose: closeModal,
    variant: "creation",
  });
}


