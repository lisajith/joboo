"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  KeyRound,
  LogOut,
  Mail,
  Save,
  User,
  UserCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

type AccountFormProps = {
  userId: string;
  email: string;
  role: string;
  initialName: string;
};

export default function AccountForm({
  userId,
  email,
  role,
  initialName,
}: AccountFormProps) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: name.trim(),
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Profile updated successfully!");
    setLoading(false);
  }

  async function handleLogout() {
    setLoggingOut(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      setLoggingOut(false);
      return;
    }

    toast.success("Logged out successfully!");

    window.location.href = "/";
  }

  const avatarLetter =
    name.trim().charAt(0).toUpperCase() || email.charAt(0).toUpperCase();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      {/* Profile */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white shadow-lg shadow-primary/20">
            {avatarLetter}
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Profile
            </p>

            <h2 className="mt-1 font-heading text-2xl font-bold">
              Your personal information
            </h2>

            <p className="mt-1 text-sm text-muted">
              Keep your account information up to date.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Full name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                className="w-full rounded-2xl border border-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

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
                disabled
                className="w-full cursor-not-allowed rounded-2xl border border-border bg-surface-soft py-3.5 pl-11 pr-4 text-sm text-muted outline-none"
              />
            </div>

            <p className="mt-2 text-xs text-muted">
              Your email is managed by your authentication account.
            </p>
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Account type
            </label>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-soft px-4 py-3.5">
              <div className="flex items-center gap-3">
                <UserCircle size={19} className="text-muted" />

                <span className="text-sm font-medium capitalize">{role}</span>
              </div>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                Active
              </span>
            </div>
          </div>

          {/* Save */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />

            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </section>

      {/* Security */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
          <KeyRound size={22} />
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-primary">
          Security
        </p>

        <h2 className="mt-2 font-heading text-2xl font-bold">
          Protect your account.
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted">
          Keep your password secure and update it whenever you need to.
        </p>

        <Link
          href="/update-password"
          className="mt-7 flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3.5 text-sm font-bold transition hover:bg-surface-soft"
        >
          <KeyRound size={17} />
          Change password
          <ArrowRight size={17} />
        </Link>

        <div className="my-7 border-t border-border" />

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 px-5 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut size={17} />
          {loggingOut ? "Logging out..." : "Log out"}
        </button>
      </section>
    </div>
  );
}
