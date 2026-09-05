import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import EditJobForm from "@/components/admin/EditJobForm";

type EditJobPageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { jobId } = await params;

  const supabase = await createClient();

  const [
    { data: job, error: jobError },
    { data: companies },
    { data: categories },
    { data: skills },
    { data: jobSkills },
  ] = await Promise.all([
    supabase
      .from("jobs")
      .select(
        `
        id,
        title,
        location,
        job_type,
        experience,
        salary_min,
        salary_max,
        salary_period,
        posted_at,
        deadline,
        description,
        eligibility,
        application_url,
        is_published,
        company_id,
        category_id
        `,
      )
      .eq("id", jobId)
      .single(),

    supabase.from("companies").select("id, name").order("name"),

    supabase.from("categories").select("id, name").order("name"),

    supabase.from("skills").select("id, name").order("name"),

    supabase.from("job_skills").select("skill_id").eq("job_id", jobId),
  ]);

  if (jobError || !job) {
    notFound();
  }

  const selectedSkillIds = jobSkills?.map((item) => item.skill_id) ?? [];

  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Admin Panel
          </p>

          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Edit Job
          </h1>

          <p className="mt-3 text-muted">
            Update the details of this job opening.
          </p>
        </div>

        <div className="mt-10">
          <EditJobForm
            job={job}
            companies={companies ?? []}
            categories={categories ?? []}
            skills={skills ?? []}
            selectedSkillIds={selectedSkillIds}
          />
        </div>
      </div>
    </main>
  );
}
