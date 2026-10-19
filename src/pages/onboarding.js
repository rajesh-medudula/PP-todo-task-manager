// current app state
import { getItem } from "../data/storage-manager.js";

// component
import { createOnboardingIntro } from "../components/onboarding/onboarding.js";
import { createOnboardingProfile } from "../components/onboarding/onboarding.js";

// render based on state
export const renderOnboarding = () => {
  const appData = getItem("appData");
  
  if (appData["state"]["onboarding"]["step"] === "intro") {
    return createOnboardingIntro();
  }

  if (appData["state"]["onboarding"]["step"] === "profile") {
    return createOnboardingProfile();
  }
};

