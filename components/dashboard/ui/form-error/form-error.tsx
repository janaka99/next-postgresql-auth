"use client";

import React, { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface Props {
  message?: string;
  classes?: string;
  disappear?: boolean;
}

const FormError = ({ message, classes = "", disappear = true }: Props) => {
  const [isMessage, setMessage] = useState<string | undefined>(undefined);

  const handleMessage = () => {
    setMessage(message);
    if (disappear) {
      if (message) {
        setTimeout(() => {
          setMessage(undefined);
        }, 10000);
      }
    }
  };

  useEffect(() => {
    handleMessage();
  }, [message]);

  if (!isMessage) {
    return <></>;
  }

  return (
    <div
      className={`p-2 border border-red-300 text-red-500  bg-red-200 flex gap-2 items-center text-sm ${classes}`}
    >
      <FiAlertTriangle /> {isMessage}
    </div>
  );
};

export default FormError;
