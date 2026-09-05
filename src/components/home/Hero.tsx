"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    const query = params.toString();

    router.push(query ? `/jobs?${query}` : "/jobs");
  }

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28">
      <div className="relative mx-auto max-w-6xl">
        {/* Small badge */}
        <div className="mb-7 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
            <Sparkles size={16} />
            Your career starts here
          </div>
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Where Is My{" "}
            <span className="relative mx-3 inline-block text-primary">
              {" "}
              Job?👀{" "}
            </span>
            <span className="block mt-3 text-3xl">
              Find your
              <span className="relative mx-3 inline-block text-primary">
                next opportunity
                <span className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-orange sm:h-2" />
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Where Is My Job? helps freshers, graduates, and early-career
            professionals discover jobs, internships, and career opportunities
            from companies looking for their next great hire.
          </p>
        </div>

        {/* Search box */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 max-w-4xl rounded-3xl border border-border bg-white p-2 shadow-[0_20px_60px_rgba(23,23,23,0.08)] sm:p-3"
        >
          <div className="flex flex-col gap-2 lg:flex-row">
            {/* Job search */}
            <div className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl px-4 transition focus-within:bg-surface-soft">
              <Search className="shrink-0 text-muted" size={21} />

              <div className="min-w-0 flex-1">
                <label className="block text-xs font-semibold text-muted">
                  What are you looking for?
                </label>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Job title, skills or company"
                  className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl px-4 transition focus-within:bg-surface-soft">
              <MapPin className="shrink-0 text-muted" size={21} />

              <div className="min-w-0 flex-1">
                <label className="block text-xs font-semibold text-muted">
                  Where?
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or remote"
                  className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-sm font-bold text-white shadow-lg shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl"
            >
              Search Jobs
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        {/* Quick stats */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={17} className="text-primary" />

            <span>
              <strong className="text-foreground">Fresh</strong> opportunities
            </span>
          </div>

          <div className="hidden h-1 w-1 rounded-full bg-border sm:block" />

          <div>
            <strong className="text-foreground">Fresher-friendly</strong> roles
          </div>

          <div className="hidden h-1 w-1 rounded-full bg-border sm:block" />

          <div>
            <strong className="text-foreground">Internships</strong> & jobs
          </div>
        </div>
      </div>
    </section>
  );
}
