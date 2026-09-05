import Link from "next/link";
import { ArrowLeft, Bookmark, BriefcaseBusiness } from "lucide-react";
import { redirect } from "next/navigation";

import JobCard from "@/components/jobs/JobCard";
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/types/job";

export default async function SavedJobsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // User must be logged in
  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("saved_jobs")
    .select(
      `
      created_at,
      jobs (
        id,
        slug,
        title,
        location,
        job_type,
        experience,
        salary_min,
        salary_max,
        salary_period,
        posted_at,
        deadline,
        description,
        eligibility,
        application_url,
        companies (
          name,
          slug,
          logo_url
        ),
        categories (
          name,
          slug
        ),
        job_skills (
          skills (
            name,
            slug
          )
        )
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved jobs:", error);

    return (
      <main className="min-h-screen bg-background px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-4xl border border-border bg-white p-8 text-center shadow-sm">
            <h1 className="font-heading text-2xl font-bold">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-muted">
              We couldn't load your saved jobs. Please try again.
            </p>

            <Link
              href="/account"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              <ArrowLeft size={17} />
              Back to account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const savedJobs: Job[] = [];

  for (const item of data ?? []) {
    const rawJob = Array.isArray(item.jobs) ? item.jobs[0] : item.jobs;

    if (!rawJob) continue;

    const companyData = Array.isArray(rawJob.companies)
      ? rawJob.companies[0]
      : rawJob.companies;

    const categoryData = Array.isArray(rawJob.categories)
      ? rawJob.categories[0]
      : rawJob.categories;

    const skills =
      rawJob.job_skills
        ?.map((skillItem) => {
          if (!skillItem.skills) return null;

          const skill = Array.isArray(skillItem.skills)
            ? skillItem.skills[0]
            : skillItem.skills;

          return skill?.name ?? null;
        })
        .filter((skill): skill is string => skill !== null) ?? [];

    if (!companyData || !categoryData) continue;

    savedJobs.push({
      id: rawJob.id,
      slug: rawJob.slug,
      title: rawJob.title,

      company: {
        name: companyData.name,
        slug: companyData.slug,
        logoUrl: companyData.logo_url,
      },

      category: {
        name: categoryData.name,
        slug: categoryData.slug,
      },

      location: rawJob.location,

      type: rawJob.job_type,

      experience: rawJob.experience,

      salaryMin: rawJob.salary_min,
      salaryMax: rawJob.salary_max,
      salaryPeriod: rawJob.salary_period,

      postedAt: rawJob.posted_at,

      deadline: rawJob.deadline,

      description: rawJob.description,

      eligibility: rawJob.eligibility ?? [],

      skills,

      applicationUrl: rawJob.application_url,
    });
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-5 pb-10 pt-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={17} />
            Back to account
          </Link>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Bookmark size={23} />
                </div>

                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-primary">
                    Your opportunities
                  </p>

                  <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight md:text-4xl">
                    Saved Jobs
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                Keep track of the jobs you want to come back to later.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full bg-surface-soft px-4 py-2 text-sm font-bold text-muted">
              <BriefcaseBusiness size={16} />
              {savedJobs.length} {savedJobs.length === 1 ? "job" : "jobs"} saved
            </div>
          </div>
        </div>
      </section>

      {/* Saved jobs */}
      <section className="bg-surface-soft px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {savedJobs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {savedJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          ) : (
            <div className="rounded-4xl border border-border bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Bookmark size={28} />
              </div>

              <h2 className="mt-6 font-heading text-2xl font-bold">
                No saved jobs yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
                Found a job that looks interesting? Save it and come back to it
                whenever you're ready to apply.
              </p>

              <Link
                href="/jobs"
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                <BriefcaseBusiness size={17} />
                Explore Jobs
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
