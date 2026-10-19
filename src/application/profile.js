import { setGlobalState } from "./application-state.js";
import { createProfile } from "../domain/profile.js";

export const createUserProfile = (nickname, avatar) => {
  createProfile({ nickname: nickname, avatar: avatar });

  setGlobalState("taskManagement");
};
