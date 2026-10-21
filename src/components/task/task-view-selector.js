import {
  setCurrentListViewId,
  getCurrentListViewId,
} from "../../application/task-view.js";

// tabs in task management

// set active tab style
const setCurrentTabActive = (element) => {
  try {
    const id = getCurrentListViewId();
    const currentListTab = element.querySelector(`#${id}`);

    currentListTab.classList.add("views__btn--active");
  } catch {
    return;
  }
};

export const createViewSelection = () => {
  const viewNav = document.createElement("nav");

  viewNav.className = "views";

  viewNav.innerHTML = `
  <button class="views__btn views__btn--today" id="today">
  <span>Today</span>
  </button>
  <button class="views__btn views__btn--tmr" id="tomorrow">
  <span>Tomorrow</span>
  </button>
  <button class="views__btn views__btn--upcoming" id="upcoming">
  <span>Upcoming</span>
  </button>
  <button class="views__btn views__btn--overdue" id="overdue">
  <span>Overdue</span>
  </button>
  `;

  viewNav.addEventListener("click", (event) => {
    const tabName = event.target.id;

    setCurrentListViewId(tabName);
    setCurrentTabActive(viewNav);
  });

  setCurrentTabActive(viewNav);

  return viewNav;
};
