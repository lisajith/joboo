import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MapPin,
  Wallet,
} from "lucide-react";

import JobCard from "@/components/jobs/JobCard";
import SaveJobButton from "@/components/jobs/SaveJobButton";
import { createClient } from "@/lib/supabase/server";
import { getJobBySlug } from "@/lib/jobs/getJobBySlug";
import { getRelatedJobs } from "@/lib/jobs/getRelatedJobs";
import { formatDate, formatSalary } from "@/lib/job-utils";

type JobDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found",
      description: "The job you are looking for could not be found.",
    };
  }

  const company = Array.isArray(job.companies)
    ? (job.companies[0]?.name ?? "Unknown Company")
    : (job.companies?.name ?? "Unknown Company");

  const salary = formatSalary(
    Number(job.salary_min ?? 0),
    Number(job.salary_max ?? 0),
    job.salary_period ?? "year",
  );

  const title = `${job.title} at ${company}`;

  const description =
    `${job.title} at ${company} in ${job.location}. ` +
    `Salary: ${salary}. View eligibility, skills, experience requirements ` +
    `and application details.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/jobs/${job.slug}`,
    },

    openGraph: {
      type: "website",
      title: `${title} | Where Is My Job?`,
      description,
      url: `/jobs/${job.slug}`,
      siteName: "Where Is My Job?",
      images: [
        {
          url: "/Job.png",
          width: 1200,
          height: 630,
          alt: "Where Is My Job?",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | Where Is My Job?`,
      description,
      images: ["/Job.png"],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { slug } = await params;

  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const supabaseServer = await createClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  let initialSaved = false;

  if (user) {
    const { data: savedJob } = await supabaseServer
      .from("saved_jobs")
      .select("job_id")
      .eq("user_id", user.id)
      .eq("job_id", job.id)
      .maybeSingle();

    initialSaved = !!savedJob;
  }

  const companyData = Array.isArray(job.companies)
    ? job.companies[0]
    : job.companies;

  const company = companyData?.name ?? "Unknown Company";

  const category = Array.isArray(job.categories)
    ? (job.categories[0]?.name ?? "Other")
    : (job.categories?.name ?? "Other");

  const skills =
    job.job_skills
      ?.map((item) => {
        if (!item.skills) {
          return null;
        }

        if (Array.isArray(item.skills)) {
          return item.skills[0]?.name ?? null;
        }

        return item.skills.name;
      })
      .filter((skill): skill is string => skill !== null) ?? [];

  const description = job.description ? [job.description] : [];

  const eligibility = job.eligibility ?? [];

  const salaryMin = Number(job.salary_min ?? 0);
  const salaryMax = Number(job.salary_max ?? 0);
  const salaryPeriod = job.salary_period ?? "year";

  const relatedJobs = await getRelatedJobs(job.category_id, job.id);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://joboo.whereismyjob.workers.dev";

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",

    title: job.title,

    description: job.description,

    datePosted: job.posted_at,

    url: `${siteUrl}/jobs/${job.slug}`,

    ...(job.deadline
      ? {
          validThrough: job.deadline,
        }
      : {}),

    employmentType:
      job.job_type === "Full-time"
        ? "FULL_TIME"
        : job.job_type === "Part-time"
          ? "PART_TIME"
          : job.job_type === "Internship"
            ? "INTERN"
            : "CONTRACTOR",

    hiringOrganization: {
      "@type": "Organization",
      name: company,

      ...(companyData?.logo_url
        ? {
            logo: companyData.logo_url,
          }
        : {}),

      ...(companyData?.website
        ? {
            sameAs: companyData.website,
          }
        : {}),
    },

    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },

    ...(job.salary_min !== null || job.salary_max !== null
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "INR",
            value: {
              "@type": "QuantitativeValue",

              ...(job.salary_min !== null
                ? {
                    minValue: Number(job.salary_min),
                  }
                : {}),

              ...(job.salary_max !== null
                ? {
                    maxValue: Number(job.salary_max),
                  }
                : {}),

              unitText: salaryPeriod === "year" ? "YEAR" : "MONTH",
            },
          },
        }
      : {}),
  };

  return (
    <main className="min-h-screen bg-background">
      {/* JobPosting structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingSchema),
        }}
      />

      {/* Header */}
      <section className="px-5 pb-12 pt-10 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={17} />
            Back to jobs
          </Link>

          <div className="mt-8 rounded-4xl border border-border bg-white p-6 shadow-sm md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-5">
                {/* Company Logo */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue text-2xl font-bold text-white">
                  {companyData?.logo_url ? (
                    <img
                      src={companyData.logo_url}
                      alt={`${company} logo`}
                      className="h-full w-full bg-white object-contain p-1"
                    />
                  ) : (
                    company.charAt(0).toUpperCase()
                  )}
                </div>

                <div>
                  <p className="font-semibold text-primary">{company}</p>

                  <h1 className="mt-1 font-heading text-3xl font-bold tracking-tight md:text-5xl">
                    {job.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={16} />
                      {job.location}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <BriefcaseBusiness size={16} />
                      {job.job_type}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={16} />
                      {job.experience}
                    </span>
                  </div>
                </div>
              </div>

              <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                {category}
              </span>
            </div>

            {/* Quick information */}
            <div className="mt-8 grid gap-3 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-surface-soft p-4">
                <Wallet size={18} className="text-primary" />

                <p className="mt-2 text-xs font-semibold text-muted">Salary</p>

                <p className="mt-1 font-bold">
                  {formatSalary(salaryMin, salaryMax, salaryPeriod)}
                </p>
              </div>

              <div className="rounded-2xl bg-surface-soft p-4">
                <MapPin size={18} className="text-primary" />

                <p className="mt-2 text-xs font-semibold text-muted">
                  Location
                </p>

                <p className="mt-1 font-bold">{job.location}</p>
              </div>

              <div className="rounded-2xl bg-surface-soft p-4">
                <GraduationCap size={18} className="text-primary" />

                <p className="mt-2 text-xs font-semibold text-muted">
                  Experience
                </p>

                <p className="mt-1 font-bold">{job.experience}</p>
              </div>

              <div className="rounded-2xl bg-surface-soft p-4">
                <CalendarDays size={18} className="text-primary" />

                <p className="mt-2 text-xs font-semibold text-muted">
                  Apply by
                </p>

                <p className="mt-1 font-bold">
                  {job.deadline ? formatDate(job.deadline) : "No deadline"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-surface-soft px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="rounded-4xl border border-border bg-white p-6 md:p-8">
            <section>
              <h2 className="font-heading text-2xl font-bold">
                About the role
              </h2>

              <div className="mt-4 space-y-3 text-sm leading-7 text-muted">
                {description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-bold">Skills</h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="font-heading text-2xl font-bold">Eligibility</h2>

              <div className="mt-4 space-y-3">
                {eligibility.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-muted"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-1 shrink-0 text-primary"
                    />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Apply card */}
          <aside className="h-fit rounded-4xl border border-border bg-white p-6 lg:sticky lg:top-24">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Ready to apply?
            </p>

            <h2 className="mt-3 font-heading text-2xl font-bold">
              Take the next step.
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              You will be redirected to the company or official application page
              to complete your application.
            </p>

            <a
              href={job.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Apply Now
              <ArrowUpRight size={17} />
            </a>

            <div className="mt-3">
              <SaveJobButton
                jobId={job.id}
                slug={job.slug}
                initialSaved={initialSaved}
              />
            </div>

            <div className="mt-4 rounded-2xl bg-surface-soft p-4 text-xs leading-5 text-muted">
              <strong className="text-foreground">External application</strong>
              <br />
              This application will open on an external website.
            </div>
          </aside>
        </div>
      </section>

      {/* Similar Jobs */}
      {relatedJobs.length > 0 && (
        <section className="px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">
                  Keep exploring
                </p>

                <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight">
                  You might also like
                </h2>

                <p className="mt-2 text-sm text-muted">
                  More opportunities similar to this role.
                </p>
              </div>

              <Link
                href="/jobs"
                className="hidden text-sm font-bold text-foreground transition hover:text-primary sm:block"
              >
                View all jobs →
              </Link>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {relatedJobs.map((relatedJob) => (
                <JobCard key={relatedJob.slug} {...relatedJob} />
              ))}
            </div>

            <Link
              href="/jobs"
              className="mt-6 block text-center text-sm font-bold text-primary sm:hidden"
            >
              View all jobs →
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
