import { ArrowLeft, Mail, ShieldCheck, UserRound, LogOut } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AccountSettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="bg-background px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-red-200 bg-red-50 p-8 text-red-600">
          Unable to load account information.
        </div>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, role, created_at")
    .eq("id", user.id)
    .single();

  const accountEmail = profile?.email || user.email || "Not available";

  return (
    <div className="bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/admin/settings"
            className="
              mb-5 inline-flex items-center gap-2
              text-sm font-bold text-muted
              transition-colors hover:text-primary
            "
          >
            <ArrowLeft size={16} />
            Back to Settings
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              <UserRound size={21} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                Settings
              </p>

              <h1 className="font-heading text-3xl font-black tracking-tight text-foreground">
                Account Settings
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            View your administrator account information and manage your session.
          </p>
        </div>

        {/* Account Information */}
        <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft text-primary">
              <UserRound size={20} />
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold">
                Account Information
              </h2>

              <p className="mt-1 text-sm text-muted">
                Information associated with your administrator account.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Email */}
            <div className="rounded-2xl border border-border bg-surface-soft p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm font-bold text-foreground">
                    {accountEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="rounded-2xl border border-border bg-surface-soft p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">
                    Role
                  </p>

                  <p className="mt-1 text-sm font-bold capitalize text-foreground">
                    {profile?.role || "Administrator"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft text-primary">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold">Security</h2>

              <p className="mt-1 text-sm text-muted">
                Manage your current administrator session.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-soft p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold">Sign out of your account</p>

              <p className="mt-1 text-xs leading-5 text-muted">
                You will be redirected to the administrator login page.
              </p>
            </div>

            <LogoutButton />
          </div>
        </section>
      </div>
    </div>
  );
}
