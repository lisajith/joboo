import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-20">
      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-7 py-16 text-center md:px-12 md:py-20">
          {/* Decorative shapes */}
          <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-white/10" />

          <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-white/10" />

          <div className="absolute right-[15%] top-10 hidden h-8 w-8 rotate-12 rounded-lg bg-orange md:block" />

          <div className="absolute bottom-12 left-[15%] hidden h-7 w-7 rotate-45 rounded-lg bg-pink md:block" />

          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
              <Sparkles size={15} />
              Your next opportunity is out there
            </div>

            {/* Heading */}
            <h2 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              Still asking,
              <br />
              <span className="text-foreground">"Where is my job?"</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/80 md:text-lg">
              Where Is My Job? makes it easier to discover opportunities,
              explore companies, and find your next career move without the
              endless searching.
            </p>

            {/* CTA */}
            <Link
              href="/jobs"
              className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-foreground px-7 py-4 text-sm font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-foreground"
            >
              Explore Jobs
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-foreground group-hover:text-white">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
