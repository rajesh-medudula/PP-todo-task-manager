import { isTaskValid, createTaskEntity } from "../domain/task.js";
import { saveTask, updateTaskState, getTaskIdToDelete} from "../data/task-persistence.js";
import { getTasks } from "../data/task-persistence.js";
import { getItem } from "../data/storage-manager.js";
import { setCurrentState, notify } from "./application-state.js";


import { getCategoryList } from "../data/category-persistence.js";
import { categorizeDate } from "../domain/task-date-rules.js";

// set taskManagement step
export const setTaskManagementStep = (object) => {
 setCurrentState("taskManagement", object);
}

// get existing category and priority data.
export const getCategory = (id) => {
  const categories = getCategoryList();

  return categories.find((category) => category.id == id);
}

export const getPriority = (id) => {
  const priorities = getItem("appData").data.priorities;

  return priorities.find((priority) => priority.id == id);
}

// format/categorize date. (today/tmr/overdue)
export const getCategorizedDate = (date) => {
  return categorizeDate(date);
}

export const renderPage = () => {
  notify();
}
 
// create task and save to local
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
  setTaskManagementStep({step: "list"});
}

// delete task 
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
  setTaskManagementStep({step: "list"});
}

// get task array of local storage.
export const getTaskData = (id) => {
  return getTasks().find((task) => task.id === id) || null;
}