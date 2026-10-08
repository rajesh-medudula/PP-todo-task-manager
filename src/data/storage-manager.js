export const setItem = (key, value) => {
  if (!key) {
    return "Invalid key!";
  }

  localStorage.setItem(key, JSON.stringify(value))  
}

export const getItem = (key) => {
  const value = JSON.parse(localStorage.getItem("currentStates")) || null;

  return value;
}

export const removeItem = (key) => {
  localStorage.removeItem(key);
}

