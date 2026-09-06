"use client";

import { useEffect, useMemo, useState } from "react";

import JobSearch from "@/components/jobs/JobSearch";
import JobFilters from "@/components/jobs/JobFilters";
import JobCard from "@/components/jobs/JobCard";

import type { Job } from "@/types/job";

type JobsBrowserProps = {
  jobs: Job[];
  initialSearch?: string;
  initialLocation?: string;
};

type SortOption = "newest" | "oldest" | "salary-high" | "salary-low";

const JOBS_PER_PAGE = 6;

export default function JobsBrowser({
  jobs,
  initialSearch = "",
  initialLocation = "",
}: JobsBrowserProps) {
  /* Search */
  const [search, setSearch] = useState(initialSearch);
  const [locationSearch, setLocationSearch] = useState(initialLocation);

  const [activeSearch, setActiveSearch] = useState(initialSearch);
  const [activeLocationSearch, setActiveLocationSearch] =
    useState(initialLocation);

  /* Filters */
  const [experience, setExperience] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  /* Sorting */
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);

  /* Search */
  function handleSearch() {
    setActiveSearch(search);
    setActiveLocationSearch(locationSearch);
    setCurrentPage(1);
  }

  /* Filter options */
  const experiences = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.experience)));
  }, [jobs]);

  const jobTypes = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.type)));
  }, [jobs]);

  const categories = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.category.name)));
  }, [jobs]);

  /* Filter + Sort jobs */
  const filteredJobs = useMemo(() => {
    const searchTerm = activeSearch.trim().toLowerCase();
    const searchLocation = activeLocationSearch.trim().toLowerCase();

    const filterLocation = location.trim().toLowerCase();

    const filtered = jobs.filter((job) => {
      /* Search */
      const matchesSearch =
        !searchTerm ||
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.name.toLowerCase().includes(searchTerm) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm));

      /* Search location */
      const matchesSearchLocation =
        !searchLocation ||
        job.locations.some((jobLocation) =>
          jobLocation.toLowerCase().includes(searchLocation),
        );

      /* Experience */
      const matchesExperience = !experience || job.experience === experience;

      /* Job type */
      const matchesJobType = !jobType || job.type === jobType;

      /* Category */
      const matchesCategory = !category || job.category.name === category;

      /* Filter location */
      const matchesLocation =
        !filterLocation ||
        job.locations.some((jobLocation) =>
          jobLocation.toLowerCase().includes(filterLocation),
        );

      return (
        matchesSearch &&
        matchesSearchLocation &&
        matchesExperience &&
        matchesJobType &&
        matchesCategory &&
        matchesLocation
      );
    });

    /* Sort */
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        /* Newest first */
        case "newest":
          return (
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
          );

        /* Oldest first */
        case "oldest":
          return (
            new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
          );

        /* Salary high → low */
        case "salary-high":
          return (b.salaryMax ?? 0) - (a.salaryMax ?? 0);

        /* Salary low → high */
        case "salary-low":
          return (a.salaryMin ?? 0) - (b.salaryMin ?? 0);

        default:
          return 0;
      }
    });
  }, [
    jobs,
    activeSearch,
    activeLocationSearch,
    experience,
    jobType,
    category,
    location,
    sortBy,
  ]);

  /* Pagination calculations */
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;

    const endIndex = startIndex + JOBS_PER_PAGE;

    return filteredJobs.slice(startIndex, endIndex);
  }, [filteredJobs, currentPage]);

  /* Reset page if filters/search/sort change */
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeSearch,
    activeLocationSearch,
    experience,
    jobType,
    category,
    location,
    sortBy,
  ]);

  /* Keep current page valid */
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* Filters */
  function clearFilters() {
    setExperience("");
    setJobType("");
    setCategory("");
    setLocation("");
    setCurrentPage(1);
  }

  /* Clear everything */
  function clearAll() {
    setSearch("");
    setLocationSearch("");

    setActiveSearch("");
    setActiveLocationSearch("");

    clearFilters();

    setSortBy("newest");
    setCurrentPage(1);
  }
  const hasActiveFilters = experience || jobType || category || location;

  const hasActiveSearch = activeSearch || activeLocationSearch;

  const hasActiveSort = sortBy !== "newest";

  return (
    <>
      {/* Search */}
      <JobSearch
        search={search}
        location={locationSearch}
        onSearchChange={setSearch}
        onLocationChange={setLocationSearch}
        onSearch={handleSearch}
      />

      {/* Main content */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <JobFilters
          experience={experience}
          jobType={jobType}
          category={category}
          location={location}
          experiences={experiences}
          jobTypes={jobTypes}
          categories={categories}
          onExperienceChange={(value) => {
            setExperience(value);
            setCurrentPage(1);
          }}
          onJobTypeChange={(value) => {
            setJobType(value);
            setCurrentPage(1);
          }}
          onCategoryChange={(value) => {
            setCategory(value);
            setCurrentPage(1);
          }}
          onLocationChange={(value) => {
            setLocation(value);
            setCurrentPage(1);
          }}
          onClear={clearFilters}
        />

        {/* Results */}
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-muted">
                Showing{" "}
                {filteredJobs.length > 0
                  ? `${(currentPage - 1) * JOBS_PER_PAGE + 1}-${Math.min(
                      currentPage * JOBS_PER_PAGE,
                      filteredJobs.length,
                    )}`
                  : "0"}{" "}
                of {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "opportunity" : "opportunities"}
              </p>

              {(hasActiveSearch || hasActiveFilters || hasActiveSort) && (
                <p className="mt-1 text-xs text-muted">
                  Results updated based on your search, filters and sorting.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {(hasActiveSearch || hasActiveFilters || hasActiveSort) && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-sm font-bold text-primary transition hover:text-primary-dark"
                >
                  Clear all
                </button>
              )}

              {/* Sort */}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort"
                  className="whitespace-nowrap text-sm font-semibold text-muted"
                >
                  Sort by
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption);
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="newest">Newest first</option>

                  <option value="oldest">Oldest first</option>

                  <option value="salary-high">Salary: High → Low</option>

                  <option value="salary-low">Salary: Low → High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job cards */}
          {paginatedJobs.length > 0 ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {paginatedJobs.map((job) => (
                <JobCard key={job.slug} {...job} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-border bg-white px-6 py-16 text-center">
              <h3 className="font-heading text-2xl font-bold">No jobs found</h3>

              <p className="mt-2 text-sm text-muted">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={clearAll}
                className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {/* Previous */}
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-2">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-xl text-sm font-bold transition ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "border border-border bg-white text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
