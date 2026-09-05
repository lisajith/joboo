import Categories from "@/components/home/Categories";
import Creator from "@/components/home/Creator";
import CTA from "@/components/home/CTA";
import FeaturedCompanies from "@/components/home/FeaturedCompanies";
import Hero from "@/components/home/Hero";
import LatestJobs from "@/components/home/LatestJobs";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#faf9ff]">
      {/* Background aesthetics */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Purple */}
        <div className="absolute -left-40 top-0 h-125 w-125 rounded-full bg-primary/12 blur-[120px]" />

        {/* Blue */}
        <div className="absolute -right-40 top-112.5 h-137.5 w-137.5 rounded-full bg-blue/10 blur-[130px]" />

        {/* Pink */}
        <div className="absolute -left-40 top-275 h-125 w-125 rounded-full bg-pink/10 blur-[120px]" />

        {/* Orange */}
        <div className="absolute -right-40 top-[1650px] h-125 w-125 rounded-full bg-orange/10 blur-[120px]" />

        {/* Very subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Page content */}
      <div className="relative">
        <Hero />
        <LatestJobs />
        <Categories />
        <FeaturedCompanies />
        <WhyUs />
        <Creator />
        <CTA />
      </div>
    </main>
  );
}
