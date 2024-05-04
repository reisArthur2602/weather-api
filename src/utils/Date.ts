export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const diffDays = (date1: Date, date2: Date): string => {
  const diffInMs = date2.getTime() - date1.getTime();

  const diffInDays = diffInMs / (1000 * 3600 * 24);

  return String(Math.round(diffInDays) + 1);
};
