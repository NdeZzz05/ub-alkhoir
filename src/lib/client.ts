import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import type { BasicColors } from "@/types/utils";

function pushAlert(message: string, type: BasicColors) {
  let toastType: ToastOptions["type"];
  if (type === "danger") {
    toastType = "error";
  } else {
    toastType = type;
  }
  toast(message, {
    type: toastType,
  });
}

export { pushAlert };
