export const validUrl = (name) => {
  if (typeof name !== "string") return "";

  // Remove all non-alphanumeric characters except hyphens and underscores
  return name
    .trim()
    .replace(/[^a-zA-Z0-9-_]/g, "") // remove special characters
    .replace(/\s+/g, ""); // remove spaces (redundant if using above)
};
