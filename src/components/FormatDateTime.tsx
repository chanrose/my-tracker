import dayjs from "dayjs";

export const formatTime = (inputNumber: number) => {
  if (inputNumber >= 60) {
    const min = (inputNumber /= 60);
    const sec = (inputNumber %= 60);

    return min.toFixed(0) + " min, " + sec + " sec";
  } else {
    return inputNumber + " sec";
  }
};

export const formatDateTime = (inputDate: string) => {
  const date = dayjs(inputDate);
  return date.format("dddd, MMMM D, YYYY h:mm A");
};

export const formatDate = (inputDate: string) => {
  const date = dayjs(inputDate);
  return date.format("dddd, MMMM D, YYYY");
};

export const formatDetailTime = (inputDate: string) => {
  const date = dayjs(inputDate);
  return date.format("h:mm A");
};
