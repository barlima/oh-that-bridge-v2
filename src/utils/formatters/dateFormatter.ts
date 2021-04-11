import dayjs from "dayjs";

export const formatDate = (
  day: number,
  month: number,
  year: number
): string => {
  const parsedMonth = dayjs().set("month", month).format("MMM");
  return [day, parsedMonth, year].join(" ");
};
