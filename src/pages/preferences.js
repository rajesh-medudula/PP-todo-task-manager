import { createComingSoonState } from "../components/shared/empty-state.js";
import { getSidebarState } from "../application/navigation.js";


export const createPreferences = () => {
  const preferences = document.createElement("main");
  preferences.className = "main-content preferences";
  
  // main width adjust based on sidebar
  const isSidebarActive = getSidebarState();
  isSidebarActive
    ? preferences.classList.add("main-content--sidebar-active")
    : null;

  preferences.append(createComingSoonState());
  
  return preferences;
}