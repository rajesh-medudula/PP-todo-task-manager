import { setItem, getItem } from "../data/storage-manager.js";

import { categories } from "../data/category-persistence.js";

export let appData = getItem("appData") || {
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
  }
};

const listeners = [];

// get app.js render functions
export const subscribe = (listener) => {
  listeners.push(listener)
}
// run app.js render functions
export const notify = () => {
  listeners.forEach(listener => listener())
}
// set current page state no render
export const setCurrentPageState = (page, state) => {
  appData["state"][page] = {...appData["state"][page], ...state};
  
  setItem("appData", appData);
}
// set current states and render app.js
export const setCurrentState = (page, state) => {
  appData["state"][page] = {...appData["state"][page], ...state};
  
  setItem("appData", appData);
  notify();
}
// set global page
export const setGlobalState = (page) => {
  appData.state.globalState.state = page;

  setItem("appData", appData);
  notify();
}

console.log(appData)

// saves default current states to local storage

setItem("appData", appData);