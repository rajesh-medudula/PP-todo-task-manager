// storage -> data
import { getItem } from "../data/storage-manager.js";
import { getUserData } from "../data/profile-persistence.js";
// app
import { setGlobalState, setCurrentPageState, setCurrentState } from "./application-state.js";

export const user = (key) => {
  const userData = getUserData();

  try {
    return userData[key];
  } catch (error) {
    console.error(`User_Data_Error: Failed to fetch ${key} from User Data.`, error);
  }
  
  return false;
}

export const setSidebarState = () => {
  try {
    let isSidebarActive = getItem("appData").state.globalState.sidebar;
    setCurrentPageState("globalState", {"sidebar": !isSidebarActive});
    isSidebarActive = !isSidebarActive;

    return isSidebarActive;
  } catch (error) {
    console.error(`Sidebar_State_Error: Failed to set sidebar state.`, error);
  }

  return false;
}

// setCurrentState("globalState", {sidebarTab: "task-management"});

export const setCurrentSidebarTab = (tab) => {
  try {
    setCurrentState("globalState", {sidebarTab: tab});
    setGlobalState(tab);
  } catch (error) {
    console.error("Sidebar_Tab_Error: Failed to set sidebar active tab", error);
  }
}

export const getCurrentSidebarTab = () => {
  return getItem("appData").state.globalState.sidebarTab;
}

export const getSidebarState = () => {
  return getItem("appData").state.globalState.sidebar;
}