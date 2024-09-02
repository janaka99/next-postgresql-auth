import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="bg-blue-50 min-h-screen flex justify-center items-center px-5 md:px-10 font-poppins">
      {children}
    </div>
  );
};

export default AuthLayout;
