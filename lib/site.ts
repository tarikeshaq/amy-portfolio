// Site-wide facts. Placeholders are tracked in TECH_DEBT.md.
export const site = {
  name: "Amy Zeng",
  title: "Amy Zeng — AI product designer",
  description: "I design AI products that users trust and want to integrate into their workflows.",
  // TODO(TECH_DEBT): real values from Amy.
  email: "amyzeng1006@gmail.com",
  linkedin: "https://www.linkedin.com/in/amyazeng/",
  resume: "/resume.pdf",
} as const;

export const caseStudies = [
  {
    slug: "compute-costs",
    title: "Cutting compute costs by 30% by redesigning AI responses around common tasks",
    tag: "AI product design",
  },
  {
    slug: "thought-partner",
    title: "Turning an AI black box into a thought partner: drop-off from 70% to 20%",
    tag: "AI product design",
  },
] as const;

export type CaseStudySlug = (typeof caseStudies)[number]["slug"];
