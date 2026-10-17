// storage
import { getItem, setItem } from "./storage-manager.js";

// save task
export const saveTask = (task) => {
  const appData = getItem("appData");
  
  appData.data.tasks.push(task);

  setItem("appData", appData);
  console.log("Task Saved Successfully!");
}