"use client";

import React, { useEffect, useState } from "react";
import { GrStatusGood } from "react-icons/gr";

interface Props {
  message?: string;
  classes?: string;
  disappear?: boolean;
}

const FormSuccess = ({ message, classes = "", disappear = true }: Props) => {
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
      className={`p-2 border border-green-300 text-green-500  bg-green-200 flex gap-2 items-center text-sm ${classes}`}
    >
      <GrStatusGood /> {isMessage}
    </div>
  );
};
export default FormSuccess;
