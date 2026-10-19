// app onboarding
import {
  userOnboardingData,
  setOnboardingPageState,
  setOnboardingStep,
  userSelectedAvatar,
  currentNickname,
} from "../../application/onboarding.js";
// app profile
import { createUserProfile } from "../../application/profile.js";
// assets
import {
  getGlobalAsset,
  getProfileAvatar,
  profileAvatars,
} from "../../assets/svg/global.js";

// Onboarding intro components.
const onboarding = document.createElement("main");
onboarding.className = "onboarding";

export const createOnboardingIntro = () => {
  onboarding.innerHTML = `
<div class="onboarding__container onboarding__container--intro">
    <div class="onboarding__text-wrapper">
      <div class="onboarding__icon onboarding__icon--intro">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-todo preview-icon"><path d="M13 5h8"/><path d="M13 12h8"/><path d="M13 19h8"/><path d="m3 17 2 2 4-4"/><rect x="3" y="4" width="6" height="6" rx="1"/></svg>
      </div>
      <h1 class="onboarding__title">Your Tasks. <br> Your Day.</h1>
      <p class="onboarding__description">A simple task manager to organize your work, set priorities, and keep track of what needs to be done.</p>
    </div>
    
    <button class="onboarding__primary-button onboarding__primary-button--active" id="onboarding__primary-button--next">
      Next
      ${getGlobalAsset("right-arrow-icon")}
    </button>
</div>`;

  // onboarding intro next btn
  const onboardingNextBtn = onboarding.querySelector(
    "#onboarding__primary-button--next",
  );

  onboardingNextBtn.addEventListener("click", () => {
    setOnboardingStep({step: "profile"});
  });

  return onboarding;
};

// onboarding profile setup.
export const createOnboardingProfile = () => {
  onboarding.innerHTML = `  
  <div class="onboarding__container onboarding__container--profile">
    <button class="onboarding__secondary-button onboarding__secondary-button--back-profile">
      ${getGlobalAsset("left-arrow-icon")}  
      Back
    </button>
  
    <div class="onboarding__text-wrapper onboarding__text-wrapper--profile">
      <div class="onboarding__profile-wrapper">
        <button class="onboarding__profile onboarding__profile--container" aria-label="select user profile picture">
          ${userSelectedAvatar() || getProfileAvatar("default")}
        </button>
        <span class="onboarding__menu onboarding__menu--profile"></span>
      </div>
      
      <div>
        <h2 class="onboarding__title onboarding__title--profile">Set Up Your Profile</h2>
        <p class="onboarding__description">Add a name and choose a profile picture to personalize your task manager.</p>
      </div>
    
      <div>
        <label class="onboarding__label" for="onboarding__nickname">Nickname</label>
        <input class="onboarding__input onboarding__input--nickname" id="onboarding__nickname" type="text" placeholder="Enter your nickname"/>
      </div>
    </div>

    <button class="onboarding__primary-button onboarding__primary-button--create" disabled>Create Profile</button>
  </div>
`;

  // go back
  const backBtn = onboarding.querySelector(
    ".onboarding__secondary-button--back-profile",
  );

  backBtn.addEventListener("click", () => {
    setOnboardingStep({step: "intro"});
  });

  // profile selection render
  const onboardingProfileMenu = onboarding.querySelector(
    ".onboarding__menu--profile",
  );
  onboardingProfileMenu.innerHTML = createProfileAvatars();

  // avatar selection listener
  const avatarWrapper = onboarding.querySelector(
    ".onboarding__profile-wrapper",
  );
  avatarWrapper.addEventListener("click", (event) => {
    const selectedAvatar = event.target?.dataset?.avatarName || "";

    setAvatar(selectedAvatar);
  });

  // toggle avatar selection menu
  const avatarProfileContainer = onboarding.querySelector(
    ".onboarding__profile--container",
  );
  avatarProfileContainer.addEventListener("click", toggleAvatarMenu);

  // make create btn active when input is not empty enable/disable create btn based on input
  const createBtn = onboarding.querySelector(
    ".onboarding__primary-button--create",
  );
  const toggleCreateBtn = (input) => {
    if (input.trim().length > 0) {
      createBtn.disabled = false;
      createBtn.classList.add("onboarding__primary-button--active");
    } else {
      createBtn.disabled = true;
      createBtn.classList.remove("onboarding__primary-button--active");
    }
  };

  const userInputNickname = onboarding.querySelector(
    ".onboarding__input--nickname",
  );
  // setting local value when page refreshed.
  userInputNickname.value = currentNickname();
  // toggle create button based on input.
  toggleCreateBtn(userInputNickname.value);

  userInputNickname.addEventListener("input", (event) => {
    const userNickname = event.target.value.trim();
    // set current page values f(key, value);
    setOnboardingPageState({"nickname": userNickname});

    toggleCreateBtn(userNickname);
  });

  // create listener
  createBtn.addEventListener("click", () => {
    const nickname = userOnboardingData().nickname;
    const avatar = userOnboardingData().avatar || getProfileAvatar("default");

    createUserProfile(nickname, avatar);
  });

  return onboarding;
};

// generate available avatars user can select
const createProfileAvatars = () => {
  let html = ``;

  for (const profileAvatar in profileAvatars) {
    html += `
    <button class="onboarding__profile onboarding__profile--container-mini" data-avatar-name="${profileAvatar}">
     ${profileAvatars[profileAvatar].replace("<svg ", '<svg class="svg-avatar"')}
    </button>
    `;
  }

  return html;
};

// set main profile contain avatar.
const setAvatar = (avatar) => {
  const onboardingAvatar = document.querySelector(
    ".onboarding__profile--container",
  );

  if (avatar) {
    onboardingAvatar.innerHTML = profileAvatars[avatar];
    setOnboardingPageState({"avatarSelected": profileAvatars[avatar]});

    toggleAvatarMenu();
  }
};

// close avatar selection menu once selected
const toggleAvatarMenu = () => {
  const avatarMenu = document.querySelector(".onboarding__menu--profile");

  avatarMenu.classList.toggle("onboarding__menu--active");
};
