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
  Link2,
  MapPin,
  Plus,
  Tags,
  Trash2,
} from "lucide-react";

import { createJob } from "@/app/admin/(dashboard)/jobs/actions";

type Company = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

type Skill = {
  id: string;
  name: string;
};

type AddJobFormProps = {
  companies: Company[];
  categories: Category[];
  skills: Skill[];
};

const inputClass =
  "w-full rounded-2xl border border-border bg-white px-4 py-3.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

const textareaClass =
  "w-full resize-y rounded-2xl border border-border px-4 py-3.5 text-sm leading-6 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10";

export default function AddJobForm({
  companies,
  categories,
  skills,
}: AddJobFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [locations, setLocations] = useState([""]);

  function addLocation() {
    setLocations((current) => [...current, ""]);
  }

  function removeLocation(index: number) {
    setLocations((current) => {
      if (current.length === 1) return current;

      return current.filter((_, i) => i !== index);
    });
  }

  function updateLocation(index: number, value: string) {
    setLocations((current) =>
      current.map((location, i) => (i === index ? value : location)),
    );
  }

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await createJob(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="mx-auto max-w-5xl space-y-6">
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
            Add Job
          </h1>

          <p className="mt-2 text-muted">
            Create a new opportunity for job seekers.
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

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
                required
                defaultValue=""
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
                required
                defaultValue=""
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
              <label className="block text-sm font-bold">Locations *</label>

              <button
                type="button"
                onClick={addLocation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition hover:opacity-80"
              >
                <Plus size={14} />
                Add Location
              </button>
            </div>

            <div className="space-y-3">
              {locations.map((location, index) => (
                <div key={index} className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    />

                    <input
                      name="locations"
                      value={location}
                      onChange={(e) => updateLocation(index, e.target.value)}
                      required
                      placeholder={
                        index === 0 ? "e.g. Bengaluru" : "e.g. Hyderabad"
                      }
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
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-2 text-xs text-muted">
              Add every city where candidates can work. For example: Bengaluru,
              Hyderabad, Pune.
            </p>
          </div>

          {/* Job Type */}
          <div>
            <label className="mb-2 block text-sm font-bold">Job Type *</label>

            <select
              name="jobType"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select job type
              </option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="mb-2 block text-sm font-bold">Work Mode</label>

            <select name="workMode" defaultValue="" className={inputClass}>
              <option value="">Not specified</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Experience */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">Experience *</label>

            <input
              name="experience"
              required
              placeholder="e.g. Fresher or 0-1 years"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          SALARY
      ===================================================== */}

      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-heading text-xl font-bold">Salary</h2>

        <p className="mt-1 text-sm text-muted">
          Salary information shown to candidates.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {/* Minimum */}
          <div>
            <label className="mb-2 block text-sm font-bold">Minimum</label>

            <input
              name="salaryMin"
              type="number"
              min="0"
              placeholder="340000"
              className={inputClass}
            />
          </div>

          {/* Maximum */}
          <div>
            <label className="mb-2 block text-sm font-bold">Maximum</label>

            <input
              name="salaryMax"
              type="number"
              min="0"
              placeholder="500000"
              className={inputClass}
            />
          </div>

          {/* Period */}
          <div>
            <label className="mb-2 block text-sm font-bold">Period</label>

            <select name="salaryPeriod" defaultValue="" className={inputClass}>
              <option value="">Not specified</option>
              <option value="year">Per year</option>
              <option value="month">Per month</option>
            </select>
          </div>
        </div>

        {/* Salary Disclosure */}
        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4 transition hover:bg-surface-soft">
          <input
            type="checkbox"
            name="salaryDisclosed"
            value="true"
            defaultChecked
            className="mt-1 h-4 w-4 accent-primary"
          />

          <div>
            <p className="text-sm font-bold">Display salary to candidates</p>

            <p className="mt-1 text-xs text-muted">
              Uncheck this when the company has not disclosed the salary.
            </p>
          </div>
        </label>
      </section>

      {/* =====================================================
          DATES
      ===================================================== */}

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
          <div>
            <label className="mb-2 block text-sm font-bold">Posted Date</label>

            <input
              name="postedAt"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">
              Application Deadline
            </label>

            <input name="deadline" type="date" className={inputClass} />
          </div>
        </div>
      </section>

      {/* =====================================================
          CANDIDATE REQUIREMENTS
      ===================================================== */}

      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft">
            <Tags size={20} />
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
            {[
              "B.Tech / B.E.",
              "BCA",
              "B.Sc",
              "B.Com",
              "BBA",
              "BA",
              "M.Tech / M.E.",
              "MCA",
              "M.Sc",
              "MBA",
              "Any Degree",
            ].map((education) => (
              <label
                key={education}
                className="flex cursor-pointer items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold transition hover:bg-surface-soft"
              >
                <input
                  type="checkbox"
                  name="education"
                  value={education}
                  className="h-4 w-4 accent-primary"
                />

                {education}
              </label>
            ))}
          </div>
        </div>

        {/* Graduation Years */}
        <div className="mt-7">
          <label className="mb-3 block text-sm font-bold">
            Graduation Year
          </label>

          <div className="flex flex-wrap gap-3">
            {[2024, 2025, 2026, 2027, 2028].map((year) => (
              <label
                key={year}
                className="flex cursor-pointer items-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold transition hover:bg-surface-soft"
              >
                <input
                  type="checkbox"
                  name="graduationYears"
                  value={year}
                  className="h-4 w-4 accent-primary"
                />

                {year}
              </label>
            ))}
          </div>

          <p className="mt-2 text-xs text-muted">
            Select multiple years when the opportunity accepts multiple
            graduating batches.
          </p>
        </div>

        {/* Eligibility */}
        <div className="mt-7">
          <label className="mb-2 block text-sm font-bold">Eligibility</label>

          <textarea
            name="eligibility"
            rows={5}
            placeholder={`Minimum 50% in academics
No active backlogs
Good communication skills`}
            className={textareaClass}
          />

          <p className="mt-2 text-xs text-muted">
            Enter one eligibility requirement per line.
          </p>
        </div>
      </section>

      {/* =====================================================
          JOB DETAILS
      ===================================================== */}

      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft">
            <FileText size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">Job Details</h2>

            <p className="text-sm text-muted">
              Give candidates everything they need to know.
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-bold">
            About the Opportunity *
          </label>

          <textarea
            name="description"
            required
            rows={7}
            placeholder="Give candidates a clear overview of the role and opportunity."
            className={textareaClass}
          />
        </div>

        {/* Responsibilities */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-bold">
            Responsibilities
          </label>

          <textarea
            name="responsibilities"
            rows={7}
            placeholder={`Handle customer technical support requests
Log and track support tickets
Troubleshoot hardware and software issues
Escalate complex issues when required`}
            className={textareaClass}
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
            rows={7}
            placeholder={`Strong communication skills
Basic technical knowledge
Ability to work in shifts
Customer-focused approach`}
            className={textareaClass}
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
            rows={6}
            placeholder={`Night shift allowance
Cab facility
Learning and development opportunities
Performance rewards`}
            className={textareaClass}
          />

          <p className="mt-2 text-xs text-muted">Enter one benefit per line.</p>
        </div>
      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}

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
          {skills.map((skill) => (
            <label
              key={skill.id}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border px-4 py-3 text-sm font-semibold transition hover:bg-surface-soft has-checked:border-primary has-checked:bg-primary/5 has-checked:text-primary"
            >
              <input
                type="checkbox"
                name="skills"
                value={skill.id}
                className="h-4 w-4 accent-primary"
              />

              {skill.name}
            </label>
          ))}
        </div>
      </section>

      {/* =====================================================
          APPLICATION
      ===================================================== */}

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

            <select
              name="applicationSource"
              defaultValue=""
              className={inputClass}
            >
              <option value="">Select source</option>
              <option value="Official Company Careers">
                Official Company Careers
              </option>
              <option value="Superset">Superset</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Indeed">Indeed</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Application URL */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-bold">
              Application URL *
            </label>

            <input
              name="applicationUrl"
              type="url"
              required
              placeholder="https://careers.example.com/job/123"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-muted">
              Prefer the official company application page whenever possible.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          VERIFICATION & PUBLISH
      ===================================================== */}

      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6">
          {/* Verification */}
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border p-4 transition hover:bg-surface-soft">
            <input
              type="checkbox"
              name="isVerified"
              value="true"
              className="mt-1 h-4 w-4 accent-primary"
            />

            <div>
              <p className="text-sm font-bold">Mark this job as verified</p>

              <p className="mt-1 text-xs text-muted">
                Use this only after checking the job information and application
                link.
              </p>
            </div>
          </label>

          {/* Publish */}
          <div className="flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold">Publish Job</h2>

              <p className="mt-1 text-sm text-muted">
                Published jobs are visible to everyone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                name="isPublished"
                value="false"
                disabled={isPending}
                className="rounded-2xl border border-border px-5 py-3 text-sm font-bold transition hover:bg-surface-soft disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Draft"}
              </button>

              <button
                type="submit"
                name="isPublished"
                value="true"
                disabled={isPending}
                className="rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-50"
              >
                {isPending ? "Publishing..." : "Publish Job"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
