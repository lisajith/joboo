"use client";

import { useState, useTransition } from "react";
import { ArrowLeft, Building2, Save } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { createCompany } from "@/app/admin/(dashboard)/companies/actions";



export default function AddCompanyForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await createCompany(formData);

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Company Information */}
      <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
            <Building2 size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold">Company Information</h2>

            <p className="text-sm text-muted">
              Basic details about the company.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-bold">Company Name *</label>

            <input
              name="name"
              required
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="Tata Consultancy Services"
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-sm font-bold">Website</label>

            <input
              type="url"
              name="website"
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="https://www.example.com"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-bold">Location</label>

            <input
              name="location"
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="Bengaluru, Karnataka"
            />
          </div>

          {/* Logo URL */}
          <div>
            <label className="text-sm font-bold">Logo URL</label>

            <input
              type="url"
              name="logoUrl"
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="https://example.com/logo.png"
            />

            <p className="mt-2 text-xs text-muted">
              You can add Supabase Storage upload functionality later.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-bold">Description</label>

            <textarea
              name="description"
              rows={6}
              className="mt-2 w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="Tell job seekers about this company..."
            />
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/companies"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-bold transition hover:bg-surface-soft"
        >
          <ArrowLeft size={17} />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />

          {isPending ? "Saving..." : "Save Company"}
        </button>
      </div>
    </form>
  );
}
