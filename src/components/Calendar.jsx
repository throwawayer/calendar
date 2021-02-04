import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ButtonContainer from 'containers/common/ButtonContainer';
import SelectContainer from 'containers/common/SelectContainer';
import {
  getFormattedDateRange,
  getStandardDate,
  getDateByStartWeekday,
} from 'utils/helpers';

const propTypes = {
  holidays: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  daysOfWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateRange: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
  weekIndex: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired,
  handleFirstWeekDayChange: PropTypes.func.isRequired,
  handlePreviousWeek: PropTypes.func.isRequired,
  handleNextWeek: PropTypes.func.isRequired,
};

const Calendar = ({
  holidays,
  daysOfWeek,
  dateRange,
  weekIndex,
  isError,
  handleFirstWeekDayChange,
  handlePreviousWeek,
  handleNextWeek,
}) => (
  <div className="calendar">
    <header className="calendar-header">
      <h3 className="calendar-header__item">Calendar&nbsp;</h3>
      <div className="calendar-header__buttons">
        <ButtonContainer
          btnType="secondary"
          className="btn--with-margin"
          onClick={handlePreviousWeek}
          disabled={isError}
        >
          Previous week
        </ButtonContainer>
        <ButtonContainer
          btnType="primary"
          onClick={handleNextWeek}
          disabled={isError}
        >
          Next week
        </ButtonContainer>
      </div>
      <SelectContainer
        value={weekIndex}
        options={daysOfWeek.map((day, index) => ({ value: index, label: day }))}
        onChange={(option) => {
          handleFirstWeekDayChange(option.value);
        }}
      />
    </header>
    <div className="calendar-week">
      <header className="calendar-week__header">
        <h4>{getFormattedDateRange(dateRange)}</h4>
      </header>
      {Object.keys(holidays).length > 0
        && [...Array(7).keys()].map((index) => {
          const date = new Date(
            getDateByStartWeekday(dateRange.startDate, weekIndex),
          );
          const newDate = new Date(date.setDate(date.getDate() + index));

          const day = newDate.getDate();
          const month = newDate.getMonth();
          const year = newDate.getFullYear();

          const holidayDate = getStandardDate(newDate);
          const holidayItems = holidays[holidayDate] || [];

          return (
            <div
              className="calendar-week-day"
              key={`calendar-week-day-${day}${month}${year}`}
            >
              <header className="calendar-week-day__header">
                <time dateTime={`${year}-${day}-${month}`}>
                  <h5>{daysOfWeek[newDate.getDay()]}</h5>
                  <h5>{`${day}.${month + 1}.${year}`}</h5>
                </time>
              </header>
              <ul>
                {holidayItems.length > 0
                  && holidayItems.map((holidayItem) => {
                    const folkClassname = `calendar-week-day__holidays--${holidayItem.type}`;
                    const className = cx('calendar-week-day__holidays', {
                      [folkClassname]: holidayItem.type,
                    });

                    return (
                      <li key={holidayItem.name} className={className}>
                        {holidayItem.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
    </div>
  </div>
);

Calendar.propTypes = propTypes;

export default Calendar;
