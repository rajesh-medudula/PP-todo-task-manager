// app data
import { isSidebarActive } from "../../application/navigation.js";
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
        <a class="sidebar__nav-link">
          ${getGlobalAsset("list-icon")}
          <span>Task Management</span>
        </a>
      </li>
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link">
          ${getGlobalAsset("dashboard-icon")}
          <span>Dashboard</span>
        </a>
      </li>
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link">
          ${getGlobalAsset("preferences-icon")}
          <span>Preferences</span>
        </a>
      </li>
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link">
          ${getGlobalAsset("info-icon")}
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
};
