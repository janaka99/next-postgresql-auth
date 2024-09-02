import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  classes?: string;
}

const FormItem = ({ children, classes = "" }: Props) => {
  return <div className={`flex flex-col w-full ${classes} `}>{children}</div>;
};

export default FormItem;
