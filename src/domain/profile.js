import { saveUserProfile } from "../data/profile-persistence.js";

export const createProfile = (data) => {
  let userProfile = null;

  if (data.nickname && data.avatar) {
    userProfile = {
      userId: crypto.randomUUID(),
      nickname: data.nickname,
      avatar: data.avatar,
    }

    // save to data profile persistence
    saveUserProfile(userProfile);
  }
}