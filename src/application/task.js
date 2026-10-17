import { isTaskValid, createTaskEntity } from "../domain/task.js";
import { saveTask } from "../data/task-persistence.js";


export const createTask = (taskTitle, taskDescription, taskCategory, taskDate, taskPriority) => {
  const title = taskTitle.value || "";
  const description = taskDescription.value || "";
  const categoryId = taskCategory.dataset.id
  const date = taskDate;
  const priority = taskPriority.dataset.id;

  const task = {title, description, categoryId, date, priority};

  if (!isTaskValid(task)) {
    return false;
  }

  const newTask = createTaskEntity(task);

  saveTask(newTask);

  return true;
};
