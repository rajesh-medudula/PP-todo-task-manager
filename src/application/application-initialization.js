// check is user have account
import { isUserExist } from "../data/profile-persistence.js";

// current page state
import { setGlobalState } from "./application-state.js";

if (!isUserExist()) {
  setGlobalState("onboarding");
}