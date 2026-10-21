import { getItem } from "../data/storage-manager.js";
import { setCurrentState } from "./application-state.js"

export const setCurrentListViewId = (id) => {
  setCurrentState("taskManagement", {'currentListView': id});
}

export const getCurrentListViewId = () => {
  return getItem("appData")?.state?.taskManagement?.currentListView || null;
}