"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  GraduationCap,
  Link2,
  MapPin,
  Plus,
  Save,
  Tags,
  Trash2,
} from "lucide-react";

import { updateJob } from "@/app/admin/(dashboard)/jobs/actions";

type Job = {
  id: string;
  title: string;
  location: string;
  job_type: string;
  work_mode: string | null;
  experience: string;
  salary_min: number | null;
  salary_max: number | null;
  salary_period: string | null;
  salary_disclosed: boolean;
  posted_at: string;
  deadline: string | null;
  description: string;
  eligibility: string[] | null;
  education: string[] | null;
  graduation_years: number[] | null;
  application_url: string;
  application_source: string | null;
  is_published: boolean;
  is_verified: boolean;
  verified_at: string | null;
  company_id: string;
  category_id: string;
};

type Option = {
  id: string;
  name: string;
};

type EditJobFormProps = {
  job: Job;
  companies: Option[];
  categories: Option[];
  skills: Option[];
  selectedSkillIds: string[];
  locations: string[];
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};

const educationOptions = [
  "B.Tech / B.E.",
  "M.Tech / M.E.",
  "BCA",
  "MCA",
  "B.Sc",
  "M.Sc",
  "BBA",
  "MBA",
  "Any Graduate",
  "Any Postgraduate",
];

const graduationYearOptions = [2023, 2024, 2025, 2026, 2027, 2028];

