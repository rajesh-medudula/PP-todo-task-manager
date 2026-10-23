import { createComingSoonState } from "../components/shared/empty-state.js";
import { getSidebarState } from "../application/navigation.js";

export const createAboutApp = () => {
  const aboutApp = document.createElement("main");
  aboutApp.className = "main-content dashboard";

  // main width adjust based on sidebar
  const isSidebarActive = getSidebarState();
  isSidebarActive
    ? aboutApp.classList.add("main-content--sidebar-active")
    : null;

  aboutApp.append(createComingSoonState());

  return aboutApp;
};
