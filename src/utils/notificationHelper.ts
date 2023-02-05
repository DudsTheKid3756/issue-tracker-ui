import { Issue } from "../@types/Issue";
import constants from "./constants";
import { notificationToast } from "./toaster";

function handleNotification(
  issues: Issue[],
  dateData: Map<string, number>,
  removeReminder: (
    issue: Issue,
    reminderPosted: boolean,
    closeToast: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  ) => void,
) {
  const _day = dateData.get("day");
  const _month = dateData.get("month");
  const _year = dateData.get("year");
  const _date = `${_year}-${
    _month?.toString().length == 2 ? _month : `0${_month}`
  }-${_day?.toString().length == 2 ? _day : `0${_day}`}`;

  const _hours = dateData.get("hours");
  const _minutes = dateData.get("minutes");
  const _seconds = dateData.get("seconds");

  issues.forEach((issue) => {
    if (issue.reminder != null) {
      const { time, date, alert } = issue?.reminder;
      const option = constants.ALERT_OPTIONS.find(
        (option) => option.text == alert?.toString()
      );

      if (option?.duration != null) {
        const _time = `${
          _hours?.toString().length == 2 ? _hours : `0${_hours}`
        }:${
          Number.parseInt(
            `${_minutes?.toString().length == 2 ? _minutes : `0${_minutes}`}`
          ) + option.duration
        }:${_seconds?.toString().length == 2 ? _seconds : `0${_seconds}`}`;
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
