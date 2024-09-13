import Image from "next/image";
import ResetPasswordForm from "./form";
import { verifyResetPasswordToken } from "@/app/api/auth/regsiter";
import Logo from "@/components/ui/Logo";

interface ResetPasswordPageProps {
  params: {
    t: string;
  };
}

export default async function ResetPasswordPage({
  params: { t },
}: ResetPasswordPageProps) {
  const { status, data } = await verifyResetPasswordToken({ token: t });

  return (
    <div className="relative z-10  flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <a href={process.env.NEXT_PUBLIC_SITE_URL}>
            <Logo className="h-10 w-10" />
          </a>
          <h3 className="text-xl font-semibold">Reset your password</h3>
          <p className="text-sm text-gray-500">
            {status === 200
              ? "Enter new password for your account."
              : "The request is invalid or expired."}
          </p>
        </div>
        <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
          {status === 200 ? (
            <ResetPasswordForm />
          ) : (
            <div className="text-center">
              That request is expired or invalid. Please request a new one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
