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

  locations: string[];

  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  workMode: string | null;
  experience: string;

  salaryMin: number | null;
  salaryMax: number | null;
  salaryPeriod: "year" | "month" | null;
  salaryDisclosed: boolean;

  postedAt: string;
  deadline: string | null;

  description: string;

  education: string[];
  graduationYears: number[];
  eligibility: string[];

  skills: string[];

  applicationUrl: string;
  applicationSource: string | null;

  isVerified: boolean;
  verifiedAt: string | null;
};
