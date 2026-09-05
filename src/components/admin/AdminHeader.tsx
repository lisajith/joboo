"use client";

import { Menu } from "lucide-react";

type AdminHeaderProps = {
  onMenuClick: () => void;
  adminEmail: string;
};

export default function AdminHeader({
  onMenuClick,
  adminEmail,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-white/90 px-5 backdrop-blur-md lg:px-8">
      {/* Hamburger */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open admin menu"
        className="
          flex h-11 w-11 items-center justify-center
          rounded-xl
          border border-border
          bg-white
          text-foreground
          shadow-sm
          transition-all duration-200
          hover:border-primary/20
          hover:bg-surface-soft
          hover:text-primary
        "
      >
        <Menu size={22} />
      </button>

      {/* Admin Info */}
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="max-w-55 truncate text-sm font-bold text-foreground">
            {adminEmail}
          </p>

          <p className="mt-0.5 text-xs font-medium text-muted">Administrator</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-heading text-sm font-black text-white shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}
