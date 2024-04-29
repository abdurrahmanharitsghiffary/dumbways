export const getDuration = (stDate, endDate) => {
  const start = new Date(stDate);
  const end = new Date(endDate);
  const t = end.getTime() - start.getTime();

  const durrInY = t / (1000 * 60 * 60 * 24 * 30.44 * 12);

  const diffY = durrInY - Math.floor(durrInY);
  const month = diffY * 12;

  const diffM = month - Math.floor(month);
  const day = diffM * 30.44;

  const diffD = day - Math.floor(day);
  const hour = diffD * 24;

  const diffH = hour - Math.floor(hour);
  const minute = diffH * 60;

  const diffMin = minute - Math.floor(minute);

  const second = diffMin * 60;

  return {
    year: Math.floor(durrInY),
    month: Math.floor(month),
    day: Math.floor(day),
    hour: Math.floor(hour),
    minute: Math.floor(minute),
    second: Math.floor(second),
  };
};

export const getFormattedDuration = (durr) => {
  let count = 0;
  let durrStr = [];

  Object.entries(durr).forEach(([key, value]) => {
    if (value > 0 && count <= 2) {
      durrStr.push(`${value} ${value > 1 ? key + "s" : key}`);
      count++;
    }
  });

  return durrStr.join(", ");
};

export const getTestimonialDuration = (date) => {
  const d = new Date(date);

  if (Date.now() < d.getTime()) return "0 second ago.";

  const diffNow = Date.now() - d.getTime();

  const day = diffNow / (1000 * 60 * 60 * 24);
  const intD = Math.floor(day);

  const diffD = day - intD;
  const hour = diffD * 24;
  const intH = Math.floor(hour);

  const diffH = hour - intH;
  const minutes = diffH * 60;
  const intM = Math.floor(minutes);

  const diffM = minutes - intM;
  const second = diffM * 60;
  const intS = Math.floor(second);

  let isAlreadyFormated = false;
  let durr = "";

  const result = { day: intD, hour: intH, minute: intM, second: intS };

  if (diffNow >= 0 && diffNow < 1000) return "0 second ago.";

  if (intD > 7) {
    return d.toDateString();
  }

  Object.entries(result).forEach(([key, value]) => {
    if (value > 0 && !isAlreadyFormated) {
      isAlreadyFormated = true;
      durr = `${value} ${key}${value > 1 ? "s" : ""} ago.`;
    }
  });

  return durr;
};

export const convertToDateTimeLocalString = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
