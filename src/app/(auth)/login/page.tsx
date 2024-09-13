import LoginForm from "./form";
import { Suspense } from "react";

export default async function Login() {
  return (
    <div className="px-10 md:px-20 py-6 max-w-3xl flex flex-col w-full font-sans">
      <Suspense fallback={<p> Loading...</p>}>
      <LoginForm />
      </Suspense>
    </div>
  );
}
