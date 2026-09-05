"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function createCompanySlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createCompany(formData: FormData) {
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
      error: "You are not authorized to create companies.",
    };
  }

  const name = String(formData.get("name") || "").trim();

  const website = String(formData.get("website") || "").trim();

  const logoUrl = String(formData.get("logoUrl") || "").trim();

  const location = String(formData.get("location") || "").trim();

  const description = String(formData.get("description") || "").trim();

  if (!name) {
    return {
      error: "Company name is required.",
    };
  }

  const slug = createCompanySlug(name);

  const { error } = await supabase.from("companies").insert({
    name,
    slug,
    website: website || null,
    logo_url: logoUrl || null,
    location: location || null,
    description: description || null,
  });

  if (error) {
    console.error("Create company error:", error);

    if (error.code === "23505") {
      return {
        error: "A company with this name already exists.",
      };
    }

    return {
      error: error.message || "Failed to create company.",
    };
  }

  redirect("/admin/companies");
}

export async function deleteCompany(companyId: string) {
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
      error: "You are not authorized to delete companies.",
    };
  }

  if (!companyId) {
    return {
      error: "Invalid company.",
    };
  }

  const { error } = await supabase
    .from("companies")
    .delete()
    .eq("id", companyId);

  if (error) {
    console.error("Delete company error:", error);

    return {
      error: error.message || "Failed to delete company.",
    };
  }

  return {
    success: true,
  };
}

export async function updateCompany(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return {
      error: "You are not authorized to update companies.",
    };
  }

  const companyId = String(formData.get("companyId") || "").trim();

  const name = String(formData.get("name") || "").trim();

  const website = String(formData.get("website") || "").trim();

  const logoUrl = String(formData.get("logoUrl") || "").trim();

  const location = String(formData.get("location") || "").trim();

  const description = String(formData.get("description") || "").trim();

  if (!companyId) {
    return { error: "Invalid company." };
  }

  if (!name) {
    return { error: "Company name is required." };
  }

  const slug = createCompanySlug(name);

  const { error } = await supabase
    .from("companies")
    .update({
      name,
      slug,
      website: website || null,
      logo_url: logoUrl || null,
      location: location || null,
      description: description || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", companyId);

  if (error) {
    console.error("Update company error:", error);

    if (error.code === "23505") {
      return {
        error: "A company with this name already exists.",
      };
    }

    return {
      error: error.message || "Failed to update company.",
    };
  }

  redirect("/admin/companies");
}
