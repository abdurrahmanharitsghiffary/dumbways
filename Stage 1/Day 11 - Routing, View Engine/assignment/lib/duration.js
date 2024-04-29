const getDuration = (stDate, endDate) => {
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

const getFormattedDuration = (durr) => {
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
