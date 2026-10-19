// storage
import { getItem } from "../data/storage-manager.js";

// user data
import { getUserData } from "../data/profile-persistence.js";

// components
import { createTasksList } from "../components/task/task-list.js";
import { createViewSelection } from "../components/task/task-view-selector.js";
import { createTaskCreationModal } from "../components/task/task-creation-modal.js";
import { createTaskDeleteModal } from "../components/task/delete-confirmation-dialog.js";

const taskManagement = document.createElement("main");

taskManagement.className = "main-content";
taskManagement.classList.add("task-management");

// main width adjust based on sidebar
const isSidebarActive = getItem("appData")?.state?.globalState?.sidebar;
isSidebarActive ? taskManagement.classList.add("main-content--sidebar-active") : null;

export const createTaskManagement = () => {
  taskManagement.innerHTML = "";
  const currentTaskManagementState = getItem("appData").state.taskManagement.step;

  taskManagement.append(createGreet());
  taskManagement.append(createViewSelection());
  taskManagement.append(createTasksList());
  if (currentTaskManagementState === "create") {
    taskManagement.append(createTaskCreationModal());
  } else if (currentTaskManagementState === "delete") {
    const taskId = getItem("appData").state.taskManagement.currentTaskId;
    taskManagement.append(createTaskDeleteModal(taskId));
  }

  return taskManagement;
}

// greet user
const createGreet = () => {
  const section = document.createElement("section");
  
  section.className = "user-greet user-greet--task-management";

  section.innerHTML = `
    <span class="user-greet__name">What's up, ${getUserData()?.nickname}</span>
  `;

  return section;
}
