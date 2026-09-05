"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Image,
  KeyRound,
  Search,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

import { updateSEOSettings } from "@/app/admin/(dashboard)/settings/seo/actions";

type SEOSettings = {
  id: string;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_image_url: string | null;
};

type SEOSettingsFormProps = {
  settings: SEOSettings;
};

export default function SEOSettingsForm({ settings }: SEOSettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await updateSEOSettings(formData);

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success("SEO settings updated successfully.");
    });
  }

  return (
    <form action={handleSubmit} className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/settings"
          className="
            mb-5 inline-flex items-center gap-2
            text-sm font-bold text-muted
            transition-colors hover:text-primary
          "
        >
          <ArrowLeft size={16} />
          Back to Settings
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
            <Search size={21} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
              Settings
            </p>

            <h1 className="font-heading text-3xl font-black tracking-tight text-foreground">
              SEO Settings
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Manage the default search engine and social sharing information for
          your website.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Search Engine Settings */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft text-primary">
            <Search size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">
              Search Engine Settings
            </h2>

            <p className="mt-1 text-sm text-muted">
              Default information used by search engines.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* SEO Title */}
          <div>
            <label htmlFor="seo_title" className="mb-2 block text-sm font-bold">
              SEO Title
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="seo_title"
                name="seo_title"
                type="text"
                maxLength={70}
                defaultValue={settings.seo_title ?? ""}
                placeholder="Where Is My Job? | Latest Jobs for Freshers"
                className="
                  w-full rounded-2xl border border-border
                  bg-white py-3.5 pl-11 pr-4
                  text-sm font-medium
                  outline-none transition
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/10
                "
              />
            </div>

            <p className="mt-2 text-xs text-muted">
              Keep the title concise. Around 50–60 characters is generally a
              good target.
            </p>
          </div>

          {/* SEO Description */}
          <div>
            <label
              htmlFor="seo_description"
              className="mb-2 block text-sm font-bold"
            >
              SEO Description
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-4 text-muted"
              />

              <textarea
                id="seo_description"
                name="seo_description"
                rows={4}
                maxLength={160}
                defaultValue={settings.seo_description ?? ""}
                placeholder="Find the latest fresher jobs, internships and entry-level opportunities."
                className="
                  w-full resize-none rounded-2xl border border-border
                  bg-white py-3.5 pl-11 pr-4
                  text-sm font-medium
                  outline-none transition
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/10
                "
              />
            </div>

            <p className="mt-2 text-xs text-muted">
              Aim for roughly 150–160 characters.
            </p>
          </div>

          {/* Keywords */}
          <div>
            <label
              htmlFor="seo_keywords"
              className="mb-2 block text-sm font-bold"
            >
              SEO Keywords
            </label>

            <div className="relative">
              <KeyRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="seo_keywords"
                name="seo_keywords"
                type="text"
                defaultValue={settings.seo_keywords ?? ""}
                placeholder="fresher jobs, graduate jobs, internships, entry level jobs"
                className="
                  w-full rounded-2xl border border-border
                  bg-white py-3.5 pl-11 pr-4
                  text-sm font-medium
                  outline-none transition
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/10
                "
              />
            </div>

            <p className="mt-2 text-xs text-muted">
              Separate keywords with commas. These are stored as reference
              information; modern search engines do not rely heavily on meta
              keywords.
            </p>
          </div>
        </div>
      </section>

      {/* Social Sharing */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft text-primary">
            <Image size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">Social Sharing</h2>

            <p className="mt-1 text-sm text-muted">
              Control the image shown when your website is shared.
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="og_image_url"
            className="mb-2 block text-sm font-bold"
          >
            Open Graph Image URL
          </label>

          <input
            id="og_image_url"
            name="og_image_url"
            type="url"
            defaultValue={settings.og_image_url ?? ""}
            placeholder="https://example.com/og-image.png"
            className="
              w-full rounded-2xl border border-border
              bg-white px-4 py-3.5
              text-sm font-medium
              outline-none transition
              focus:border-primary
              focus:ring-2 focus:ring-primary/10
            "
          />

          <p className="mt-2 text-xs text-muted">
            Recommended social preview images are typically 1200 × 630px.
          </p>
        </div>
      </section>

      {/* Preview */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="font-heading text-xl font-bold">Search Preview</h2>

          <p className="mt-1 text-sm text-muted">
            A rough preview of how your website may appear in search results.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface-soft p-5">
          <p className="text-sm text-muted">whereismyjob.com</p>

          <h3 className="mt-1 text-lg font-semibold text-primary">
            {settings.seo_title ||
              "Where Is My Job? | Latest Jobs for Freshers"}
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted">
            {settings.seo_description ||
              "Find the latest fresher jobs, internships and entry-level opportunities."}
          </p>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="
            inline-flex items-center gap-2
            rounded-2xl bg-primary
            px-6 py-3.5
            text-sm font-bold text-white
            shadow-sm
            transition-all duration-200
            hover:-translate-y-0.5
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Save size={18} />

          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
