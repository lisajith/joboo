import { supabase } from "@/lib/supabase/client";
import type { Job } from "@/types/job";

export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      slug,
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

      companies (
        name,
        slug,
        logo_url
      ),

      categories (
        name,
        slug
      ),

      job_skills (
        skills (
          name,
          slug
        )
      )
    `,
    )
    .eq("is_published", true)
    .order("posted_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }

  return (data ?? []).map((job) => {
    const company = Array.isArray(job.companies)
      ? job.companies[0]
      : job.companies;

    const category = Array.isArray(job.categories)
      ? job.categories[0]
      : job.categories;

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

      location: job.location,
      type: job.job_type,
      experience: job.experience,

      salaryMin: job.salary_min,
      salaryMax: job.salary_max,
      salaryPeriod: job.salary_period,

      postedAt: job.posted_at,
      deadline: job.deadline,

      description: job.description,

      eligibility: job.eligibility ?? [],

      skills,

      applicationUrl: job.application_url,
    };
  });
}
