import React from 'react';

import { useAppDispatch, useShallowEqualSelector } from 'stores/common/hooks';
import { calendarGetListThunk } from 'stores/calendar';
import SnackbarNotificationContainer from 'containers/common/SnackbarNotificationContainer';
import Calendar from 'components/Calendar';
import { daysOfWeek, errors } from 'consts';
import {
  getStandardDate,
  getDateByStartWeekday,
  getSevenDaysDifferenceWeek,
} from 'utils/helpers';
import SpinnerContainer from './common/SpinnerContainer';

const CalendarContainer = () => {
  const calendarData = useShallowEqualSelector((state) => state.calendar);
  const dispatch = useAppDispatch();
  const [weekIndex, setWeekIndex] = React.useState(5);
  const [holidays, setHolidays] = React.useState({});
  const [dateRange, setDateRange] = React.useState({
    startDate: '2019-02-01',
    endDate: '2019-02-07',
  });

  React.useEffect(() => {
    dispatch(
      calendarGetListThunk({
        apiKey: '0f49867b7daa81f251e5d56d442a034e',
        startDate: '2019-02-01',
        endDate: '2019-02-28',
      }),
    );
  }, [dispatch]);

  React.useEffect(() => {
    setHolidays(calendarData.holidays);
  }, [calendarData.holidays]);

  if (calendarData.isFetching) {
    return <SpinnerContainer />;
  }

  const handlePreviousWeek = () => {
    const { startDate } = dateRange;
    const newStartDate = new Date(startDate);

    newStartDate.setDate(newStartDate.getDate() - 7);

    const newEndDate = getSevenDaysDifferenceWeek(newStartDate, true);

    setDateRange({
      startDate: getStandardDate(newStartDate),
      endDate: getStandardDate(newEndDate),
    });
  };

  const handleNextWeek = () => {
    const { endDate } = dateRange;
    const newEndDate = new Date(endDate);

    newEndDate.setDate(newEndDate.getDate() + 7);

    const newStartDate = getSevenDaysDifferenceWeek(newEndDate, false);

    setDateRange({
      startDate: getStandardDate(newStartDate),
      endDate: getStandardDate(newEndDate),
    });
  };

  const handleFirstWeekDayChange = (weekday) => {
    setWeekIndex(weekday);

    const date = new Date(getDateByStartWeekday(dateRange.startDate, weekday));

    setDateRange({
      startDate: getStandardDate(date),
      endDate: getStandardDate(getSevenDaysDifferenceWeek(date, true)),
    });
  };

  return (
    <>
      <Calendar
        holidays={holidays}
        daysOfWeek={daysOfWeek}
        dateRange={dateRange}
        weekIndex={weekIndex}
        isError={calendarData.error}
        handleFirstWeekDayChange={handleFirstWeekDayChange}
        handlePreviousWeek={handlePreviousWeek}
        handleNextWeek={handleNextWeek}
      />
      {calendarData.error && (
        <SnackbarNotificationContainer>
          {errors[calendarData.reason]}
        </SnackbarNotificationContainer>
      )}
    </>
  );
};

export default CalendarContainer;
