// current app state
import { appData } from "../application/application-state.js";

// component
import { createOnboardingIntro } from "../components/onboarding/onboarding.js";
import { createOnboardingProfile } from "../components/onboarding/onboarding.js";

// render based on state
export const renderOnboarding = () => {
  if (appData["state"]["onboarding"]["step"] === "intro") {
    return createOnboardingIntro();
  }

  if (appData["state"]["onboarding"]["step"] === "profile") {
    return createOnboardingProfile();
  }
};

