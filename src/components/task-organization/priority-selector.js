// assets
import { getGlobalAsset } from "../../assets/svg/global.js";

// set selected priority active.
const setPriorityActive = (element) => {
  const allPriorityElements = element.querySelectorAll(".priority__item");

  allPriorityElements.forEach((priorityElement) => {
    priorityElement.addEventListener("click", (event) => {
      allPriorityElements.forEach((priorityElement) => {
        priorityElement.classList.remove("priority__item--active");
      });
      const currentPriorityElement = event.currentTarget;
      currentPriorityElement.classList.add("priority__item--active");
    });
  });
};

export const createPriority = () => {
  const body = document.createElement("section");
  body.className = "priority";

  body.innerHTML = `
  <label class="priority__label" for="priority-list">Priority</label>
  <div class="priority__list" id="priority-list">
    <button class="priority__item" data-id="1">
      ${getGlobalAsset("signal_high-icon")}
      High
    </button>
    <button class="priority__item priority__item--active" data-id="2">
      ${getGlobalAsset("signal_mid-icon")}
      Medium
    </button>
    <button class="priority__item" data-id="3">
      ${getGlobalAsset("signal_low-icon")}
      Low
    </button>
  </div>
  `;

  const priorityList = body.querySelector(".priority__list");
  priorityList.setAttribute("data-id", "2");

  setPriorityActive(priorityList);

  priorityList.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    priorityList.setAttribute("data-id", id);
  });

  return body;
};
