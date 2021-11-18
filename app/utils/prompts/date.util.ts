// Returns date string in format DD-MM-YYYY
export const getFormattedDate = (date: Date): string => {
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return formattedDate;
};
