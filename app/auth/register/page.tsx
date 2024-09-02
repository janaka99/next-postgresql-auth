import { Register } from "@/components/dashboard/forms";
import AuthWrapper from "@/components/dashboard/ui/auth-wrapper/auth-wrapper";
import React from "react";

const page = () => {
  return (
    <AuthWrapper formTitle="Your friendly coding dashboard">
      <Register />
    </AuthWrapper>
  );
};

export default page;
