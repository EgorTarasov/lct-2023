export const convertMinutes = (minutes: number, screenReader?: boolean) => {
  // h ч m мин
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;
  const hoursText = screenReader ? "часов" : "ч";
  const minText = screenReader ? "минут" : "мин";

  const result = [];
  if (hours !== 0) {
    result.push(`${hours} ${hoursText}`);
  }
  if (min !== 0) {
    result.push(`${min} ${minText}`);
  }
  return result.join(" ");
};

export const convertDate = (date: Date) => {
  const fixedDate = new Date(date);
  // dd.mm в hh:mm
  const day = fixedDate.getDate();
  const month = fixedDate.getMonth() + 1;
  const hours = fixedDate.getHours();
  const minutes = fixedDate.getMinutes();

  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month} в ${
    hours < 10 ? "0" + hours : hours
  }:${minutes < 10 ? "0" + minutes : minutes}`;
};
