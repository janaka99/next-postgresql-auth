"use client";
import React, { useEffect, useState } from "react";
import { BeatLoader, FormError, FormSuccess } from "@/components/dashboard/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { tokenVerificationServerAction } from "@/actions/auth/tokenVerificationServerAction";

const TokenVerificationForm = () => {
  const [error, setError] = useState<undefined | string>(undefined);
  const [success, setSuccess] = useState<undefined | string>(undefined);

  const router = useRouter();

  // get the token from the search params
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verifyToken = async () => {
    if (!token) {
      setError("Token not found");
      return;
    }
    setError(undefined);
    setSuccess(undefined);
    tokenVerificationServerAction(token)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
      .catch(() => {
        setError("Something Went Wrong");
      });
  };

  useEffect(() => {
    verifyToken();
  }, [token]);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {!error && !success && <BeatLoader />}
      <FormError message={error} disappear={false} />
      <FormSuccess message={success} disappear={false} />
    </div>
  );
};

export default TokenVerificationForm;
