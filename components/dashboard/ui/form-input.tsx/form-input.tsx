import React, { forwardRef } from "react";
import { ControllerRenderProps } from "react-hook-form";

type Props = ControllerRenderProps & {
  placeholder?: string;
  type: string;
  defaultValue?: string;
  classes?: string;
};

const FormInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    name,
    value,
    onChange,
    onBlur,
    placeholder = "",
    type,
    defaultValue = "",
    classes = "",
  } = props;

  return (
    <input
      className={`border px-4 py-2 text-sm text-gray-500 focus:outline-blue-500 ${classes}`}
      name={name}
      value={value}
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
    />
  );
});

export default FormInput;
