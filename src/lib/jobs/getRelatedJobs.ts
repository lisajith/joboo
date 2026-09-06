import { supabase } from "@/lib/supabase/client";
import type { Job } from "@/types/job";

export async function getRelatedJobs(
  categoryId: string,
  currentJobId: string,
): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      slug,
      title,
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
      application_url,
      application_source,
      is_verified,

      companies (
        name,
        slug,
        logo_url
      ),

      categories (
        name,
        slug
      ),

      job_locations (
        location
      ),

      job_skills (
        skills (
          name,
          slug
        )
      )
    `,
    )
    .eq("category_id", categoryId)
    .eq("is_published", true)
    .neq("id", currentJobId)
    .order("posted_at", { ascending: false })
    .limit(2);

  if (error) {
    console.error("Error fetching related jobs:", error);
    return [];
  }

  return (data ?? []).map((job) => {
    const company = Array.isArray(job.companies)
      ? job.companies[0]
      : job.companies;

    const category = Array.isArray(job.categories)
      ? job.categories[0]
      : job.categories;

    const locations =
      job.job_locations?.map((item) => item.location).filter(Boolean) ?? [];

    const skills =
      job.job_skills?.flatMap((jobSkill) => {
        const skill = Array.isArray(jobSkill.skills)
          ? jobSkill.skills[0]
          : jobSkill.skills;

        return skill?.name ? [skill.name] : [];
      }) ?? [];

    return {
      id: job.id,
      slug: job.slug,
      title: job.title,

      company: {
        name: company?.name ?? "Unknown Company",
        slug: company?.slug ?? "",
        logoUrl: company?.logo_url ?? null,
      },

      category: {
        name: category?.name ?? "Uncategorized",
        slug: category?.slug ?? "",
      },

      locations,

      type: job.job_type,
      workMode: job.work_mode,
      experience: job.experience,

      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      salaryPeriod: job.salary_period,
      salaryDisclosed: job.salary_disclosed,

      postedAt: job.posted_at,
      deadline: job.deadline,

      description: job.description,

      education: [],
      graduationYears: [],
      eligibility: [],

      skills,

      applicationUrl: job.application_url,
      applicationSource: job.application_source,

      isVerified: job.is_verified,
      verifiedAt: null,
    };
  });
}
