export const truncateString = (str: string, num = 100) => {
  const trncatedString = str.length > num ? str.slice(0, num) + '...' : str
  return trncatedString
}