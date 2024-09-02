import React, { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  formTitle?: string;
}

const AuthWrapper = ({ children, formTitle }: Props) => {
  return (
    <div className="max-w-lg w-full p-8 bg-white shadow-lg flex flex-col gap-5">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="text-2xl text-center font-bold text-blue-500">
          Modernise
        </div>
        {formTitle && <p className="text-center text-gray-500">{formTitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default AuthWrapper;
