// assets
import { getGlobalAsset } from "../../assets/svg/global.js";
import { getCategorizedDate } from "../../application/task.js";

const body = document.createElement("section");
body.className = "dueDate";

export const createDueDate = (date) => {
  body.innerHTML = "";

  const today = date ? new Date(date) : new Date();

  const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
  const month = today.toLocaleDateString("en-US", { month: "short" });
  const day = today.getDate();

  const formatedDate = `${getCategorizedDate(date)} - ${weekday}, ${month} ${day}`;

  // label
  const label = document.createElement("span");
  label.className = "due-date__label";
  label.textContent = "Due date";
  label.setAttribute("for", "due-date");

  const div = document.createElement("div");
  div.className = "due-date__container";
  div.id = "due-date";

  div.innerHTML = `
    ${getGlobalAsset("calendar-icon")}
    <span class="due-date__text">${formatedDate}</span>
  `;

  body.append(label, div);
  return body;
};
