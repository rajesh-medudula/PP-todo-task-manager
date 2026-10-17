import { getGlobalAsset } from "../../assets/svg/global.js";

const body = document.createElement("section");
body.className = "dueDate";

export const createDueDate = () => {
  const today = new Date();

  const weekday = today.toLocaleDateString("en-US", {weekday: "short"});
  const month = today.toLocaleDateString("en-US", {month: "short"});
  const day = today.getDate();

  const formatedDate = `Today - ${weekday}, ${month} ${day}`;

  // html
  const label = document.createElement("label");
  label.className = "due-date__label";
  label.textContent = "Due date";
  label.setAttribute("for", "due-date");

  const div = document.createElement("div");
  div.className = "due-date__container";
  div.id = "due-date";
  
  div.innerHTML = `
    ${getGlobalAsset("calendar-icon")}
    <span class="due-date__text">${formatedDate}</span>
  `

  body.append(label, div);
  return body;
}
