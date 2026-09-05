import type { MetadataRoute } from "next";

import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/jobs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/internships`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/companies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Published jobs
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("slug, updated_at, posted_at")
    .eq("is_published", true);

  if (jobsError) {
    console.error("Sitemap jobs error:", jobsError);
  }

  const jobPages: MetadataRoute.Sitemap = (jobs ?? []).map((job) => ({
    url: `${siteConfig.url}/jobs/${job.slug}`,
    lastModified: job.updated_at || job.posted_at || now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Companies
  const { data: companies, error: companiesError } = await supabase
    .from("companies")
    .select("slug, created_at");

  if (companiesError) {
    console.error("Sitemap companies error:", companiesError);
  }

  const companyPages: MetadataRoute.Sitemap = (companies ?? []).map(
    (company) => ({
      url: `${siteConfig.url}/companies/${company.slug}`,
      lastModified: company.created_at || now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  // Categories
  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("slug, created_at");

  if (categoriesError) {
    console.error("Sitemap categories error:", categoriesError);
  }

  const categoryPages: MetadataRoute.Sitemap = (categories ?? []).map(
    (category) => ({
      url: `${siteConfig.url}/jobs/category/${category.slug}`,
      lastModified: category.created_at || now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  return [...staticPages, ...jobPages, ...companyPages, ...categoryPages];
}
