// storage.
import { getItem, setItem } from "./storage-manager.js";

// get tasks from local.
export const getTasks = () => {
  return getItem("appData").data.tasks || [];
}

// save task to local.
export const saveTask = (task) => {
  const appData = getItem("appData");
  
  try {
    const tasks = getTasks();
    tasks.push(task);

    appData.data.tasks = tasks;
    setItem("appData", appData);

    return true;
  } catch (error) {
    console.error("Failed to save task", error);
  }

  return false;
}

// task inner data local.
export const updateTaskState = (tasks) => {
  try {
    const appData = getItem("appData");
    appData.data.tasks = tasks;
    setItem("appData", appData);

    return true;
  } catch (error) {
    console.log("Failed to save task state", error);
  }

  return false;
}

// save task id to delete to local.
export const getTaskIdToDelete = () => {
  const id = getItem("appData").state.taskManagement.currentTaskId;

  return id;
}