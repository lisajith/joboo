import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  MapPin,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Explore internship opportunities for freshers and students across different companies, roles, and locations.",
};

const internshipStyles = ["bg-blue", "bg-primary", "bg-orange", "bg-pink"];

export default async function InternshipsPage() {
  const { data: internships, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      title,
      slug,
      location,
      experience,
      job_type,
      company_id,
      companies (
        name,
        slug,
        logo_url
      )
    `,
    )
    .eq("job_type", "Internship")
    .eq("is_published", true)
    .order("posted_at", { ascending: false });

  if (error) {
    console.error("Error fetching internships:", error);
    throw new Error("Failed to fetch internships");
  }

  const internshipsWithStyles = (internships ?? []).map(
    (internship, index) => ({
      ...internship,
      color: internshipStyles[index % internshipStyles.length],
      company: Array.isArray(internship.companies)
        ? internship.companies[0]
        : internship.companies,
    }),
  );

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
              Start your career
            </p>

            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find your next <span className="text-primary">internship.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Discover internship opportunities from companies looking for fresh
              talent. Build experience, learn new skills, and take your first
              step toward your career.
            </p>
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-muted">
                {internshipsWithStyles.length} internships
              </p>

              <h2 className="mt-1 font-heading text-3xl font-bold tracking-tight">
                Explore internships
              </h2>
            </div>
          </div>

          {internshipsWithStyles.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {internshipsWithStyles.map((internship) => (
                <Link
                  key={internship.id}
                  href={`/jobs/${internship.slug}`}
                  className="group rounded-3xl border border-border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_45px_rgba(23,23,23,0.08)]"
                >
                  <div className="flex items-start justify-between">
                    {/* Company Logo */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${internship.color} text-white`}
                    >
                      {internship.company?.logo_url ? (
                        <img
                          src={internship.company.logo_url}
                          alt={`${internship.company.name} logo`}
                          className="h-full w-full bg-white object-contain p-1"
                        />
                      ) : (
                        <BriefcaseBusiness size={25} />
                      )}
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-muted transition group-hover:bg-primary group-hover:text-white">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <h3 className="mt-7 font-heading text-2xl font-bold">
                    {internship.title}
                  </h3>

                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                    <Building2 size={16} className="text-primary" />
                    {internship.company?.name ?? "Company"}
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-muted">
                    <MapPin size={16} />
                    {internship.location}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      Internship
                    </span>

                    {internship.experience && (
                      <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-muted">
                        {internship.experience}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 border-t border-border pt-4 text-sm font-bold text-foreground transition group-hover:text-primary">
                    View internship →
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-border bg-white px-6 py-16 text-center">
              <BriefcaseBusiness size={40} className="mx-auto text-muted" />

              <h3 className="mt-4 font-heading text-2xl font-bold">
                No internships yet
              </h3>

              <p className="mt-2 text-sm text-muted">
                New internship opportunities will appear here once they are
                published.
              </p>

              <Link
                href="/jobs"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
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
