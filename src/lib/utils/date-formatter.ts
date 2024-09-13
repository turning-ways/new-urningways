export const formatTime = (timestamp: string | Date) => {
  const now = new Date();
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) return `${diffSec} s ago`;
  if (diffMin < 60) return `${diffMin} m ago`;
  if (diffHour < 24) return `${diffHour} h ago`;
  if (diffDay === 1) return "yesterday";
  if (diffDay < 7) return `${diffDay} d ago`;
  if (diffWeek < 4) return `${diffWeek} w ago`;

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const dobFormatter = (dob: string | number) => {
  const date = new Date(dob);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

/**
 * Formats a date object into a human-readable string.
 *
 * @param {Date} date - The date object to format.
 * @param {string} [format='long'] - The format to use ('short' or 'long').
 * @returns {string} The formatted date string.
 */
export const formatDate = (
  date: string | number,
  format: "short" | "long" = "long"
) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions =
    format === "long"
      ? { year: "numeric", month: "long", day: "numeric" }
      : { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(dateObj);
};

/**
 * Calculates the number of days between two date objects.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {number} The number of days between the two dates.
 */
export const daysBetween = (startDate: Date, endDate: Date) => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Gets the start date of the month for a given date object.
 *
 * @param {Date} date - The date object.
 * @returns {Date} The start date of the month.
 */
export const startOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Gets the end date of the month for a given date object.
 *
 * @param {Date} date - The date object.
 * @returns {Date} The end date of the month.
 */
export const endOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

type FormatOptions = {
  locale?: string; // Optional locale (default is 'en-US')
  includeOrdinal?: boolean; // Option to include ordinal suffix (default is true)
};

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th"; // Special case for 11th to 19th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatDateToCustom = (
  dateInput: Date | string,
  options: FormatOptions = {}
): string => {
  const { locale = "en-US", includeOrdinal = true } = options;

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  // Check for invalid date and return "N/A" if invalid
  if (isNaN(date?.getTime())) {
    return "N/A";
  }

  const month = date.toLocaleString(locale, { month: "long" }); // Full month name
  const day = date.getDate(); // Get day of the month
  const year = date.getFullYear(); // Get full year

  // Add ordinal suffix if the option is enabled
  const ordinalSuffix = includeOrdinal ? getOrdinalSuffix(day) : "";

  return `${month} ${day}${ordinalSuffix}, ${year}`;
};
