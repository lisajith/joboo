import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import EditJobForm from "@/components/admin/EditJobForm";

type EditJobPageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { jobId } = await params;

  // Normal client - used for the logged-in user's session/auth
  const supabase = await createClient();

  // Admin client - used to read draft/admin-only data
  const adminSupabase = createAdminClient();

  const [
    { data: job, error: jobError },
    { data: companies, error: companiesError },
    { data: categories, error: categoriesError },
    { data: skills, error: skillsError },
    { data: jobSkills, error: jobSkillsError },
    { data: jobLocations, error: jobLocationsError },
    { data: jobResponsibilities, error: jobResponsibilitiesError },
    { data: jobRequirements, error: jobRequirementsError },
    { data: jobBenefits, error: jobBenefitsError },
  ] = await Promise.all([
    /*
     * JOB
     *
     * Use admin client because this page is inside
     * the admin dashboard and drafts may not be publicly readable.
     */
    adminSupabase
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

    /*
     * Companies
     */
    adminSupabase.from("companies").select("id, name").order("name"),

    /*
     * Categories
     */
    adminSupabase.from("categories").select("id, name").order("name"),

    /*
     * Skills
     */
    adminSupabase.from("skills").select("id, name").order("name"),

    /*
     * Selected job skills
     */
    adminSupabase.from("job_skills").select("skill_id").eq("job_id", jobId),

    /*
     * Job locations
     */
    adminSupabase
      .from("job_locations")
      .select("location")
      .eq("job_id", jobId)
      .order("created_at", { ascending: true }),

    /*
     * Responsibilities
     */
    adminSupabase
      .from("job_responsibilities")
      .select("responsibility")
      .eq("job_id", jobId)
      .order("position", { ascending: true }),

    /*
     * Requirements
     */
    adminSupabase
      .from("job_requirements")
      .select("requirement")
      .eq("job_id", jobId)
      .order("position", { ascending: true }),

    /*
     * Benefits
     */
    adminSupabase
      .from("job_benefits")
      .select("benefit")
      .eq("job_id", jobId)
      .order("position", { ascending: true }),
  ]);

  /*
   * Main job failed
   */
  if (jobError || !job) {
    console.error("Edit job load error:", jobError);
    notFound();
  }

  /*
   * Log related-data errors
   */
  if (companiesError) {
    console.error("Companies load error:", companiesError);
  }

  if (categoriesError) {
    console.error("Categories load error:", categoriesError);
  }

  if (skillsError) {
    console.error("Skills load error:", skillsError);
  }

  if (jobSkillsError) {
    console.error("Job skills load error:", jobSkillsError);
  }

  if (jobLocationsError) {
    console.error("Job locations load error:", jobLocationsError);
  }

  if (jobResponsibilitiesError) {
    console.error("Job responsibilities load error:", jobResponsibilitiesError);
  }

  if (jobRequirementsError) {
    console.error("Job requirements load error:", jobRequirementsError);
  }

  if (jobBenefitsError) {
    console.error("Job benefits load error:", jobBenefitsError);
  }

  /*
   * Selected skills
   */
  const selectedSkillIds = jobSkills?.map((item) => item.skill_id) ?? [];

  /*
   * Locations
   *
   * Prefer the new relational job_locations table.
   *
   * Fall back to jobs.location for older jobs.
   */
  const locations =
    jobLocations && jobLocations.length > 0
      ? jobLocations.map((item) => item.location?.trim()).filter(Boolean)
      : job.location
        ? job.location
            .split(",")
            .map((location: string) => location.trim())
            .filter(Boolean)
        : [];

  /*
   * Responsibilities
   */
  const responsibilities =
    jobResponsibilities
      ?.map((item) => item.responsibility?.trim())
      .filter(Boolean) ?? [];

  /*
   * Requirements
   */
  const requirements =
    jobRequirements?.map((item) => item.requirement?.trim()).filter(Boolean) ??
    [];

  /*
   * Benefits
   */
  const benefits =
    jobBenefits?.map((item) => item.benefit?.trim()).filter(Boolean) ?? [];

  /*
   * Debug - remove later if you want
   */
  console.log("========== EDIT JOB LOAD ==========");
  console.log("Job ID:", jobId);
  console.log("Raw responsibilities:", jobResponsibilities);
  console.log("Raw requirements:", jobRequirements);
  console.log("Raw benefits:", jobBenefits);
  console.log("Mapped responsibilities:", responsibilities);
  console.log("Mapped requirements:", requirements);
  console.log("Mapped benefits:", benefits);
  console.log("===================================");

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
