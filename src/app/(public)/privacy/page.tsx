import Link from "next/link";
import {
  ArrowRight,
  Database,
  ExternalLink,
  FileText,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Where Is My Job?",
  description:
    "Read the Privacy Policy for Where Is My Job? and learn how we collect, use, store, and protect information when you use our job discovery platform.",
  keywords: [
    "Where Is My Job privacy policy",
    "job portal privacy policy",
    "Ajith Kumar Malle privacy policy",
  ],
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Privacy Policy
            </p>

            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your privacy matters to us.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              This Privacy Policy explains how Where Is My Job? collects, uses,
              stores, and protects information when you use our website and
              services.
            </p>

            <p className="mt-5 text-sm text-muted">
              Last updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK OVERVIEW
      ========================================================= */}
      <section className="bg-surface-soft px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-border bg-white p-6">
              <ShieldCheck size={22} className="text-primary" />

              <h2 className="mt-5 font-heading text-lg font-bold">
                Transparency
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                We explain what information we collect and why we need it.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <Lock size={22} className="text-primary" />

              <h2 className="mt-5 font-heading text-lg font-bold">
                Protection
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                We take reasonable measures to protect information associated
                with your account.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <Database size={22} className="text-primary" />

              <h2 className="mt-5 font-heading text-lg font-bold">
                Limited collection
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                We aim to collect information that is relevant to operating and
                improving the platform.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-white p-6">
              <UserRound size={22} className="text-primary" />

              <h2 className="mt-5 font-heading text-lg font-bold">
                Your choices
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                You can contact us about your information and account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          POLICY CONTENT
      ========================================================= */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* 1 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText size={20} />
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold">
                  1. About this Privacy Policy
                </h2>

                <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                  <p>
                    This Privacy Policy applies to the Where Is My Job? website
                    and related services. Where Is My Job? is a job discovery
                    platform designed to help freshers, graduates, and other job
                    seekers discover employment and internship opportunities.
                  </p>

                  <p>
                    By using the website, you acknowledge that you have read and
                    understood this Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              2. Information we collect
            </h2>

            <div className="mt-5 space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Account information
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted">
                  When you create an account, we may collect information such as
                  your email address and information you choose to provide in
                  your profile.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Saved jobs
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted">
                  If you use the Save Job feature, we store information about
                  the jobs you choose to save so that those jobs can appear in
                  your account.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Technical information
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted">
                  Like most websites, certain technical information may be
                  processed automatically when you visit the platform. This can
                  include information such as browser type, device information,
                  IP address, approximate location derived from technical data,
                  pages visited, and information about how the website is
                  accessed.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Information you provide
                </h3>

                <p className="mt-2 text-sm leading-7 text-muted">
                  If you contact us, report a job issue, provide feedback, or
                  communicate with us in another way, we may receive the
                  information you choose to provide.
                </p>
              </div>
            </div>
          </section>

          {/* 3 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              3. How we use information
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Information may be used to:
            </p>

            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Provide and operate your account.</span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Store and display jobs you have saved.</span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Improve the website and user experience.</span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Respond to questions, feedback, and enquiries.</span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Maintain website security and prevent misuse.</span>
              </li>

              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  Understand website usage and improve our services where
                  appropriate.
                </span>
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              4. Authentication and data storage
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Where Is My Job? uses third-party infrastructure and services to
              operate authentication, databases, and other parts of the
              platform. These providers process information on our behalf as
              necessary to provide their services.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              We take reasonable steps to protect account and platform data.
              However, no internet-based service can guarantee absolute
              security.
            </p>
          </section>

          {/* 5 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              5. Cookies and similar technologies
            </h2>

            <p>
              Where Is My Job? uses cookies, local storage, and similar
              technologies to keep the website functioning properly, maintain
              user sessions, remember preferences, and improve the user
              experience.
            </p>

            <p>
              If advertising is enabled on the website, third-party advertising
              providers, including Google, may use cookies or similar
              technologies to serve advertisements based on a user's visits to
              this website and other websites.
            </p>

            <p>
              Google may use advertising cookies to personalize advertisements
              where permitted by applicable law and user consent preferences.
              Users may learn more about how Google uses advertising cookies and
              manage their advertising preferences through Google's advertising
              settings.
            </p>

            <p>
              Users may also control or disable cookies through their browser
              settings. Disabling certain cookies may affect some functionality
              of the website.
            </p>
          </section>

          {/* 6 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              6. Job listings and external websites
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Where Is My Job? may provide links to company websites,
              application portals, recruitment platforms, or other third-party
              websites.
            </p>

            <div className="mt-5 flex gap-3 rounded-2xl bg-surface-soft p-4">
              <ExternalLink
                size={19}
                className="mt-0.5 shrink-0 text-primary"
              />

              <p className="text-sm leading-6 text-muted">
                Once you leave Where Is My Job? and visit a third-party website,
                that website's own privacy policy and terms apply. We are not
                responsible for the privacy practices of external websites.
              </p>
            </div>
          </section>

          {/* 7 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              7. Advertising and sponsored content
            </h2>

            <p>
              Where Is My Job? may display advertisements and sponsored content
              to support the operation and development of the website.
            </p>

            <p>
              Third-party advertising providers, including Google, may use
              cookies, web beacons, pixels, IP addresses, or similar
              technologies to collect information about users' interactions with
              advertisements and websites. This information may be used to
              provide, measure, and personalize advertising in accordance with
              applicable laws and user consent choices.
            </p>

            <p>
              Google may use the information collected through advertising
              technologies to serve advertisements on this website. Users can
              learn more about Google's advertising practices and manage
              available advertising preferences through Google's advertising
              settings.
            </p>

            <p>
              Where required by applicable law, appropriate consent mechanisms
              may be provided to users before certain types of personalized
              advertising or advertising-related cookies are used.
            </p>

            <p>
              Where Is My Job? may also offer sponsored job listings or other
              paid promotional placements. Sponsored content will be identified
              appropriately so that users can distinguish promotional content
              from ordinary job listings.
            </p>
          </section>

          {/* 8 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              8. How long we keep information
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              We retain information for as long as reasonably necessary to
              provide our services, maintain legitimate business and security
              records, resolve disputes, comply with applicable obligations, and
              enforce our agreements.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              When information is no longer required, we may delete or anonymize
              it in accordance with our operational practices.
            </p>
          </section>

          {/* 9 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              9. Your choices and rights
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Depending on where you live and applicable law, you may have
              rights relating to your personal information, including rights to
              access, correct, delete, restrict, or object to certain
              processing.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              If you would like to ask about information associated with your
              account or request assistance with your data, contact us using the
              details below.
            </p>
          </section>

          {/* 10 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              10. Children's privacy
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Where Is My Job? is intended for people who are legally able to
              use online services and search for employment or internship
              opportunities. We do not knowingly seek to collect personal
              information from children where such collection is prohibited by
              applicable law.
            </p>
          </section>

          {/* 11 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">
              11. Changes to this Privacy Policy
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              We may update this Privacy Policy when our services, technology,
              business practices, or legal requirements change.
            </p>

            <p className="mt-4 text-sm leading-7 text-muted">
              When changes are made, the updated version will be published on
              this page with a revised "Last updated" date.
            </p>
          </section>

          {/* 12 */}
          <section className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <h2 className="font-heading text-2xl font-bold">12. Contact us</h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              If you have questions about this Privacy Policy or how your
              information is handled, you can contact us.
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
          FOOTER CTA
      ========================================================= */}
      <section className="bg-surface-soft px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-4xl border border-border bg-white p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Need more information?
            </p>

            <h2 className="mt-3 font-heading text-2xl font-bold">
              We're happy to help.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              If you have a privacy question or need help with your account, get
              in touch with us.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-dark"
              >
                Contact Us
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/terms"
                className="inline-flex items-center gap-2 rounded-2xl border border-border px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
