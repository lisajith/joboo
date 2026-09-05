import { ArrowUpRight, Check, Search, Sparkles, Target } from "lucide-react";

const benefits = [
  "Fresh opportunities for freshers",
  "Simple and powerful job search",
  "Direct application links",
  "No confusing application process",
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-20">
      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-7 py-12 text-white md:px-12 md:py-16 lg:px-16">
          {/* Decorative shapes */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary opacity-80 blur-[1px]" />

          <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-blue opacity-70" />

          <div className="absolute right-1/4 top-1/2 h-20 w-20 rotate-12 rounded-3xl bg-orange opacity-90" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                <Sparkles size={15} className="text-primary" />
                Why use Where Is My Job?
              </div>

              <h2 className="mt-6 max-w-2xl font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Job hunting shouldn't
                <span className="text-primary"> feel like hunting.</span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/65 md:text-lg">
                Where Is My Job? brings useful job opportunities, internships,
                companies, and career information together in one simple place,
                so you can spend less time searching and more time applying.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium backdrop-blur-sm"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                      <Check size={12} />
                    </span>

                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Right visual */}
            <div className="relative mx-auto w-full max-w-md">
              {/* Main card */}
              <div className="relative rounded-4xl bg-white p-6 text-foreground shadow-2xl rotate-2 transition duration-500 hover:rotate-0">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                    <Search size={23} />
                  </div>

                  <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-bold text-muted">
                    Your next move
                  </span>
                </div>

                <h3 className="mt-8 font-heading text-2xl font-bold">
                  Find something worth applying for.
                </h3>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-surface-soft p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue text-white">
                      <Target size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold">Fresher Friendly</p>

                      <p className="text-xs text-muted">
                        Opportunities that match you
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-surface-soft p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange text-white">
                      <ArrowUpRight size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-bold">Apply Directly</p>

                      <p className="text-xs text-muted">
                        Go straight to the application
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-bold text-white transition hover:bg-primary"
                >
                  Start exploring
                  <ArrowUpRight size={17} />
                </button>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-xl -rotate-3">
                🚀 Let's find your job
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
