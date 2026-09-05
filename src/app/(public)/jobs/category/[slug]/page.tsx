import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";

import JobCard from "@/components/jobs/JobCard";
import { supabase } from "@/lib/supabase/client";
import type { Job } from "@/types/job";
import { createClient } from "@/lib/supabase/server";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: category, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !category) {
    return {
      title: "Category Not Found",
      description: "The job category you are looking for could not be found.",
    };
  }

  const title = `${category.name} Jobs for Freshers`;

  const description =
    category.description ||
    `Find the latest ${category.name} jobs and career opportunities for freshers and job seekers.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/jobs/category/${slug}`,
    },

    openGraph: {
      type: "website",
      title: `${title} | Where Is My Job?`,
      description,
      url: `/jobs/category/${slug}`,
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Get category
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .eq("slug", slug)
    .maybeSingle();

  if (categoryError) {
    console.error("Error fetching category:", categoryError);
    throw new Error("Failed to fetch category");
  }

  if (!category) {
    notFound();
  }

  // Get jobs
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select(
      `
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
        logo_url,
        website
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
    `,
    )
    .eq("category_id", category.id)
    .eq("is_published", true)
    .order("posted_at", { ascending: false });

  if (jobsError) {
    console.error("Error fetching category jobs:", jobsError);
    throw new Error("Failed to fetch category jobs");
  }

  const formattedJobs: Job[] = (jobs ?? []).map((job) => {
    const company = Array.isArray(job.companies)
      ? job.companies[0]
      : job.companies;

    const jobCategory = Array.isArray(job.categories)
      ? job.categories[0]
      : job.categories;

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

      location: job.location,
      type: job.job_type,
      experience: job.experience,

      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      salaryPeriod: job.salary_period,

      postedAt: job.posted_at,
      deadline: job.deadline,

      description: job.description,
      eligibility: job.eligibility ?? [],

      skills,

      applicationUrl: job.application_url,
    };
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-5 pb-12 pt-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={17} />
            Back to jobs
          </Link>

          <div className="mt-8 rounded-4xl border border-border bg-white p-6 shadow-sm md:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                    <BriefcaseBusiness size={23} />
                  </div>

                  <p className="text-sm font-bold uppercase tracking-widest text-primary">
                    Job category
                  </p>
                </div>

                <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  {category.name} Jobs
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
                  {category.description ??
                    `Explore the latest ${category.name} opportunities and find a role that matches your skills and career goals.`}
                </p>
              </div>

              <div className="w-fit rounded-2xl bg-surface-soft px-5 py-4">
                <p className="text-xs font-semibold text-muted">
                  Available opportunities
                </p>

                <p className="mt-1 font-heading text-3xl font-bold text-foreground">
                  {formattedJobs.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="bg-surface-soft px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Open positions
              </p>

              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground">
                Latest {category.name} jobs
              </h2>
            </div>

            <Link
              href="/jobs"
              className="hidden text-sm font-bold text-foreground transition hover:text-primary sm:block"
            >
              View all jobs →
            </Link>
          </div>

          {formattedJobs.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {formattedJobs.map((job) => (
                <JobCard key={job.slug} {...job} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-border bg-white p-10 text-center">
              <BriefcaseBusiness size={32} className="mx-auto text-muted" />

              <h3 className="mt-4 font-heading text-xl font-bold">
                No jobs available yet
              </h3>

              <p className="mt-2 text-sm text-muted">
                We haven't added any jobs to this category yet. Check back soon
                for new opportunities.
              </p>

              <Link
                href="/jobs"
                className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Browse all jobs
              </Link>
            </div>
          )}

          <Link
            href="/jobs"
            className="mt-8 block text-center text-sm font-bold text-primary sm:hidden"
          >
            View all jobs →
          </Link>
        </div>
      </section>
    </main>
  );
}
