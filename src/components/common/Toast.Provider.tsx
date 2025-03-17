"use client";

import { ToastContainer, type ToastOptions, CloseButtonProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cntl from "cntl";
import { MdClose } from "react-icons/md";

const styles = {
  base: (type: ToastOptions["type"]) =>
    cntl`p-2 flex shadow-xl before:!h-fit rounded-xl ${
      type === "error" ? cntl`bg-danger` : type === "info" ? cntl`bg-info ` : type === "success" ? cntl`bg-success` : type === "warning" ? cntl`bg-yellow-400 text-slate-700` : cntl`bg-white text-slate-800`
    }`,
};

function AlertCloseButton({ closeToast }: CloseButtonProps) {
  return (
    <button title="Tutup pemberitahuan" data-item="close-alert" type="button" onClick={closeToast} className="relative hover:text-dark-200">
      <MdClose size={24} />
    </button>
  );
}

export function ToastProvider() {
  return <ToastContainer limit={3} closeButton={AlertCloseButton} position="top-center" autoClose={3000} hideProgressBar toastClassName={(context) => styles.base(context?.type)} />;
}
