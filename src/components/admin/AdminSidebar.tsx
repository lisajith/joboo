"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Building2,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  Tags,
  Globe,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Jobs",
    href: "/admin/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Companies",
    href: "/admin/companies",
    icon: Building2,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderOpen,
  },
  {
    name: "Skills",
    href: "/admin/skills",
    icon: Tags,
  },
];

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-[2px]
          transition-opacity duration-300
          ${open ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72.5 flex-col
          border-r border-border bg-white
          shadow-2xl
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-5">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold transition-transform duration-200 group-hover:rotate-6 group-hover:scale-150">
              <img
                src="/Job.png"
                alt="Where Is My Job?"
                className="h-10 w-auto object-contain"
              />
            </div>

            <div>
              <p className="font-heading text-[17px] font-black leading-none tracking-tight">
                Where Is My Job?
              </p>

              <p className="mt-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                Admin Panel
              </p>
            </div>
          </Link>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close admin menu"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              border border-border
              text-muted
              transition-all duration-200
              hover:border-primary/20
              hover:bg-surface-soft
              hover:text-foreground
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
            Management
          </p>

          <div className="space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;

              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    group relative flex items-center gap-3
                    rounded-2xl px-4 py-3.5
                    text-sm font-bold
                    transition-all duration-200
                    ${
                      active
                        ? "bg-primary text-white shadow-sm"
                        : "text-foreground hover:bg-surface-soft"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-9 w-9 items-center justify-center rounded-xl
                      transition-colors
                      ${
                        active
                          ? "bg-white/15"
                          : "bg-surface-soft group-hover:bg-white"
                      }
                    `}
                  >
                    <Icon size={18} />
                  </span>

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="my-6 border-t border-border" />

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
            Quick Links
          </p>

          <div className="space-y-1.5">
            <Link
              href="/"
              target="_blank"
              onClick={onClose}
              className="
                group flex items-center gap-3
                rounded-2xl px-4 py-3.5
                text-sm font-bold text-foreground
                transition-all duration-200
                hover:bg-surface-soft
              "
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-soft transition-colors group-hover:bg-white">
                <Globe size={18} />
              </span>
              View Website
            </Link>

            <Link
              href="/admin/settings"
              onClick={onClose}
              className="
                group flex items-center gap-3
                rounded-2xl px-4 py-3.5
                text-sm font-bold text-foreground
                transition-all duration-200
                hover:bg-surface-soft
              "
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-soft transition-colors group-hover:bg-white">
                <Settings size={18} />
              </span>
              Settings
            </Link>
          </div>
        </nav>

        {/* Bottom / Logout */}
        <div className="shrink-0 border-t border-border p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="
              group flex w-full items-center gap-3
              rounded-2xl px-4 py-3.5
              text-sm font-bold text-red-500
              transition-all duration-200
              hover:bg-red-50
            "
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 transition-colors group-hover:bg-red-100">
              <LogOut size={18} />
            </span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
