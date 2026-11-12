import { getCategorizedDate } from "./task";

// date data.
export const getDateData = (date) => {
  return {
    isCurrent: true,
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay(),
    monthName: function () {
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(new Date(this.year, this.month, 1));
    },
  };
};

// on which day given date starts? (Mon(0) - Sun(6))
export const getStartingDay = (date) => {
  const firstDay = new Date(date.year, date.month, 1).getDay();
  return (firstDay + 6) % 7;
};

// total current month days (30 or 31) based on give date object
export const getTotalDays = (date) => {
  return new Date(date.year, date.month + 1, 0).getDate();
};

// total prev month days (30 or 31) based on give date object
export const getPreviousMonthDays = (date) => {
  return new Date(date.year, date.month, 0).getDate();
};

// format date object to (ex: 2026-11-12)
export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// formats date object to (ex: Today - Thu, Nov 12)
export const getFormatedDateString = (date) => {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();

  return `${getCategorizedDate(date)} - ${weekday}, ${month} ${day}`;
};

// return ex: {2026, 11, 12}
export const getSplitedDate = (date) => {
  const [year, month, day] = date.split("-").map(Number);

  return { year: year, month: month - 1, day: day };
};

export const getISODate = (date) => {
  const rawDate = getSplitedDate(date);

  return new Date(rawDate.year, rawDate.month, rawDate.day);
};
