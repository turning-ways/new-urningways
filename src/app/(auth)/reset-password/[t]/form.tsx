"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PasswordInput from "@/components/common/Input/passwordInput";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { NextButton } from "@/components/common/Input/buttons";
import { useState } from "react";
import { resetPassword } from "@/app/api/auth/regsiter";

const schema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useParams<{ t: string }>();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { data: session } = useSession();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }
    setIsLoading(true);
    const res: any = await resetPassword({
      token: t,
      password: data.password,
    });
    if (res.status === 200) {
      toast.success("Password reset successful");
      signOut();
      router.push("/login");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-10 w-full">
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <PasswordInput placeholder="Password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <PasswordInput placeholder="Confirm Password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <NextButton text="Reset Password" isPending={isLoading} />
      </form>
    </Form>
  );
}
