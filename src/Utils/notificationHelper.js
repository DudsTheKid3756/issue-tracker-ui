import { notificationToast } from "./toaster";
import { ALERT_OPTIONS } from "./constants";

function handleNotification(issues, dateData, removeReminder) {
  const _day = dateData.get("day");
  const _month = dateData.get("month");
  const _year = dateData.get("year");
  const _date = `${_year}-${
    _month.toString().length == 2 ? _month : `0${_month}`
  }-${_day.toString().length == 2 ? _day : `0${_day}`}`;

  const _hours = dateData.get("hours");
  const _minutes = dateData.get("minutes");
  const _seconds = dateData.get("seconds");

  issues.forEach((issue) => {
    if (issue.reminder != null) {
      const { time, date, alert } = issue?.reminder;
      const option = ALERT_OPTIONS.find(
        (option) => option.text == alert
      );

      if (option.duration != null) {
        const _time = `${
          _hours.toString().length == 2 ? _hours : `0${_hours}`
        }:${
          Number.parseInt(
            `${_minutes.toString().length == 2 ? _minutes : `0${_minutes}`}`
          ) + option.duration
        }:${_seconds.toString().length == 2 ? _seconds : `0${_seconds}`}`;
        const t = time.length == 8 ? time.toString() : `${time.toString()}:00`;
        if (t == _time && date == _date) {
          const reminderPosted = true;
          notificationToast(issue, reminderPosted, removeReminder);
        }
      }
    }
  });
}

export default handleNotification;
