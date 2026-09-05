import { siteConfig } from "@/lib/site";

type PersonData = {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url: string;
  jobTitle: string;
  description: string;
  sameAs: string[];
};

export default function PersonStructuredData() {
  const person: PersonData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.creator.name,
    url: `${siteConfig.url}/about`,
    jobTitle: "Web Developer",
    description:
      "Ajith Kumar Malle is a Computer Science graduate and web developer who created Where Is My Job?, a job discovery platform for freshers and job seekers.",
    sameAs: [siteConfig.creator.url, siteConfig.creator.github],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person),
      }}
    />
  );
}
