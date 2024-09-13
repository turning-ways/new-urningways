import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import InvitationForm from "./form";

const PageCopy = ({
  title,
  message,
}: Readonly<{ title: string; message: string }>) => {
  return (
    <>
      <h1 className="font-sans text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="max-w-lg text-pretty text-gray-600 sm:text-lg">{message}</p>
    </>
  );
};

export default function Page({
  params,
}: {
  params: { code: string; church: string };
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6">
      <Suspense
        fallback={
          <>
            <PageCopy
              title="Verifying invite code..."
              message="Please wait while we verify your invite code."
            />
          </>
        }>
        <VerifyInviteCode code={params.code} church={params.church} />
      </Suspense>
    </div>
  );
}

// dummy verifcation logic
async function VerifyInviteCode({
  code,
  church,
}: {
  code: string;
  church: string;
}) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <InvitationSignUp code={code} church={church} />;
}

function InvitationSignUp({ code, church }: { code: string; church: string }) {
  // console.log("Verifying invite code", code);
  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full h-full">
      <div className="flex flex-col max-w-3xl min-w-2xl w-full px-6">
        <InvitationForm church={church} />
      </div>
    </div>
  );
}
