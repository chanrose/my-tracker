import dayjs from "dayjs";

export const formatTime = (inputNumber: number) => {
  if (inputNumber >= 60) {
    const hour = Math.floor(inputNumber / 3600);
    let time = inputNumber - hour * 3600;
    const min = time / 60;

    return hour.toFixed(0) + " hr, " + min.toFixed(0) + " min";
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

export const formatString = (inputString: string) => {
  const arrText = inputString.split(" ");
  let newText = "";
  if (inputString.length <= 20) {
    newText = inputString;
  } else if (arrText.length >= 2) {
    for (let i = 0; i < 2; i++) {
      newText += arrText[i] + " ";
    }
  } else {
    newText = inputString;
  }
  return newText;
};
