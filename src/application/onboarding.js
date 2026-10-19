import { getItem } from "../data/storage-manager.js";

import { setCurrentPageState, setCurrentState } from "./application-state.js";

// route to profile creation.
export const setOnboardingPageState = (object) => {
  setCurrentPageState("onboarding", object);
};

export const setOnboardingStep = (object) => {
  setCurrentState("onboarding", object);
};

export const userSelectedAvatar = () => {
  try {
    return getItem("appData").state.onboarding.avatarSelected;
  } catch (error) {
    console.error(
      `Avatar_Fetch_Error: Failed to fetch user selected avatar.`,
      error,
    );
  }

  return false;
};

export const currentNickname = () => {
  return getItem("appData").state.onboarding.nickname || "";
};

export const userOnboardingData = () => {
  const nickname = getItem("appData").state.onboarding.nickname;
  const avatar = getItem("appData").state.onboarding.avatarSelected;

  return {
    nickname,
    avatar,
  };
};
