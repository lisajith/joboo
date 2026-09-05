import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  FileText,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Where Is My Job?",
  description:
    "Read the Terms & Conditions for using Where Is My Job?, including job listings, accounts, saved jobs, external applications, sponsored content, and acceptable use.",
  keywords: [
    "Where Is My Job terms and conditions",
    "Where Is My Job terms of service",
    "job portal terms and conditions",
    "job website terms",
  ],
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Terms & Conditions
            </p>

            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A few things to know before you use the platform.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              These Terms & Conditions explain the rules and responsibilities
              that apply when you use Where Is My Job?.
            </p>

            <p className="mt-5 text-sm text-muted">
              Last updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK SUMMARY
      ========================================================= */}
      <section className="bg-surface-soft px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-border bg-white p-6">
              <BriefcaseBusiness size={22} className="text-primary" />

              <h2 className="mt-5 font-heading text-lg font-bold">
                Discover jobs
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                Use the platform to discover employment and internship
                opportunities.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <ExternalLink size={22} className="text-primary" />

              <h2 className="mt-5 font-heading text-lg font-bold">
                Apply externally
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                Applications may take place on company or third-party websites.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <UserRound size={22} className="text-primary" />

              <h2 className="mt-5 font-heading text-lg font-bold">
                Use responsibly
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                Accounts and platform features must be used honestly and
                responsibly.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <ShieldCheck size={22} className="text-primary" />

              <h2 className="mt-5 font-heading text-lg font-bold">
                Stay informed
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                These terms may be updated as the platform evolves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TERMS CONTENT
      ========================================================= */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* 1 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              1. Acceptance of these Terms
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              <p>
                By accessing or using Where Is My Job?, you agree to these Terms
                & Conditions and our Privacy Policy.
              </p>

              <p>
                If you do not agree with these terms, please do not use the
                website or its services.
              </p>

              <p>
                These terms apply to visitors, registered users, job seekers,
                and anyone else who accesses or uses the platform.
              </p>
            </div>
          </section>

          {/* 2 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              2. About Where Is My Job?
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Where Is My Job? is a job discovery platform created to help
              freshers, graduates, and other job seekers discover employment and
              internship opportunities.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              The platform may provide information about jobs, companies,
              categories, skills, locations, compensation, eligibility
              requirements, deadlines, and application links.
            </p>
          </section>

          {/* 3 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              3. Job listings and information
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
              <p>
                We aim to provide useful and accurate job information. However,
                job listings can change, expire, become unavailable, or contain
                information supplied by third parties.
              </p>

              <p>
                We do not guarantee that every job listing is accurate,
                complete, current, available, or suitable for a particular user.
              </p>

              <p>
                Job titles, salary information, eligibility requirements,
                locations, deadlines, hiring status, and other details may be
                changed by the relevant employer or third party without notice.
              </p>

              <div className="flex gap-3 rounded-2xl bg-amber-50 p-4">
                <AlertTriangle
                  size={19}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <p className="text-sm leading-6 text-amber-900">
                  Always verify important job details on the employer's official
                  application page before submitting an application or providing
                  personal information.
                </p>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              4. External application websites
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Where Is My Job? may provide an "Apply Now" link that takes you to
              an employer's website, recruitment platform, application system,
              or another third-party website.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              We do not control these external websites and are not responsible
              for their content, availability, security, privacy practices,
              application processes, hiring decisions, or terms.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Any information you submit after leaving Where Is My Job? is
              subject to the policies and terms of the website you visit.
            </p>
          </section>

          {/* 5 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              5. User accounts
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Certain features, such as saving jobs, may require you to create
              an account.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              You are responsible for providing accurate information and for
              maintaining the security of your account credentials.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              You should notify us if you believe your account has been accessed
              or used without authorization.
            </p>
          </section>

          {/* 6 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">6. Saved jobs</h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Registered users may save job listings to their account for
              convenience.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Saved jobs are a personal organizational feature and do not
              reserve a position, submit an application, or guarantee that a job
              will remain available.
            </p>
          </section>

          {/* 7 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              7. Acceptable use
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              You agree to use Where Is My Job? only for lawful purposes and in
              a way that does not interfere with the operation or security of
              the platform.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">You must not:</p>

            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  Use the platform for unlawful, fraudulent, abusive, or harmful
                  activities.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  Attempt to gain unauthorized access to accounts, systems, or
                  data.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  Interfere with or disrupt the website or its infrastructure.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  Use automated methods to scrape, copy, overload, or abuse the
                  platform without permission.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  Impersonate another person, organization, or company.
                </span>
              </li>
            </ul>
          </section>

          {/* 8 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              8. Intellectual property
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Unless otherwise stated, the website's original design, branding,
              layout, interface, graphics, text, software, and other original
              content are owned by or licensed to Where Is My Job?.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              You may use the website for its intended personal and
              informational purposes. You may not reproduce, modify,
              redistribute, sell, or commercially exploit our original content
              without appropriate permission.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Company names, logos, trademarks, and other third-party materials
              remain the property of their respective owners.
            </p>
          </section>

          {/* 9 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              9. Sponsored jobs and advertising
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              In the future, Where Is My Job? may display advertisements,
              sponsored job listings, featured opportunities, or other
              promotional content.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Sponsored or promotional content may be identified as such.
              Payment or promotion does not necessarily mean that we endorse or
              guarantee an employer, position, product, or service.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Advertisers and third-party providers may have their own terms and
              privacy policies.
            </p>
          </section>

          {/* 10 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              10. No employment guarantee
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Where Is My Job? does not guarantee employment, interviews,
              application acceptance, salary, hiring decisions, or any other
              employment outcome.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Employers are solely responsible for their hiring decisions and
              employment processes.
            </p>
          </section>

          {/* 11 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              11. Availability of the platform
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              We aim to keep Where Is My Job? available and reliable, but we do
              not guarantee that the website will always be available,
              uninterrupted, error-free, or secure.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              We may modify, suspend, restrict, or discontinue any part of the
              platform when necessary for maintenance, security, development,
              business reasons, or other circumstances.
            </p>
          </section>

          {/* 12 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              12. Limitation of liability
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              To the extent permitted by applicable law, Where Is My Job? and
              its creator, developers, and contributors will not be responsible
              for losses or damages arising from your use of the platform,
              reliance on job information, interactions with employers, or use
              of third-party websites.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              This includes, where legally permitted, losses relating to
              applications, employment decisions, inaccurate listings, expired
              opportunities, third-party websites, or interruptions of service.
            </p>
          </section>

          {/* 13 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              13. Suspension or termination
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              We may suspend or terminate access to an account or part of the
              platform if we reasonably believe that a user has violated these
              Terms & Conditions, abused the service, created a security risk,
              or engaged in unlawful or harmful activity.
            </p>
          </section>

          {/* 14 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              14. Third-party services
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              The platform may rely on third-party services for hosting,
              authentication, databases, analytics, advertising, email,
              payments, or other functionality.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Your use of third-party services may be subject to those
              providers' own terms and policies.
            </p>
          </section>

          {/* 15 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              15. Changes to these Terms
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              We may update these Terms & Conditions as the platform,
              technology, business model, or applicable requirements change.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              Updated terms will be published on this page and the "Last
              updated" date will be changed accordingly.
            </p>
          </section>

          {/* 16 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">16. Contact us</h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              If you have questions about these Terms & Conditions, you can
              contact us.
            </p>

            <a
              href="mailto:ajithkumarmalle@gmail.com"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              <Mail size={17} />
              ajithkumarmalle@gmail.com
            </a>
          </section>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-surface-soft px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-4xl border border-border bg-white p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Ready to explore?
            </p>

            <h2 className="mt-3 font-heading text-2xl font-bold">
              Find your next opportunity.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Explore jobs and internships from companies and follow the
              relevant application process.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Browse Jobs
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
