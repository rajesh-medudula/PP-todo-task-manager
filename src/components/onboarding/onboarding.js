import { setCurrentState } from "../../application/application-state.js";

// Onboarding screen 1.
export const createOnboardingIntro = () => {
  const onboarding = document.createElement("main");

  onboarding.className = "onboarding";

  onboarding.innerHTML = ` <div class="onboarding__container onboarding__container--intro">
    <div class="onboarding__icon">X</div>
    <h1 class="onboarding__title">Your Tasks. <br> Your Day.</h1>
    <p class="onboarding__description">A simple task manager to organize your work, set priorities, and keep track of what needs to be done.</p>
  </div>

  <button class="onboarding__primary-button" id="onboarding__primary-button--next">Next <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
	<path d="M0 0h1024v1024H0z" fill="none" />
	<path fill="currentColor" d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4" />
</svg>
</button>
</div>`;

// onboarding intro next btn
const onboardingNextBtn = onboarding.querySelector("#onboarding__primary-button--next");

onboardingNextBtn.addEventListener("click", () => {
  setCurrentState({currentOnboardingStep: "profile"});
})

return onboarding;
}


