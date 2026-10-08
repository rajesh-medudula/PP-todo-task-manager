// current app state
import { currentStates } from "../application/application-state.js";

// component
import { createOnboardingIntro } from "../components/onboarding/onboarding.js";

// render based on state
export const renderOnboarding = () => {
  if (currentStates.currentOnboardingStep === "intro") {
    return createOnboardingIntro();
  }

};

