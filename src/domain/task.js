export const isTaskValid = (task) => {
  if (!task.title.trim()) {
    return false;
  }

  return true;
}

export const createTaskEntity = (taskData) => {
  return {
    id: crypto.randomUUID(),
    title: taskData.title,
    description: taskData.description,
    categoryId: taskData.categoryId,
    duedate: taskData.date,
    priority: taskData.priority,
    completed: false,
    createdAT: new Date(),
    isExpanded: false,
  }
}