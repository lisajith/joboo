"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function createSkillSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      supabase,
      authorized: false,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return {
    supabase,
    authorized: profile?.role === "admin",
  };
}

export async function createSkill(formData: FormData) {
  const { supabase, authorized } = await verifyAdmin();

  if (!authorized) {
    return {
      error: "You are not authorized.",
    };
  }

  const name = String(formData.get("name") || "").trim();

  if (!name) {
    return {
      error: "Skill name is required.",
    };
  }

  const slug = createSkillSlug(name);

  const { error } = await supabase.from("skills").insert({
    name,
    slug,
  });

  if (error) {
    console.error("Create skill error:", error);

    if (error.code === "23505") {
      return {
        error: "A skill with this name already exists.",
      };
    }

    return {
      error: error.message || "Failed to create skill.",
    };
  }

  redirect("/admin/skills");
}

export async function updateSkill(formData: FormData) {
  const { supabase, authorized } = await verifyAdmin();

  if (!authorized) {
    return {
      error: "You are not authorized.",
    };
  }

  const skillId = String(formData.get("skillId") || "").trim();

  const name = String(formData.get("name") || "").trim();

  if (!skillId) {
    return {
      error: "Invalid skill.",
    };
  }

  if (!name) {
    return {
      error: "Skill name is required.",
    };
  }

  const slug = createSkillSlug(name);

  const { error } = await supabase
    .from("skills")
    .update({
      name,
      slug,
    })
    .eq("id", skillId);

  if (error) {
    console.error("Update skill error:", error);

    if (error.code === "23505") {
      return {
        error: "A skill with this name already exists.",
      };
    }

    return {
      error: error.message || "Failed to update skill.",
    };
  }

  redirect("/admin/skills");
}

export async function deleteSkill(skillId: string) {
  const { supabase, authorized } = await verifyAdmin();

  if (!authorized) {
    return {
      error: "You are not authorized.",
    };
  }

  if (!skillId) {
    return {
      error: "Invalid skill.",
    };
  }

  const { error } = await supabase.from("skills").delete().eq("id", skillId);

  if (error) {
    console.error("Delete skill error:", error);

    if (error.code === "23503") {
      return {
        error:
          "This skill is linked to existing jobs. Remove it from those jobs before deleting it.",
      };
    }

    return {
      error: error.message || "Failed to delete skill.",
    };
  }

  return {
    success: true,
  };
}
