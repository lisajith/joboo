import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  House,
  MapPin,
  Wallet,
} from "lucide-react";

import JobCard from "@/components/jobs/JobCard";

import { createClient } from "@/lib/supabase/server";
import { getJobBySlug } from "@/lib/jobs/getJobBySlug";
import { getRelatedJobs } from "@/lib/jobs/getRelatedJobs";
import { formatDate, formatSalary } from "@/lib/job-utils";
import SaveJobButton from "@/components/jobs/SaveJobButton";

type JobDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://whereismyjob.vercel.app";

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found | Where Is My Job?",
      description: "This job could not be found.",
    };
  }

  const locationText =
    job.locations.length > 0 ? job.locations.join(", ") : "India";

  const description =
    job.description?.slice(0, 155) ||
    `${job.title} at ${job.companies?.name ?? "the company"} in ${locationText}.`;

  return {
    title: `${job.title} at ${
      job.companies?.name ?? "Company"
    } | Where Is My Job?`,

    description,

    alternates: {
      canonical: `/jobs/${job.slug}`,
    },

    openGraph: {
      title: `${job.title} at ${
        job.companies?.name ?? "Company"
      } | Where Is My Job?`,

      description,

      url: `${siteUrl}/jobs/${job.slug}`,

      type: "article",

      images: job.companies?.logo_url
        ? [
            {
              url: job.companies.logo_url,
              alt: `${job.companies.name} logo`,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary",
      title: `${job.title} at ${job.companies?.name ?? "Company"}`,
      description,
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { slug } = await params;

  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const supabase = await createClient();

  /* =======================================================
     SAVED JOB
  ======================================================= */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isSaved = false;

  if (user) {
    const { data: savedJob } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("user_id", user.id)
      .eq("job_id", job.id)
      .maybeSingle();

    isSaved = !!savedJob;
  }

  /* =======================================================
     RELATED JOBS
  ======================================================= */

  const relatedJobs = await getRelatedJobs(job.category_id, job.id);

  /* =======================================================
     DISPLAY VALUES
  ======================================================= */

  const company = Array.isArray(job.companies)
    ? job.companies[0]
    : job.companies;

  const category = Array.isArray(job.categories)
    ? job.categories[0]
    : job.categories;

  const locations =
    job.locations.length > 0 ? job.locations : ["Location not specified"];

  const locationText = locations.join(", ");

  const skills = job.skills ?? [];

  const salaryPeriod = job.salary_period ?? "year";

  const salaryText =
    job.salary_disclosed && job.salary_min !== null && job.salary_max !== null
      ? formatSalary(job.salary_min, job.salary_max, salaryPeriod)
      : job.salary_disclosed && job.salary_min !== null
        ? formatSalary(job.salary_min, job.salary_min, salaryPeriod)
        : job.salary_disclosed && job.salary_max !== null
          ? formatSalary(job.salary_max, job.salary_max, salaryPeriod)
          : "Not disclosed";

  /* =======================================================
     JOB POSTING STRUCTURED DATA
  ======================================================= */

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",

    title: job.title,

    description: job.description,

    datePosted: job.posted_at,

    ...(job.deadline
      ? {
          validThrough: job.deadline,
        }
      : {}),

    url: `${siteUrl}/jobs/${job.slug}`,

    employmentType: {
      "Full-time": "FULL_TIME",
      "Part-time": "PART_TIME",
      Internship: "INTERN",
      Contract: "CONTRACTOR",
    }[job.job_type],

    hiringOrganization: {
      "@type": "Organization",
      name: company?.name ?? "Company",

      ...(company?.website
        ? {
            sameAs: company.website,
          }
        : {}),

      ...(company?.logo_url
        ? {
            logo: company.logo_url,
          }
        : {}),
    },

    jobLocation: locations
      .filter((location) => location !== "Location not specified")
      .map((location) => ({
        "@type": "Place",

        address: {
          "@type": "PostalAddress",
          addressLocality: location,
          addressCountry: "IN",
        },
      })),

    ...(job.work_mode === "Remote"
      ? {
          jobLocationType: "TELECOMMUTE",
        }
      : {}),

    ...(job.salary_disclosed &&
    (job.salary_min !== null || job.salary_max !== null)
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",

            currency: "INR",

            value: {
              "@type": "QuantitativeValue",

              ...(job.salary_min !== null
                ? {
                    minValue: job.salary_min,
                  }
                : {}),

              ...(job.salary_max !== null
                ? {
                    maxValue: job.salary_max,
                  }
                : {}),

              unitText: job.salary_period === "month" ? "MONTH" : "YEAR",
            },
          },
        }
      : {}),
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =================================================
            BACK
        ================================================= */}

        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to jobs
        </Link>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="mt-8 rounded-4xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-5">
              {/* Company Logo */}

              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary text-2xl font-bold text-white">
                {company?.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={`${company.name} logo`}
                    className="h-full w-full bg-white object-contain p-1"
                  />
                ) : (
                  (company?.name?.charAt(0).toUpperCase() ?? "J")
                )}
              </div>

              <div>
                {/* Company */}

                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-primary">
                    {company?.name ?? "Unknown Company"}
                  </p>

                  {job.is_verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                      <BadgeCheck size={14} />
                      Verified
                    </span>
                  )}
                </div>

                {/* Title */}

                <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {job.title}
                </h1>

                {/* Main information */}

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={16} />
                    {locationText}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <BriefcaseBusiness size={16} />
                    {job.job_type}
                  </span>

                  {job.work_mode && (
                    <span className="inline-flex items-center gap-1.5">
                      <House size={16} />
                      {job.work_mode}
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={16} />
                    {job.experience}
                  </span>
                </div>
              </div>
            </div>

            {/* Category */}

            {category?.name && (
              <Link
                href={`/jobs/category/${category.slug}`}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-soft px-4 py-2 text-sm font-bold text-muted transition hover:text-primary"
              >
                {category.name}
                <ArrowUpRight size={15} />
              </Link>
            )}
          </div>

          {/* Quick information */}

          <div className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Salary */}

            <div className="rounded-2xl bg-surface-soft p-4">
              <div className="flex items-center gap-2 text-muted">
                <Wallet size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Salary
                </span>
              </div>

              <p className="mt-2 text-sm font-bold text-foreground">
                {salaryText}
              </p>
            </div>

            {/* Location */}

            <div className="rounded-2xl bg-surface-soft p-4">
              <div className="flex items-center gap-2 text-muted">
                <MapPin size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Location
                </span>
              </div>

              <p className="mt-2 text-sm font-bold text-foreground">
                {locationText}
              </p>
            </div>

            {/* Work mode */}

            <div className="rounded-2xl bg-surface-soft p-4">
              <div className="flex items-center gap-2 text-muted">
                <House size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Work mode
                </span>
              </div>

              <p className="mt-2 text-sm font-bold text-foreground">
                {job.work_mode || "Not specified"}
              </p>
            </div>

            {/* Deadline */}

            <div className="rounded-2xl bg-surface-soft p-4">
              <div className="flex items-center gap-2 text-muted">
                <CalendarDays size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Apply by
                </span>
              </div>

              <p className="mt-2 text-sm font-bold text-foreground">
                {job.deadline ? formatDate(job.deadline) : "No deadline"}
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            CONTENT + APPLY
        ================================================= */}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="space-y-6">
            {/* About */}

            <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                About the opportunity
              </h2>

              <div className="mt-5 whitespace-pre-line text-sm leading-7 text-muted">
                {job.description || "No description provided."}
              </div>
            </section>

            {/* Responsibilities */}

            {job.responsibilities.length > 0 && (
              <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Responsibilities
                </h2>

                <ul className="mt-5 space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li
                      key={`${responsibility}-${index}`}
                      className="flex gap-3 text-sm leading-7 text-muted"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-primary"
                      />

                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Requirements */}

            {job.requirements.length > 0 && (
              <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Requirements
                </h2>

                <ul className="mt-5 space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li
                      key={`${requirement}-${index}`}
                      className="flex gap-3 text-sm leading-7 text-muted"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-primary"
                      />

                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Skills */}

            {skills.length > 0 && (
              <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Skills
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-surface-soft px-3.5 py-2 text-sm font-semibold text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}

            {job.education.length > 0 && (
              <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <GraduationCap size={22} className="text-primary" />

                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Education
                  </h2>
                </div>

                <ul className="mt-5 space-y-3">
                  {job.education.map((education, index) => (
                    <li
                      key={`${education}-${index}`}
                      className="flex gap-3 text-sm leading-7 text-muted"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-primary"
                      />

                      <span>{education}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Graduation Years */}

            {job.graduation_years.length > 0 && (
              <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Eligible graduation years
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.graduation_years.map((year) => (
                    <span
                      key={year}
                      className="rounded-full bg-surface-soft px-4 py-2 text-sm font-bold text-muted"
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Eligibility */}

            {job.eligibility.length > 0 && (
              <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Eligibility
                </h2>

                <ul className="mt-5 space-y-3">
                  {job.eligibility.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="flex gap-3 text-sm leading-7 text-muted"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-primary"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Benefits */}

            {job.benefits.length > 0 && (
              <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Benefits
                </h2>

                <ul className="mt-5 space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li
                      key={`${benefit}-${index}`}
                      className="flex gap-3 text-sm leading-7 text-muted"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-1 shrink-0 text-primary"
                      />

                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* =================================================
              RIGHT / APPLY CARD
          ================================================= */}

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <h2 className="font-heading text-xl font-bold text-foreground">
                Interested in this role?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                Apply directly through the official application link.
              </p>

              {/* Apply */}

              <a
                href={job.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:opacity-90"
              >
                Apply Now
                <ArrowUpRight size={17} />
              </a>

              {/* Save */}

              <div className="mt-3">
                <SaveJobButton
                  jobId={job.id}
                  slug={job.slug}
                  initialSaved={isSaved}
                />
              </div>

              {/* Application source */}

              {job.application_source && (
                <div className="mt-5 rounded-2xl bg-surface-soft p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Application source
                  </p>

                  <p className="mt-1 text-sm font-bold text-foreground">
                    {job.application_source}
                  </p>
                </div>
              )}

              {/* Deadline */}

              {job.deadline && (
                <div className="mt-5 flex gap-3 border-t border-border pt-5">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div>
                    <p className="text-xs font-semibold text-muted">
                      Application deadline
                    </p>

                    <p className="mt-1 text-sm font-bold text-foreground">
                      {formatDate(job.deadline)}
                    </p>
                  </div>
                </div>
              )}

              {/* External application note */}

              <p className="mt-5 text-center text-xs leading-5 text-muted">
                You will be redirected to an external website to complete your
                application.
              </p>
            </div>
          </aside>
        </div>

        {/* =================================================
            RELATED JOBS
        ================================================= */}

        {relatedJobs.length > 0 && (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Keep exploring
                </p>

                <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground">
                  Similar jobs
                </h2>
              </div>

              <Link
                href="/jobs"
                className="hidden items-center gap-1.5 text-sm font-bold text-muted transition hover:text-primary sm:inline-flex"
              >
                View all
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {relatedJobs.map((relatedJob) => (
                <JobCard
                  key={relatedJob.id}
                  id={relatedJob.id}
                  slug={relatedJob.slug}
                  title={relatedJob.title}
                  company={relatedJob.company}
                  locations={relatedJob.locations}
                  type={relatedJob.type}
                  workMode={relatedJob.workMode}
                  experience={relatedJob.experience}
                  salaryMin={relatedJob.salaryMin}
                  salaryMax={relatedJob.salaryMax}
                  salaryPeriod={relatedJob.salaryPeriod}
                  salaryDisclosed={relatedJob.salaryDisclosed}
                  isVerified={relatedJob.isVerified}
                  postedAt={relatedJob.postedAt}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* =====================================================
          JOBPOSTING STRUCTURED DATA
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingSchema),
        }}
      />
    </main>
  );
}
