// Set item in local storage
export const setLocalStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting local storage:", error);

    return `Error setting local storage: ${error}`;
  }
};

// Get item from local storage
export const getLocalStorageItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return `Error getting local storage: ${error}`;
  }
};

// Remove item from local storage
export const removeLocalStorageItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    return `Error removing from local storage: ${error}`;
  }
};

export const LOCAL_KEYS = {
  USER_TASKS: "user_tasks",
  ACCESS_TOKEN: "access_token",
  USER_DETAILS: "user_details",
};
