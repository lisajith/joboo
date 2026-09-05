import GeneralSettingsForm from "@/components/admin/GeneralSettingsForm";
import { createClient } from "@/lib/supabase/server";

export default async function GeneralSettingsPage() {
  const supabase = await createClient();

  const { data: settings, error } = await supabase
    .from("site_settings")
    .select(
      `
        id,
        site_name,
        site_description,
        contact_email,
        contact_phone,
        website_url,
        logo_url,
        favicon_url
      `,
    )
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to load site settings:", error);

    return (
      <div className="bg-background px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-red-200 bg-red-50 p-8 text-red-600">
          Failed to load general settings.
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-background px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-white p-8">
          <h1 className="font-heading text-2xl font-bold">
            Settings Not Found
          </h1>

          <p className="mt-2 text-sm text-muted">
            No site settings record was found. Please create the initial
            settings record in Supabase.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background px-5 py-10 lg:px-8">
      <GeneralSettingsForm settings={settings} />
    </div>
  );
}
