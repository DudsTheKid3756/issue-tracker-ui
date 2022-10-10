import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toaster = (text, type) => {
  toast(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
    theme: "dark",
    pauseOnHover: true,
    type: type,
  });
};

export default toaster;
