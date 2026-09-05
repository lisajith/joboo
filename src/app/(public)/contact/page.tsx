import Link from "next/link";
import {
  ArrowRight,
  Bug,
  BriefcaseBusiness,
  Lightbulb,
  Mail,
  MessageCircle,
} from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact the Where Is My Job? team for questions, job corrections, suggestions, and business enquiries.",
};

const contactOptions = [
  {
    icon: Bug,
    title: "Report a job issue",
    description:
      "Found an expired, incorrect, or misleading job listing? Let us know so we can review it.",
  },
  {
    icon: Lightbulb,
    title: "Share feedback",
    description:
      "Have an idea that could make job searching better? We'd love to hear it.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Employer enquiries",
    description:
      "Interested in reaching freshers and job seekers through our platform?",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="px-5 pb-14 pt-14 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Contact us
            </p>

            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Have something to tell us?
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Whether you found an issue, have a suggestion, or want to work
              with us, we're happy to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="bg-surface-soft px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3">
            {contactOptions.map((option) => {
              const Icon = option.icon;

              return (
                <div
                  key={option.title}
                  className="rounded-4xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>

                  <h2 className="mt-6 font-heading text-xl font-bold">
                    {option.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {option.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main contact section */}
      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_320px]">
          {/* Message */}
          <div className="rounded-4xl border border-border bg-white p-7 shadow-sm sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MessageCircle size={22} />
            </div>

            <h2 className="mt-6 font-heading text-2xl font-bold">
              Send us a message
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              For now, the quickest way to reach us is through email. When
              contacting us about a job, please include the job title and
              company name whenever possible.
            </p>

            <a
              href="mailto:ajithkumarmalle@gmail.com"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
            >
              Email us
              <ArrowRight size={17} />
            </a>
          </div>

          {/* Email card */}
          <div className="h-fit rounded-4xl border border-border bg-foreground p-7 text-white shadow-sm sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <Mail size={22} />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-primary">
              General enquiries
            </p>

            <h2 className="mt-2 font-heading text-2xl font-bold">
              Let's connect.
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/50">
              Questions, feedback, partnerships, or anything else?
            </p>

            <a
              href="mailto:ajithkumarmalle@gmail.com"
              className="mt-6 block break-all text-sm font-bold text-white transition hover:text-primary"
            >
              ajithkumarmalle@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Helpful links */}
      <section className="bg-surface-soft px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-4xl border border-border bg-white p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Before you contact us
            </p>

            <h2 className="mt-3 font-heading text-2xl font-bold">
              Looking for something specific?
            </h2>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Link
                href="/jobs"
                className="group flex items-center justify-between rounded-2xl bg-surface-soft p-4 transition hover:bg-primary/10"
              >
                <span className="text-sm font-bold">Browse Jobs</span>

                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/companies"
                className="group flex items-center justify-between rounded-2xl bg-surface-soft p-4 transition hover:bg-primary/10"
              >
                <span className="text-sm font-bold">Explore Companies</span>

                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/categories"
                className="group flex items-center justify-between rounded-2xl bg-surface-soft p-4 transition hover:bg-primary/10"
              >
                <span className="text-sm font-bold">Browse Categories</span>

                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
