import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Globe,
  MapPin,
  Users,
} from "lucide-react";

import JobCard from "@/components/jobs/JobCard";
import { supabase } from "@/lib/supabase/client";
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/types/job";

type CompanyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: company } = await supabase
    .from("companies")
    .select("name, description, logo_url, location")
    .eq("slug", slug)
    .maybeSingle();

  if (!company) {
    return {
      title: "Company Not Found",
      description: "The company you are looking for could not be found.",
    };
  }

  const title = `${company.name} Jobs & Careers`;

  const description =
    company.description ||
    `Explore jobs and career opportunities at ${company.name}${
      company.location ? ` in ${company.location}` : ""
    }. Find the latest openings and apply today.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/companies/${slug}`,
    },

    openGraph: {
      type: "website",
      title: `${title} | Where Is My Job?`,
      description,
      url: `/companies/${slug}`,
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

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  // Fetch company
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select(
      `
      id,
      name,
      slug,
      logo_url,
      website,
      description,
      location
      `,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (companyError) {
    console.error("Error fetching company:", companyError);
    throw new Error("Failed to fetch company");
  }

  if (!company) {
    notFound();
  }

  // Fetch company's published jobs
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select(
      `
      id,
      slug,
      title,
      location,
      job_type,
      work_mode,
      experience,
      salary_min,
      salary_max,
      salary_period,
      salary_disclosed,
      education,
      graduation_years,
      posted_at,
      deadline,
      description,
      eligibility,
      application_url,
      application_source,
      is_verified,
      verified_at,

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
      ),

      job_locations (
        location
      ),

      job_responsibilities (
        responsibility,
        position
      ),

      job_requirements (
        requirement,
        position
      ),

      job_benefits (
        benefit,
        position
      )
      `,
    )
    .eq("company_id", company.id)
    .eq("is_published", true)
    .order("posted_at", { ascending: false });

  if (jobsError) {
    console.error("Error fetching company jobs:", jobsError);
    throw new Error("Failed to fetch company jobs");
  }

  const formattedJobs: Job[] = (jobs ?? []).map((job) => {
    const jobCompany = Array.isArray(job.companies)
      ? job.companies[0]
      : job.companies;

    const category = Array.isArray(job.categories)
      ? job.categories[0]
      : job.categories;

    const skills =
      job.job_skills?.flatMap((jobSkill) => {
        const skill = Array.isArray(jobSkill.skills)
          ? jobSkill.skills[0]
          : jobSkill.skills;

        return skill?.name ? [skill.name] : [];
      }) ?? [];

    const locations =
      job.job_locations?.map((item) => item.location).filter(Boolean) ?? [];

    const responsibilities =
      job.job_responsibilities
        ?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((item) => item.responsibility)
        .filter(Boolean) ?? [];

    const requirements =
      job.job_requirements
        ?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((item) => item.requirement)
        .filter(Boolean) ?? [];

    const benefits =
      job.job_benefits
        ?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((item) => item.benefit)
        .filter(Boolean) ?? [];

    return {
      id: job.id,
      slug: job.slug,
      title: job.title,

      company: {
        name: jobCompany?.name ?? company.name,
        slug: jobCompany?.slug ?? company.slug,
        logoUrl: jobCompany?.logo_url ?? company.logo_url ?? null,
      },

      category: {
        name: category?.name ?? "Uncategorized",
        slug: category?.slug ?? "",
      },

      locations:
        locations.length > 0 ? locations : job.location ? [job.location] : [],

      type: job.job_type,
      workMode: job.work_mode,
      experience: job.experience,

      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      salaryPeriod: job.salary_period,
      salaryDisclosed: job.salary_disclosed ?? true,

      education: job.education ?? [],
      graduationYears: job.graduation_years ?? [],

      postedAt: job.posted_at,
      deadline: job.deadline,

      description: job.description,
      eligibility: job.eligibility ?? [],

      responsibilities,
      requirements,
      benefits,

      skills,

      applicationUrl: job.application_url,
      applicationSource: job.application_source,
      isVerified: job.is_verified ?? false,
      verifiedAt: job.verified_at,
    };
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Company Header */}
      <section className="border-b border-border bg-white px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to companies
          </Link>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-center">
            {/* Logo */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-primary text-white shadow-sm">
              {company.logo_url ? (
                <img
                  src={company.logo_url}
                  alt={`${company.name} logo`}
                  className="h-full w-full rounded-3xl object-cover"
                />
              ) : (
                <Building2 size={42} />
              )}
            </div>

            {/* Company Info */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Company
              </p>

              <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                {company.name}
              </h1>

              {company.description && (
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                  {company.description}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                {company.location && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-muted">
                    <MapPin size={15} />
                    {company.location}
                  </span>
                )}

                <span className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-muted">
                  <Users size={15} />
                  {formattedJobs.length}{" "}
                  {formattedJobs.length === 1 ? "opening" : "openings"}
                </span>

                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-muted transition hover:text-primary"
                  >
                    <Globe size={15} />
                    Website
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Open positions
            </p>

            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Jobs at {company.name}
            </h2>

            <p className="mt-3 text-muted">
              {formattedJobs.length > 0
                ? `Explore ${formattedJobs.length} current ${
                    formattedJobs.length === 1 ? "opportunity" : "opportunities"
                  }.`
                : "There are no open positions right now."}
            </p>
          </div>

          {formattedJobs.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {formattedJobs.map((job) => (
                <JobCard key={job.slug} {...job} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-border bg-white px-6 py-16 text-center">
              <Building2 size={40} className="mx-auto text-muted" />

              <h3 className="mt-4 font-heading text-2xl font-bold">
                No open positions
              </h3>

              <p className="mt-2 text-sm text-muted">
                Check back later for new opportunities at {company.name}.
              </p>

              <Link
                href="/jobs"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Browse all jobs
                <ArrowUpRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
