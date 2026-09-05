import Link from "next/link";
import { ArrowUpRight, Building2, Users } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

const companyStyles = ["bg-blue", "bg-primary", "bg-orange", "bg-pink"];

export default async function FeaturedCompanies() {
  const { data: companies, error } = await supabase
    .from("companies")
    .select("id, name, slug, description")
    .order("name")
    .limit(4);

  if (error) {
    console.error("Error fetching companies:", error);
    return null;
  }

  const companiesWithCounts = await Promise.all(
    (companies ?? []).map(async (company, index) => {
      const { count } = await supabase
        .from("jobs")
        .select("id", { count: "exact", head: true })
        .eq("company_id", company.id)
        .eq("is_published", true);

      return {
        ...company,
        jobsCount: count ?? 0,
        color: companyStyles[index % companyStyles.length],
      };
    }),
  );

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-20">
      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Top employers
            </p>

            <h2 className="mt-2 max-w-2xl font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Companies hiring{" "}
              <span className="text-primary">fresh talent.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Discover companies and their latest job openings through Where Is
              My Job?.
            </p>
          </div>

          <Link
            href="/companies"
            className="flex items-center gap-2 self-start rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary md:self-auto"
          >
            Explore companies
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Companies */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {companiesWithCounts.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.slug}`}
              className="group rounded-3xl border border-border bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(23,23,23,0.08)]"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${company.color} text-white`}
                >
                  <Building2 size={25} />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-muted transition group-hover:bg-primary group-hover:text-white">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <h3 className="mt-7 font-heading text-2xl font-bold">
                {company.name}
              </h3>

              <p className="mt-1 text-sm text-muted">
                {company.description ?? "Technology & business"}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Users size={16} className="text-primary" />
                {company.jobsCount}{" "}
                {company.jobsCount === 1 ? "opening" : "openings"}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
