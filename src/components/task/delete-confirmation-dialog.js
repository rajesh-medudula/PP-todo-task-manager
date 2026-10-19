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

// delete confirm modal component
export const createTaskDeleteModal = (taskId) => {
  const task = getTaskData(taskId);

  const body = document.createElement("div");
  body.className = "task-delete";

  const description = document.createElement("span");
  description.className = "task-delete__description";
  description.textContent = `"${task?.title}" will be permanently deleted.\nThis can't be undone.`;

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
