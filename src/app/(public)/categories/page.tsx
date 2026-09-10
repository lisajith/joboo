import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Landmark,
  Megaphone,
  Palette,
  Settings2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

const categoryStyles = [
  {
    icon: Code2,
    color: "bg-blue",
  },
  {
    icon: BarChart3,
    color: "bg-primary",
  },
  {
    icon: Palette,
    color: "bg-pink",
  },
  {
    icon: BriefcaseBusiness,
    color: "bg-orange",
  },
  {
    icon: Megaphone,
    color: "bg-primary",
  },
  {
    icon: Settings2,
    color: "bg-blue",
  },
  {
    icon: Landmark,
    color: "bg-orange",
  },
  {
    icon: GraduationCap,
    color: "bg-pink",
  },
];

export const metadata: Metadata = {
  title: "Job Categories for Freshers & Graduates",
  description:
    "Explore job categories and discover opportunities that match your skills, experience, and career interests.",
  alternates: {
    canonical: "/categories",
  },
  openGraph: {
    type: "website",
    title: "Job Categories for Freshers & Graduates | Where Is My Job?",
    description:
      "Explore job categories and discover opportunities that match your skills and career interests.",
    url: "/categories",
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
    title: "Job Categories for Freshers & Graduates | Where Is My Job?",
    description:
      "Explore job categories and discover opportunities that match your skills and career interests.",
    images: ["/Job.png"],
  },
};

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
  }

  const categoriesWithCounts = (
  await Promise.all(
    (categories ?? []).map(async (category, index) => {
      const { count } = await supabase
        .from("jobs")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("category_id", category.id)
        .eq("is_published", true);

      const style = categoryStyles[index % categoryStyles.length];

      return {
        ...category,
        jobsCount: count ?? 0,
        ...style,
      };
    }),
  )
).filter((category) => category.jobsCount > 0);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="px-5 pb-12 pt-6 lg:px-8 lg:pt-6">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Explore opportunities
              </p>

              <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Find jobs by <span className="text-primary">category.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">
                Explore opportunities across different career fields and
                discover jobs that match your skills, experience and interests.
              </p>
            </div>

            <Link
              href="/jobs"
              className="flex w-fit items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary"
            >
              Browse all jobs
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface-soft px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {categoriesWithCounts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categoriesWithCounts.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.id}
                    href={`/jobs/category/${category.slug}`}
                    className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(23,23,23,0.08)]"
                  >
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.color} text-white transition duration-300 group-hover:rotate-6`}
                    >
                      <Icon size={23} />
                    </div>

                    {/* Arrow */}
                    <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-muted transition duration-300 group-hover:bg-primary group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </div>

                    {/* Category name */}
                    <h2 className="mt-6 font-heading text-xl font-bold tracking-tight text-foreground">
                      {category.name}
                    </h2>

                    {/* Job count */}
                    <p className="mt-1 text-sm font-medium text-muted">
                      {category.jobsCount}{" "}
                      {category.jobsCount === 1 ? "Job" : "Jobs"}
                    </p>

                    {/* Description */}
                    {category.description && (
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">
                        {category.description}
                      </p>
                    )}

                    {/* Bottom CTA */}
                    <div className="mt-6 text-sm font-bold text-primary">
                      Explore jobs →
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-white px-6 py-16 text-center shadow-sm">
              <BriefcaseBusiness size={42} className="mx-auto text-muted" />

              <h2 className="mt-5 font-heading text-2xl font-bold text-foreground">
                No categories available
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
                We're adding new job categories. Check back soon for more
                opportunities.
              </p>

              <Link
                href="/jobs"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Browse jobs
                <ArrowUpRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-4xl bg-foreground px-6 py-12 text-white md:px-10 md:py-16">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Still exploring?
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Your next opportunity could be one search away.
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/50 md:text-base">
                Browse all available jobs and find an opportunity that fits your
                career goals.
              </p>

              <Link
                href="/jobs"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Find a Job
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
