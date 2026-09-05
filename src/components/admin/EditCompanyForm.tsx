"use client";

import { useState, useTransition } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

import { updateCompany } from "@/app/admin/(dashboard)/companies/actions";

type Company = {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  logo_url: string | null;
  location: string | null;
  description: string | null;
};

type EditCompanyFormProps = {
  company: Company;
};

export default function EditCompanyForm({ company }: EditCompanyFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await updateCompany(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="companyId" value={company.id} />

      {/* Company Information */}
      <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold">Company Information</h2>

        <p className="mt-1 text-sm text-muted">
          Update the basic details of this company.
        </p>

        <div className="mt-6 grid gap-5">
          {/* Company Name */}
          <div>
            <label className="text-sm font-bold">Company Name *</label>

            <input
              name="name"
              type="text"
              defaultValue={company.name}
              required
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="TCS"
            />
          </div>

          {/* Website + Location */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-bold">Website URL</label>

              <input
                name="website"
                type="url"
                defaultValue={company.website ?? ""}
                className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="text-sm font-bold">Location</label>

              <input
                name="location"
                type="text"
                defaultValue={company.location ?? ""}
                className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                placeholder="Bengaluru, Karnataka"
              />
            </div>
          </div>

          {/* Logo URL */}
          <div>
            <label className="text-sm font-bold">Logo URL</label>

            <input
              name="logoUrl"
              type="url"
              defaultValue={company.logo_url ?? ""}
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="https://example.com/logo.png"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-bold">Description</label>

            <textarea
              name="description"
              defaultValue={company.description ?? ""}
              rows={7}
              className="mt-2 w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="Tell candidates about this company..."
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

          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
