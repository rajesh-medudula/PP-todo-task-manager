import { getItem } from "../../data/storage-manager.js";
import { getGlobalAsset } from "../../assets/svg/global.js";
import { categorizeDate } from "../../domain/task-date-rules.js";
import { setTaskState, getTaskData } from "../../application/task.js";
import { notify, setCurrentState, getPriorityIcon } from "../../application/application-state.js";

const categories = getItem("appData").data.categories;
const priorities = getItem("appData").data.priorities;

const getCategory = (id) => {
  return categories.filter((category) => category.id == id)[0];
}

const getPriority = (id) => {
  return priorities.filter((priority) => priority.id == id)[0];
}

export const createTaskCard = (task) => {
  const taskCard = document.createElement("div");
  taskCard.className = "task-card";
  taskCard.id = `${task.id}-card`;

  const taskTitle = document.createElement("label");
  taskTitle.className = "task-card__title";
  taskTitle.setAttribute("for", task.id);
  taskTitle.textContent = task.title;

  const taskCheck = document.createElement("input");
  taskCheck.type = "checkbox";
  taskCheck.className = "task-card__checkbox";
  taskCheck.id = task.id;

  const taskProps = document.createElement("div");
  taskProps.className = "task-card__props";

  taskProps.innerHTML = `
  <span class="task-card__props-item">
    ${getGlobalAsset("calendar-icon")}
    ${categorizeDate(task.duedate)}
  </span>
  <span class="task-card__props-item task-card__props-item--category">
    ${getCategory(task.categoryId)?.name}
  </span>
  <span class="task-card__props-item">
    ${getPriorityIcon(getPriority(task.priority)?.iconRef)}
    ${getPriority(task.priority)?.name}
  </span>
  `;

  const taskButton = document.createElement("button");
  taskButton.className = "task-card__btn";
  taskButton.innerHTML = task.completed ? getGlobalAsset("delete-icon") : getGlobalAsset("info-icon");
 

  taskCard.append(
    taskCheck,
    taskTitle,
    taskProps,
    taskButton,
  );

  // style and listeners
  if (task.completed) {
    taskCard.classList.add("task-card--completed");
    taskCheck.checked = true;

    taskButton.addEventListener("click", (event) => {
      let taskCardId = event.currentTarget.closest(".task-card").id;
      taskCardId = taskCardId.replace(/-card$/, "");

      setCurrentState("taskManagement", {step: "delete", currentTaskId: taskCardId});
    })
  }

  // functions
  taskCheck.addEventListener("change", (event) => {
    const taskCardId = event.currentTarget.id;

    setTaskState(taskCardId);

    const taskCard = document.getElementById(`${taskCardId}-card`);
    const taskBtn = taskCard.querySelector(".task-card__btn");


    taskCard.classList.toggle("task-card--completed");
    taskBtn.innerHTML = getGlobalAsset("delete-icon");

    notify();
  });

  return taskCard;
}