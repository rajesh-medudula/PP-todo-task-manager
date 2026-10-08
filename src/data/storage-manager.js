import { currentStates } from "../application/application-state.js"

export const saveCurrentState = (currentStates) => {
  localStorage.setItem("currentStates", JSON.stringify(currentStates))  
}

export const getCurrentState = () => {
  return JSON.parse(localStorage.getItem("currentStates")) || "";
}