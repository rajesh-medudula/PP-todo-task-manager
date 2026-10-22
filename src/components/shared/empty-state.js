// app task
import { setTaskManagementStep } from "../../application/task.js";
// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
import { getCurrentListViewId } from "../../application/task-view.js";

// create empty state (list)
export const createEmptyState = () => {
  const emptySection = document.createElement("section");
  const currentTab = getCurrentListViewId();

  emptySection.className = "empty";

  // wrapper
  const emptyWrapper = document.createElement("div");
  emptyWrapper.className = "empty__wrapper";
  
  // icon.
  const iconContainer = document.createElement("div");
  iconContainer.className = "empty__icon-container";
  iconContainer.innerHTML = getGlobalAsset("check-icon");

  // text content.
  const textContent = document.createElement("div");
  textContent.className = "empty__text-content";
  
  if (currentTab === "overdue") {
    textContent.innerHTML = `
    <span class="empty__title">Nothing ${currentTab}</span><br>
    `
  } else {
    textContent.innerHTML = `
    <span class="empty__title">Nothing due ${currentTab}</span><br>
    <span class="empty__description">You're clear for ${currentTab}. Add a task to plan ahead</span>
    `
  }
  // create task button.
  const createTaskBtn = document.createElement("button");
  createTaskBtn.className = "empty__create-btn";
  createTaskBtn.innerHTML = `${getGlobalAsset("plus-icon")}Create Task`;

  emptyWrapper.append(iconContainer, textContent);
  if (currentTab !== "overdue") {
  emptyWrapper.append(createTaskBtn);
  }

  emptySection.append(emptyWrapper);

  createTaskBtn.addEventListener("click", () => {
    // enables to render task creation modal in page.
    setTaskManagementStep({ step: "create" });

    setTimeout(() => {
      const overlay = document.querySelector(".modal-overlay--creation");
      overlay.classList.add("modal-overlay--creation--active");
    }, 50);
  });

  return emptySection;
};
