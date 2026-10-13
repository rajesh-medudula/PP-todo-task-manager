// assets
import { getGlobalAsset } from "../../assets/svg/global.js";

// empty state
import { createEmptyState } from "../shared/empty-state.js";

// task list 
export const createTasksList = () => {
  const tasksListSection = document.createElement("section");

  tasksListSection.className = "tasks";
  
  // tasksListSection.innerHTML = `
  // <button class="tasks__create-btn">
  // <span>Create</span>
  // </button>
  // `;
  tasksListSection.append(createEmptyState());
  tasksListSection.append(createTaskBtn());

  return tasksListSection;
}


// create btn
const createTaskBtn = () => {
  const button = document.createElement("button");
  
  button.className = "tasks__create-btn";
  button.innerHTML = getGlobalAsset("plus-icon");

  return button;
}