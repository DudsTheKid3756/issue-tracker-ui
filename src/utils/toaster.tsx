import React from "react";
import { toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "../components/reminder/Notification";
import { Issue } from "../@types/Issue";

function toaster(text: string, type: TypeOptions) {
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

function notificationToast(
  info: unknown,
  reminderPosted: boolean,
  removeReminder: (
    issue: Issue,
    reminderPosted: boolean,
    closeToast: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  ) => void
) {
  toast(<Notification info={info} />, {
    position: "bottom-right",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: false,
    closeButton: ({ closeToast }) => (
      <button
        onClick={() =>
          removeReminder(info as Issue, reminderPosted, closeToast)
        }
      >
        Dismiss
      </button>
    ),
    draggable: false,
    theme: "dark",
    type: "info",
  });
}

export { toaster, notificationToast };
