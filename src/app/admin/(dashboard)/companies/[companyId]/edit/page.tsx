import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import EditCompanyForm from "@/components/admin/EditCompanyForm";

type EditCompanyPageProps = {
  params: Promise<{
    companyId: string;
  }>;
};

export default async function EditCompanyPage({
  params,
}: EditCompanyPageProps) {
  const { companyId } = await params;

  const supabase = await createClient();

  const { data: company, error } = await supabase
    .from("companies")
    .select("id, name, slug, website, logo_url, location, description")
    .eq("id", companyId)
    .single();

  if (error || !company) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Admin Panel
          </p>

          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
            Edit Company
          </h1>

          <p className="mt-3 text-muted">Update the details of this company.</p>
        </div>

        <div className="mt-10">
          <EditCompanyForm company={company} />
        </div>
      </div>
    </main>
  );
}
