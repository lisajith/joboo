"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function createSlug(title: string, company: string) {
  const base = `${title}-${company}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${base}-${Date.now()}`;
}

export async function createJob(formData: FormData) {
  const supabase = await createClient();

  // Check logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "You must be logged in.",
    };
  }

  // Check admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return {
      error: "You are not authorized to create jobs.",
    };
  }

  const title = String(formData.get("title") || "").trim();
  const companyId = String(formData.get("companyId") || "");
  const categoryId = String(formData.get("categoryId") || "");
  const location = String(formData.get("location") || "").trim();
  const jobType = String(formData.get("jobType") || "");
  const experience = String(formData.get("experience") || "").trim();
  const salaryMinValue = String(formData.get("salaryMin") || "");
  const salaryMaxValue = String(formData.get("salaryMax") || "");
  const salaryPeriod = String(formData.get("salaryPeriod") || "");
  const postedAt = String(formData.get("postedAt") || "");
  const deadline = String(formData.get("deadline") || "");
  const description = String(formData.get("description") || "").trim();
  const eligibilityRaw = String(formData.get("eligibility") || "").trim();
  const applicationUrl = String(formData.get("applicationUrl") || "").trim();

  const skills = formData.getAll("skills").map(String);

  const isPublished = formData.get("isPublished") === "true";

  // Basic validation
  if (
    !title ||
    !companyId ||
    !categoryId ||
    !location ||
    !jobType ||
    !experience ||
    !description ||
    !applicationUrl
  ) {
    return {
      error: "Please fill in all required fields.",
    };
  }

  if (skills.length === 0) {
    return {
      error: "Please select at least one skill.",
    };
  }

  // Get company name for slug
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("name")
    .eq("id", companyId)
    .single();

  if (companyError || !company) {
    return {
      error: "Selected company could not be found.",
    };
  }

  const slug = createSlug(title, company.name);

  const eligibility = eligibilityRaw
    ? eligibilityRaw
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const salaryMin = salaryMinValue ? Number(salaryMinValue) : null;

  const salaryMax = salaryMaxValue ? Number(salaryMaxValue) : null;

  // Create job
  const { data: job, error: jobError } = await supabase
    .from("jobs")
    .insert({
      title,
      slug,
      company_id: companyId,
      category_id: categoryId,
      location,
      job_type: jobType,
      experience,
      salary_min: salaryMin,
      salary_max: salaryMax,
      salary_period: salaryPeriod || null,
      posted_at: postedAt || new Date().toISOString().split("T")[0],
      deadline: deadline || null,
      description,
      eligibility,
      application_url: applicationUrl,
      is_published: isPublished,
    })
    .select("id")
    .single();

  if (jobError || !job) {
    console.error("Create job error:", jobError);

    return {
      error: jobError?.message || "Failed to create job.",
    };
  }

  // Create job-skill relationships
  const jobSkills = skills.map((skillId) => ({
    job_id: job.id,
    skill_id: skillId,
  }));

  const { error: skillsError } = await supabase
    .from("job_skills")
    .insert(jobSkills);

  if (skillsError) {
    console.error("Create job skills error:", skillsError);

    // Remove job if skill insertion failed
    await supabase.from("jobs").delete().eq("id", job.id);

    return {
      error: "Job was created but skills could not be saved.",
    };
  }

  redirect("/admin/jobs");
}

