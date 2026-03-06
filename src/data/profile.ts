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
  logo?: string;
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
  location: "🌴 San Diego, CA",
  specialties: [
    "Global B2B Marketing",
    "Strategy",
    "Semiconductor Industry",
    "Pharmaceutical & Biotech Industry",
    "SaaS",
    "AI & Advanced Manufacturing",
  ],
  socialLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/emi-kobayashi/", icon: "linkedin" },
    { label: "Email", url: "mailto:e2kobayashi@ucsd.edu", icon: "email" },
  ],
  contactEmail: "e2kobayashi@ucsd.edu",
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
      title: "MBA Marketing Intern",
      company: "Dassault Systèmes",
      type: "Internship",
      dates: "Jun 2025 – Present",
      location: "San Diego, CA · Hybrid",
      logo: "/logos/dassault.jpeg",
      bullets: [
        "Collaborated with a global marketing team at BIOVIA (life sciences brand of Dassault Systèmes) to support SaaS campaign strategy and execution across international markets.",
        "Conducted cross-market and competitor analysis to inform data-driven go-to-market strategy and annual marketing planning.",
        "Executed global campaigns and events, leveraging performance analytics to optimize lead generation, engagement, and ROI.",
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
      title: "Global Marketing & Business Strategy Manager (Semiconductor)",
      company: "Moretec Group",
      type: "Permanent",
      dates: "May 2022 – Jul 2024",
      location: "Tokyo, Japan",
      logo: "/logos/moretec.jpeg",
      bullets: [
        "Led global B2B marketing and go-to-market strategy across North America, Europe, and Asia, driving 140% revenue growth over three years through integrated demand generation and positioning initiatives.",
        "Owned multichannel campaigns (exhibitions, SEO, digital, direct outreach) and optimized funnel performance using KPI tracking and ROI analysis.",
        "Managed international revenue planning and marketing budget; delivered data-driven performance insights and strategic recommendations directly to the CEO.",
      ],
      skills: [
        "Business Strategy",
      ],
    },
    {
      title: "Global Marketing & Business Strategy Associate (Semiconductor)",
      company: "Moretec Group",
      dates: "Apr 2019 – Apr 2022",
      location: "Tokyo, Japan",
      logo: "/logos/moretec.jpeg",
      bullets: [
        "Executed global B2B marketing campaigns across Japan, China, the U.S., and Europe, increasing revenue by 30% through data-driven customer acquisition strategies.",
        "Exceeded sales targets by 25% by optimizing channel mix and improving lead qualification across trade shows, digital, and outbound efforts.",
        "Tracked marketing KPIs and supported cross-functional GTM execution to strengthen global expansion efforts.",
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
      id: "google-wiz-ma",
      title: "Google × Wiz – M&A Strategic & Valuation Analysis",
      dates: "Sep 2025 – Dec 2025",
      summary:
        "Co-analyzed Google's $32B acquisition of Wiz, evaluating M&A deal structure, strategic multicloud security positioning, valuation multiples, and competitive implications within the evolving cloud security (CNAPP/CSPM) market.",
      bullets: [
        "Evaluated M&A deal structure and strategic rationale behind Google's $32B acquisition of Wiz.",
        "Analyzed valuation multiples and competitive positioning within the CNAPP/CSPM cloud security market.",
        "Assessed multicloud security strategy implications and competitive dynamics for Google Cloud.",
      ],
      skills: [
        "Mergers & Acquisitions (M&A)",
        "Strategic Financial Analysis",
        "Business Strategy",
        "Market Research",
      ],
      tags: ["M&A", "Strategy", "Cloud Security", "Valuation"],
      artifacts: [
        { label: "View Project", url: "/google-wiz-ma.pdf" },
      ],
      featured: true,
    },
    {
      id: "blockchain-bitcoin-analysis",
      title: "Blockchain & Bitcoin – AI Technology Industry Analysis (S-Curve & TOE Framework)",
      dates: "Sep 2025 – Dec 2025",
      summary:
        "Co-developed an AI-focused industry analysis of blockchain and Bitcoin using S-curve theory and the TOE framework, evaluating technological disruption, organizational transformation, regulatory constraints, and long-term digital infrastructure implications.",
      bullets: [
        "Applied S-curve theory to analyze blockchain's technological lifecycle and potential disruption trajectories.",
        "Used the TOE framework to evaluate technological, organizational, and environmental factors driving adoption.",
        "Assessed regulatory constraints and long-term digital infrastructure implications for blockchain and Bitcoin.",
      ],
      skills: [
        "Strategic Analysis",
        "Artificial Intelligence (AI)",
        "Market Research",
        "Business Strategy",
      ],
      tags: ["Blockchain", "AI", "Strategy", "Industry Analysis"],
      artifacts: [
        { label: "View Project", url: "/blockchain-bitcoin-analysis.pdf" },
      ],
      featured: true,
    },
    {
      id: "deep-tech-industrial-policy",
      title:
        "How Deep Tech and AI Reshape Sustainable Growth and Industrial Strategy",
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
        { label: "View Project", url: "/deep-tech-ai-capital-flow.pdf" },
      ],
      featured: true,
    },
    {
      id: "physical-ai-robotics-intel",
      title: "Physical AI and Robotics Consulting Project",
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
        { label: "View Project", url: "/intel-physical-ai.pdf" },
      ],
      featured: true,
    },
    {
      id: "levels-biosensor",
      title: "Levels Biosensor – Product Adoption & Go-to-Market Strategy Analysis",
      dates: "Mar 2025 – Jun 2025",
      summary:
        "Co-developed an ACCORD-based adoption strategy for Levels, a continuous glucose monitoring platform, proposing UX simplification, trial-based entry options, and targeted innovator/early-adopter marketing to reduce behavioral barriers and accelerate adoption in the digital health market.",
      bullets: [
        "Developed an ACCORD-based adoption strategy to reduce behavioral barriers for a continuous glucose monitoring platform.",
        "Proposed UX simplification and trial-based entry options to accelerate user adoption.",
        "Designed targeted marketing strategies for innovator and early-adopter segments in the digital health market.",
      ],
      skills: [
        "Go-to-Market Strategy",
        "Market Research",
        "Business Strategy",
        "Digital Marketing Strategy",
      ],
      tags: ["Go-to-Market", "Digital Health", "Strategy", "Product Adoption"],
      artifacts: [
        { label: "View Project", url: "/levels-biosensor.pdf" },
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
        { label: "View Project", url: "/bzigo-canopy-project.pdf" },
      ],
      highlights: ["1st Place Winner"],
      featured: true,
    },
    {
      id: "nokia-strategy-analysis",
      title: "Failure at Nokia – Organizational & Strategy Analysis Case Study",
      dates: "Jan 2025 – Mar 2025",
      summary:
        "Co-authored a strategic analysis of Nokia's decline, evaluating leadership misalignment, structural inefficiencies, and software strategy failures during the smartphone transition, and proposed a culture- and ecosystem-driven turnaround strategy grounded in innovation and platform theory.",
      bullets: [
        "Analyzed Nokia's organizational failures including leadership misalignment and structural inefficiencies during the smartphone era.",
        "Evaluated software strategy missteps and competitive dynamics that contributed to Nokia's market decline.",
        "Proposed a turnaround strategy grounded in innovation theory, platform ecosystems, and culture transformation.",
      ],
      skills: [
        "Business Strategy",
        "Strategic Analysis",
        "Market Research",
      ],
      tags: ["Strategy", "Case Study", "Organizational Analysis"],
      artifacts: [
        { label: "View Project", url: "/nokia-project.pdf" },
      ],
      featured: true,
    },
    {
      id: "boeing-competitive-strategy",
      title: "Boeing – Competitive Strategy & Value Creation Analysis",
      dates: "Jan 2025 – Mar 2025",
      summary:
        "Co-authored a strategic evaluation of Boeing's value creation model, analyzing its differentiation-driven competitive advantage, global supply chain scale, R&D investment, and diversified commercial and defense revenue streams.",
      bullets: [
        "Evaluated Boeing's competitive advantage through differentiation strategy, R&D investment, and global supply chain scale.",
        "Analyzed diversified revenue streams across commercial aviation and defense segments.",
        "Assessed value creation drivers and strategic positioning within the aerospace industry.",
      ],
      skills: [
        "Business Strategy",
        "Strategic Financial Analysis",
        "Market Research",
      ],
      tags: ["Strategy", "Case Study", "Competitive Analysis"],
      artifacts: [
        { label: "View Project", url: "/boeing-strategy.pdf" },
      ],
      featured: true,
    },
    {
      id: "greensense-smart-plant-care",
      title: "GreenSense – Smart Plant Care Startup Concept",
      dates: "Oct 2024 – Dec 2024",
      summary:
        "Developed a go-to-market and financial strategy for a sensor-enabled smart plant pot featuring app connectivity and subscription-based plant care services, targeting urban Gen Z and Millennial consumers in the growing indoor plant market.",
      bullets: [
        "Designed a go-to-market strategy combining D2C e-commerce with retail partnerships to reach urban plant enthusiasts.",
        "Built a financial model including revenue projections, unit economics, and subscription pricing for plant care services.",
        "Conducted market research on the indoor plant and smart home device sectors to identify target segments and competitive positioning.",
      ],
      skills: [
        "Go-to-Market Strategy",
        "Financial Modeling",
        "Market Research",
        "Business Strategy",
      ],
      tags: ["Go-to-Market", "Startup", "IoT", "Strategy", "Financial Modeling"],
      artifacts: [
        { label: "View Project", url: "/greensense-smartpot.pdf" },
      ],
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
