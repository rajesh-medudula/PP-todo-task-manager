import { getItem } from "./data/storage-manager.js";
// from app state subscribe
import { subscribe } from "./application/application-state.js";
// onboarding from pages.
import { renderOnboarding } from "./pages/onboarding.js";
// header and sidebar
import { createHeader } from "./components/navigation/header.js";
// overlay sidebar
import { createSideBarOverlay } from "./components/navigation/sidebar.js";
import { createSideBar } from "./components/navigation/sidebar.js";
// task management page
import { createTaskManagement } from "./pages/task-management.js";

// from index.html
const app = document.querySelector("#app");

// render function
export const renderApp = () => {
  const appData = getItem("appData");
  
  app.innerHTML = "";
  
  const globalPage = appData.state.globalState.state;
  
  if (globalPage === "onboarding") {
    app.append(renderOnboarding()); 
  } else if (globalPage === "task-management") {
    app.append(
      createHeader(),
      createSideBarOverlay(),
      createSideBar(),
      createTaskManagement(),
    ); 
  }


}

// render based on events
subscribe(renderApp);

// render on start
renderApp();