// current page state
import { currentStates } from "./application/application-state.js";
// from app state subscribe
import { subscribe } from "./application/application-state.js";
// onboarding from pages.
import { renderOnboarding } from "./pages/onboarding.js";
// header and sidebar
import { createHeader } from "./components/navigation/header.js";
import { createSideBar } from "./components/navigation/sidebar.js";
// task management page

// from index.html
const app = document.querySelector("#app");

// render function
export const renderApp = () => {
  app.innerHTML = "";
  
  const globalPage = currentStates.globalState.state;
  
  if (globalPage === "onboarding") {
    app.append(renderOnboarding()); 
  }

  if (globalPage === "taskManagement") {
    app.append(
      createHeader(),
      createSideBar(),
      
    ); 
  }
}

// render based on events
subscribe(renderApp);

// render on start
renderApp();