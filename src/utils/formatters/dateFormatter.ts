import dayjs from "dayjs";

const DATE_FORMAT = "DD MMM YYYY";

export const formatDate = (
  day: number,
  month: number,
  year: number
): string => {
  const dateString = [day, month, year].join("-");
  const date = dayjs(dateString);
  return date.format(DATE_FORMAT);
};
