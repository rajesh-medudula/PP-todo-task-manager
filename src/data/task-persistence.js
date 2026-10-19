// storage
import { getItem, setItem } from "./storage-manager.js";

export const getTasks = () => {
  return getItem("appData").data.tasks || [];
}

// save task
export const saveTask = (task) => {
  const appData = getItem("appData");
  
  try {
    const tasks = getTasks();
    tasks.push(task);

    appData.data.tasks = tasks;
    setItem("appData", appData);

    return true;
  } catch (error) {
    console.error("Failed to save task");
  }

  return false;
}

// task inner data
export const updateTaskState = (tasks) => {
  try {
    const appData = getItem("appData");
    appData.data.tasks = tasks;
    setItem("appData", appData);

    return true;
  } catch (error) {
    console.log("Failed to save task state");
  }

  return false;
}



export const getTaskIdToDelete = () => {
  const id = getItem("appData").state.taskManagement.currentTaskId;

  return id;
}