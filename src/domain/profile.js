import { saveUserProfile } from "../data/profile-persistence.js";

export const createProfile = (data) => {
  if (data.nickname && data.avatar) {
   const userProfile = {
      userId: crypto.randomUUID(),
      nickname: data.nickname,
      avatar: data.avatar,
    }

    // save to data profile persistence
    saveUserProfile(userProfile);

    return;
  }

  throw new Error("User_Profile: Failed to save user data.");
}