// storage.
import { getItem, setItem } from "./storage-manager.js";

// create temp task.
const tempTask = {
  title: "",
  description: "",
  categoryId: 1,
  duedate: "",
  priority: 2,
  isNew: true,
};

export const initializeTempTask = () => {
  const appData = getItem("appData");

  appData.data.tempTask = tempTask;
  setItem("appData", appData);
};

export const getTempTaskData = () => {
  return getItem("appData")?.data?.tempTask;
};

// delete temp task.
export const deleteTempTask = () => {
  const appData = getItem("appData");

  delete appData.data.tempTask;
  setItem("appData", appData);
};

export const saveTempTask = (task) => {
  const appData = getItem("appData");

  appData.data.tempTask = task;
  setItem("appData", appData);
};

// get tasks from local.
export const getTasks = () => {
  return getItem("appData").data.tasks || [];
};

// get task id to delete to local.
export const getCurrentTaskId = () => {
  const id = getItem("appData")?.state?.taskManagement?.currentTaskId;

  return id;
};

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
};

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
};

// update task.
export const updateTask = (updatedTask) => {
  try {
    // local/live tasks data
    const tasks = getTasks();

    const index = tasks.findIndex((task) => task.id === updatedTask.id);

    if (index !== -1) {
      tasks.splice(index, 1, updatedTask);
    }

    // save to local
    updateTaskState(tasks);
  } catch {
    console.error("Update_Task: Failed to update task.");
  }
};
