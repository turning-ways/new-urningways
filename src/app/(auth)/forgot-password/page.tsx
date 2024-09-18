'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import InputComponent from '@/components/common/Input/input';
import { NextButton } from '@/components/common/Input/buttons';
import { toast } from 'sonner';
import { HeaderInfo } from '@/components/common/churchCreationForms/form1';
import { sendResetPasswordEmail } from '@/app/api/auth/regsiter';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

export default function Page() {
  const [emailSent, setEmailSent] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async (data: z.infer<typeof schema>) => {
    const res = await sendResetPasswordEmail(data);
    console.log(res);
    if (res.status === 200) {
      toast.success('Password reset email sent successfully', {
        description: 'Check your email for the reset link',
      });
      setEmailSent(true);
    } else {
      toast.error('Failed to send reset password email', {
        description: res.data,
      });
      setEmailSent(false);
    }
  };

  return (
    <div className="px-10 md:px-20 py-6 max-w-3xl flex flex-col w-full font-sans">
      {!emailSent ? (
        <Form {...form}>
          <div className="flex flex-col items-start">
            <HeaderInfo
              currentStep={1}
              totalSteps={3}
              header="Reset your password"
              helperText="Enter your email address to reset your password"
              className="mx-0"
            />
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-10 w-full"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <InputComponent
                      {...field}
                      type="email"
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <NextButton text="Submit" isPending={form.formState.isSubmitting} />
          </form>
        </Form>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Password reset email sent</h3>
          <p className="text-sm text-gray-500">
            Check your email for the reset link
          </p>
        </div>
      )}
    </div>
  );
}
