/**
 * Formats a person's name by capitalizing the first and last names.
 * If both names are provided, it returns them as "First Last".
 * If only one name is provided, it returns the capitalized name.
 * If neither name is provided, it returns "Unknown".
 *
 * @param {string | undefined} firstName - The first name to format.
 * @param {string | undefined} lastName - The last name to format.
 * @returns {string} The formatted name or "Unknown" if no names are provided.
 */
export const NameFormatter = (
  firstName: string | undefined,
  lastName: string | undefined
) => {
  if (firstName && lastName) {
    return `${nameCapitalizer(firstName)} ${nameCapitalizer(lastName)}`;
  } else if (firstName && !lastName) {
    return nameCapitalizer(firstName);
  } else if (!firstName && lastName) {
    return nameCapitalizer(lastName);
  } else {
    return "Unknown";
  }
};

/**
 * Capitalizes the first letter of a given name and converts the rest to lowercase.
 * If the name is empty or undefined, it returns "...".
 *
 * @param {string} name - The name to capitalize.
 * @returns {string} The capitalized name or "..." if the name is empty.
 */
export const nameCapitalizer = (name: string) => {
  if (!name) return "...";
  return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();
};

/**
 * Capitalizes only the first letter of a given name.
 *
 * @param {string} name - The name to capitalize.
 * @returns {string} The first letter of the name, capitalized.
 */
const firstNameCapitalizer = (name: string) => {
  return name?.charAt(0)?.toUpperCase();
};

/**
 * Formats a person's profile name by capitalizing only the first letters of the first and last names.
 * If both names are provided, it returns them as "FL".
 * If only one name is provided, it returns the first letter capitalized.
 * If neither name is provided, it returns "Unknown".
 *
 * @param {string} firstName - The first name to format.
 * @param {string} lastName - The last name to format.
 * @returns {string} The formatted profile name or "Unknown" if no names are provided.
 */
export const ProfileNameFormatter = (firstName?: string, lastName?: string) => {
  if (firstName && lastName) {
    return `${firstNameCapitalizer(firstName)}${firstNameCapitalizer(
      lastName
    )}`;
  } else if (firstName && !lastName) {
    return firstNameCapitalizer(firstName);
  } else if (!firstName && lastName) {
    return firstNameCapitalizer(lastName);
  } else {
    return "Unknown";
  }
};

export const textCapitalizer = (text: string) => {
  return text?.charAt(0)?.toUpperCase() + text?.slice(1)?.toLowerCase();
};
