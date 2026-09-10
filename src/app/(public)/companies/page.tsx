import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Building2, Users } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "Companies Hiring Freshers & Graduates",
  description:
    "Explore companies hiring freshers, graduates, and early-career professionals. Discover open jobs, company information, locations, and career opportunities.",
  alternates: {
    canonical: "/companies",
  },
  openGraph: {
    type: "website",
    title: "Companies Hiring Freshers & Graduates | Where Is My Job?",
    description:
      "Explore companies hiring freshers, graduates, and early-career professionals.",
    url: "/companies",
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
    title: "Companies Hiring Freshers & Graduates | Where Is My Job?",
    description:
      "Explore companies hiring freshers, graduates, and early-career professionals.",
    images: ["/Job.png"],
  },
};

const companyStyles = ["bg-blue", "bg-primary", "bg-orange", "bg-pink"];

export default async function CompaniesPage() {
  const { data: companies, error } = await supabase
    .from("companies")
    .select("id, name, slug, description, logo_url")
    .order("name");

  if (error) {
    console.error("Error fetching companies:", error);
    throw new Error("Failed to fetch companies");
  }

  const companiesWithCounts = (
  await Promise.all(
    (companies ?? []).map(async (company, index) => {
      const { count } = await supabase
        .from("jobs")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("company_id", company.id)
        .eq("is_published", true);

      return {
        ...company,
        jobsCount: count ?? 0,
        color: companyStyles[index % companyStyles.length],
      };
    }),
  )
).filter((company) => company.jobsCount > 0);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-white px-5 py-6 sm:px-8 lg:px-12 lg:py-6">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Top employers
            </p>

            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Companies hiring{" "}
              <span className="text-primary">fresh talent.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Explore companies, discover their open roles, and find the
              opportunity that feels right for your next career move.
            </p>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-muted">
                {companiesWithCounts.length} companies
              </p>

              <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight">
                Explore employers
              </h2>
            </div>
          </div>

          {companiesWithCounts.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {companiesWithCounts.map((company) => (
                <Link
                  key={company.id}
                  href={`/companies/${company.slug}`}
                  className="group rounded-3xl border border-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_45px_rgba(23,23,23,0.08)]"
                >
                  <div className="flex items-start justify-between">
                    {/* Company Logo */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${company.color} text-white`}
                    >
                      {company.logo_url ? (
                        <img
                          src={company.logo_url}
                          alt={`${company.name} logo`}
                          className="h-full w-full bg-white object-contain p-1"
                        />
                      ) : (
                        <Building2 size={25} />
                      )}
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-muted transition group-hover:bg-primary group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <h3 className="mt-7 font-heading text-2xl font-bold">
                    {company.name}
                  </h3>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-muted">
                    {company.description ?? "Explore career opportunities."}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold">
                    <Users size={16} className="text-primary" />
                    {company.jobsCount}{" "}
                    {company.jobsCount === 1 ? "opening" : "openings"}
                  </div>

                  <div className="mt-5 border-t border-border pt-4 text-sm font-bold text-foreground transition group-hover:text-primary">
                    View company →
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-border bg-white px-6 py-16 text-center">
              <Building2 size={40} className="mx-auto text-muted" />

              <h3 className="mt-4 font-heading text-2xl font-bold">
                No companies yet
              </h3>

              <p className="mt-2 text-sm text-muted">
                Companies will appear here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
