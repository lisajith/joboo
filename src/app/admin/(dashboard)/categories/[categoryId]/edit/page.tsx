import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import EditCategoryForm from "@/components/admin/EditCategoryForm";

type EditCategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { categoryId } = await params;

  const supabase = await createClient();

  const { data: category, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .eq("id", categoryId)
    .single();

  if (error || !category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Admin Panel
          </p>

          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Edit Category
          </h1>

          <p className="mt-3 text-muted">
            Update the details of this job category.
          </p>
        </div>

        <div className="mt-10">
          <EditCategoryForm category={category} />
        </div>
      </div>
    </main>
  );
}
