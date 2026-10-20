// app data
import { getCurrentSidebarTab, isSidebarActive, setCurrentSidebarTab } from "../../application/navigation.js";
// assets
import { getGlobalAsset } from "../../assets/svg/global.js";

// sidebar toggle (component listener)
import { toggleSidebar } from "./header.js";

//  sidebar overlay component
export const createSideBarOverlay = () => {
  const overlay = document.createElement("div");

  overlay.className = "sidebar-overlay";

  if (isSidebarActive()) {
    overlay.classList.add("sidebar-overlay--active");
  }

  return overlay;
};

// sidebar component
export const createSideBar = () => {
  const aSide = document.createElement("aside");

  aSide.className = "sidebar";

  if (isSidebarActive()) {
    aSide.classList.add("sidebar--active");
  }

  aSide.innerHTML = `
  <div class="sidebar__logo-container">
    <a class="sidebar__logo">
    ${getGlobalAsset("logo")}
    Todo Task Manager
    </a>
    <button class="sidebar__close-btn">
    ${getGlobalAsset("close-icon")}
    </button>
  </div>
  
  <nav class="sidebar__nav">
    <ul class="sidebar__nav-list">
      <li class="sidebar__nav-item">
        <button class="sidebar__nav-link" id="task-management">
          ${getGlobalAsset("list-icon")}
          <span>Task Management</span>
        </button>
      </li>
      <li class="sidebar__nav-item">
        <button class="sidebar__nav-link" id="dashboard">
          ${getGlobalAsset("dashboard-icon")}
          <span>Dashboard</span>
        </button>
      </li>
      <li class="sidebar__nav-item">
        <button class="sidebar__nav-link" id="preferences">
          ${getGlobalAsset("preferences-icon")}
          <span>Preferences</span>
        </button>
      </li>
      <li class="sidebar__nav-item">
        <button class="sidebar__nav-link" id="about-app">
          ${getGlobalAsset("info-icon")}
          <span>About App</span>
        </button>
      </li>
    </ul>

    <span class="sidebar__nav-app-version">V1.0</span>
  </nav>
  `;

  // set sidebar tab active
const setSidebarTabActive = (element) => {
  const id = getCurrentSidebarTab();
  const currentTab = element.querySelector(`#${id}`);

  currentTab.classList.add("sidebar__nav-link--active");
}

setSidebarTabActive(aSide);

  // sidebar toggle close btn event
  const sidebarList = aSide.querySelector(".sidebar__nav-list");
  sidebarList.addEventListener("click", (event) => {
    const currentTabId = event.target.id;
    setCurrentSidebarTab(currentTabId);

    setSidebarTabActive(aSide);
  });


  const sidebarCloseBtn = aSide.querySelector(".sidebar__close-btn");
  sidebarCloseBtn.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    toggleSidebar(sidebar, sidebarOverlay);
  });

  return aSide;
};


