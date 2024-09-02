"use client";
import { ResetPasswordSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthWrapper,
  FormButton,
  FormError,
  FormField,
  FormInput,
  FormInputMessage,
  FormItem,
  FormLabel,
  FormLink,
  FormSuccess,
} from "@/components/dashboard/ui";
import { useState, useTransition } from "react";
import { resetPasswordServerAction } from "@/actions/auth/resetPasswordServerAction";
import { useSearchParams } from "next/navigation";
import { LOGIN_PAGE_REDIRECT } from "@/routes";
import { navigate } from "@/actions/global/navigate";

type Props = {};

const ResetPassword = (props: Props) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");

  const loginForm = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      resetPasswordServerAction(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        if (data?.success) {
          navigate(LOGIN_PAGE_REDIRECT);
        }
      });
    });
  };

  return (
    <AuthWrapper formTitle="Reset Your Password">
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 py-5"
      >
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="">Password</FormLabel>
              <FormInput {...field} type="password" disabled={isPending} />
              <FormInputMessage {...fieldState} />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="confirm_password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="">Confirm Password</FormLabel>
              <FormInput {...field} type="password" disabled={isPending} />
              <FormInputMessage {...fieldState} />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <FormButton type="submit" isProcessing={isPending} disabled={isPending}>
          Reset
        </FormButton>

        <FormLink href="/auth/login" text="" linkCaption="Back to login" />
      </form>
    </AuthWrapper>
  );
};

export default ResetPassword;
