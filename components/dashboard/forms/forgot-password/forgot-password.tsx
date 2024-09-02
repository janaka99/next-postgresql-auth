"use client";
import { ForgotPasswordSchema } from "@/schemas/auth";
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
import { forgotPasswordServerAction } from "@/actions/auth/forgotPasswordServerActions";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");

  const loginForm = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      forgotPasswordServerAction(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
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
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="">Email</FormLabel>
              <FormInput
                {...field}
                type="email"
                placeholder="Email"
                disabled={isPending}
              />
              <FormInputMessage {...fieldState} />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <FormButton type="submit" isProcessing={isPending} disabled={isPending}>
          Send Reset Email
        </FormButton>

        <FormLink href="/auth/login" text="" linkCaption="Back to login" />
      </form>
    </AuthWrapper>
  );
};

export default ForgotPassword;
