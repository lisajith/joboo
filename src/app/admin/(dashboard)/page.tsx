import { BriefcaseBusiness, Building2, Users } from "lucide-react";
import { getAdminStats } from "@/lib/admin/getAdminStats";

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Admin Panel
          </p>

          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Welcome back 👋
          </h1>

          <p className="mt-3 text-muted">
            Manage jobs, companies and your platform from here.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue text-white">
              <BriefcaseBusiness size={22} />
            </div>

            <p className="mt-5 text-sm font-semibold text-muted">Total Jobs</p>

            <p className="mt-1 text-3xl font-bold text-foreground">
              {stats.jobs}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <Building2 size={22} />
            </div>

            <p className="mt-5 text-sm font-semibold text-muted">Companies</p>

            <p className="mt-1 text-3xl font-bold text-foreground">
              {stats.companies}
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-soft text-foreground">
              <Users size={22} />
            </div>

            <p className="mt-5 text-sm font-semibold text-muted">Users</p>

            <p className="mt-1 text-3xl font-bold text-foreground">
              {stats.users}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
