export const setItem = (key, value) => {
  if (!key) {
    console.error(`Invalid key! ${key}`);
    return false;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error.name === "QuotaExceededError" || error.name === "NS_ERROR_DOM_QUOTA_REACHED") {
      console.error("Storage Error: Limit exceeded");
    } else {
      console.error("Storage Error: Failed to save data.", error);
    }

    return false;
  }
}

export const getItem = (key) => {
  if (!key) return null;

  const rawValue = localStorage.getItem(key);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.error(`Storage Error: Failed to parse key: ${key}`)
    return rawValue;
  }
}

export const removeItem = (key) => {
  if (!key) return;
  localStorage.removeItem(key);
}

