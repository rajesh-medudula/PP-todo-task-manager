// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
// app task
import {
  getTaskData,
  deleteTask,
  cancelDelete,
} from "../../application/task.js";
// components
import { createModalShell } from "../shared/modal-shell.js";

// trim task title to prevent overflow.
const trimTaskTitle = (title) => {
  if (title.length > 20) {
    return `"${title.slice(0, 20)}..." `;
  }

  return `"${title}" `;
};

// delete confirm modal component
export const createTaskDeleteModal = (taskId) => {
  const task = getTaskData(taskId);

  const body = document.createElement("div");
  body.className = "task-delete";

  const taskTitle = document.createElement("span");
  taskTitle.className = "task-delete__title";
  taskTitle.textContent = trimTaskTitle(task?.title);

  const description = document.createElement("span");
  description.className = "task-delete__description";

  description.append(taskTitle);
  description.innerHTML += `will be permanently deleted.\nThis can't be undone.`;

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "task-delete__cancel-btn";
  cancelBtn.textContent = "Cancel";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "task-delete__delete-btn";
  deleteBtn.innerHTML = `${getGlobalAsset("delete-icon")} Delete`;

  body.append(description, cancelBtn, deleteBtn);

  cancelBtn.addEventListener("click", () => {
    cancelDelete();
  });

  deleteBtn.addEventListener("click", () => {
    deleteTask();
  });

  return createModalShell({
    title: "Delete task?",
    content: body,
    onClose: null,
    variant: "task-delete",
  });
};
