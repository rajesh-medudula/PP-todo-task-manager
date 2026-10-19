// app -> data
import { user, setSidebarState } from "../../application/navigation.js";
// assets
import { getGlobalAsset } from "../../assets/svg/global.js";

// header component
export const createHeader = () => {
  const header = document.createElement("header");

  header.innerHTML = `
  <nav class="header__nav">
    <div class="header__nav-list">
      <button class="header__nav-item header__hamburger">
        <a class="header__nav-link">
          ${getGlobalAsset("bars-icon")}
        </a>
      </button>
      <button class="header__nav-item">  
        <a class="header__nav-link">
          ${getGlobalAsset("search-icon")}
        </a>
      </button>
      <button class="header__nav-item">
        <a class="header__nav-link">
          ${user("avatar")}
        </a>
      </button>
    </div>
  </nav>
  `;

  // hamburger event on click.
  const hamburger = header.querySelector(".header__hamburger");

  hamburger.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    toggleSidebar(sidebar, sidebarOverlay);
  });

  return header;
};

// toggle sidebar.
export const toggleSidebar = (sidebar, sidebarOverlay) => {
  if (sidebar && sidebarOverlay) {
    sidebar.classList.toggle("sidebar--active");
    sidebarOverlay.classList.toggle("sidebar-overlay--active");

    const mainContent = document.querySelector(".main-content");

    if (mainContent) {
      mainContent.classList.toggle("main-content--sidebar-active");
    }
  }

  // sets sidebar active / inactive.
  setSidebarState();
};
