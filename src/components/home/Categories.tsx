import Link from "next/link";
import {
  Code2,
  BarChart3,
  Palette,
  BriefcaseBusiness,
  Megaphone,
  Settings2,
  Landmark,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

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

export default async function Categories() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return null;
  }

  const categoriesWithCounts = (
  await Promise.all(
    (categories ?? []).map(async (category, index) => {
      const { count } = await supabase
        .from("jobs")
        .select("id", { count: "exact", head: true })
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
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-20">
      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Explore opportunities
            </p>

            <h2 className="mt-2 max-w-2xl font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Find jobs that match{" "}
              <span className="text-primary">your vibe.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Explore job opportunities on Where Is My Job? by category and
              discover roles that match your skills, interests, and career
              goals.
            </p>
          </div>

          <Link
            href="/categories"
            className="flex items-center gap-2 self-start rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary md:self-auto"
          >
            View all categories
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Categories */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoriesWithCounts.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={`/jobs/category/${category.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(23,23,23,0.08)]"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.color} text-white transition duration-300 group-hover:rotate-6`}
                >
                  <Icon size={23} />
                </div>

                <h3 className="mt-6 font-heading text-xl font-bold tracking-tight text-foreground">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm font-medium text-muted">
                  {category.jobsCount}{" "}
                  {category.jobsCount === 1 ? "Job" : "Jobs"}
                </p>

                <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-muted transition duration-300 group-hover:bg-primary group-hover:text-white">
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
