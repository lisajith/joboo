import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Heart,
  Search,
  Target,
  UserRound,
  Users,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import PersonStructuredData from "@/components/seo/PersonStructuredData";

export const metadata: Metadata = {
  title: "About Ajith Kumar Malle | Creator of Where Is My Job?",

  description:
    "Meet Ajith Kumar Malle, the developer and creator of Where Is My Job?, a job discovery platform helping freshers, graduates, and early-career professionals find jobs and internships.",

  keywords: [
    "Ajith Kumar Malle",
    "Ajith Malle",
    "Ajith Kumar",
    "Ajith Malle developer",
    "Ajith Kumar Malle developer",
    "Where Is My Job",
    "Where Is My Job creator",
    "job portal developer",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "profile",
    title: "About Ajith Kumar Malle | Creator of Where Is My Job?",
    description:
      "Meet Ajith Kumar Malle, the developer and creator behind Where Is My Job?.",
    url: "/about",
    siteName: "Where Is My Job?",
  },

  twitter: {
    card: "summary_large_image",
    title: "About Ajith Kumar Malle | Creator of Where Is My Job?",
    description:
      "Meet Ajith Kumar Malle, the developer and creator behind Where Is My Job?.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <PersonStructuredData />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="px-5 pb-16 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              About Where Is My Job?
            </p>

            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Finding a job shouldn't feel like a full-time job.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Where Is My Job? is a job discovery platform created to make
              finding opportunities simpler for freshers, graduates, and
              early-career professionals.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              We bring useful job opportunities together in one place so job
              seekers can spend less time searching and more time discovering
              roles that match their skills and goals.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Explore Jobs
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-6 py-3.5 text-sm font-bold text-foreground transition hover:border-primary/30 hover:text-primary"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          MISSION
      ========================================================= */}
      <section className="bg-surface-soft px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Target size={22} />
            </div>

            <h2 className="mt-6 font-heading text-2xl font-bold">
              Our mission
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              We want to make job discovery less overwhelming. Instead of
              jumping between countless websites and searching through scattered
              listings, job seekers should have a simple place to discover
              relevant opportunities.
            </p>
          </div>

          {/* Built for job seekers */}
          <div className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Heart size={22} />
            </div>

            <h2 className="mt-6 font-heading text-2xl font-bold">
              Built for job seekers
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Whether you're looking for your first internship, your first
              full-time role, or your next opportunity, we're building the
              platform around a straightforward experience: discover, save, and
              apply.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CREATOR
      ========================================================= */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Creator visual */}
            <div className="relative overflow-hidden rounded-4xl bg-foreground p-8 text-white shadow-sm sm:p-10">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative">
                <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl bg-primary text-white shadow-lg">
                  <Image
                    src="/images/dp1.jpg"
                    alt="Ajith Kumar Malle"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <p className="mt-8 text-sm font-bold uppercase tracking-widest text-primary">
                  Created & developed by
                </p>

                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  Ajith Kumar Malle
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  Developer • Builder • Problem Solver
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://ajithmalleportfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-primary"
                  >
                    <UserRound size={16} />
                    Ajith Malle
                    <ArrowUpRight size={14} />
                  </a>

                  <a
                    href="https://github.com/lisajith"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-primary"
                  >
                    <FaGithub size={17} />
                    GitHub
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ajith-malle/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-primary"
                  >
                    <FaLinkedinIn size={17} />
                    LinkedIn
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Creator story */}
            <div className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-10">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Meet the creator
              </p>

              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                The story behind Where Is My Job?
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-7 text-muted sm:text-base">
                <p>
                  <strong className="font-bold text-foreground">
                    Ajith Kumar Malle
                  </strong>{" "}
                  is a Computer Science graduate and web developer who created
                  <strong className="font-bold text-foreground">
                    {" "}
                    Where Is My Job?
                  </strong>{" "}
                  with a simple goal: make it easier for freshers and
                  early-career professionals to discover useful job
                  opportunities.
                </p>

                <p>
                  As a developer, Ajith enjoys building practical web
                  applications that solve real-world problems. Where Is My Job?
                  is one of those projects — designed not just as a website, but
                  as a platform that can genuinely help people looking for their
                  next opportunity.
                </p>

                <p>
                  The platform focuses on making job discovery straightforward:
                  search for opportunities, explore companies and categories,
                  review job details, save interesting roles, and continue to
                  the official application process.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-surface-soft p-4">
                  <Code2 size={20} className="text-primary" />

                  <p className="mt-3 text-sm font-bold text-foreground">
                    Web Developer
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted">
                    Building modern, practical web applications.
                  </p>
                </div>

                <div className="rounded-2xl bg-surface-soft p-4">
                  <BriefcaseBusiness size={20} className="text-primary" />

                  <p className="mt-3 text-sm font-bold text-foreground">
                    Product Builder
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted">
                    Turning useful ideas into real products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT WE DO
      ========================================================= */}
      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              What we do
            </p>

            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              A simpler way to discover opportunities.
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted">
              We're building useful features around the parts of job searching
              that matter most.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-border bg-white p-6">
              <Search size={22} className="text-primary" />

              <h3 className="mt-5 font-heading text-lg font-bold">Discover</h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Browse opportunities by job type, category, company, and
                location.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <BriefcaseBusiness size={22} className="text-primary" />

              <h3 className="mt-5 font-heading text-lg font-bold">Explore</h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                View detailed information about roles, requirements, skills, and
                application details.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <Heart size={22} className="text-primary" />

              <h3 className="mt-5 font-heading text-lg font-bold">Save</h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Save interesting jobs to your account and return to them
                whenever you're ready.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <Users size={22} className="text-primary" />

              <h3 className="mt-5 font-heading text-lg font-bold">Connect</h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Discover opportunities from companies and follow links to their
                official application processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PRINCIPLES
      ========================================================= */}
      <section className="bg-foreground px-5 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              What matters to us
            </p>

            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Simple. Useful. Job-seeker first.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "Keep job discovery simple.",
              "Make useful information easy to find.",
              "Build features that genuinely help job seekers.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <CheckCircle2 size={21} className="text-primary" />

                <p className="mt-4 text-sm font-semibold leading-6 text-white/80">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CREATOR SEO TEXT
      ========================================================= */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              About Ajith Kumar Malle
            </p>

            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              The person behind Where Is My Job?
            </h2>

            <div className="mt-5 max-w-4xl space-y-4 text-sm leading-7 text-muted">
              <p>
                <strong className="font-bold text-foreground">
                  Ajith Kumar Malle
                </strong>{" "}
                is a Computer Science graduate and developer interested in
                creating modern web applications and practical digital products.
                He is the creator and developer of{" "}
                <strong className="font-bold text-foreground">
                  Where Is My Job?
                </strong>
                .
              </p>

              <p>
                Through Where Is My Job?, Ajith Kumar Malle is building a
                platform focused on helping freshers, graduates, and
                early-career professionals discover internships and job
                opportunities in a simpler way.
              </p>

              <p>
                The project combines web development, product thinking, and a
                focus on user experience to create a useful destination for
                people searching for their next career opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="px-5 pb-16 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-4xl bg-primary px-6 py-10 text-white sm:px-10">
          <h2 className="font-heading text-3xl font-bold tracking-tight">
            Ready to find your next opportunity?
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
            Explore the latest opportunities and find something that matches
            your skills and goals.
          </p>

          <Link
            href="/jobs"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-white/90"
          >
            Find a Job
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
