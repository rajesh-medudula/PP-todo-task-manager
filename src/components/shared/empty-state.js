import { getGlobalAsset } from "../../assets/svg/global.js";

// create empty state (list)
export const createEmptyState = () => {
  const emptySection = document.createElement("section");
  
  emptySection.className = "empty"

  emptySection.innerHTML = `
  <div class="empty__wrapper">
    <div class="empty__icon-container">
      ${getGlobalAsset("check-icon")}
    </div>
    <div class="empty__text-content">
     <span class="empty__title">Nothing due today</span><br>
     <span class="empty__description">You're clear for today. Add a task to plan ahead</span>
    </div>
    <button class="empty__create-btn">
      ${getGlobalAsset("plus-icon")}
      Create Task
    </button>
  </div>
  `;

  const createBtn = emptySection.querySelector(".empty__create-btn");

  
  createBtn.addEventListener("click", () => {
    const overlay = document.querySelector(".modal-overlay--creation");
    overlay.classList.add("modal-overlay--creation--active");
  });


  return emptySection;
}



