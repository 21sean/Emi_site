// ─────────────────────────────────────────────
// Emi Kobayashi – Profile Data
// Edit this file to update ALL site content.
// ─────────────────────────────────────────────

export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ProjectArtifact {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  org?: string;
  dates: string;
  summary: string;
  bullets: string[];
  skills: string[];
  tags: string[];
  artifacts: ProjectArtifact[];
  highlights?: string[];
  featured: boolean;
}

export interface Experience {
  title: string;
  company: string;
  type?: string;
  dates: string;
  location: string;
  bullets: string[];
  skills: string[];
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  skills: string[];
}

export interface Profile {
  name: string;
  headline: string;
  summary: string;
  location: string;
  specialties: string[];
  socialLinks: SocialLink[];
  contactEmail: string;
  resumeUrl: string;
  skills: Skill[];
  certifications: Certification[];
  experience: Experience[];
  languages: Language[];
  projects: Project[];
  about: {
    bio: string[];
    focusAreas: string[];
    values: string[];
    interests: string[];
  };
}

const profile: Profile = {
  name: "Emi Kobayashi",
  headline:
    "MBA candidate at UC San Diego | Global SaaS Marketing at Dassault Systèmes (BIOVIA) | Life Sciences & Scientific Software",
  summary:
    "Currently pursuing an MBA at the University of California, San Diego with a focus on STEM and recognized as a UCSD Rady Scholar Fellowship recipient. At Dassault Systèmes, contributing to global SaaS marketing efforts for their BIOVIA brand by developing and executing international campaigns, conducting cross-market analyses, and optimizing strategies to enhance engagement and ROI.",
  location: "San Diego, CA",
  specialties: [
    "SaaS Marketing Strategy",
    "Life Sciences & Biotech",
    "AI & Advanced Manufacturing",
  ],
  socialLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/emi-kobayashi/", icon: "linkedin" },
    { label: "Email", url: "#", icon: "email" },
  ],
  contactEmail: "", // placeholder – add real email when ready
  resumeUrl: "/resume.pdf", // points to static PDF placed in public/resume.pdf

  // ── Skills ──────────────────────────────────
  skills: [
    {
      category: "Strategy & Consulting",
      items: [
        "Business Strategy",
        "Industrial Policy Analysis",
        "Strategic Financial Analysis",
        "Mergers & Acquisitions (M&A)",
        "Financial Analysis",
        "Financial Forecasting",
        "Financial Modeling",
        "Financial Statement Analysis",
        "Corporate Finance",
        "Agile Project Management",
        "Agile Methodologies",
      ],
    },
    {
      category: "AI & Life Sciences",
      items: [
        "Artificial Intelligence (AI)",
        "AI and Advanced Manufacturing",
        "Biotech & Pharma Strategy",
        "Life Sciences",
        "Materials Science",
        "Scientific Informatics",
        "Research",
        "Data Analysis",
      ],
    },
    {
      category: "Marketing & Growth",
      items: [
        "Digital Marketing Strategy",
        "Market Research & Competitive Analysis",
        "Content Development",
        "Content Creation",
        "Quality & Regulatory Marketing",
        "Event Planning & Logistics Management",
        "App Building",
      ],
    },
    {
      category: "Tools & Technologies",
      items: [
        "Jira",
        "Microsoft Excel",
        "Tableau",
        "R Studio",
        "MATLAB",
        "JavaScript",
        "ESG",
      ],
    },
    {
      category: "Collaboration",
      items: [
        "Cross-functional Collaboration",
        "Cross-Functional Project Coordination",
        "Cross-Cultural Collaboration",
      ],
    },
  ],

  // ── Certifications ─────────────────────────
  certifications: [
    {
      name: "Google AI Professional Certificate",
      issuer: "Google",
      date: "Feb 2026",
      credentialId: "UETBA9K11NEN",
      skills: ["App Building", "Data Analysis", "Content Creation", "Research", "Artificial Intelligence (AI)"],
    },
    {
      name: "CFI Financial Analysis and Modeling Professional Certificate",
      issuer: "Corporate Finance Institute (CFI)",
      date: "Feb 2026",
      skills: ["Financial Analysis", "Financial Forecasting"],
    },
    {
      name: "CFI Corporate Finance Foundations Professional Certificate",
      issuer: "Corporate Finance Institute (CFI)",
      date: "Feb 2026",
      skills: ["Financial Statement Analysis", "ESG", "Microsoft Excel", "Corporate Finance", "Financial Modeling"],
    },
    {
      name: "Atlassian Agile Project Management Professional Certificate",
      issuer: "Atlassian",
      date: "Jan 2026",
      skills: ["Jira", "Agile Methodologies", "Agile Project Management"],
    },
  ],

  // ── Experience ──────────────────────────────
  experience: [
    {
      title: "Marketing Specialist",
      company: "Dassault Systèmes",
      type: "Internship",
      dates: "Jun 2025 – Present",
      location: "San Diego, CA · Hybrid",
      bullets: [
        "Marketing Intern at BIOVIA, the life sciences brand within Dassault Systèmes, working on a dynamic global software marketing team supporting strategic campaign development and execution.",
      ],
      skills: [
        "Digital Marketing Strategy",
        "Market Research & Competitive Analysis",
        "Biotech & Pharma Strategy",
        "Life Sciences",
        "Materials Science",
        "Scientific Informatics",
        "Quality & Regulatory Marketing",
        "Content Development",
        "Cross-Functional Project Coordination",
        "Event Planning & Logistics Management",
      ],
    },
    {
      title: "Global Marketing/Business Development Manager",
      company: "Moretec Group",
      type: "Permanent",
      dates: "Apr 2020 – Jul 2024",
      location: "Tokyo, Japan",
      bullets: [
        "Directed B2B marketing and business development strategy, leading a cross-functional team that achieved 140% revenue growth over three years by leveraging data-driven insights and financial modeling tailored to business clients.",
        "Streamlined international logistics in collaboration with key stakeholders, reducing major incidents by 90%.",
        "Oversaw operations and managed the Japan department, ensuring efficient management of expenses. Prepared and delivered four comprehensive financial reports annually to the CEO, providing critical data analysis and actionable insights to support executive-level decision-making and long-term strategic planning.",
      ],
      skills: [
        "Operations Management",
        "CRM (顧客管理)",
      ],
    },
    {
      title: "Marketing/Business Development Team Lead",
      company: "Moretec Group",
      dates: "Apr 2019 – Apr 2020",
      location: "Tokyo, Japan",
      bullets: [
        "Spearheaded B2B marketing and business development initiatives, enhancing team performance through training, KPIs, and multichannel acquisition strategies (in-person meetings, digital, and phone outreach).",
        "Exceeded sales targets by 25% through cross-border collaboration and market analysis across Japan, China, the U.S., and Europe; increased revenue by 30% through data-driven growth strategies.",
      ],
      skills: [
        "Marketing",
        "CRM (顧客管理)",
      ],
    },
  ],

  // ── Languages ───────────────────────────────
  languages: [
    { name: "Chinese", proficiency: "Native or bilingual" },
    { name: "English", proficiency: "Full professional" },
    { name: "Japanese", proficiency: "Full professional" },
    { name: "Shanghainese", proficiency: "Native or bilingual" },
  ],

  // ── Projects ────────────────────────────────
  projects: [
    {
      id: "deep-tech-industrial-policy",
      title:
        "From Policy to Practice: How Deep Tech and AI Reshape Sustainable Growth and Industrial Strategy",
      dates: "Jun 2025 – Sep 2025",
      summary:
        "Collaborated with a financial advisory firm, academic faculty, and a cross-functional MBA team to analyze how recent U.S. tech-industrial policies—such as the CHIPS Act, Inflation Reduction Act (IRA), and Stargate Project—are transforming capital flows into Deep Tech, AI, and advanced manufacturing.",
      bullets: [
        "Assessed how CHIPS, IRA, and Stargate influence strategic industry planning and public-private investment alignment.",
        "Evaluated how policy signals trigger vertical integration, recapitalization, and consolidation across AI and Deep Tech sectors.",
        "Identified emerging investment zones and strategic bottlenecks in supply chains and infrastructure.",
        "Examined ripple effects of federal incentives on M&A strategy, private equity trends, and real estate investment patterns.",
      ],
      skills: [
        "Industrial Policy Analysis",
        "Mergers & Acquisitions (M&A)",
        "Strategic Financial Analysis",
        "AI and Advanced Manufacturing",
        "Cross-functional Collaboration",
      ],
      tags: ["Industrial Policy", "Deep Tech", "AI", "M&A", "Strategy"],
      artifacts: [
        { label: "Report (coming soon)", url: "#" },
      ],
      highlights: [
        "U.S. Industrial Policy Analysis",
        "M&A and Private Market Response",
        "Sector Opportunity Mapping",
      ],
      featured: true,
    },
    {
      id: "physical-ai-robotics-intel",
      title: "Physical AI and Robotics Consulting Project",
      org: "UC San Diego – Rady School of Management (Intel)",
      dates: "Mar 2025 – Jun 2025",
      summary:
        "Partnered with a cross-functional MBA team to support Intel in exploring how AI will transform the global robotics industry over the next five years.",
      bullets: [
        "Conducted industry research on AI + robotics convergence: key trends, enabling technologies, and competitive dynamics across industrial and consumer sectors.",
        "Evaluated global growth opportunities and potential market inflection points using stakeholder insights and secondary research.",
        "Used consulting frameworks and strategic modeling to deliver data-driven recommendations to senior leadership.",
        "Strengthened expertise at the intersection of AI, semiconductors, and automation.",
      ],
      skills: [
        "Strategic Analysis",
        "Artificial Intelligence (AI)",
        "Technology Consulting",
        "Market Research",
        "Robotics",
      ],
      tags: ["AI", "Robotics", "Consulting", "Semiconductors", "Strategy"],
      artifacts: [
        { label: "Deck (coming soon)", url: "#" },
      ],
      featured: true,
    },
    {
      id: "san-diego-consulting-competition",
      title: "San Diego Immersion Consulting Competition – 1st Place",
      dates: "Mar 2025 – Apr 2025",
      summary:
        "Collaborated with Israeli startup Bzigo to develop a U.S. market entry strategy for its AI mosquito detection device.",
      bullets: [
        "Combined short-term B2C targeting with a long-term B2B expansion plan.",
        "Conducted market research and modeling; delivered 1st place-winning pitch recognized for innovation and strategic impact.",
      ],
      skills: [
        "Strategic Marketing",
        "Market Research",
        "Go-to-Market Strategy",
        "Business Modeling",
        "Cross-Cultural Collaboration",
      ],
      tags: [
        "Go-to-Market",
        "Consulting",
        "Market Entry",
        "AI",
        "Competition Winner",
      ],
      artifacts: [
        { label: "Pitch deck (coming soon)", url: "#" },
      ],
      highlights: ["1st Place Winner"],
      featured: true,
    },
  ],

  // ── About ───────────────────────────────────
  about: {
    bio: [
      "Currently pursuing an MBA at the University of California, San Diego with a focus on STEM and recognized as a UCSD Rady Scholar Fellowship recipient. At Dassault Systèmes, I contribute to global SaaS marketing efforts for their BIOVIA brand by developing and executing international campaigns, conducting cross-market analyses, and optimizing strategies to enhance engagement and ROI.",
      "Motivated by opportunities to drive innovation in life sciences and scientific software solutions, I collaborate with cross-functional teams to leverage performance analytics, deliver data-driven insights, and support organizational goals. Dedicated to advancing expertise in SaaS marketing strategy, market research, and campaign execution while completing an MBA program.",
    ],
    focusAreas: [
      "SaaS Marketing Strategy",
      "Life Sciences & Scientific Software",
      "AI & Advanced Manufacturing",
      "Market Research & Campaign Execution",
    ],
    values: [
      "Rigorous, evidence-based analysis",
      "Bridging policy and practice",
      "Cross-cultural collaboration",
      "Impact-driven work",
    ],
    interests: [
      "AI governance & ethics",
      "Global supply chain resilience",
      "Startup ecosystems",
    ],
  },
};

export default profile;
