import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import AddJobForm from "@/components/admin/AddJobForm";

export default async function AddJobPage() {
  const supabase = await createClient();

  const [
    { data: companies, error: companiesError },
    { data: categories, error: categoriesError },
    { data: skills, error: skillsError },
  ] = await Promise.all([
    supabase.from("companies").select("id, name").order("name"),

    supabase.from("categories").select("id, name").order("name"),

    supabase.from("skills").select("id, name").order("name"),
  ]);

  if (companiesError || categoriesError || skillsError) {
    console.error({
      companiesError,
      categoriesError,
      skillsError,
    });

    return (
      <div className="px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-red-200 bg-red-50 p-8 text-red-600">
          Failed to load job form data.
        </div>
      </div>
    );
  }

  if (!companies?.length || !categories?.length) {
    return (
      <div className="px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-white p-8">
          <h1 className="font-heading text-2xl font-bold">Setup Required</h1>

          <p className="mt-2 text-muted">
            Please add at least one company and one category before creating a
            job.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background px-5 py-10 lg:px-8">
      <AddJobForm
        companies={companies}
        categories={categories}
        skills={skills ?? []}
      />
    </div>
  );
}
