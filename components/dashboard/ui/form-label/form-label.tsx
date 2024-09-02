import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  htmlFor?: string;
  classes?: string;
}

const FormLabel = ({ htmlFor = "", classes = "", children }: Props) => {
  return (
    <label className={`${classes} text-sm font-medium mb-2`} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default FormLabel;
