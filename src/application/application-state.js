// data
import { setItem, getItem } from "../data/storage-manager.js";
import { categories } from "../data/category-persistence.js";
import { priorities } from "../data/priority-persistence.js";

export const defaultAppData = {
  state: {
    globalState: {
      state: "onboarding",
      sidebar: false,
      sidebarTab: "task-management",
    },
    onboarding: {
      step: "intro",
      avatarSelected: null,
      nickname: "",
    },
    taskManagement: {
      step: "list",
      currentListView: "today",
    },
  },
  data: {
    tasks: [],
    categories: categories,
    priorities: priorities,
  },
};

export let appData = getItem("appData") || defaultAppData;

const listeners = [];

// get app.js render functions
export const subscribe = (listener) => {
  listeners.push(listener);
};

// run app.js render functions
export const notify = () => {
  listeners.forEach((listener) => listener());
};

// set current page state no render manual render
export const setCurrentPageState = (page, state) => {
  const appData = getItem("appData");
  if (!appData.state[page]) appData.state[page] = {};

  appData["state"][page] = { ...appData["state"][page], ...state };
  setItem("appData", appData);
};

// set current states and render app.js auto render
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
