"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // console.log("LOGIN SESSION:", session);
    // console.log("LOGIN USER:", session?.user);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex h-20 items-center justify-between border-b border-border bg-white px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold transition-transform duration-200 group-hover:rotate-6 group-hover:scale-150">
            <img
              src="/Job.png"
              alt="Where Is My Job?"
              className="h-10 w-auto object-contain"
            />
          </div>

          <span className="font-heading text-lg font-black tracking-tight">
            Where Is My Job?
          </span>
        </Link>

        <Link
          href="/"
          className="rounded-xl px-4 py-2 text-sm font-bold text-muted transition hover:bg-surface-soft hover:text-foreground"
        >
          Back to website
        </Link>
      </header>

      {/* Login */}
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
              <LockKeyhole size={25} />
            </div>

            <p className="mt-7 text-sm font-bold uppercase tracking-widest text-primary">
              Admin Portal
            </p>

            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight">
              Welcome back.
            </h1>

            <p className="mt-3 text-sm leading-6 text-muted">
              Sign in to manage jobs, companies and opportunities.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              {/* Email */}
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
                    placeholder="admin@example.com"
                    required
                    className="w-full rounded-2xl border border-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-2xl border border-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}

                {!loading && <ArrowRight size={17} />}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            Where Is My Job? · Admin Portal
          </p>
        </div>
      </main>
    </div>
  );
}
