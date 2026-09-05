import { siteConfig } from "@/lib/site";

type WebsiteData = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  alternateName: string;
  url: string;
  description: string;
  creator: {
    "@type": "Person";
    name: string;
    url: string;
  };
};

export default function StructuredData() {
  const website: WebsiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: siteConfig.name,
    alternateName: "Where Is My Job",

    url: siteConfig.url,
    description: siteConfig.description,

    creator: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: `${siteConfig.url}/about`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(website),
      }}
    />
  );
}
