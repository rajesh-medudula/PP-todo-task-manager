// storage
import { setItem } from "./storage-manager.js";
import { getItem } from "./storage-manager.js";


// save to local
export const saveUserProfile = (data) => {
  setItem("userProfile", data);
};

export const isUserExist = () => {
  if (getItem("userProfile") !== null) {
    return true;
  } else {
    false;
  }
}