export async function updateJob(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "You must be logged in.",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return {
      error: "You are not authorized to update jobs.",
    };
  }

  const jobId = String(formData.get("jobId") || "");

  const title = String(formData.get("title") || "").trim();
  const companyId = String(formData.get("companyId") || "");
  const categoryId = String(formData.get("categoryId") || "");
  const location = String(formData.get("location") || "").trim();
  const jobType = String(formData.get("jobType") || "");
  const experience = String(formData.get("experience") || "").trim();

  const salaryMinValue = String(formData.get("salaryMin") || "");

  const salaryMaxValue = String(formData.get("salaryMax") || "");

  const salaryPeriod = String(formData.get("salaryPeriod") || "");

  const postedAt = String(formData.get("postedAt") || "");

  const deadline = String(formData.get("deadline") || "");

  const description = String(formData.get("description") || "").trim();

  const eligibilityRaw = String(formData.get("eligibility") || "").trim();

  const applicationUrl = String(formData.get("applicationUrl") || "").trim();

  const skills = formData.getAll("skills").map(String);

  const isPublished = formData.get("isPublished") === "true";

  if (
    !jobId ||
    !title ||
    !companyId ||
    !categoryId ||
    !location ||
    !jobType ||
    !experience ||
    !description ||
    !applicationUrl
  ) {
    return {
      error: "Please fill in all required fields.",
    };
  }

  if (skills.length === 0) {
    return {
      error: "Please select at least one skill.",
    };
  }

  const eligibility = eligibilityRaw
    ? eligibilityRaw
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const salaryMin = salaryMinValue ? Number(salaryMinValue) : null;

  const salaryMax = salaryMaxValue ? Number(salaryMaxValue) : null;

  if (salaryMin !== null && Number.isNaN(salaryMin)) {
    return {
      error: "Minimum salary is invalid.",
    };
  }

  if (salaryMax !== null && Number.isNaN(salaryMax)) {
    return {
      error: "Maximum salary is invalid.",
    };
  }

  if (salaryMin !== null && salaryMax !== null && salaryMin > salaryMax) {
    return {
      error: "Minimum salary cannot be greater than maximum salary.",
    };
  }

  // Get company name for slug
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("name")
    .eq("id", companyId)
    .single();

  if (companyError || !company) {
    return {
      error: "Selected company could not be found.",
    };
  }

  const slug = createSlug(title, company.name);

  // Update job
  const { error: jobError } = await supabase
    .from("jobs")
    .update({
      title,
      slug,
      company_id: companyId,
      category_id: categoryId,
      location,
      job_type: jobType,
      experience,
      salary_min: salaryMin,
      salary_max: salaryMax,
      salary_period: salaryPeriod || null,
      posted_at: postedAt || new Date().toISOString().split("T")[0],
      deadline: deadline || null,
      description,
      eligibility,
      application_url: applicationUrl,
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  if (jobError) {
    console.error("Update job error:", jobError);

    return {
      error: jobError.message || "Failed to update job.",
    };
  }

  // Remove existing skills
  const { error: deleteSkillsError } = await supabase
    .from("job_skills")
    .delete()
    .eq("job_id", jobId);

  if (deleteSkillsError) {
    console.error("Delete old job skills error:", deleteSkillsError);

    return {
      error: "Job was updated but existing skills could not be replaced.",
    };
  }

  // Add updated skills
  const jobSkills = skills.map((skillId) => ({
    job_id: jobId,
    skill_id: skillId,
  }));

  const { error: skillsError } = await supabase
    .from("job_skills")
    .insert(jobSkills);

  if (skillsError) {
    console.error("Update job skills error:", skillsError);

    return {
      error: "Job was updated but skills could not be saved.",
    };
  }

  redirect("/admin/jobs");
}

export async function deleteJob(jobId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "You must be logged in.",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return {
      error: "You are not authorized to delete jobs.",
    };
  }

  if (!jobId) {
    return {
      error: "Invalid job.",
    };
  }

  // Delete related skills first
  const { error: skillsError } = await supabase
    .from("job_skills")
    .delete()
    .eq("job_id", jobId);

  if (skillsError) {
    console.error("Delete job skills error:", skillsError);

    return {
      error: "Failed to remove job skills.",
    };
  }

  // Delete the job
  const { error: jobError } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId);

  if (jobError) {
    console.error("Delete job error:", jobError);

    return {
      error: jobError.message || "Failed to delete job.",
    };
  }

  return {
    success: true,
  };
}

export async function toggleJobPublished(
  jobId: string,
  isPublished: boolean
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "You must be logged in.",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return {
      error: "You are not authorized to update jobs.",
    };
  }

  const { error } = await supabase
    .from("jobs")
    .update({
      is_published: isPublished,
      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  if (error) {
    console.error("Toggle job status error:", error);

    return {
      error: error.message || "Failed to update job status.",
    };
  }

  return {
    success: true,
  };
}