import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import JobsBrowser from "@/components/jobs/JobsBrowser";
import { getJobs } from "@/lib/jobs/getJobs";
import type { Metadata } from "next";

type JobsPageProps = {
  searchParams: Promise<{
    search?: string;
    location?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Latest Jobs & Internships for Freshers",
  description:
    "Find the latest jobs, internships, and career opportunities for freshers, graduates, and early-career professionals across different roles and locations.",
  alternates: {
    canonical: "/jobs",
  },
  openGraph: {
    type: "website",
    title: "Latest Jobs & Internships for Freshers | Where Is My Job?",
    description:
      "Find the latest jobs, internships, and career opportunities for freshers and graduates.",
    url: "/jobs",
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
    title: "Latest Jobs & Internships for Freshers | Where Is My Job?",
    description:
      "Find the latest jobs, internships, and career opportunities for freshers and graduates.",
    images: ["/Job.png"],
  },
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const jobs = await getJobs();

  const params = await searchParams;

  const initialSearch = params.search ?? "";
  const initialLocation = params.location ?? "";

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-5 pb-16 pt-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Opportunities waiting
          </p>

          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold tracking-tight md:text-6xl">
            Find a job that feels{" "}
            <span className="text-primary">right for you.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg">
            Search jobs, internships, companies and opportunities built for the
            next generation of job seekers.
          </p>

          <div className="mt-8">
            <JobsBrowser
              jobs={jobs}
              initialSearch={initialSearch}
              initialLocation={initialLocation}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
