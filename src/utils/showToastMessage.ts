import { toast } from "react-toastify";

type TypeToast = "success" | "error";

export const showToastMessage = (message: string, type: TypeToast) => {
  switch (type) {
    case "success":
      toast.success(message, {
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;

    default:
      toast.error(message, {
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
  }
};
