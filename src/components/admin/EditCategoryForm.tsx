"use client";

import { useState, useTransition } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

import { updateCategory } from "@/app/admin/(dashboard)/categories/actions";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

type EditCategoryFormProps = {
  category: Category;
};

export default function EditCategoryForm({ category }: EditCategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await updateCategory(formData);

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <input type="hidden" name="categoryId" value={category.id} />

      {/* Category Information */}
      <section className="rounded-3xl border border-border bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold">Category Information</h2>

        <p className="mt-1 text-sm text-muted">
          Update the details of this job category.
        </p>

        <div className="mt-6 grid gap-5">
          {/* Category Name */}
          <div>
            <label className="text-sm font-bold">Category Name *</label>

            <input
              name="name"
              type="text"
              defaultValue={category.name}
              required
              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="Software Development"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-bold">Description</label>

            <textarea
              name="description"
              defaultValue={category.description ?? ""}
              rows={6}
              className="mt-2 w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
              placeholder="Describe this job category..."
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
          href="/admin/categories"
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
