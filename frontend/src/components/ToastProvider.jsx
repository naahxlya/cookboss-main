import {
  useEffect,
} from "react";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function ToastProvider() {

  useEffect(() => {

    const originalAlert =
      window.alert;

    window.alert = (message) => {

      const text =
        String(message);

      const lowerText =
        text.toLowerCase();

      if (
        lowerText.includes("erro") ||
        lowerText.includes("incorreta") ||
        lowerText.includes("inválido") ||
        lowerText.includes("expirado") ||
        lowerText.includes("não encontrada") ||
        lowerText.includes("não tem permissão")
      ) {

        toast.error(text);

      } else if (
        lowerText.includes("atenção") ||
        lowerText.includes("menor que") ||
        lowerText.includes("preencha")
      ) {

        toast.warning(text);

      } else {

        toast.success(text);
      }
    };

    return () => {

      window.alert =
        originalAlert;
    };

  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
  );
}

export default ToastProvider;