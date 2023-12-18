import React from "react";

interface ToastProps {
  message: string;
  type?: string | "info" | "success" | "warning" | "error";
}

const Toast: React.FC<ToastProps> = ({ type,message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className={`alert alert-${type || "info"} text-white ` }>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
