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

  const hamburger = header.querySelector(".header__hamburger");

  hamburger.addEventListener("click", toggleSidebar)
  
  return header;
}


export const toggleSidebar = () => {
  const sidebar = document.querySelector(".sidebar");

  sidebar.classList.toggle("sidebar--active");
}
