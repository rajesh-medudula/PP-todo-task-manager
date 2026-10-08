import { setItem } from "../data/storage-manager.js";
import { getItem } from "../data/storage-manager.js";

export let currentStates = getItem("currentStates") || {
  globalState: {
    state: "onboarding",
  },
  onboarding: {
    step: "intro",
    avatarSelected: null,
    nickname: ""
  },
  taskManagement: {
    step: "list",
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
  currentStates[page] = {...currentStates[page], ...state};
  
  setItem("currentStates", currentStates);
}
// set current states and render app.js
export const setCurrentState = (page, state) => {
  currentStates[page] = {...currentStates[page], ...state};
  
  setItem("currentStates", currentStates);
 
  notify();
}
// set global page
export const setGlobalState = (page) => {
  currentStates.globalState.state = page;

  setItem("currentStates", currentStates);

  notify();
}

console.log(currentStates)

// saves default current states to local storage

setItem("currentStates", currentStates);