// date categorize
export const categorizeDate = (targetDate) => {
  // Parse target date and enforce local midnight time to match today/yesterday/tomorrow
  const parsedDate = targetDate ? new Date(targetDate) : new Date();
  const userDate = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
  );

  // Get today's local midnight
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Calculate differences in milliseconds
  const oneDayMs = 24 * 60 * 60 * 1000;
  const diffTime = userDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / oneDayMs);

  // Categorize based on day differences
  if (diffDays === 0) return "Today";
  if (diffDays === -1) return "Yesterday";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays > 1) return "Upcoming";
  return "Overdue";
};

export const isDateOverdue = (targetDate) => {
  const categorizedDate = categorizeDate(targetDate);

  return categorizedDate === "Yesterday" || categorizedDate === "Overdue";
};
