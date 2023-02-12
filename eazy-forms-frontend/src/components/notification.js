import { toast } from "react-toastify";
export const notify = (type, message) => {
  if (type === "error") {
    return toast.error(`${message}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className:"toast-error"
    });
  } else if (type === "success") {
    return toast.success(`${message}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className:"toast-success"
    });
  }else {
    return toast.info(`${message}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      className:"toast-info"
    });
  } 
};
