"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function createCategorySlug(name: string) {
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
    return { supabase, authorized: false };
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

export async function createCategory(formData: FormData) {
  const { supabase, authorized } = await verifyAdmin();

  if (!authorized) {
    return { error: "You are not authorized." };
  }

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!name) {
    return { error: "Category name is required." };
  }

  const slug = createCategorySlug(name);

  const { error } = await supabase.from("categories").insert({
    name,
    slug,
    description: description || null,
  });

  if (error) {
    console.error(error);

    if (error.code === "23505") {
      return {
        error: "A category with this name already exists.",
      };
    }

    return {
      error: error.message || "Failed to create category.",
    };
  }

  redirect("/admin/categories");
}

export async function updateCategory(formData: FormData) {
  const { supabase, authorized } = await verifyAdmin();

  if (!authorized) {
    return { error: "You are not authorized." };
  }

  const categoryId = String(formData.get("categoryId") || "").trim();

  const name = String(formData.get("name") || "").trim();

  const description = String(formData.get("description") || "").trim();

  if (!categoryId) {
    return { error: "Invalid category." };
  }

  if (!name) {
    return { error: "Category name is required." };
  }

  const slug = createCategorySlug(name);

  const { error } = await supabase
    .from("categories")
    .update({
      name,
      slug,
      description: description || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", categoryId);

  if (error) {
    if (error.code === "23505") {
      return {
        error: "A category with this name already exists.",
      };
    }

    return {
      error: error.message || "Failed to update category.",
    };
  }

  redirect("/admin/categories");
}

export async function deleteCategory(categoryId: string) {
  const { supabase, authorized } = await verifyAdmin();

  if (!authorized) {
    return { error: "You are not authorized." };
  }

  if (!categoryId) {
    return { error: "Invalid category." };
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    console.error(error);

    if (error.code === "23503") {
      return {
        error:
          "This category is linked to existing jobs. Update those jobs before deleting this category.",
      };
    }

    return {
      error: error.message || "Failed to delete category.",
    };
  }

  return { success: true };
}
