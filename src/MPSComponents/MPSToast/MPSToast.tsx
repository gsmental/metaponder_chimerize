
import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MPSToast = ({
  message,
  showToast,
  setShowToast,
  type,
}: {
  message: string;
  showToast: boolean;
  setShowToast: any;
  type: "info" | "success" | "warning" | "error";
}) => {
  useEffect(() => {
    if (showToast) {
      if (type === "error") {
        toast.error(message, {
          toastId: "err1",
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowToast(false);
      } else if (type === "info") {
        toast.info(message, {
          toastId: "inf1",
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowToast(false);
      } else if (type === "success") {
        toast.success(message, {
          toastId: "succ1",
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowToast(false);
      } else if (type === "warning") {
        toast.warning(message, {
          toastId: "warn1",
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowToast(false);
      }
    }
  }, [showToast]);

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};
