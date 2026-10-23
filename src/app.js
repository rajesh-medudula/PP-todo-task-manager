import { getItem } from "./data/storage-manager.js";
// from app state subscribe
import { subscribe } from "./application/application-state.js";
// onboarding from pages.
import { renderOnboarding } from "./pages/onboarding.js";
// header and sidebar
import { createHeader } from "./components/navigation/header.js";
// overlay sidebar
import { createSidebar } from "./components/navigation/sidebar.js";
// task management page
import { createTaskManagement } from "./pages/task-management.js";
// dashboard
import { createDashboard } from "./pages/dashboard.js";
import { createPreferences } from "./pages/preferences.js";
import { createAboutApp } from "./pages/about-app.js";

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
      createSidebar(),
      createTaskManagement(),
    ); 
  } else if (globalPage === "dashboard") {
    app.append(
      createHeader(),
      createSidebar(),
      createDashboard(),
    );
  } else if (globalPage === "preferences") {
    app.append(
      createHeader(),
      createSidebar(),
      createPreferences(),
    );
  } else if (globalPage === "about-app") {
    app.append(
      createHeader(),
      createSidebar(),
      createAboutApp(),
    );
  }
}

// render based on events
subscribe(renderApp);

// render on start
renderApp();