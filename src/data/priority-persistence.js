import { getItem } from "./storage-manager.js";

export const priorities = [{
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
    }];


export const getPriorities = () => {
  return getItem("appData")?.data?.priorities || priorities;
}