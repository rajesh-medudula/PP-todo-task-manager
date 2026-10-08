// from app state subscribe
import { subscribe } from "./application/application-state.js";

// onboarding from pages.
import { renderOnboarding } from "./pages/onboarding.js";

// from index.html
const app = document.querySelector("#app");

// render function
export const renderApp = () => {
  app.innerHTML = "";

  app.append(renderOnboarding());
}

// render based on events
subscribe(renderApp);

// render on start
renderApp();