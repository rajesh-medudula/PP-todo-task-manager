import { saveCurrentState } from "../data/storage-manager.js";
import { getCurrentState } from "../data/storage-manager.js";

export let currentStates = getCurrentState() || {
  currentOnboardingStep: "intro",
};


const listeners = [];

export const subscribe = (listener) => {
  listeners.push(listener)
}

export const notify = () => {
  listeners.forEach(listener => listener())
}

export const setCurrentState = (current) => {
  currentStates = {...currentStates, ...current};

  saveCurrentState(currentStates);
 
  notify();
}


// saves default current states to local storage

saveCurrentState(currentStates);