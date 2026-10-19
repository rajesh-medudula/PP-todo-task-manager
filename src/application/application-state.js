import { setItem, getItem } from "../data/storage-manager.js";
import { getGlobalAsset } from "../assets/svg/global.js";
import { categories } from "../data/category-persistence.js";

export const defaultAppData = {
  state: {
    globalState: {
      state: "onboarding",
      sidebar: false,
    },
    onboarding: {
      step: "intro",
      avatarSelected: null,
      nickname: ""
    },
    taskManagement: {
      step: "list",
    }
  },
  data: {
   tasks: [],
   categories: categories,
   priorities: [{
      id: 1,
      name: "High",
      iconRef: "signal_high-icon",
    },
    {
      id: 2,
      name: "Medium",
      iconRef: "signal_mid-icon",
    },
    {
      id: 3,
      name: "Low",
      iconRef: "signal_low-icon",
    }],
  }
};

export let appData = getItem("appData") || defaultAppData;

export const getPriorityIcon = (iconRef) => {
  return getGlobalAsset(iconRef);
}

const listeners = [];

// get app.js render functions
export const subscribe = (listener) => {
  listeners.push(listener);
};

// run app.js render functions
export const notify = () => {
  listeners.forEach(listener => listener());
};

// set current page state no render
export const setCurrentPageState = (page, state) => {
  const appData = getItem("appData");
  if (!appData.state[page]) appData.state[page] = {};

  appData["state"][page] = {...appData["state"][page], ...state};
  setItem("appData", appData);
};

// set current states and render app.js
export const setCurrentState = (page, state) => {
  setCurrentPageState(page, state);
  notify();
};

// set global page
export const setGlobalState = (page) => {
  const appData = getItem("appData");
  if (!appData.state.globalState) appData.state.globalState = {};

  appData.state.globalState.state = page;
  setItem("appData", appData);
  notify();
};

if (!localStorage.getItem("appData")) {
  setItem("appData", appData);
}

console.log(appData)