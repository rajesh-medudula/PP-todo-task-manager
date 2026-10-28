// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
import { priorityData } from "../../application/priority.js";

// task app.
import { getTempTask, updateTempTask } from "../../application/task.js";

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
  const tempTask = getTempTask();
  const currentId = tempTask ? tempTask.priority : id;

  const priorities = priorityData();

  const body = document.createElement("section");
  body.className = "priority";

  const priorityLabel = document.createElement("span");
  priorityLabel.className = "priority__label";
  priorityLabel.setAttribute("for", "priority-list");
  priorityLabel.textContent = "Priority";

  const priorityList = document.createElement("ul");
  priorityList.className = "priority__list";
  priorityList.setAttribute("data-id", currentId);

  priorities.forEach((priority) => {
    const button = document.createElement("button");
    button.className = "priority__item";
    button.setAttribute("data-id", priority.id);
    button.innerHTML = `${getGlobalAsset(priority.iconRef)} ${priority.name}`;

    if (priority.id == currentId) {
      button.classList.add("priority__item--active");
    }

    button.addEventListener("click", (event) => {
      const priority = event.currentTarget.dataset.id;
      const tempTask = getTempTask();

      if (tempTask) {
        tempTask.priority = priority;
        updateTempTask(tempTask);
      }
    });

    priorityList.append(button);
  });

  body.append(priorityLabel, priorityList);

  setPriorityActive(priorityList);

  priorityList.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    priorityList.setAttribute("data-id", id);
  });

  return body;
};
