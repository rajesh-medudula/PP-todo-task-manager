import { createComingSoonState } from "../components/shared/empty-state.js";
import { getSidebarState } from "../application/navigation.js";

export const createDashboard = () => {
  const dashboard = document.createElement("main");
  dashboard.className = "main-content dashboard";

  // main width adjust based on sidebar
  const isSidebarActive = getSidebarState();
  isSidebarActive
    ? dashboard.classList.add("main-content--sidebar-active")
    : null;
  
  dashboard.append(createComingSoonState());
  
  return dashboard;
}