import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Bookmark, BriefcaseBusiness } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import AccountForm from "@/components/auth/AccountForm";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Where Is My Job? account and profile.",
};

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, role")
    .eq("id", user.id)
    .single();

  // Get saved jobs count
  const { count: savedJobsCount } = await supabase
    .from("saved_jobs")
    .select("job_id", { count: "exact", head: true })
    .eq("user_id", user.id);

  const fullName =
    user.user_metadata?.full_name || user.user_metadata?.name || "";

  return (
    <main className="min-h-screen bg-background px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            My Account
          </p>

          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Manage your account.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
            Update your profile information and manage your account settings.
          </p>
        </div>

        {/* Account form */}
        <div className="mt-10">
          <AccountForm
            userId={user.id}
            email={profile?.email || user.email || ""}
            role={profile?.role || "user"}
            initialName={fullName}
          />
        </div>

        {/* Saved Jobs */}
        <section className="mt-6">
          <div className="rounded-4xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Bookmark size={22} />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-primary">
                    Saved Jobs
                  </p>

                  <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight">
                    Your saved opportunities
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                    Keep track of interesting jobs and come back to them when
                    you're ready to apply.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-surface-soft px-3 text-sm font-bold text-foreground">
                  {savedJobsCount ?? 0}
                </div>

                <Link
                  href="/account/saved-jobs"
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
                >
                  View Saved Jobs
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Empty state hint */}
            {(savedJobsCount ?? 0) === 0 && (
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-surface-soft p-4 text-sm text-muted">
                <BriefcaseBusiness
                  size={18}
                  className="shrink-0 text-primary"
                />

                <span>
                  You haven't saved any jobs yet.{" "}
                  <Link
                    href="/jobs"
                    className="font-bold text-primary hover:underline"
                  >
                    Explore jobs
                  </Link>{" "}
                  to find your next opportunity.
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
