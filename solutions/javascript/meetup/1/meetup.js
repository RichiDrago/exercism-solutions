const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const meetup = (year, month, week, day) => {
  const monthIndex = month - 1;
  const daysInMonth = new Date(year, month, 0).getDate();

  const dates = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, monthIndex, i + 1),
  ).filter((date) => date.getDay() === WEEKDAYS.indexOf(day));

  let selectedDate;
  switch (week) {
    case `first`:
      selectedDate = dates[0];
      break;
    case `second`:
      selectedDate = dates[1];
      break;
    case `third`:
      selectedDate = dates[2];
      break;
    case `fourth`:
      selectedDate = dates[3];
      break;
    case `last`:
      selectedDate = dates.at(-1);
      break;
    case `teenth`:
      selectedDate = dates.find(
        (date) => date.getDate() >= 13 && date.getDate() <= 19,
      );
      break;
  }

  return selectedDate;
};
