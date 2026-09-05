"use client";

import { MapPin, Search } from "lucide-react";

type JobSearchProps = {
  search: string;
  location: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
};

export default function JobSearch({
  search,
  location,
  onSearchChange,
  onLocationChange,
  onSearch,
}: JobSearchProps) {
  return (
    <div className="rounded-3xl border border-border bg-white p-3 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-2xl bg-surface-soft px-4 py-3">
          <Search size={20} className="shrink-0 text-muted" />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Search jobs, companies, skills..."
            className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted"
          />
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-surface-soft px-4 py-3 md:w-56">
          <MapPin size={20} className="shrink-0 text-muted" />

          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            placeholder="Location"
            className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted"
          />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="rounded-2xl bg-primary px-7 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          Search Jobs
        </button>
      </div>
    </div>
  );
}
