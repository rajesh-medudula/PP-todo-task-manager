import { isTaskValid, createTaskEntity } from "../domain/task.js";
import { saveTask, updateTaskState, getTaskIdToDelete} from "../data/task-persistence.js";
import { getTasks } from "../data/task-persistence.js";
import { getItem } from "../data/storage-manager.js";
import { setCurrentState, notify } from "./application-state.js";

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


// set complete
export const setTaskState = (id) => {
  const tasks = getTasks();
  const task = tasks.find((task) => task.id == id);
  task.completed = !task.completed;

  updateTaskState(tasks);
}

// cancel delete
export const cancelDelete = () => {
  setCurrentState("taskManagement", {step: "list"});
}

// delete
export const deleteTask = () => {
  const id = getTaskIdToDelete();
  const tasks = getTasks();
  
  const taskIndex = tasks.findIndex((task) => task.id === id);
  
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    updateTaskState(tasks);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }

  // change state
  setCurrentState("taskManagement", {step: "list"});
}

export const getTaskData = (id) => {
  return getTasks().find((task) => task.id === id) || null;
}