import { setCurrentState } from "../../application/application-state.js";

// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
// empty state
import { createEmptyState } from "../shared/empty-state.js";

import { getTasks } from "../../data/task-persistence.js";
import { createTaskCard } from "./task-card.js";

import { getCurrentListViewId } from "../../application/task-view.js";
import { getCategorizedDate } from "../../application/task.js";
// components
// create btn
const createTaskBtn = () => {
  const button = document.createElement("button");

  button.className = "tasks__create-btn";
  button.innerHTML = getGlobalAsset("plus-icon");

  button.addEventListener("click", () => {
    setCurrentState("taskManagement", { step: "create" });
    setTimeout(() => {
      const overlay = document.querySelector(".modal-overlay--creation");
      overlay.classList.add("modal-overlay--creation--active");
    }, 50);
  });

  return button;
};

// task list
export const createTasksList = () => {
  const allTasks = getTasks();
 
  const tasksListSection = document.createElement("section");
  tasksListSection.className = "tasks";

  const tasks = allTasks.filter((task) => {
    const currentTaskListView = getCurrentListViewId();
    const taskCategory = getCategorizedDate(task.duedate).toLocaleLowerCase();

    if ("yesterday" === taskCategory && currentTaskListView === "overdue") {
      return true;
    }

    return currentTaskListView === taskCategory;
  });

  if (tasks.length < 1) {
    tasksListSection.append(createEmptyState());
  } else {
    tasks.forEach((task) => {
      tasksListSection.append(createTaskCard(task));
    });

    tasksListSection.append(createTaskBtn());
  }
  return tasksListSection;
};
