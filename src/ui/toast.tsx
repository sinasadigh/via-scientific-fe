import React from "react";

interface ToastProps {
  message: string;
  type?: string | "info" | "success" | "warning" | "error";
}

const Toast: React.FC<ToastProps> = ({ type, message }) => {
  const alertType = "alert alert-" + (type || "info");
  console.log(message, alertType);
  return (
    <div className="toast toast-bottom toast-right mb-20">
      <div className={alertType}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
