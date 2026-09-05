import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-foreground px-5 pb-8 pt-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="group flex items-center gap-2">
              <div className="flex h-10 items-center justify-center rounded-xl text-lg font-bold transition-transform duration-200 group-hover:rotate-6 group-hover:scale-120">
                <img
                  src="/Job.png"
                  alt="Where Is My Job?"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-heading text-xl font-bold">
                  Where Is My <span className="text-primary">Job?</span>
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">
              Where Is My Job? helps freshers, graduates, and job seekers
              discover jobs, internships, and their next career opportunity
              without the endless searching.
            </p>

            <div className="mt-6 flex gap-2">
              <a
                href="https://github.com/lisajith"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-primary"
              >
                <FaGithub size={17} />
              </a>

              <a
                href="https://www.linkedin.com/in/ajith-malle/"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-primary"
              >
                <FaLinkedinIn size={17} />
              </a>

              <a
                href="mailto:ajithkumarmalle.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition hover:bg-primary"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-heading font-bold">Explore</h3>

            <div className="mt-5 space-y-3">
              <Link
                href="/jobs"
                className="block text-sm text-white/50 transition hover:text-primary"
              >
                Jobs
              </Link>

              <Link
                href="/companies"
                className="block text-sm text-white/50 transition hover:text-primary"
              >
                Companies
              </Link>

              <Link
                href="/internships"
                className="block text-sm text-white/50 transition hover:text-primary"
              >
                Internships
              </Link>

              <Link
                href="/categories"
                className="block text-sm text-white/50 transition hover:text-primary"
              >
                Categories
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold">Company</h3>

            <div className="mt-5 space-y-3">
              <Link
                href="/about"
                className="block text-sm text-white/50 transition hover:text-primary"
              >
                About us
              </Link>

              <Link
                href="/contact"
                className="block text-sm text-white/50 transition hover:text-primary"
              >
                Contact
              </Link>

              <Link
                href="/privacy"
                className="block text-sm text-white/50 transition hover:text-primary"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="block text-sm text-white/50 transition hover:text-primary"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* For employers */}
          <div>
            <h3 className="font-heading font-bold">For employers</h3>

            <div className="mt-5 space-y-3">
              <Link
                href="/admin"
                className="flex items-center gap-1 text-sm text-white/50 transition hover:text-primary"
              >
                Post a job
                <ArrowUpRight size={14} />
              </Link>

              <p className="text-sm leading-6 text-white/40">
                Looking for fresh talent?
                <br />
                Let's connect.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Where Is My Job? All rights reserved.</p>

          <p>
            Created & developed by{" "}
            <span className="font-semibold text-white">Ajith Kumar Malle</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
