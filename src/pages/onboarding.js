// current app state
import { currentStates } from "../application/application-state.js";

// component
import { createOnboardingIntro } from "../components/onboarding/onboarding.js";
import { createOnboardingProfile } from "../components/onboarding/onboarding.js";

// render based on state
export const renderOnboarding = () => {
  if (currentStates["onboarding"]["step"] === "intro") {
    return createOnboardingIntro();
  }

  if (currentStates["onboarding"]["step"] === "profile") {
    return createOnboardingProfile();
  }
};

