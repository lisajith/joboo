import {
  Globe,
  Search,
  UserRound,
  Settings as SettingsIcon,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const settingsSections = [
  {
    title: "General Settings",
    description:
      "Manage your website name, description, contact information, and branding.",
    href: "/admin/settings/general",
    icon: Globe,
  },
  {
    title: "SEO Settings",
    description:
      "Manage default SEO titles, descriptions, and search engine settings.",
    href: "/admin/settings/seo",
    icon: Search,
  },
  {
    title: "Account Settings",
    description: "Manage your administrator account and account preferences.",
    href: "/admin/settings/account",
    icon: UserRound,
  },
];

export default function SettingsPage() {
  return (
    <div className="bg-background px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              <SettingsIcon size={21} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                Admin Panel
              </p>

              <h1 className="font-heading text-3xl font-black tracking-tight text-foreground">
                Settings
              </h1>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-muted">
            Manage your platform settings, website preferences, SEO, and
            administrator account.
          </p>
        </div>

        {/* Settings Cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {settingsSections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.href}
                href={section.href}
                className="
                  group rounded-3xl border border-border
                  bg-white p-6 shadow-sm
                  transition-all duration-200
                  hover:-translate-y-0.5
                  hover:border-primary/20
                  hover:shadow-md
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="
                      flex h-12 w-12 shrink-0
                      items-center justify-center
                      rounded-2xl
                      bg-surface-soft
                      text-primary
                      transition-colors
                      group-hover:bg-primary
                      group-hover:text-white
                    "
                  >
                    <Icon size={21} />
                  </div>

                  <div
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-xl border border-border
                      text-muted
                      transition-all
                      group-hover:border-primary/20
                      group-hover:bg-primary/5
                      group-hover:text-primary
                    "
                  >
                    <ChevronRight size={17} />
                  </div>
                </div>

                <h2 className="mt-5 font-heading text-xl font-bold text-foreground">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted">
                  {section.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
