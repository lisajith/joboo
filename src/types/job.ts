export type Job = {
  id: string;
  slug: string;
  title: string;

  company: {
    name: string;
    slug: string;
    logoUrl: string | null;
  };

  category: {
    name: string;
    slug: string;
  };

  location: string;

  type: "Full-time" | "Part-time" | "Internship" | "Contract";

  experience: string;

  salaryMin: number | null;
  salaryMax: number | null;
  salaryPeriod: "year" | "month" | null;

  postedAt: string;
  deadline: string | null;

  description: string;
  eligibility: string[];

  skills: string[];

  applicationUrl: string;
};
