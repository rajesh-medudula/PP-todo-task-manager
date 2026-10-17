// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
// empty state
import { createEmptyState } from "../shared/empty-state.js";

// components
// create btn
const createTaskBtn = () => {
  const button = document.createElement("button");
  
  button.className = "tasks__create-btn";
  button.innerHTML = getGlobalAsset("plus-icon");

  button.addEventListener("click", () => {
    const overlay = document.querySelector(".modal-overlay--creation");
    overlay.classList.add("modal-overlay--creation--active")
  })

  return button;
}

// task list 
export const createTasksList = () => {
  const tasksListSection = document.createElement("section");
  tasksListSection.className = "tasks";
  
  tasksListSection.append(createEmptyState());
  tasksListSection.append(createTaskBtn());

  return tasksListSection;
}
