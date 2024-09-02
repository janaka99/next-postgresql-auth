import { TokenVerificationForm } from "@/components/dashboard/forms";
import AuthWrapper from "@/components/dashboard/ui/auth-wrapper/auth-wrapper";
import React from "react";

const TokenVerificationPage = () => {
  return (
    <AuthWrapper formTitle="Confirm Your Account">
      <TokenVerificationForm />
    </AuthWrapper>
  );
};

export default TokenVerificationPage;
