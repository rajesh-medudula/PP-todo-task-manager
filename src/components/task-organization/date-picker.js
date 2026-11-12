// assets
import { getGlobalAsset } from "../../assets/svg/global.js";

import {
  getPreviousMonthDays,
  getStartingDay,
  getTotalDays,
  getDateData,
  formatDate,
  getSplitedDate,
  getFormatedDateString,
} from "../../application/date-picker.js";

// due date component
const body = document.createElement("section");
body.className = "dueDate";

export const createDueDate = (date) => {
  body.innerHTML = "";

  const today = date ? new Date(date) : new Date();

  // label
  const label = document.createElement("span");
  label.className = "due-date__label";
  label.textContent = "Due date";
  label.setAttribute("for", "due-date");

  // date display
  const selectedDateContainer = document.createElement("div");
  selectedDateContainer.className = "due-date__date-container";
  selectedDateContainer.dataset.date = formatDate(today);

  selectedDateContainer.innerHTML = `
    ${getGlobalAsset("calendar-icon")}
    <span class="due-date__text">${getFormatedDateString(today)}</span>
  `;

  // dates
  // default date (today).
  const defaultDate = new Date();

  // month
  const monthContainer = document.createElement("div");
  monthContainer.className = "month-container";

  const monthText = document.createElement("span");
  monthText.className = "month-container__month";

  // month - nav (prev - next btns)
  const prevBtn = document.createElement("button");
  prevBtn.className = "month-container__btn month-container__btn--prev";
  prevBtn.innerHTML = getGlobalAsset("chevron-left");

  const nextBtn = document.createElement("button");
  nextBtn.className = "month-container__btn month-container__btn--next";
  nextBtn.innerHTML = getGlobalAsset("chevron-right");

  // month - nav (prev - next btns listeners)
  nextBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const nextMonth = new Date(
      defaultDate.getFullYear(),
      defaultDate.getMonth() + 1,
    );

    renderDates(nextMonth, false);
  });

  prevBtn.addEventListener("click", (event) => {
    event.preventDefault();
    renderDates(undefined, true);
  });

  monthContainer.append(prevBtn, monthText, nextBtn);

  // days component (mon, tue, wed...)
  const daysGrid = document.createElement("div");
  daysGrid.className = "days";

  daysGrid.innerHTML = `
  <div class="day">Mon</div>
  <div class="day">Tue</div>
  <div class="day">Wen</div>
  <div class="day">Thu</div>
  <div class="day">Fri</div>
  <div class="day">Sat</div>
  <div class="day">Sun</div>
  `;

  // grid (holds date cells)
  const datesGrid = document.createElement("div");
  datesGrid.className = "dates";

  // renders dates (grid, month);
  function renderDates(date = defaultDate, isCurrent = true) {
    datesGrid.innerHTML = "";

    const currentDate = getDateData(date);
    currentDate.isCurrent = isCurrent;

    // starting day tells on which day (mon-sun) day 1 appeared.
    const startingDay = getStartingDay(currentDate);

    // previous month total days ex: 31 days in oct.
    const prevDays = getPreviousMonthDays(currentDate);

    // current month total days.
    const totalDays = getTotalDays(currentDate);

    // current month name
    monthText.textContent = currentDate.monthName();

    // create prev month dates and this loop appends previous month dates.
    for (let i = prevDays - startingDay + 1; i <= prevDays; i++) {
      const dateElement = document.createElement("button");
      dateElement.className = "date inactive";
      dateElement.textContent = i;
      dateElement.disabled = true;

      datesGrid.append(dateElement);
    }

    // create current month dates and this loop appends current month dates.
    for (let i = 1; i <= totalDays; i++) {
      const genDate = new Date(currentDate.year, currentDate.month, i);

      const dateElement = document.createElement("button");
      dateElement.className = "date";
      dateElement.textContent = genDate.getDate();
      dateElement.dataset.date = formatDate(genDate);

      if (i < currentDate.date) {
        dateElement.classList.add("inactive");
        dateElement.disabled = true;
      } else if (i === currentDate.date && currentDate.isCurrent) {
        dateElement.classList.add("active", "today");
        dateElement.dataset.action = "selected-date";
      } else {
        dateElement.classList.add("active");
        dateElement.dataset.action = "selected-date";
      }

      datesGrid.append(dateElement);

      dateElement.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }
  }

  renderDates();

  // date section insdie due date component
  const dateSection = document.createElement("section");
  dateSection.className = "date-section";

  dateSection.append(monthContainer, daysGrid, datesGrid);

  // due-date main component inside due date section
  const div = document.createElement("div");
  div.className = "due-date__container";
  div.id = "due-date";

  div.addEventListener("click", (event) => {
    const btn = event.target.closest('[data-action="selected-date"]');
    if (!btn) return;

    const dateString = btn.dataset.date; //2026-11-12
    const finalDate = getSplitedDate(dateString); //{2026, 11, 12}

    const dateISOString = new Date(
      finalDate.year,
      finalDate.month,
      finalDate.day,
    );

    // changes display when clicked individual dates.
    selectedDateContainer.innerHTML = `
    ${getGlobalAsset("calendar-icon")}
    <span class="due-date__text">${getFormatedDateString(dateISOString)}</span>
  `;

    selectedDateContainer.dataset.date = dateString;
  });

  div.append(selectedDateContainer, dateSection);

  body.append(label, div);
  return body;
};
