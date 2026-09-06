import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { supabase } from "@/lib/supabase/client";
import JobCard from "@/components/jobs/JobCard";
import type { Job } from "@/types/job";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: category } = await supabase
    .from("categories")
    .select("name, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (!category) {
    return {
      title: "Category Not Found | Where Is My Job?",
    };
  }

  return {
    title: `${category.name} Jobs | Where Is My Job?`,
    description: `Find the latest ${category.name} job openings for freshers and experienced candidates on Where Is My Job?`,
    alternates: {
      canonical: `/jobs/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} Jobs | Where Is My Job?`,
      description: `Explore ${category.name} job opportunities on Where Is My Job?`,
      url: `/jobs/category/${category.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // ----------------------------------------
  // Get category
  // ----------------------------------------

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (categoryError) {
    console.error("Error fetching category:", categoryError);
    throw new Error("Failed to fetch category");
  }

  if (!category) {
    notFound();
  }

  // ----------------------------------------
  // Get jobs
  // ----------------------------------------

  const { data: jobsData, error: jobsError } = await supabase
    .from("jobs")
    .select(
      `
      id,
      slug,
      title,
      job_type,
      work_mode,
      experience,
      salary_min,
      salary_max,
      salary_period,
      salary_disclosed,
      posted_at,
      deadline,
      description,
      education,
      graduation_years,
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
      )
    `,
    )
    .eq("category_id", category.id)
    .eq("is_published", true)
    .order("posted_at", { ascending: false });

  if (jobsError) {
    console.error("Error fetching category jobs:", jobsError);
    throw new Error("Failed to fetch jobs");
  }

  // ----------------------------------------
  // Convert Supabase data → Job type
  // ----------------------------------------

  const jobs: Job[] = (jobsData ?? []).map((job) => {
    const company = Array.isArray(job.companies)
      ? job.companies[0]
      : job.companies;

    const jobCategory = Array.isArray(job.categories)
      ? job.categories[0]
      : job.categories;

    const locations =
      job.job_locations?.map((item) => item.location).filter(Boolean) ?? [];

    const skills =
      job.job_skills?.flatMap((jobSkill) => {
        const skill = Array.isArray(jobSkill.skills)
          ? jobSkill.skills[0]
          : jobSkill.skills;

        return skill?.name ? [skill.name] : [];
      }) ?? [];

    return {
      id: job.id,
      slug: job.slug,
      title: job.title,

      company: {
        name: company?.name ?? "Unknown Company",
        slug: company?.slug ?? "",
        logoUrl: company?.logo_url ?? null,
      },

      category: {
        name: jobCategory?.name ?? category.name,
        slug: jobCategory?.slug ?? category.slug,
      },

      locations,

      type: job.job_type,
      workMode: job.work_mode,
      experience: job.experience,

      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      salaryPeriod: job.salary_period,
      salaryDisclosed: job.salary_disclosed,

      postedAt: job.posted_at,
      deadline: job.deadline,

      description: job.description,

      education: job.education ?? [],
      graduationYears: job.graduation_years ?? [],
      eligibility: job.eligibility ?? [],

      skills,

      applicationUrl: job.application_url,
      applicationSource: job.application_source,

      isVerified: job.is_verified,
      verifiedAt: job.verified_at,
    };
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
        >
          <ArrowLeft size={16} />
          All jobs
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Job category
          </p>

          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {category.name} Jobs
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
            Explore the latest {category.name} job opportunities and find the
            right role for your career.
          </p>
        </div>

        {/* Job count */}
        <div className="mt-8 flex items-center justify-between border-b border-border pb-5">
          <p className="text-sm font-semibold text-muted">
            {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
          </p>
        </div>

        {/* Jobs */}
        {jobs.length > 0 ? (
          <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                slug={job.slug}
                title={job.title}
                company={job.company}
                locations={job.locations}
                type={job.type}
                workMode={job.workMode}
                experience={job.experience}
                salaryMin={job.salaryMin}
                salaryMax={job.salaryMax}
                salaryPeriod={job.salaryPeriod}
                salaryDisclosed={job.salaryDisclosed}
                isVerified={job.isVerified}
                postedAt={job.postedAt}
              />
            ))}
          </section>
        ) : (
          <div className="mt-10 rounded-3xl border border-border bg-white px-6 py-16 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              No jobs found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              There are currently no published jobs in this category. Check back
              soon for new opportunities.
            </p>

            <Link
              href="/jobs"
              className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
            >
              Browse all jobs
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
