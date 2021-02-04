const applyDoubleDigits = (date) => {
  let result = date;

  if (date < 10) {
    result = `0${date}`;
  }

  return result;
};

export const getStandardDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${applyDoubleDigits(month)}-${applyDoubleDigits(day)}`;
};

export const getFormattedDateRange = ({ startDate, endDate }) => {
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  let startDay = newStartDate.getDate();
  let startMonth = newStartDate.getMonth() + 1;
  let endDay = newEndDate.getDate();
  let endMonth = newEndDate.getMonth() + 1;

  startDay = applyDoubleDigits(startDay);
  startMonth = applyDoubleDigits(startMonth);
  endDay = applyDoubleDigits(endDay);
  endMonth = applyDoubleDigits(endMonth);

  return `${newEndDate.getFullYear()}.${endMonth} | ${startDay}.${startMonth} - ${endDay}.${endMonth}`;
};

export const getDateByStartWeekday = (date, weekIndex) => {
  const currentDate = new Date(date);
  const currentWeekday = currentDate.getDay();

  return currentDate.setDate(
    currentDate.getDate() - (currentWeekday - weekIndex),
  );
};

export const getSevenDaysDifferenceWeek = (currentWeek, shouldGetNextWeek) =>
  new Date(
    new Date(currentWeek.getTime()).setDate(
      currentWeek.getDate() + (shouldGetNextWeek ? 6 : -6),
    ),
  );
