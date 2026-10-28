// app data
import {
  getCurrentSidebarTab,
  getSidebarState,
  setCurrentSidebarTab,
} from "../../application/navigation.js";
// assets
import { getGlobalAsset } from "../../assets/svg/global.js";

// sidebar toggle (component listener)
import { toggleSidebar } from "./header.js";

const sidebarItems = [
  {
    id: "task-management",
    name: "Task Management",
    icon: "list-icon",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "dashboard-icon",
  },
  {
    id: "preferences",
    name: "Preferences",
    icon: "preferences-icon",
  },
  {
    id: "about-app",
    name: "About App",
    icon: "info-icon",
  }
];


const createSidebarNavBtn = (item) => {
  const li = document.createElement("li");
  li.className = "sidebar__nav-item";

  const button = document.createElement("button");
  button.className = "sidebar__nav-link";
  button.id = item.id;

  button.innerHTML = getGlobalAsset(item.icon);

  const text = document.createElement("span");
  text.className = "sidebar__nav-text";
  text.textContent = item.name

  button.append(text);
  li.append(button);

  button.addEventListener("click", (event) => {
    const currentTabId = event.currentTarget.id;
    setCurrentSidebarTab(currentTabId);

    button.classList.add("sidebar__nav-link--active");
  })

  return li;
} 

//  sidebar overlay component
export const createSidebar = () => {
  const isSidebarActive = getSidebarState();
  
  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";
  
  
  const aSide = document.createElement("aside");
  aSide.className = "sidebar";

  if (isSidebarActive) {
    overlay.classList.add("sidebar-overlay--active");
    aSide.classList.add("sidebar--active");
  }

  // sidebar logo
  const sidebarLogoContainer = document.createElement("div");
  sidebarLogoContainer.className = "sidebar__logo-container";
  
  const sidebarLogo = document.createElement("span");
  sidebarLogo.className = "sidebar__logo";
  sidebarLogo.innerHTML = `${getGlobalAsset("logo")} Todo Task Manager`;
  const sidebarCloseBtn = document.createElement("button");
  sidebarCloseBtn.className = "sidebar__close-btn";
  sidebarCloseBtn.innerHTML = `${getGlobalAsset("close-icon")}`;
  // append logo and close btn
  sidebarLogoContainer.append(sidebarLogo, sidebarCloseBtn);


  // sidebar nav
  const sidebarNav = document.createElement("sidebar__nav");
  sidebarNav.className = "sidebar__nav";
  
  const sidebarList = document.createElement("ul");
  sidebarList.className = "sidebar__nav-list";
  // appends all items to sidebar list.
  sidebarItems.forEach((item) => {
    sidebarList.append(createSidebarNavBtn(item, aSide));
  });

  // append components.
  sidebarNav.append(sidebarList, );


  //app version
  const appVersion = document.createElement("span");
  appVersion.className = "sidebar__version";
  appVersion.textContent = "V_1.0";

  // append to sidebar.
  aSide.append(sidebarLogoContainer, sidebarNav, appVersion);
  overlay.append(aSide);

  // styles and operations.
  
  // set current tab active when refreshed.
   const id = getCurrentSidebarTab();
   const currentTab = aSide.querySelector(`#${id}`);
   currentTab.classList.add("sidebar__nav-link--active");

  // sidebar close
  sidebarCloseBtn.addEventListener("click", () => {
    toggleSidebar(aSide, overlay);
  });

  return overlay;
};
