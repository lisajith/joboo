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
    { data: jobLocations },
    { data: jobResponsibilities },
    { data: jobRequirements },
    { data: jobBenefits },
  ] = await Promise.all([
    supabase
      .from("jobs")
      .select(
        `
        id,
        title,
        location,
        job_type,
        work_mode,
        experience,
        salary_min,
        salary_max,
        salary_period,
        salary_disclosed,
        posted_at,
        deadline,
        description,
        eligibility,
        education,
        graduation_years,
        application_url,
        application_source,
        is_published,
        is_verified,
        verified_at,
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

    supabase
      .from("job_locations")
      .select("location")
      .eq("job_id", jobId)
      .order("created_at"),

    supabase
      .from("job_responsibilities")
      .select("responsibility")
      .eq("job_id", jobId)
      .order("position"),

    supabase
      .from("job_requirements")
      .select("requirement")
      .eq("job_id", jobId)
      .order("position"),

    supabase
      .from("job_benefits")
      .select("benefit")
      .eq("job_id", jobId)
      .order("position"),
  ]);

  if (jobError || !job) {
    notFound();
  }

  const selectedSkillIds = jobSkills?.map((item) => item.skill_id) ?? [];

  // Use relational locations first.
  // Fall back to the old jobs.location column for older jobs.
  const locations =
    jobLocations && jobLocations.length > 0
      ? jobLocations.map((item) => item.location)
      : job.location
        ? job.location
            .split(",")
            .map((location: string) => location.trim())
            .filter(Boolean)
        : [];

  const responsibilities =
    jobResponsibilities?.map((item) => item.responsibility) ?? [];

  const requirements = jobRequirements?.map((item) => item.requirement) ?? [];

  const benefits = jobBenefits?.map((item) => item.benefit) ?? [];

  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mt-10">
          <EditJobForm
            job={job}
            companies={companies ?? []}
            categories={categories ?? []}
            skills={skills ?? []}
            selectedSkillIds={selectedSkillIds}
            locations={locations}
            responsibilities={responsibilities}
            requirements={requirements}
            benefits={benefits}
          />
        </div>
      </div>
    </main>
  );
}
