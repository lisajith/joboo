import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Where Is My Job? account password.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-xl items-center">
        <div className="w-full">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Account Recovery
            </p>

            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Reset your password.
            </h1>

            <p className="mt-4 text-sm leading-6 text-muted sm:text-base">
              Enter your email and we'll send you a link to create a new
              password.
            </p>
          </div>

          <div className="mt-10">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
}
