"use client";
import { LoginSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormButton,
  FormError,
  FormField,
  FormInput,
  FormInputMessage,
  FormItem,
  FormLabel,
  FormLink,
  FormSuccess,
  SocialMediaLogin,
} from "@/components/dashboard/ui";
import { useState, useTransition } from "react";
import { loginServerAction } from "@/actions/auth/loginServerAction";
import { GrGithub } from "react-icons/gr";

type Props = {};

const Login = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");

  const [twoFactor, setTwoFactor] = useState(false);

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      loginServerAction(values)
        .then((data) => {
          if (data?.error) {
            if (twoFactor == false) {
              loginForm.reset();
            }
            setError(data?.error);
          }
          if (data?.success) {
            loginForm.reset();
            setSuccess(data?.success);
          }

          // if (data?.twoFactor) {
          //   setTwoFactor(true);
          // }
        })
        .catch((err) => {
          setError("Something Went Wrong!");
        });
    });
  };

  return (
    <form
      onSubmit={loginForm.handleSubmit(onSubmit)}
      className="flex flex-col gap-5 py-5"
    >
      {twoFactor ? (
        <FormField
          control={loginForm.control}
          name="code"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="">Two Factor Code</FormLabel>
              <FormInput
                {...field}
                type="text"
                placeholder="123455"
                disabled={isPending}
              />
              <FormInputMessage {...fieldState} />
            </FormItem>
          )}
        />
      ) : (
        <>
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
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="">Password</FormLabel>
                <FormInput
                  type="password"
                  placeholder="password"
                  {...field}
                  disabled={isPending}
                />
                <FormInputMessage {...fieldState} />
              </FormItem>
            )}
          />
        </>
      )}
      <FormError message={error} />
      <FormSuccess message={success} />
      <FormLink
        href="/auth/forgot-password"
        text="Forgot password ?"
        align="right"
      />
      <FormButton type="submit" isProcessing={isPending} disabled={isPending}>
        {twoFactor ? "Confirm" : "Login"}
        {isPending ? " pedning" : ""}
      </FormButton>
      <SocialMediaLogin
        isProcessing={false}
        Icon={GrGithub}
        provider="github"
        variant="github"
        type="button"
      />
      <FormLink
        href="/auth/register"
        text="Create an account"
        linkCaption="Not regesitered yet"
      />
    </form>
  );
};

export default Login;
