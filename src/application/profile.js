import { createProfile } from "../domain/profile.js"

export const createUserProfile = (nickname, avatar) => {
  createProfile({nickname: nickname, avatar: avatar});
}