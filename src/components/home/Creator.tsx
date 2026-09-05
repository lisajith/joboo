import Image from "next/image";
import { ArrowUpRight, Code2, Heart, Sparkles, UserRound } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Creator() {
  return (
   <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-20">
      <div className="relative mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white p-8 shadow-sm md:p-12">
          {/* Decorative shapes */}
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10" />
          <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-blue/10" />

          <div className="relative z-10 flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            {/* Avatar */}
            <div className="h-28 w-28 shrink-0 rotate-3 overflow-hidden rounded-4xl bg-foreground shadow-xl transition duration-300 hover:rotate-0">
              <Image
                src="/images/dp1.jpg"
                alt="Ajith Kumar Malle"
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
                <Sparkles size={13} />
                Built with purpose
              </div>

              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight md:text-4xl">
                Meet the creator of Where Is My Job?
              </h2>

              <h3 className="mt-2 font-heading text-xl font-bold text-primary">
                Ajith Kumar Malle
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted md:text-base">
                Where Is My Job? was created by{" "}
                <strong className="text-foreground">Ajith Kumar Malle</strong>,
                a Computer Science graduate and full-stack web developer
                passionate about building practical digital products. Also known
                as Ajith Malle, he created this platform to make discovering
                jobs and internships easier for freshers, graduates, and
                early-career professionals.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted md:text-base">
                As the creator of Where Is My Job?, Ajith Malle focuses on
                building a simple and useful job discovery experience where
                candidates can explore job openings, company opportunities,
                internships, skills, and career information in one place.
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="flex items-center gap-1.5 rounded-full bg-surface-soft px-3 py-1.5 text-xs font-semibold text-muted">
                  <Code2 size={13} />
                  Full Stack Developer
                </span>

                <span className="flex items-center gap-1.5 rounded-full bg-surface-soft px-3 py-1.5 text-xs font-semibold text-muted">
                  <Heart size={13} />
                  Building useful things
                </span>
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href="https://ajithmalleportfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <UserRound size={16} />
                  Ajith Malle
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://github.com/lisajith"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary"
                >
                  <FaGithub size={16} />
                  GitHub
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://www.linkedin.com/in/ajith-malle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <FaLinkedinIn size={16} />
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
