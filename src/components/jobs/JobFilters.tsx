"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

type JobFiltersProps = {
  experience: string;
  jobType: string;
  category: string;
  location: string;

  experiences: string[];
  jobTypes: string[];
  categories: string[];

  onExperienceChange: (value: string) => void;
  onJobTypeChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;

  onClear: () => void;
};

export default function JobFilters({
  experience,
  jobType,
  category,
  location,
  experiences,
  jobTypes,
  categories,
  onExperienceChange,
  onJobTypeChange,
  onCategoryChange,
  onLocationChange,
  onClear,
}: JobFiltersProps) {
  return (
    <aside className="rounded-3xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} />

          <h2 className="font-heading text-lg font-bold">Filters</h2>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="text-xs font-bold text-primary hover:text-primary-dark"
        >
          Clear
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {/* Experience */}
        <FilterSelect
          label="Experience"
          value={experience}
          options={experiences}
          onChange={onExperienceChange}
        />

        {/* Job Type */}
        <FilterSelect
          label="Job Type"
          value={jobType}
          options={jobTypes}
          onChange={onJobTypeChange}
        />

        {/* Category */}
        <FilterSelect
          label="Category"
          value={category}
          options={categories}
          onChange={onCategoryChange}
        />

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-bold">Location</label>

          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="e.g. Bengaluru"
            className="w-full rounded-2xl bg-surface-soft px-4 py-3 text-sm font-medium outline-none transition placeholder:text-muted focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </aside>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">{label}</label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl bg-surface-soft px-4 py-3 pr-10 text-sm font-semibold text-foreground outline-none transition focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}
