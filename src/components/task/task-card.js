// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
// app task
import {
  renderPage,
  setTaskState,
  setTaskExpanded,
  setTaskManagementStep,
  getCategorizedDate,
  getCategory,
  getPriority,
  isTaskOverdue,
} from "../../application/task.js";

export const createTaskCard = (task) => {
  // hero card
  const taskCard = document.createElement("div");
  taskCard.className = "task-card";
  taskCard.ariaExpanded = task.isExpanded;
  taskCard.id = `${task.id}-card`;

  taskCard.innerHTML = ""
  // task title
  const taskTitle = document.createElement("label");
  taskTitle.className = "task-card__title";
  taskTitle.setAttribute("for", task.id);
  taskTitle.textContent = task.title;
  // task check input
  const taskCheck = document.createElement("input");
  taskCheck.type = "checkbox";
  taskCheck.className = "task-card__checkbox";
  taskCheck.id = task.id;
  // task card's [date, category, priority] wrapper
  const taskProps = document.createElement("div");
  taskProps.className = "task-card__props";

  taskProps.innerHTML = `
  <span class="task-card__props-item">
    ${getGlobalAsset("calendar-icon")}
    ${getCategorizedDate(task.duedate)}
  </span>
  <span class="task-card__props-item task-card__props-item--category">
    ${getCategory(task.categoryId).name}
  </span>
  <span class="task-card__props-item">
    ${getGlobalAsset(getPriority(task.priority)?.iconRef)}
    ${getPriority(task.priority).name}
  </span>
  `;

  // actions
  // edit button
  const taskEditButton = document.createElement("button");
  taskEditButton.className = "task-card__edit-btn";
  taskEditButton.innerHTML = getGlobalAsset("edit-icon");

  // view description and delete buttons based on task state.
  const taskButton = document.createElement("button");
  taskButton.className = "task-card__btn";
  taskButton.innerHTML = task.completed
    ? getGlobalAsset("delete-icon")
    : getGlobalAsset("info-icon");
  // container for wrapping buttons.
  const taskButtonsContainer = document.createElement("div"); 
  taskButtonsContainer.className = "task-card__buttons-container";
  taskButtonsContainer.innerHTML = "";

  if (isTaskOverdue(task.duedate)) {
     taskButtonsContainer.append(taskButton);
  } else {
    taskButtonsContainer.innerHTML = "";
     taskButtonsContainer.append(taskEditButton, taskButton);
  }
  
  
  // description container.
  const taskDescription = document.createElement("section");
  taskDescription.className = "task-card-description";
  // description label.
  const taskDescriptionLabel = document.createElement("label");
  taskDescriptionLabel.className = "task-card-description__label";
  taskDescriptionLabel.textContent = "Description";
  // description content.
  const taskDescriptionContent = document.createElement("p");
  taskDescriptionContent.className = "task-card-description__content";
  taskDescriptionContent.textContent = `${task.description || "No description"}`;


  taskDescription.append(taskDescriptionLabel, taskDescriptionContent);
  taskCard.append(taskCheck, taskTitle, taskProps, taskButtonsContainer);

  // style and listeners
  if (task.completed) {
    // delete btn
    taskCard.classList.add("task-card--completed");
    taskCheck.checked = true;

    taskButton.addEventListener("click", () => {
      let taskCardId = taskCard.id;
      taskCardId = taskCardId.replace(/-card$/, "");

      setTaskManagementStep({ step: "delete", currentTaskId: taskCardId });
    });
  } else {
    // view info
    taskButton.addEventListener("click", () => {
      let taskCardId = taskCard.id;
      taskCardId = taskCardId.replace(/-card$/, "");
      
      const isTaskExpanded = setTaskExpanded(taskCardId);
      taskCard.ariaExpanded = isTaskExpanded;

      if (isTaskExpanded) {
        taskCard.innerHTML = "";
        taskCard.append(taskCheck, taskTitle, taskProps, taskButtonsContainer, taskDescription);
        
        setTimeout(() => {
          taskCard.classList.add("is-expanded");  
        }, 50);

      } else {
        taskCard.classList.remove("is-expanded");

        setTimeout(() => {
          taskCard.innerHTML = "";
          taskCard.append(taskCheck, taskTitle, taskProps, taskButtonsContainer);
        }, 200)
      }
    });

    if (task.isExpanded) {
      taskCard.append(taskDescription);
      taskCard.classList.add("is-expanded");
    }

    // edit
    taskEditButton.addEventListener("click", () => {
      let taskCardId = taskCard.id;
      taskCardId = taskCardId.replace(/-card$/, "");

      setTaskManagementStep({ step: "edit", currentTaskId: taskCardId });
    });
  }

  // functions
  taskCheck.addEventListener("change", () => {
    const taskCardId = task.id;

    setTaskState(taskCardId);
    
    const taskCard = document.getElementById(`${taskCardId}-card`);
    const taskBtn = taskCard.querySelector(".task-card__btn");

    taskCard.classList.toggle("task-card--completed");
    taskBtn.innerHTML = getGlobalAsset("delete-icon");

    // save tasks (appData) to local and render list.
    renderPage();
  });

  return taskCard;
};
