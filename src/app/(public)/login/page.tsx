import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to your Where Is My Job? account and discover opportunities.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-xl items-center">
        <div className="w-full">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Welcome back
            </p>

            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Login to your account.
            </h1>

            <p className="mt-4 text-sm leading-6 text-muted sm:text-base">
              Sign in to explore opportunities and manage your account.
            </p>
          </div>

          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
