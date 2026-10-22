// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
import { priorityData } from "../../application/priority.js";

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

export const createPriority = (id = 2) => {
  const priorities = priorityData();

  const body = document.createElement("section");
  body.className = "priority";

  const priorityLabel = document.createElement("label");
  priorityLabel.className = "priority__label";
  priorityLabel.setAttribute("for", "priority-list");
  priorityLabel.textContent = "Priority";

  const priorityList = document.createElement("ul");
  priorityList.className = "priority__list";
   priorityList.setAttribute("data-id", id);

  priorities.forEach((priority) => {
    const button = document.createElement("button");
    button.className = "priority__item";
    button.setAttribute("data-id", priority.id);
    button.innerHTML = `${getGlobalAsset(priority.iconRef)} ${priority.name}`;

    if (priority.id == id) {
      button.classList.add("priority__item--active");
    } 

    priorityList.append(button);
  });

  body.append(priorityLabel, priorityList);


  // body.innerHTML = `
  // <label class="priority__label" for="priority-list">Priority</label>
  // <div class="priority__list" id="priority-list">
  //   <button class="priority__item" data-id="1">
  //     ${getGlobalAsset("signal_high-icon")}
  //     High
  //   </button>
  //   <button class="priority__item priority__item--active" data-id="2">
  //     ${getGlobalAsset("signal_mid-icon")}
  //     Medium
  //   </button>
  //   <button class="priority__item" data-id="3">
  //     ${getGlobalAsset("signal_low-icon")}
  //     Low
  //   </button>
  // </div>
  // `;

  
 

  setPriorityActive(priorityList);

  priorityList.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    priorityList.setAttribute("data-id", id);
  });

  return body;
};
