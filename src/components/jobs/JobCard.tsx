import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  Clock3,
  House,
  BadgeCheck,
} from "lucide-react";

import type { Job } from "@/types/job";
import { formatPostedTime } from "@/lib/job-utils";

type JobCardProps = Pick<
  Job,
  | "id"
  | "slug"
  | "title"
  | "company"
  | "locations"
  | "type"
  | "workMode"
  | "experience"
  | "salaryMin"
  | "salaryMax"
  | "salaryPeriod"
  | "salaryDisclosed"
  | "isVerified"
  | "postedAt"
>;

export default function JobCard({
  slug,
  title,
  company,
  locations,
  type,
  workMode,
  experience,
  salaryMin,
  salaryMax,
  salaryPeriod,
  salaryDisclosed,
  isVerified,
  postedAt,
}: JobCardProps) {
  const formattedLocations =
    locations.length > 0 ? locations.join(", ") : "Location not specified";

  const salary =
    salaryDisclosed && (salaryMin !== null || salaryMax !== null)
      ? salaryMin !== null && salaryMax !== null
        ? `₹${salaryMin.toLocaleString()} – ₹${salaryMax.toLocaleString()} ${
            salaryPeriod === "year" ? "LPA" : "per month"
          }`
        : salaryMin !== null
          ? `From ₹${salaryMin.toLocaleString()} ${
              salaryPeriod === "year" ? "LPA" : "per month"
            }`
          : `Up to ₹${salaryMax?.toLocaleString()} ${
              salaryPeriod === "year" ? "LPA" : "per month"
            }`
      : null;

  return (
    <Link
      href={`/jobs/${slug}`}
      className="group block rounded-3xl border border-border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_45px_rgba(23,23,23,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Company Logo */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue text-lg font-bold text-white">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={`${company.name} logo`}
              className="h-full w-full bg-white object-contain p-1"
            />
          ) : (
            company.name.charAt(0).toUpperCase()
          )}
        </div>

        {/* Arrow */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-muted transition group-hover:bg-primary group-hover:text-white"
          aria-hidden="true"
        >
          <ArrowUpRight size={17} />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-primary">{company.name}</p>

          {isVerified && (
            <BadgeCheck
              size={16}
              className="text-primary"
              aria-label="Verified job"
            />
          )}
        </div>

        <h3 className="mt-1 font-heading text-xl font-bold tracking-tight text-foreground">
          {title}
        </h3>
      </div>

      {/* Job Information */}
      <div className="mt-5 flex flex-wrap gap-2">
        {/* Locations */}
        <span className="rounded-full bg-surface-soft px-3 py-1.5 text-xs font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} />
            {formattedLocations}
          </span>
        </span>

        {/* Job Type */}
        <span className="rounded-full bg-surface-soft px-3 py-1.5 text-xs font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <BriefcaseBusiness size={13} />
            {type}
          </span>
        </span>

        {/* Work Mode */}
        {workMode && (
          <span className="rounded-full bg-surface-soft px-3 py-1.5 text-xs font-semibold text-muted">
            <span className="inline-flex items-center gap-1.5">
              <House size={13} />
              {workMode}
            </span>
          </span>
        )}

        {/* Experience */}
        <span className="rounded-full bg-surface-soft px-3 py-1.5 text-xs font-semibold text-muted">
          {experience}
        </span>
      </div>

      {/* Salary */}
      {salary && (
        <p className="mt-4 text-sm font-bold text-foreground">{salary}</p>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        {/* Posted Time */}
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <Clock3 size={14} />
          {formatPostedTime(postedAt)}
        </span>

        {/* View Job */}
        <span className="text-xs font-bold text-foreground transition group-hover:text-primary">
          View job →
        </span>
      </div>
    </Link>
  );
}
