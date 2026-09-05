"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, KeyRound, Mail } from "lucide-react";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });

    if (error) {
      const message =
        error.status === 429
          ? "Too many reset requests. Please wait a while and try again."
          : error.message;

      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);

    toast.success("Password reset email sent!");
  }

  if (sent) {
    return (
      <div className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
          <Mail size={25} />
        </div>

        <p className="mt-7 text-sm font-bold uppercase tracking-widest text-primary">
          Check your inbox
        </p>

        <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight">
          Reset link sent.
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted">
          We've sent a password reset link to{" "}
          <span className="font-semibold text-foreground">{email}</span>.
        </p>

        <p className="mt-4 text-sm leading-6 text-muted">
          Didn't receive it? Check your spam folder or try again.
        </p>

        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-sm font-bold transition hover:bg-surface-soft"
        >
          Try another email
        </button>

        <Link
          href="/login"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          <ArrowLeft size={17} />
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
        <KeyRound size={25} />
      </div>

      <p className="mt-7 text-sm font-bold uppercase tracking-widest text-primary">
        Password Recovery
      </p>

      <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight">
        Forgot your password?
      </h2>

      <p className="mt-3 text-sm leading-6 text-muted">
        No worries. Enter your account email and we'll send you a secure
        password reset link.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-2xl border border-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send reset link"}

          {!loading && <ArrowRight size={17} />}
        </button>
      </form>

      <div className="mt-6 border-t border-border pt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-primary-dark"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </div>
    </div>
  );
}
