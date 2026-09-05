"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateSEOSettings(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "You must be logged in.",
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return {
      error: "You are not authorized to update settings.",
    };
  }

  const seoTitle = String(formData.get("seo_title") ?? "").trim();

  const seoDescription = String(formData.get("seo_description") ?? "").trim();

  const seoKeywords = String(formData.get("seo_keywords") ?? "").trim();

  const ogImageUrl = String(formData.get("og_image_url") ?? "").trim();

  if (seoTitle.length > 70) {
    return {
      error: "SEO title should not exceed 70 characters.",
    };
  }

  if (seoDescription.length > 160) {
    return {
      error: "SEO description should not exceed 160 characters.",
    };
  }

  const { data: existingSettings, error: fetchError } = await supabase
    .from("site_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    console.error(fetchError);

    return {
      error: "Failed to load existing settings.",
    };
  }

  if (!existingSettings) {
    return {
      error: "Site settings record was not found.",
    };
  }

  const { error: updateError } = await supabase
    .from("site_settings")
    .update({
      seo_title: seoTitle || null,
      seo_description: seoDescription || null,
      seo_keywords: seoKeywords || null,
      og_image_url: ogImageUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existingSettings.id);

  if (updateError) {
    console.error(updateError);

    return {
      error: "Failed to update SEO settings.",
    };
  }

  return {
    success: true,
  };
}
