import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../components/reminder/Notification";
import once from "./once";

var toaster = once(toastHelper);

function toastHelper(text, type) {
  toast(text, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
    theme: "dark",
    pauseOnHover: true,
    type: type,
  });
}

function notificationToast(info, reminderPosted, removeReminder) {
  toast(<Notification info={info} />, {
    position: "bottom-right",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: false,
    closeButton: ({ closeToast }) => (
      <button onClick={() => removeReminder(info, reminderPosted, closeToast)}>
        Dismiss
      </button>
    ),
    draggable: false,
    theme: "dark",
    type: "info",
  });
}

export { toaster, notificationToast };
