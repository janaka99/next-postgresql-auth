import React from "react";
import { ControllerFieldState } from "react-hook-form";

interface Props extends ControllerFieldState {
  classes?: "";
}

const FormInputMessage = ({ error, classes = "" }: Props) => {
  if (!error) {
    return;
  }

  return (
    <div
      className={`text-xs mt-1 text-red-400 font-medium flex justify-end ${classes}`}
    >
      {error?.message}
    </div>
  );
};

export default FormInputMessage;
