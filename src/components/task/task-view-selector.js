import {
  setCurrentListViewId,
  getCurrentListViewId,
} from "../../application/task-view.js";

// tabs in task management
const listViewTabs = [
  {
    id: "today",
    name: "Today",
    icon: "",
  },
  {
    id: "tomorrow",
    name: "Tomorrow",
    icon: "",
  },
  {
    id: "upcoming",
    name: "Upcoming",
    icon: "",
  },
  {
    id: "overdue",
    name: "Overdue",
    icon: "",
  }
]

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

// creates tab.
const createTabBtn = (tab) => {
  const button = document.createElement("button");
  button.className = "views__btn";
  button.id = tab.id;
  
  button.textContent = tab.name;

  button.addEventListener("click", (event) => {
    setCurrentListViewId(event.currentTarget.id);
  })
  return button;
}

// tabs component.
export const createViewSelection = () => {
  const viewNav = document.createElement("nav");
  viewNav.className = "views";

  listViewTabs.forEach((tab) => {
    viewNav.append(createTabBtn(tab));
  })

  setCurrentTabActive(viewNav);
  return viewNav;
};
