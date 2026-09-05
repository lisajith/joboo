"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateGeneralSettings(formData: FormData) {
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

  const siteName = String(formData.get("site_name") ?? "").trim();

  const siteDescription = String(formData.get("site_description") ?? "").trim();

  const contactEmail = String(formData.get("contact_email") ?? "").trim();

  const contactPhone = String(formData.get("contact_phone") ?? "").trim();

  const websiteUrl = String(formData.get("website_url") ?? "").trim();

  const logoUrl = String(formData.get("logo_url") ?? "").trim();

  const faviconUrl = String(formData.get("favicon_url") ?? "").trim();

  if (!siteName) {
    return {
      error: "Site name is required.",
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
      site_name: siteName,
      site_description: siteDescription || null,
      contact_email: contactEmail || null,
      contact_phone: contactPhone || null,
      website_url: websiteUrl || null,
      logo_url: logoUrl || null,
      favicon_url: faviconUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existingSettings.id);

  if (updateError) {
    console.error(updateError);

    return {
      error: "Failed to update settings.",
    };
  }

  return {
    success: true,
  };
}
