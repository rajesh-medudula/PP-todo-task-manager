// storage
import { getItem } from "../../data/storage-manager.js";
import { setCurrentPageState } from "../../application/application-state.js";

// assets
import { getNavigationAsset } from "../../assets/svg/navigation.js";

// user data
import { getUserData } from "../../data/profile-persistence.js";

// header
export const createHeader = () => {
  const header = document.createElement("header");

  header.innerHTML = `
  <nav class="header__nav">
    <div class="header__nav-list">
      <button class="header__nav-item header__hamburger">
        <a class="header__nav-link">
          ${getNavigationAsset("hamburger-icon")}
        </a>
      </button>
      <button class="header__nav-item">  
        <a class="header__nav-link">
          ${getNavigationAsset("search-icon")}
        </a>
      </button>
      <button class="header__nav-item">
        <a class="header__nav-link">
          ${getUserData().avatar}
        </a>
      </button>
    </div>
  </nav>
  `

  // hamburger event
  const hamburger = header.querySelector(".header__hamburger");
  hamburger.addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    
    toggleSidebar(sidebar, sidebarOverlay);
  })
  
  return header;
}


// toggle sidebar
export const toggleSidebar = (sidebar, sidebarOverlay) => {
  if (sidebar && sidebarOverlay) {
    sidebar.classList.toggle("sidebar--active");
    sidebarOverlay.classList.toggle("sidebar-overlay--active");
  }

  let isSidebarActive = getItem("currentStates").globalState.sidebar;
  setCurrentPageState("globalState", {"sidebar": !isSidebarActive});
  isSidebarActive = getItem("currentStates").globalState.sidebar;
}