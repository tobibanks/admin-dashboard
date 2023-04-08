export const truncateString = (str, num = 100) => {
  const trncatedString = str.length > num ? str.slice(0, num) + "..." : str;
  return trncatedString;
};
