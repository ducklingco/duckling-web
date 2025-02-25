export const isValidEmailAddress = (email: string): boolean => {
  return (
    email.length > 0 &&
    email.includes("@") &&
    email.includes(".") &&
    email.replaceAll("@", "").replaceAll(".", "").length > 0 &&
    email.split("@")[0].length > 0 &&
    email.split("@")[1].split(".")[0].length > 0 &&
    email.split("@")[1].split(".")[1].length > 0
  );
};
