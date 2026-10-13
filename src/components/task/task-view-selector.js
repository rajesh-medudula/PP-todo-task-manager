
// tabs in task management
export const createViewSelection = () => {
  const viewNav = document.createElement("nav");
  
  viewNav.className = "views";

  viewNav.innerHTML = `
  <button class="views__btn views__btn--active views__btn--today">
  <span>Today</span>
  </button>
  <button class="views__btn views__btn--tmr">
  <span>Tomorrow</span>
  </button>
  <button class="views__btn views__btn--upcoming">
  <span>Upcoming</span>
  </button>
  <button class="views__btn views__btn--overdue">
  <span>Overdue</span>
  </button>
  `;

  return viewNav;
}