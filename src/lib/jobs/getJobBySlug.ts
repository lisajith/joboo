import { supabase } from "@/lib/supabase/client";

export type SupabaseJobDetails = {
  id: string;
  category_id: string;

  slug: string;
  title: string;
  location: string;
  job_type: "Full-time" | "Part-time" | "Internship" | "Contract";
  experience: string;

  salary_min: number | null;
  salary_max: number | null;
  salary_period: "year" | "month" | null;

  posted_at: string;
  deadline: string | null;

  description: string;
  eligibility: string[] | null;

  application_url: string;

  companies:
    | {
        name: string;
        slug: string;
        logo_url: string | null;
        website: string | null;
      }
    | {
        name: string;
        slug: string;
        logo_url: string | null;
        website: string | null;
      }[]
    | null;

  categories:
    | {
        name: string;
        slug: string;
      }
    | {
        name: string;
        slug: string;
      }[]
    | null;

  job_skills:
    | {
        skills:
          | {
              name: string;
              slug: string;
            }
          | {
              name: string;
              slug: string;
            }[]
          | null;
      }[]
    | null;
};

export async function getJobBySlug(
  slug: string,
): Promise<SupabaseJobDetails | null> {
  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
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
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching job:", error);
    throw new Error("Failed to fetch job");
  }

  return data as SupabaseJobDetails | null;
}
