import { Login } from "@/components/dashboard/forms";
import AuthWrapper from "@/components/dashboard/ui/auth-wrapper/auth-wrapper";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <AuthWrapper formTitle="Your friendly coding dashboard">
      <Login />
    </AuthWrapper>
  );
};

export default page;
