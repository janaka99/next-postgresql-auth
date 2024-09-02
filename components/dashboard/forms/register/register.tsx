"use client";
import { RegisterSchema } from "@/schemas/auth";
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
} from "@/components/dashboard/ui";
import { useState, useTransition } from "react";
import { registerServerAction } from "@/actions/auth/registerServerAction";

type Props = {};

const Register = (props: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");

  const registerForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      registerServerAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <form
      onSubmit={registerForm.handleSubmit(onSubmit)}
      className="flex flex-col gap-5 py-5"
    >
      <FormField
        control={registerForm.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel htmlFor="">Name</FormLabel>
            <FormInput
              {...field}
              type="text"
              placeholder="John Doe"
              disabled={isPending}
            />
            <FormInputMessage {...fieldState} />
          </FormItem>
        )}
      />
      <FormField
        control={registerForm.control}
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
        control={registerForm.control}
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
      <FormError message={error} />
      <FormSuccess message={success} />

      <FormButton type="submit" isProcessing={isPending} disabled={isPending}>
        Register
      </FormButton>
      <FormLink
        href="/auth/login"
        text="login"
        linkCaption="Already regesitered"
      />
    </form>
  );
};

export default Register;
