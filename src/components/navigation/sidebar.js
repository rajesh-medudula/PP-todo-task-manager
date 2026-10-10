// storage
import { getItem } from "../../data/storage-manager.js";

// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
import { getNavigationAsset } from "../../assets/svg/navigation.js";

// sidebar toggle
import { toggleSidebar } from "./header.js";

//  sidebar
export const createSideBarOverlay = () => {
  const overlay = document.createElement("div");

  overlay.className = "sidebar-overlay";
  
  if (getItem("currentStates").globalState.sidebar) {
    overlay.classList.add("sidebar-overlay--active");
  }
  return overlay;
}

export const createSideBar = () => {
  const aSide = document.createElement("aside");

  aSide.className = "sidebar"

  if (getItem("currentStates").globalState.sidebar) {
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
        <a class="sidebar__nav-link">
          ${getNavigationAsset("task-management-icon")}
          <span>Task Management</span>
        </a>
      </li>
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link">
          ${getNavigationAsset("dashboard-icon")}
          <span>Dashboard</span>
        </a>
      </li>
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link">
          ${getNavigationAsset("preferences-icon")}
          <span>Preferences</span>
        </a>
      </li>
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link">
          ${getNavigationAsset("about-app-icon")}
          <span>About App</span>
        </a>
      </li>
    </ul>

    <span class="sidebar__nav-app-version">V1.0</span>
  </nav>
  `;

    // sidebar toggle close btn event
  const sidebarCloseBtn = aSide.querySelector(".sidebar__close-btn");

  sidebarCloseBtn.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    
    toggleSidebar(sidebar, sidebarOverlay);
  });

  return aSide;
}