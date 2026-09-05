import Link from "next/link";

import JobCard from "../jobs/JobCard";
import { getJobs } from "@/lib/jobs/getJobs";
import { ArrowUpRight } from "lucide-react";

export default async function LatestJobs() {
  const data = await getJobs();

  const jobs = data.slice(0, 3);

  return (
   <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-20">
      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Fresh opportunities
            </p>

            <h2 className="mt-2 max-w-2xl font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Latest jobs on{" "}
              <span className="text-primary">Where Is My Job?</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Explore fresh job openings and career opportunities for freshers,
              graduates, and early-career professionals.
            </p>
          </div>

          <Link
            href="/jobs"
            className="flex items-center gap-2 self-start rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary md:self-auto"
          >
            View all jobs
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Jobs */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.slug} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
}
