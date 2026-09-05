import Link from "next/link";
import { Building2, Globe, MapPin, Pencil } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import DeleteCompanyButton from "@/components/admin/DeleteCompanyButton";

export default async function AdminCompaniesPage() {
  const supabase = await createClient();

  const { data: companies, error } = await supabase
    .from("companies")
    .select(
      `
      id,
      name,
      slug,
      logo_url,
      website,
      description,
      location
      `,
    )
    .order("name", { ascending: true });

  if (error) {
    console.error("Error loading companies:", error);
  }

  return (
    <main className="min-h-screen bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Admin Panel
            </p>

            <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Companies
            </h1>

            <p className="mt-3 text-muted">
              Manage companies used across your job listings.
            </p>
          </div>

          <Link
            href="/admin/companies/new"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            + Add Company
          </Link>
        </div>

        {/* Companies */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-white">
          {/* Error */}
          {error && (
            <div className="border-b border-border bg-red-50 px-6 py-4 text-sm font-semibold text-red-600">
              Failed to load companies.
            </div>
          )}

          {/* Empty */}
          {!error && (!companies || companies.length === 0) && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-soft">
                <Building2 size={26} />
              </div>

              <h2 className="mt-5 text-xl font-bold">No companies found</h2>

              <p className="mt-2 text-muted">Add your first company.</p>
            </div>
          )}

          {/* Table */}
          {!error && companies && companies.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-225">
                <thead>
                  <tr className="border-b border-border bg-surface-soft text-left">
                    <th className="px-6 py-4 text-sm font-bold">Company</th>

                    <th className="px-6 py-4 text-sm font-bold">Location</th>

                    <th className="px-6 py-4 text-sm font-bold">Website</th>

                    <th className="px-6 py-4 text-sm font-bold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {companies.map((company) => (
                    <tr
                      key={company.id}
                      className="border-b border-border last:border-0 hover:bg-surface-soft/50"
                    >
                      {/* Company */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          {company.logo_url ? (
                            <img
                              src={company.logo_url}
                              alt={`${company.name} logo`}
                              className="h-12 w-12 rounded-2xl border border-border object-contain"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-soft">
                              <Building2 size={20} />
                            </div>
                          )}

                          <div>
                            <p className="font-bold text-foreground">
                              {company.name}
                            </p>

                            <p className="mt-1 text-xs text-muted">
                              {company.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-5">
                        {company.location ? (
                          <div className="flex items-center gap-2 text-sm text-muted">
                            <MapPin size={16} />
                            {company.location}
                          </div>
                        ) : (
                          <span className="text-sm text-muted">
                            Not specified
                          </span>
                        )}
                      </td>

                      {/* Website */}
                      <td className="px-6 py-5">
                        {company.website ? (
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                          >
                            <Globe size={16} />
                            Visit website
                          </a>
                        ) : (
                          <span className="text-sm text-muted">Not added</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/companies/${company.id}/edit`}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border transition hover:bg-surface-soft"
                            title="Edit company"
                          >
                            <Pencil size={16} />
                          </Link>

                          <DeleteCompanyButton
                            companyId={company.id}
                            companyName={company.name}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
