export const convertMinutes = (minutes: number, screenReader?: boolean) => {
  // h ч m мин
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const hoursText = screenReader ? "часов" : "ч";
  const minText = screenReader ? "минут" : "мин";

  const result = [`${hours} ${hoursText}`];
  if (min !== 0) {
    result.push(`${min} ${minText}`);
  }
  return result.join(" ");
};

export const convertDate = (date: Date) => {
  // dd.mm в hh:mm
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month} в ${
    hours < 10 ? "0" + hours : hours
  }:${minutes < 10 ? "0" + minutes : minutes}`;
};
