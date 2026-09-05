import Link from "next/link";
import { FolderOpen, Pencil } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error loading categories:", error);
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Admin Panel
            </p>

            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Categories
            </h1>

            <p className="mt-3 text-muted">
              Manage job categories used across your job listings.
            </p>
          </div>

          <Link
            href="/admin/categories/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            + Add Category
          </Link>
        </div>

        {/* Categories */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-white">
          {/* Error */}
          {error && (
            <div className="border-b border-border bg-red-50 px-6 py-4 text-sm font-semibold text-red-600">
              Failed to load categories.
            </div>
          )}

          {/* Empty */}
          {!error && (!categories || categories.length === 0) && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-soft">
                <FolderOpen size={26} />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                No categories found
              </h2>

              <p className="mt-2 text-muted">
                Add your first category.
              </p>
            </div>
          )}

          {/* Table */}
          {!error && categories && categories.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead>
                  <tr className="border-b border-border bg-surface-soft text-left">
                    <th className="px-6 py-4 text-sm font-bold">
                      Category
                    </th>

                    <th className="px-6 py-4 text-sm font-bold">
                      Slug
                    </th>

                    <th className="px-6 py-4 text-sm font-bold">
                      Description
                    </th>

                    <th className="px-6 py-4 text-sm font-bold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-border last:border-0 hover:bg-surface-soft/50"
                    >
                      {/* Category */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-soft">
                            <FolderOpen size={20} />
                          </div>

                          <div>
                            <p className="font-bold text-foreground">
                              {category.name}
                            </p>

                            <p className="mt-1 text-xs text-muted">
                              {category.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-6 py-5">
                        <span className="text-sm text-muted">
                          {category.slug}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-5">
                        {category.description ? (
                          <span className="text-sm text-muted">
                            {category.description}
                          </span>
                        ) : (
                          <span className="text-sm text-muted">
                            Not added
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/categories/${category.id}/edit`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border transition hover:bg-surface-soft"
                            title="Edit category"
                          >
                            <Pencil size={16} />
                          </Link>

                          <DeleteCategoryButton
                            categoryId={category.id}
                            categoryName={category.name}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}