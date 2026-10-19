// modal template
import { createModalShell } from "../shared/modal-shell.js";

// creates category management modal.
export const createCategoryManagement = () => {
  const body = document.createElement("div");
  body.className = "category-Management";
  
  body.innerHTML = `
  <div class="category-management__text-container">
    <label class="category-management__title" for="category-input">Name</label>
    <input class="category-management__input" id="category-input" placeholder="Work"/>
  </div>
  <div class="category-management__action-container">
    <button class="modal-shell__cancel-btn">Cancel</button>
    <button class="modal-shell__create-btn">Create</button>
  </div>
  `;

  return createModalShell({
    title: "New Category",
    content: body,
    onClose: '',
    variant: "category-management"
  });
}