export default function EditJobForm({
  job,
  companies,
  categories,
  skills,
  selectedSkillIds,
  locations: initialLocations,
  responsibilities,
  requirements,
  benefits,
}: EditJobFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [locations, setLocations] = useState(
    initialLocations.length > 0 ? initialLocations : [""],
  );

  function updateLocation(index: number, value: string) {
    setLocations((current) =>
      current.map((location, i) => (i === index ? value : location)),
    );
  }

  function addLocation() {
    setLocations((current) => [...current, ""]);
  }

  function removeLocation(index: number) {
    setLocations((current) => {
      if (current.length === 1) {
        return [""];
      }

      return current.filter((_, i) => i !== index);
    });
  }

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await updateJob(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="mx-auto max-w-5xl space-y-6">
      <input type="hidden" name="jobId" value={job.id} />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/jobs"
            className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Jobs
          </Link>

          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Admin Panel
          </p>

          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">
            Edit Job
          </h1>

          <p className="mt-2 text-muted">
            Update the details of this job opportunity.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
            <BriefcaseBusiness size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">
              Basic Information
            </h2>

            <p className="text-sm text-muted">
              Main details about the job opening.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Job Title */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">Job Title *</label>

            <div className="relative">
              <BriefcaseBusiness
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                name="title"
                defaultValue={job.title}
                required
                placeholder="e.g. Associate Software Engineer"
                className="w-full rounded-2xl border border-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="mb-2 block text-sm font-bold">Company *</label>

            <div className="relative">
              <Building2
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <select
                name="companyId"
                defaultValue={job.company_id}
                required
                className="w-full appearance-none rounded-2xl border border-border bg-white py-3.5 pl-11 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="" disabled>
                  Select company
                </option>

                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-bold">Category *</label>

            <div className="relative">
              <Tags
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <select
                name="categoryId"
                defaultValue={job.category_id}
                required
                className="w-full appearance-none rounded-2xl border border-border bg-white py-3.5 pl-11 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="" disabled>
                  Select category
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          {/* Locations */}
          <div className="md:col-span-2">
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-bold">Job Locations *</label>

              <button
                type="button"
                onClick={addLocation}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition hover:opacity-80"
              >
                <Plus size={16} />
                Add Location
              </button>
            </div>

            <div className="space-y-3">
              {locations.map((location, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative flex-1">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    />

                    <input
                      name="locations"
                      value={location}
                      onChange={(e) => updateLocation(index, e.target.value)}
                      required={index === 0}
                      placeholder="e.g. Bengaluru"
                      className="w-full rounded-2xl border border-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  {locations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLocation(index)}
                      className="flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-2xl border border-border text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove location"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-2 text-xs text-muted">
              Add all locations where candidates can work.
            </p>
          </div>

          {/* Job Type */}
          <div>
            <label className="mb-2 block text-sm font-bold">Job Type *</label>

            <div className="relative">
              <select
                name="jobType"
                defaultValue={job.job_type}
                required
                className="w-full appearance-none rounded-2xl border border-border bg-white px-4 py-3.5 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          {/* Work Mode */}
          <div>
            <label className="mb-2 block text-sm font-bold">Work Mode *</label>

            <div className="relative">
              <select
                name="workMode"
                defaultValue={job.work_mode ?? ""}
                required
                className="w-full appearance-none rounded-2xl border border-border bg-white px-4 py-3.5 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="" disabled>
                  Select work mode
                </option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">Experience *</label>

            <input
              name="experience"
              defaultValue={job.experience}
              required
              placeholder="e.g. Fresher or 0-1 years"
              className="w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
      </section>

      {/* Compensation */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="font-heading text-xl font-bold">Compensation</h2>

          <p className="mt-1 text-sm text-muted">
            Salary information shown to candidates.
          </p>
        </div>

        <label className="mb-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4">
          <input
            type="checkbox"
            name="salaryDisclosed"
            value="true"
            defaultChecked={job.salary_disclosed}
            className="mt-1 h-4 w-4 accent-primary"
          />

          <span>
            <span className="block text-sm font-bold">
              Show salary to candidates
            </span>

            <span className="mt-1 block text-xs text-muted">
              Uncheck this if the salary should remain undisclosed.
            </span>
          </span>
        </label>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-bold">Minimum</label>

            <input
              name="salaryMin"
              type="number"
              min="0"
              defaultValue={job.salary_min ?? ""}
              placeholder="340000"
              className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Maximum</label>

            <input
              name="salaryMax"
              type="number"
              min="0"
              defaultValue={job.salary_max ?? ""}
              placeholder="500000"
              className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Period</label>

            <div className="relative">
              <select
                name="salaryPeriod"
                defaultValue={job.salary_period ?? ""}
                className="w-full appearance-none rounded-2xl border border-border px-4 py-3.5 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Not specified</option>
                <option value="year">Per year</option>
                <option value="month">Per month</option>
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Requirements */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft">
            <GraduationCap size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">
              Candidate Requirements
            </h2>

            <p className="text-sm text-muted">
              Define who is eligible to apply.
            </p>
          </div>
        </div>

        {/* Education */}
        <div>
          <label className="mb-3 block text-sm font-bold">Education</label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {educationOptions.map((education) => {
              const checked = job.education?.includes(education) ?? false;

              return (
                <label key={education} className="group cursor-pointer">
                  <input
                    type="checkbox"
                    name="education"
                    value={education}
                    defaultChecked={checked}
                    className="peer sr-only"
                  />

                  <div className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary group-hover:bg-surface-soft">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border transition peer-checked:border-primary peer-checked:bg-primary">
                      <Check
                        size={13}
                        className="text-white opacity-0 peer-checked:opacity-100"
                      />
                    </span>

                    {education}
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Graduation Years */}
        <div className="mt-7">
          <label className="mb-3 block text-sm font-bold">
            Graduation Year
          </label>

          <div className="flex flex-wrap gap-3">
            {graduationYearOptions.map((year) => {
              const checked = job.graduation_years?.includes(year) ?? false;

              return (
                <label key={year} className="group cursor-pointer">
                  <input
                    type="checkbox"
                    name="graduationYears"
                    value={year}
                    defaultChecked={checked}
                    className="peer sr-only"
                  />

                  <div className="flex items-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-bold transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary group-hover:bg-surface-soft">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md border border-border peer-checked:border-primary peer-checked:bg-primary">
                      <Check
                        size={13}
                        className="text-white opacity-0 peer-checked:opacity-100"
                      />
                    </span>

                    {year}
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Eligibility */}
        <div className="mt-7">
          <label className="mb-2 block text-sm font-bold">Eligibility</label>

          <textarea
            name="eligibility"
            defaultValue={job.eligibility?.join("\n") ?? ""}
            rows={5}
            placeholder={`B.Tech / B.E. in Computer Science
Freshers are eligible
Good communication skills`}
            className="w-full resize-y rounded-2xl border border-border px-4 py-3.5 text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />

          <p className="mt-2 text-xs text-muted">
            Enter one eligibility requirement per line.
          </p>
        </div>
      </section>

      {/* Job Content */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft">
            <FileText size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">Job Content</h2>

            <p className="text-sm text-muted">
              Give candidates everything they need to know.
            </p>
          </div>
        </div>

        {/* About the Opportunity */}
        <div>
          <label className="mb-2 block text-sm font-bold">
            About the Opportunity *
          </label>

          <textarea
            name="description"
            defaultValue={job.description}
            required
            rows={9}
            placeholder="Describe the role, team, work environment, and opportunity..."
            className="w-full resize-y rounded-2xl border border-border px-4 py-3.5 text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Responsibilities */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-bold">
            Responsibilities
          </label>

          <textarea
            name="responsibilities"
            defaultValue={responsibilities.join("\n")}
            rows={7}
            placeholder={`Build and maintain web applications
Collaborate with development teams
Write clean and maintainable code
Participate in code reviews`}
            className="w-full resize-y rounded-2xl border border-border px-4 py-3.5 text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />

          <p className="mt-2 text-xs text-muted">
            Enter one responsibility per line.
          </p>
        </div>

        {/* Requirements */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-bold">Requirements</label>

          <textarea
            name="requirements"
            defaultValue={requirements.join("\n")}
            rows={7}
            placeholder={`Good knowledge of JavaScript
Basic understanding of React
Strong problem-solving skills
Good communication skills`}
            className="w-full resize-y rounded-2xl border border-border px-4 py-3.5 text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />

          <p className="mt-2 text-xs text-muted">
            Enter one requirement per line.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-bold">Benefits</label>

          <textarea
            name="benefits"
            defaultValue={benefits.join("\n")}
            rows={6}
            placeholder={`Health insurance
Learning and development opportunities
Flexible work environment
Paid time off`}
            className="w-full resize-y rounded-2xl border border-border px-4 py-3.5 text-sm leading-6 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />

          <p className="mt-2 text-xs text-muted">Enter one benefit per line.</p>
        </div>
      </section>

      {/* Skills */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft">
            <Tags size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">Skills</h2>

            <p className="text-sm text-muted">
              Select the skills required for this role.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill) => {
            const checked = selectedSkillIds.includes(skill.id);

            return (
              <label key={skill.id} className="group cursor-pointer">
                <input
                  type="checkbox"
                  name="skills"
                  value={skill.id}
                  defaultChecked={checked}
                  className="peer sr-only"
                />

                <div className="flex items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary group-hover:bg-surface-soft">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border transition peer-checked:border-primary peer-checked:bg-primary">
                    <Check
                      size={13}
                      className="text-white opacity-0 peer-checked:opacity-100"
                    />
                  </span>

                  {skill.name}
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* Dates */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft">
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">Dates</h2>

            <p className="text-sm text-muted">
              Control when the opportunity is displayed.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Posted Date */}
          <div>
            <label className="mb-2 block text-sm font-bold">
              Posted Date *
            </label>

            <input
              name="postedAt"
              type="date"
              defaultValue={job.posted_at?.slice(0, 10)}
              required
              className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="mb-2 block text-sm font-bold">
              Application Deadline
            </label>

            <input
              name="deadline"
              type="date"
              defaultValue={job.deadline?.slice(0, 10) ?? ""}
              className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
      </section>

      {/* Application */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft">
            <Link2 size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">Application</h2>

            <p className="text-sm text-muted">
              Where candidates will apply for the job.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Application Source */}
          <div>
            <label className="mb-2 block text-sm font-bold">
              Application Source
            </label>

            <div className="relative">
              <select
                name="applicationSource"
                defaultValue={job.application_source ?? ""}
                className="w-full appearance-none rounded-2xl border border-border bg-white px-4 py-3.5 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              >
                <option value="">Select source</option>
                <option value="Company Careers Page">
                  Company Careers Page
                </option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Indeed">Indeed</option>
                <option value="Workday">Workday</option>
                <option value="Greenhouse">Greenhouse</option>
                <option value="Lever">Lever</option>
                <option value="Other">Other</option>
              </select>

              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>

          {/* Application URL */}
          <div>
            <label className="mb-2 block text-sm font-bold">
              Application URL *
            </label>

            <input
              name="applicationUrl"
              type="url"
              defaultValue={job.application_url}
              required
              placeholder="https://careers.example.com/job/123"
              className="w-full rounded-2xl border border-border px-4 py-3.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold">Job Verification</h2>

            <p className="mt-1 text-sm text-muted">
              Mark this job as verified after confirming the source.
            </p>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border px-5 py-3">
            <input
              type="checkbox"
              name="isVerified"
              value="true"
              defaultChecked={job.is_verified}
              className="h-4 w-4 accent-primary"
            />

            <span className="text-sm font-bold">Verified Job</span>
          </label>
        </div>
      </section>

      {/* Publish */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-bold">Publish Job</h2>

            <p className="mt-1 text-sm text-muted">
              Published jobs are visible to everyone.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              name="isPublished"
              value="false"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-bold transition hover:bg-surface-soft disabled:opacity-50"
            >
              <Save size={17} />

              {isPending ? "Saving..." : "Save Draft"}
            </button>

            <button
              type="submit"
              name="isPublished"
              value="true"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-50"
            >
              <Check size={17} />

              {isPending ? "Saving..." : "Publish Job"}
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="flex flex-col-reverse gap-3 pb-6 sm:flex-row sm:justify-end">
        <Link
          href="/admin/jobs"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-bold transition hover:bg-surface-soft"
        >
          <ArrowLeft size={17} />
          Cancel
        </Link>
      </div>
    </form>
  );
}
