import SEOSettingsForm from "@/components/admin/SEOSettingsForm";
import { createClient } from "@/lib/supabase/server";

export default async function SEOSettingsPage() {
  const supabase = await createClient();

  const { data: settings, error } = await supabase
    .from("site_settings")
    .select(
      `
        id,
        seo_title,
        seo_description,
        seo_keywords,
        og_image_url
      `,
    )
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to load SEO settings:", error);

    return (
      <div className="bg-background px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-red-200 bg-red-50 p-8 text-red-600">
          Failed to load SEO settings.
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-background px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-white p-8">
          <h1 className="font-heading text-2xl font-bold">
            SEO Settings Not Found
          </h1>

          <p className="mt-2 text-sm text-muted">
            No site settings record was found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background px-5 py-10 lg:px-8">
      <SEOSettingsForm settings={settings} />
    </div>
  );
}
