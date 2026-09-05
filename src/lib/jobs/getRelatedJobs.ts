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
      location,
      job_type,
      experience,
      posted_at,
      companies (
        name,
        slug,
        logo_url
      ),
      categories (
        name,
        slug
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

      salaryMin: null,
      salaryMax: null,
      salaryPeriod: null,

      postedAt: job.posted_at,
      deadline: null,

      description: "",
      eligibility: [],

      skills: [],

      applicationUrl: "",
    };
  });
}
