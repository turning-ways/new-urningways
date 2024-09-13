type StorageReturn = string | null;

export const safeLocalStorage = {
  get: (key: string): StorageReturn => {
    try {
      if (typeof window === "undefined") {
        // Handle case where localStorage is not available (e.g., server-side)
        return null;
      }

      const value = localStorage.getItem(key);
      return value;
    } catch (error) {
      console.error(
        `Error getting item from localStorage by key: ${key}`,
        error
      );
      return null;
    }
  },

  set: (key: string, value: string): boolean => {
    try {
      if (typeof window === "undefined") {
        // Handle case where localStorage is not available (e.g., server-side)
        return false;
      }

      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(
        `Error setting item in localStorage for key: ${key}`,
        error
      );
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      if (typeof window === "undefined") {
        // Handle case where localStorage is not available (e.g., server-side)
        return false;
      }

      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(
        `Error removing item from localStorage by key: ${key}`,
        error
      );
      return false;
    }
  },

  clear: (): boolean => {
    try {
      if (typeof window === "undefined") {
        // Handle case where localStorage is not available (e.g., server-side)
        return false;
      }

      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage", error);
      return false;
    }
  },
};
