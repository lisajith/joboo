import { supabase } from "@/lib/supabase/client";

export type SupabaseJobDetails = {
  id: string;
  category_id: string;

  slug: string;
  title: string;

  job_type: "Full-time" | "Part-time" | "Internship" | "Contract";
  work_mode: string | null;
  experience: string;

  locations: string[];

  salary_min: number | null;
  salary_max: number | null;
  salary_period: "year" | "month" | null;
  salary_disclosed: boolean;

  posted_at: string;
  deadline: string | null;

  description: string;

  education: string[];
  graduation_years: number[];
  eligibility: string[];

  responsibilities: string[];
  requirements: string[];
  benefits: string[];

  skills: string[];

  application_url: string;
  application_source: string | null;

  is_verified: boolean;
  verified_at: string | null;

  companies: {
    name: string;
    slug: string;
    logo_url: string | null;
    website: string | null;
  } | null;

  categories: {
    name: string;
    slug: string;
  } | null;
};

export async function getJobBySlug(
  slug: string,
): Promise<SupabaseJobDetails | null> {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      id,
      category_id,
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
      education,
      graduation_years,
      eligibility,
      application_url,
      application_source,
      is_verified,
      verified_at,

      companies (
        name,
        slug,
        logo_url,
        website
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
      ),

      job_locations (
        location
      ),

      job_responsibilities (
        responsibility,
        position
      ),

      job_requirements (
        requirement,
        position
      ),

      job_benefits (
        benefit,
        position
      )
    `,
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching job:", error);
    throw new Error("Failed to fetch job");
  }

  if (!data) {
    return null;
  }

  // ---------------------------------------------------------
  // Locations
  // ---------------------------------------------------------

  const locations =
    data.job_locations?.map((item) => item.location).filter(Boolean) ?? [];

  // ---------------------------------------------------------
  // Responsibilities
  // ---------------------------------------------------------

  const responsibilities =
    data.job_responsibilities
      ?.sort((a, b) => a.position - b.position)
      .map((item) => item.responsibility)
      .filter(Boolean) ?? [];

  // ---------------------------------------------------------
  // Requirements
  // ---------------------------------------------------------

  const requirements =
    data.job_requirements
      ?.sort((a, b) => a.position - b.position)
      .map((item) => item.requirement)
      .filter(Boolean) ?? [];

  // ---------------------------------------------------------
  // Benefits
  // ---------------------------------------------------------

  const benefits =
    data.job_benefits
      ?.sort((a, b) => a.position - b.position)
      .map((item) => item.benefit)
      .filter(Boolean) ?? [];

  // ---------------------------------------------------------
  // Skills
  // ---------------------------------------------------------

  const skills =
    data.job_skills?.flatMap((jobSkill) => {
      const skill = Array.isArray(jobSkill.skills)
        ? jobSkill.skills[0]
        : jobSkill.skills;

      return skill?.name ? [skill.name] : [];
    }) ?? [];

  // ---------------------------------------------------------
  // Company
  // ---------------------------------------------------------

  const company = Array.isArray(data.companies)
    ? data.companies[0]
    : data.companies;

  // ---------------------------------------------------------
  // Category
  // ---------------------------------------------------------

  const category = Array.isArray(data.categories)
    ? data.categories[0]
    : data.categories;

  // ---------------------------------------------------------
  // Final normalized job
  // ---------------------------------------------------------

  return {
    id: data.id,
    category_id: data.category_id,

    slug: data.slug,
    title: data.title,

    job_type: data.job_type,
    work_mode: data.work_mode,
    experience: data.experience,

    locations,

    salary_min: data.salary_min,
    salary_max: data.salary_max,
    salary_period: data.salary_period,
    salary_disclosed: data.salary_disclosed,

    posted_at: data.posted_at,
    deadline: data.deadline,

    description: data.description,

    education: data.education ?? [],
    graduation_years: data.graduation_years ?? [],
    eligibility: data.eligibility ?? [],

    responsibilities,
    requirements,
    benefits,

    skills,

    application_url: data.application_url,
    application_source: data.application_source,

    is_verified: data.is_verified,
    verified_at: data.verified_at,

    companies: company
      ? {
          name: company.name,
          slug: company.slug,
          logo_url: company.logo_url,
          website: company.website,
        }
      : null,

    categories: category
      ? {
          name: category.name,
          slug: category.slug,
        }
      : null,
  };
}
