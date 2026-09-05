"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Mail,
  Phone,
  Save,
  Image,
  FileText,
  Link2,
} from "lucide-react";
import toast from "react-hot-toast";
import { updateGeneralSettings } from "@/app/admin/(dashboard)/settings/general/actions";


type GeneralSettings = {
  id: string;
  site_name: string;
  site_description: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  website_url: string | null;
  logo_url: string | null;
  favicon_url: string | null;
};

type GeneralSettingsFormProps = {
  settings: GeneralSettings;
};

export default function GeneralSettingsForm({
  settings,
}: GeneralSettingsFormProps) {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await updateGeneralSettings(formData);

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        return;
      }

      toast.success("General settings updated successfully.");
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
            <Globe size={21} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
              Settings
            </p>

            <h1 className="font-heading text-3xl font-black tracking-tight text-foreground">
              General Settings
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Manage your website name, description, contact information, and basic
          branding.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Website Information */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft text-primary">
            <Globe size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">
              Website Information
            </h2>

            <p className="mt-1 text-sm text-muted">
              Basic information about your platform.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Site Name */}
          <div>
            <label htmlFor="site_name" className="mb-2 block text-sm font-bold">
              Site Name
            </label>

            <div className="relative">
              <Globe
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="site_name"
                name="site_name"
                type="text"
                defaultValue={settings.site_name}
                required
                className="
                  w-full rounded-2xl border border-border
                  bg-white py-3.5 pl-11 pr-4
                  text-sm font-medium
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/10
                "
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="site_description"
              className="mb-2 block text-sm font-bold"
            >
              Site Description
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute left-4 top-4 text-muted"
              />

              <textarea
                id="site_description"
                name="site_description"
                rows={4}
                defaultValue={settings.site_description ?? ""}
                placeholder="Describe what your website does..."
                className="
                  w-full resize-none rounded-2xl border border-border
                  bg-white py-3.5 pl-11 pr-4
                  text-sm font-medium
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/10
                "
              />
            </div>
          </div>

          {/* Website URL */}
          <div>
            <label
              htmlFor="website_url"
              className="mb-2 block text-sm font-bold"
            >
              Website URL
            </label>

            <div className="relative">
              <Link2
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="website_url"
                name="website_url"
                type="url"
                defaultValue={settings.website_url ?? ""}
                placeholder="https://example.com"
                className="
                  w-full rounded-2xl border border-border
                  bg-white py-3.5 pl-11 pr-4
                  text-sm font-medium
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/10
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft text-primary">
            <Mail size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">
              Contact Information
            </h2>

            <p className="mt-1 text-sm text-muted">
              Contact details that can be displayed across the website.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Email */}
          <div>
            <label
              htmlFor="contact_email"
              className="mb-2 block text-sm font-bold"
            >
              Contact Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="contact_email"
                name="contact_email"
                type="email"
                defaultValue={settings.contact_email ?? ""}
                placeholder="hello@example.com"
                className="
                  w-full rounded-2xl border border-border
                  bg-white py-3.5 pl-11 pr-4
                  text-sm font-medium
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/10
                "
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="contact_phone"
              className="mb-2 block text-sm font-bold"
            >
              Contact Phone
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="contact_phone"
                name="contact_phone"
                type="tel"
                defaultValue={settings.contact_phone ?? ""}
                placeholder="+91 98765 43210"
                className="
                  w-full rounded-2xl border border-border
                  bg-white py-3.5 pl-11 pr-4
                  text-sm font-medium
                  outline-none
                  transition
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/10
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Branding */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-soft text-primary">
            <Image size={20} />
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold">Branding</h2>

            <p className="mt-1 text-sm text-muted">
              Configure your logo and favicon URLs.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Logo */}
          <div>
            <label htmlFor="logo_url" className="mb-2 block text-sm font-bold">
              Logo URL
            </label>

            <input
              id="logo_url"
              name="logo_url"
              type="url"
              defaultValue={settings.logo_url ?? ""}
              placeholder="https://..."
              className="
                w-full rounded-2xl border border-border
                bg-white px-4 py-3.5
                text-sm font-medium
                outline-none
                transition
                focus:border-primary
                focus:ring-2 focus:ring-primary/10
              "
            />
          </div>

          {/* Favicon */}
          <div>
            <label
              htmlFor="favicon_url"
              className="mb-2 block text-sm font-bold"
            >
              Favicon URL
            </label>

            <input
              id="favicon_url"
              name="favicon_url"
              type="url"
              defaultValue={settings.favicon_url ?? ""}
              placeholder="https://..."
              className="
                w-full rounded-2xl border border-border
                bg-white px-4 py-3.5
                text-sm font-medium
                outline-none
                transition
                focus:border-primary
                focus:ring-2 focus:ring-primary/10
              "
            />
          </div>
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
