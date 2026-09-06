"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/* =========================================================
   HELPERS
========================================================= */

function createSlug(title: string, company: string) {
  const base = `${title}-${company}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${base}-${Date.now()}`;
}

function getList(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .map(String)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getLines(formData: FormData, name: string) {
  const raw = String(formData.get(name) || "").trim();

  return raw
    ? raw
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
}

function getNumberArray(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .map(Number)
    .filter((value) => !Number.isNaN(value));
}

function getFinalLocations(formData: FormData) {
  const oldLocation = String(formData.get("location") || "").trim();

  const locations = getList(formData, "locations");

  const rawLocations =
    locations.length > 0 ? locations : oldLocation ? [oldLocation] : [];

  return Array.from(
    new Set(rawLocations.map((location) => location.trim()).filter(Boolean)),
  );
}

/* =========================================================
   CREATE JOB
========================================================= */

export async function createJob(formData: FormData) {
  const supabase = await createClient();

  /* -----------------------------
     Authentication
  ----------------------------- */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "You must be logged in.",
    };
  }

  /* -----------------------------
     Admin check
  ----------------------------- */

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

  // Admin client is used only after admin verification
  const adminSupabase = createAdminClient();

  /* -----------------------------
     Basic information
  ----------------------------- */

  const title = String(formData.get("title") || "").trim();
  const companyId = String(formData.get("companyId") || "");
  const categoryId = String(formData.get("categoryId") || "");

  const finalLocations = getFinalLocations(formData);

  const jobType = String(formData.get("jobType") || "");
  const workMode = String(formData.get("workMode") || "");
  const experience = String(formData.get("experience") || "").trim();

  /* -----------------------------
     Salary
  ----------------------------- */

  const salaryMinValue = String(formData.get("salaryMin") || "");
  const salaryMaxValue = String(formData.get("salaryMax") || "");
  const salaryPeriod = String(formData.get("salaryPeriod") || "");

  const salaryMin = salaryMinValue ? Number(salaryMinValue) : null;
  const salaryMax = salaryMaxValue ? Number(salaryMaxValue) : null;

  const salaryDisclosed = formData.get("salaryDisclosed") === "true";

  /* -----------------------------
     Candidate requirements
  ----------------------------- */

  const education = getList(formData, "education");
  const graduationYears = getNumberArray(formData, "graduationYears");
  const eligibility = getLines(formData, "eligibility");

  /* -----------------------------
     Dates
  ----------------------------- */

  const postedAt = String(formData.get("postedAt") || "");
  const deadline = String(formData.get("deadline") || "");

  /* -----------------------------
     Job content
  ----------------------------- */

  const description = String(formData.get("description") || "").trim();

  const responsibilities = getLines(formData, "responsibilities");

  const requirements = getLines(formData, "requirements");

  const benefits = getLines(formData, "benefits");

  /* -----------------------------
     Application
  ----------------------------- */

  const applicationUrl = String(formData.get("applicationUrl") || "").trim();

  const applicationSource = String(
    formData.get("applicationSource") || "",
  ).trim();

  /* -----------------------------
     Skills
  ----------------------------- */

  const skills = Array.from(
    new Set(
      formData
        .getAll("skills")
        .map(String)
        .map((skill) => skill.trim())
        .filter(Boolean),
    ),
  );

  /* -----------------------------
     Publishing / verification
  ----------------------------- */

  const isPublished = formData.get("isPublished") === "true";

  const isVerified = formData.get("isVerified") === "true";

  /* -----------------------------
     Validation
  ----------------------------- */

  if (
    !title ||
    !companyId ||
    !categoryId ||
    finalLocations.length === 0 ||
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

  /* -----------------------------
     Get company
  ----------------------------- */

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

  /* =====================================================
     CREATE MAIN JOB
  ===================================================== */

  const { data: job, error: jobError } = await adminSupabase
    .from("jobs")
    .insert({
      title,
      slug,
      company_id: companyId,
      category_id: categoryId,

      location: finalLocations.join(", "),

      job_type: jobType,
      work_mode: workMode || null,
      experience,

      salary_min: salaryMin,
      salary_max: salaryMax,
      salary_period: salaryPeriod || null,
      salary_disclosed: salaryDisclosed,

      posted_at: postedAt || new Date().toISOString().split("T")[0],

      deadline: deadline || null,

      description,
      eligibility,

      education: education.length > 0 ? education : null,

      graduation_years: graduationYears.length > 0 ? graduationYears : null,

      application_url: applicationUrl,
      application_source: applicationSource || null,

      is_published: isPublished,
      is_verified: isVerified,
      verified_at: isVerified ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (jobError || !job) {
    console.error("Create job error:", jobError);

    return {
      error: jobError?.message || "Failed to create job.",
    };
  }

  const jobId = job.id;

  /* =====================================================
     LOCATIONS
  ===================================================== */

  const jobLocations = finalLocations.map((location) => ({
    job_id: jobId,
    location,
  }));

  const { error: locationsError } = await adminSupabase
    .from("job_locations")
    .insert(jobLocations);

  if (locationsError) {
    console.error("Create job locations error:", locationsError);

    await adminSupabase.from("jobs").delete().eq("id", jobId);

    return {
      error: "Job was created but locations could not be saved.",
    };
  }

  /* =====================================================
     RESPONSIBILITIES
  ===================================================== */

  if (responsibilities.length > 0) {
    const rows = responsibilities.map((responsibility, index) => ({
      job_id: jobId,
      responsibility,
      position: index,
    }));

    const { error } = await adminSupabase
      .from("job_responsibilities")
      .insert(rows);

    if (error) {
      console.error("Create responsibilities error:", error);

      await adminSupabase.from("job_locations").delete().eq("job_id", jobId);

      await adminSupabase.from("jobs").delete().eq("id", jobId);

      return {
        error: "Job was created but responsibilities could not be saved.",
      };
    }
  }

  /* =====================================================
     REQUIREMENTS
  ===================================================== */

  if (requirements.length > 0) {
    const rows = requirements.map((requirement, index) => ({
      job_id: jobId,
      requirement,
      position: index,
    }));

    const { error } = await adminSupabase.from("job_requirements").insert(rows);

    if (error) {
      console.error("Create requirements error:", error);

      await adminSupabase.from("job_locations").delete().eq("job_id", jobId);

      await adminSupabase
        .from("job_responsibilities")
        .delete()
        .eq("job_id", jobId);

      await adminSupabase.from("jobs").delete().eq("id", jobId);

      return {
        error: "Job was created but requirements could not be saved.",
      };
    }
  }

  /* =====================================================
     BENEFITS
  ===================================================== */

  if (benefits.length > 0) {
    const rows = benefits.map((benefit, index) => ({
      job_id: jobId,
      benefit,
      position: index,
    }));

    const { error } = await adminSupabase.from("job_benefits").insert(rows);

    if (error) {
      console.error("Create benefits error:", error);

      await adminSupabase.from("job_locations").delete().eq("job_id", jobId);

      await adminSupabase
        .from("job_responsibilities")
        .delete()
        .eq("job_id", jobId);

      await adminSupabase.from("job_requirements").delete().eq("job_id", jobId);

      await adminSupabase.from("jobs").delete().eq("id", jobId);

      return {
        error: "Job was created but benefits could not be saved.",
      };
    }
  }

  /* =====================================================
     JOB SKILLS
  ===================================================== */

  const jobSkills = skills.map((skillId) => ({
    job_id: jobId,
    skill_id: skillId,
  }));

  const { error: skillsError } = await adminSupabase
    .from("job_skills")
    .insert(jobSkills);

  if (skillsError) {
    console.error("Create job skills error:", skillsError);

    await adminSupabase.from("job_locations").delete().eq("job_id", jobId);

    await adminSupabase
      .from("job_responsibilities")
      .delete()
      .eq("job_id", jobId);

    await adminSupabase.from("job_requirements").delete().eq("job_id", jobId);

    await adminSupabase.from("job_benefits").delete().eq("job_id", jobId);

    await adminSupabase.from("jobs").delete().eq("id", jobId);

    return {
      error: "Job was created but skills could not be saved.",
    };
  }

  redirect("/admin/jobs");
}

/* =========================================================
   UPDATE JOB
========================================================= */

export async function updateJob(formData: FormData) {
  const supabase = await createClient();

  /* -----------------------------
     Authentication
  ----------------------------- */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("UPDATE JOB USER:", user?.id);
  console.log("UPDATE JOB EMAIL:", user?.email);

  if (!user) {
    return {
      error: "You must be logged in.",
    };
  }

  /* -----------------------------
     Admin check
  ----------------------------- */

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

  // Use secret client after admin verification
  const adminSupabase = createAdminClient();

  /* -----------------------------
     Basic information
  ----------------------------- */

  const jobId = String(formData.get("jobId") || "");
  const title = String(formData.get("title") || "").trim();
  const companyId = String(formData.get("companyId") || "");
  const categoryId = String(formData.get("categoryId") || "");

  const finalLocations = getFinalLocations(formData);

  const jobType = String(formData.get("jobType") || "");
  const workMode = String(formData.get("workMode") || "");
  const experience = String(formData.get("experience") || "").trim();

  /* -----------------------------
     Salary
  ----------------------------- */

  const salaryMinValue = String(formData.get("salaryMin") || "");
  const salaryMaxValue = String(formData.get("salaryMax") || "");
  const salaryPeriod = String(formData.get("salaryPeriod") || "");

  const salaryMin = salaryMinValue ? Number(salaryMinValue) : null;
  const salaryMax = salaryMaxValue ? Number(salaryMaxValue) : null;

  const salaryDisclosed = formData.get("salaryDisclosed") === "true";

  /* -----------------------------
     Dates
  ----------------------------- */

  const postedAt = String(formData.get("postedAt") || "");
  const deadline = String(formData.get("deadline") || "");

  /* -----------------------------
     Content
  ----------------------------- */

  const description = String(formData.get("description") || "").trim();

  const eligibility = getLines(formData, "eligibility");

  const responsibilities = getLines(formData, "responsibilities");

  const requirements = getLines(formData, "requirements");

  const benefits = getLines(formData, "benefits");

  console.log("========== UPDATE JOB CONTENT ==========");
  console.log("Job ID:", jobId);
  console.log("Responsibilities:", responsibilities);
  console.log("Requirements:", requirements);
  console.log("Benefits:", benefits);
  console.log("========================================");

  /* -----------------------------
     Candidate requirements
  ----------------------------- */

  const education = getList(formData, "education");

  const graduationYears = getNumberArray(formData, "graduationYears");

  /* -----------------------------
     Application
  ----------------------------- */

  const applicationUrl = String(formData.get("applicationUrl") || "").trim();

  const applicationSource = String(
    formData.get("applicationSource") || "",
  ).trim();

  /* -----------------------------
     Skills
  ----------------------------- */

  const skills = Array.from(
    new Set(
      formData
        .getAll("skills")
        .map(String)
        .map((skill) => skill.trim())
        .filter(Boolean),
    ),
  );

  /* -----------------------------
     Publishing / verification
  ----------------------------- */

  const isPublished = formData.get("isPublished") === "true";

  const isVerified = formData.get("isVerified") === "true";

  /* -----------------------------
     Validation
  ----------------------------- */

  if (
    !jobId ||
    !title ||
    !companyId ||
    !categoryId ||
    finalLocations.length === 0 ||
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

  /* -----------------------------
     Get company
  ----------------------------- */

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

  /* =====================================================
     UPDATE MAIN JOB
  ===================================================== */

  const { error: jobError } = await adminSupabase
    .from("jobs")
    .update({
      title,
      slug,
      company_id: companyId,
      category_id: categoryId,

      location: finalLocations.join(", "),

      job_type: jobType,
      work_mode: workMode || null,
      experience,

      salary_min: salaryMin,
      salary_max: salaryMax,
      salary_period: salaryPeriod || null,
      salary_disclosed: salaryDisclosed,

      posted_at: postedAt || new Date().toISOString().split("T")[0],

      deadline: deadline || null,

      description,
      eligibility,

      education: education.length > 0 ? education : null,

      graduation_years: graduationYears.length > 0 ? graduationYears : null,

      application_url: applicationUrl,
      application_source: applicationSource || null,

      is_published: isPublished,

      is_verified: isVerified,

      verified_at: isVerified ? new Date().toISOString() : null,

      updated_at: new Date().toISOString(),
    })
    .eq("id", jobId);

  if (jobError) {
    console.error("Update job error:", jobError);

    return {
      error: jobError.message || "Failed to update job.",
    };
  }

  /* =====================================================
     REPLACE LOCATIONS
  ===================================================== */

  const { data: deletedLocations, error: deleteLocationsError } =
    await adminSupabase
      .from("job_locations")
      .delete()
      .eq("job_id", jobId)
      .select("id");

  if (deleteLocationsError) {
    console.error("DELETE JOB LOCATIONS ERROR:", deleteLocationsError);

    return {
      error: `Location delete failed: ${deleteLocationsError.message}`,
    };
  }

  console.log(
    `Deleted ${deletedLocations?.length ?? 0} location rows for job ${jobId}`,
  );

  const jobLocations = finalLocations.map((location) => ({
    job_id: jobId,
    location,
  }));

  if (jobLocations.length > 0) {
    const { error: locationsError } = await adminSupabase
      .from("job_locations")
      .insert(jobLocations);

    if (locationsError) {
      console.error("INSERT JOB LOCATIONS ERROR:", locationsError);

      return {
        error: `Location save failed: ${locationsError.message}`,
      };
    }
  }

  /* =====================================================
     REPLACE RESPONSIBILITIES
  ===================================================== */

  const { error: deleteResponsibilitiesError } = await adminSupabase
    .from("job_responsibilities")
    .delete()
    .eq("job_id", jobId);

  if (deleteResponsibilitiesError) {
    console.error(
      "DELETE RESPONSIBILITIES ERROR:",
      deleteResponsibilitiesError,
    );

    return {
      error: `Responsibilities delete failed: ${deleteResponsibilitiesError.message}`,
    };
  }

  console.log("Responsibilities to insert:", responsibilities);

  if (responsibilities.length > 0) {
    const rows = responsibilities.map((responsibility, index) => ({
      job_id: jobId,
      responsibility,
      position: index,
    }));

    console.log("Responsibility rows:", rows);

    const { data, error } = await adminSupabase
      .from("job_responsibilities")
      .insert(rows)
      .select();

    console.log("Inserted responsibilities:", data);

    if (error) {
      console.error("INSERT RESPONSIBILITIES ERROR:", error);

      return {
        error: `Responsibilities save failed: ${error.message}`,
      };
    }
  }

  /* =====================================================
     REPLACE REQUIREMENTS
  ===================================================== */

  const { error: deleteRequirementsError } = await adminSupabase
    .from("job_requirements")
    .delete()
    .eq("job_id", jobId);

  if (deleteRequirementsError) {
    console.error("DELETE REQUIREMENTS ERROR:", deleteRequirementsError);

    return {
      error: `Requirements delete failed: ${deleteRequirementsError.message}`,
    };
  }

  console.log("Requirements to insert:", requirements);

  if (requirements.length > 0) {
    const rows = requirements.map((requirement, index) => ({
      job_id: jobId,
      requirement,
      position: index,
    }));

    console.log("Requirement rows:", rows);

    const { data, error } = await adminSupabase
      .from("job_requirements")
      .insert(rows)
      .select();

    console.log("Inserted requirements:", data);

    if (error) {
      console.error("INSERT REQUIREMENTS ERROR:", error);

      return {
        error: `Requirements save failed: ${error.message}`,
      };
    }
  }

  /* =====================================================
     REPLACE BENEFITS
  ===================================================== */

  const { error: deleteBenefitsError } = await adminSupabase
    .from("job_benefits")
    .delete()
    .eq("job_id", jobId);

  if (deleteBenefitsError) {
    console.error("DELETE BENEFITS ERROR:", deleteBenefitsError);

    return {
      error: `Benefits delete failed: ${deleteBenefitsError.message}`,
    };
  }

  console.log("Benefits to insert:", benefits);

  if (benefits.length > 0) {
    const rows = benefits.map((benefit, index) => ({
      job_id: jobId,
      benefit,
      position: index,
    }));

    console.log("Benefit rows:", rows);

    const { data, error } = await adminSupabase
      .from("job_benefits")
      .insert(rows)
      .select();

    console.log("Inserted benefits:", data);

    if (error) {
      console.error("INSERT BENEFITS ERROR:", error);

      return {
        error: `Benefits save failed: ${error.message}`,
      };
    }
  }

  /* =====================================================
     REPLACE SKILLS
  ===================================================== */

  const { error: deleteSkillsError } = await adminSupabase
    .from("job_skills")
    .delete()
    .eq("job_id", jobId);

  if (deleteSkillsError) {
    console.error("Delete old job skills error:", deleteSkillsError);

    return {
      error: "Job was updated but existing skills could not be replaced.",
    };
  }

  const jobSkills = skills.map((skillId) => ({
    job_id: jobId,
    skill_id: skillId,
  }));

  const { error: skillsError } = await adminSupabase
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

/* =========================================================
   DELETE JOB
========================================================= */

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

  const adminSupabase = createAdminClient();

  /* -----------------------------
     Delete locations
  ----------------------------- */

  const { error: locationsError } = await adminSupabase
    .from("job_locations")
    .delete()
    .eq("job_id", jobId);

  if (locationsError) {
    console.error("Delete job locations error:", locationsError);

    return {
      error: "Failed to remove job locations.",
    };
  }

  /* -----------------------------
     Delete responsibilities
  ----------------------------- */

  const { error: responsibilitiesError } = await adminSupabase
    .from("job_responsibilities")
    .delete()
    .eq("job_id", jobId);

  if (responsibilitiesError) {
    console.error("Delete responsibilities error:", responsibilitiesError);

    return {
      error: "Failed to remove job responsibilities.",
    };
  }

  /* -----------------------------
     Delete requirements
  ----------------------------- */

  const { error: requirementsError } = await adminSupabase
    .from("job_requirements")
    .delete()
    .eq("job_id", jobId);

  if (requirementsError) {
    console.error("Delete requirements error:", requirementsError);

    return {
      error: "Failed to remove job requirements.",
    };
  }

  /* -----------------------------
     Delete benefits
  ----------------------------- */

  const { error: benefitsError } = await adminSupabase
    .from("job_benefits")
    .delete()
    .eq("job_id", jobId);

  if (benefitsError) {
    console.error("Delete job benefits error:", benefitsError);

    return {
      error: "Failed to remove job benefits.",
    };
  }

  /* -----------------------------
     Delete skills
  ----------------------------- */

  const { error: skillsError } = await adminSupabase
    .from("job_skills")
    .delete()
    .eq("job_id", jobId);

  if (skillsError) {
    console.error("Delete job skills error:", skillsError);

    return {
      error: "Failed to remove job skills.",
    };
  }

  /* -----------------------------
     Delete main job
  ----------------------------- */

  const { error: jobError } = await adminSupabase
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

/* =========================================================
   TOGGLE PUBLISHED
========================================================= */

export async function toggleJobPublished(jobId: string, isPublished: boolean) {
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

  const adminSupabase = createAdminClient();

  const { error } = await adminSupabase
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
