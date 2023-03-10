import { useEffect } from "react";
import { handleTimeout } from "../../utils/counterHelper";
import handleNotification from "../../utils/notificationHelper";

const Notification = ({
  issues,
  apiError,
  resetToday,
  dateData,
  removeReminder,
}) => {
  useEffect(() => {
    handleTimeout(issues, apiError, resetToday);
  }, [issues]);

  handleNotification(issues, dateData, removeReminder);

  //   return <></>;
};

export default Notification;
