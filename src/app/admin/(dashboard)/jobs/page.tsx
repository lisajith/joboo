import Link from "next/link";
import { BriefcaseBusiness, MapPin, Pencil } from "lucide-react";
import DeleteJobButton from "@/components/admin/DeleteJobButton";
import ToggleJobStatusButton from "@/components/admin/ToggleJobStatusButton";

import { createClient } from "@/lib/supabase/server";

export default async function AdminJobsPage() {
  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      title,
      slug,
      location,
      job_type,
      experience,
      deadline,
      is_published,
      companies (
        name
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading admin jobs:", error);
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Admin Panel
            </p>

            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Jobs
            </h1>

            <p className="mt-3 text-muted">
              Manage all job openings on your platform.
            </p>
          </div>

          <Link
            href="/admin/jobs/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            + Add Job
          </Link>
        </div>

        {/* Jobs table */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-white">
          {/* Error */}
          {error && (
            <div className="border-b border-border bg-red-50 px-6 py-4 text-sm font-semibold text-red-600">
              Failed to load jobs.
            </div>
          )}

          {/* Empty state */}
          {!error && (!jobs || jobs.length === 0) && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-soft">
                <BriefcaseBusiness size={26} />
              </div>

              <h2 className="mt-5 text-xl font-bold">No jobs found</h2>

              <p className="mt-2 text-muted">Add your first job opening.</p>
            </div>
          )}

          {/* Table */}
          {!error && jobs && jobs.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead>
                  <tr className="border-b border-border bg-surface-soft text-left">
                    <th className="px-6 py-4 text-sm font-bold">Job</th>

                    <th className="px-6 py-4 text-sm font-bold">Company</th>

                    <th className="px-6 py-4 text-sm font-bold">Location</th>

                    <th className="px-6 py-4 text-sm font-bold">Type</th>

                    <th className="px-6 py-4 text-sm font-bold">Status</th>

                    <th className="px-6 py-4 text-sm font-bold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job) => {
                    /*
                     * Supabase returns the company relation
                     * as an array according to the generated type.
                     */
                    const company = Array.isArray(job.companies)
                      ? job.companies[0]
                      : job.companies;

                    return (
                      <tr
                        key={job.id}
                        className="border-b border-border last:border-0 hover:bg-surface-soft/50"
                      >
                        {/* Job */}
                        <td className="px-6 py-5">
                          <p className="font-bold text-foreground">
                            {job.title}
                          </p>

                          <p className="mt-1 text-xs text-muted">
                            {job.experience}
                          </p>
                        </td>

                        {/* Company */}
                        <td className="px-6 py-5">
                          <p className="font-semibold">
                            {company?.name ?? "Unknown"}
                          </p>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-muted">
                            <MapPin size={16} />
                            {job.location}
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-6 py-5">
                          <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-bold">
                            {job.job_type}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          {job.is_published ? (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              Published
                            </span>
                          ) : (
                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                              Draft
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            {/* Publish / Unpublish */}
                            {/* <ToggleJobStatusButton
                              jobId={job.id}
                              isPublished={job.is_published}
                            /> */}

                            {/* Edit */}
                            <Link
                              href={`/admin/jobs/${job.id}/edit`}
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border transition hover:bg-surface-soft"
                              title="Edit job"
                            >
                              <Pencil size={16} />
                            </Link>

                            {/* Delete */}
                            <DeleteJobButton
                              jobId={job.id}
                              jobTitle={job.title}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
