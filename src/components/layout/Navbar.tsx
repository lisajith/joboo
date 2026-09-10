"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOut, Menu, UserCircle, X } from "lucide-react";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    setUser(null);
    setMenuOpen(false);

    toast.success("Logged out successfully!");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex min-w-0 items-center gap-2"
        >
          <div className="flex min-w-0 items-center justify-center rounded-xl text-lg font-bold">
            <img
              src="/Job.png"
              alt="Where Is My Job?"
              className="h-9 w-auto shrink-0 object-contain sm:h-10"
            />

            <span className="ml-1 whitespace-nowrap font-heading text-lg font-bold tracking-tight text-foreground sm:text-2xl">
              Where Is My <span className="text-primary">Job?</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/jobs"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-primary"
          >
            Jobs
          </Link>

          <Link
            href="/companies"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-primary"
          >
            Companies
          </Link>

          <Link
            href="/internships"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-primary"
          >
            Internships
          </Link>

          <Link
            href="/categories"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-primary"
          >
            Categories
          </Link>

          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-primary"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-soft hover:text-primary"
          >
            Contact
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {!loading && !user && (
            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-soft"
            >
              Log in
            </Link>
          )}

          {!loading && user && (
            <>
              <Link
                href="/account"
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface-soft"
              >
                <UserCircle size={18} />
                Account
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          )}

          <Link
            href="/jobs"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg"
          >
            Find a Job
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground transition hover:bg-surface-soft lg:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-border bg-white shadow-lg lg:hidden">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <div className="flex flex-col gap-1">
              <Link
                href="/jobs"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-soft hover:text-primary"
              >
                Jobs
              </Link>

              <Link
                href="/companies"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-soft hover:text-primary"
              >
                Companies
              </Link>

              <Link
                href="/internships"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-soft hover:text-primary"
              >
                Internships
              </Link>

              <Link
                href="/categories"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-soft hover:text-primary"
              >
                Categories
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-soft hover:text-primary"
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-soft hover:text-primary"
              >
                Contact
              </Link>

              <div className="my-2 border-t border-border" />

              {!loading && !user && (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-soft"
                >
                  Log in
                </Link>
              )}

              {!loading && user && (
                <>
                  <Link
                    href="/account"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-soft"
                  >
                    <UserCircle size={18} />
                    Account
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </>
              )}

              <Link
                href="/jobs"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:bg-primary-dark"
              >
                Find a Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
