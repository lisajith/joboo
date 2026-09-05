import type { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your Where Is My Job? account and discover opportunities that match your career goals.",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-xl items-center">
        <div className="w-full">
          {/* Heading */}
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Join the community
            </p>

            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Create your account.
            </h1>

            <p className="mt-4 text-sm leading-6 text-muted sm:text-base">
              Create an account to save opportunities and make your job search
              easier.
            </p>
          </div>

          {/* Signup Form */}
          <div className="mt-10">
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}
