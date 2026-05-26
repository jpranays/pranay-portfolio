export const EXPERIENCE = [
  {
    id: 1,
    role: "Senior Software Developer",
    company: "Sears India",
    period: "Mar 2023 — Present",
    type: "Full-time",
    current: true,
    description:
      "Working across the full stack on high-impact internal products — from real-time communication platforms to AI-powered tools and no-code automation systems.",
    highlights: [
      "Owned key frontend modules of a PCI-DSS compliant checkout system on shopyourway.com — a no-login, ref-ID-validated React checkout handling credit card payments across saved and custom cards over 3+ years of continuous ownership.",
      "Hardened checkout security by isolating card-data into a sandboxed iframe with SRI hash injection and strict Content Security Policies (CSP) with report-uri telemetry — reducing client-side attack exposure by ~80%.",
      "Migrated payment processing from a legacy in-house backend to Stripe Elements, offloading card validation and PCI scope to Stripe — increasing payment success rates by ~12% and reducing checkout load time by ~35%.",
      "Architected an in-house React-Table library from scratch — priority-based sorting, multi-column filtering, virtualization, full WCAG accessibility, 90% test coverage with CI/CD and Docusaurus-powered docs, adopted company-wide.",
      "Integrated OpenAI's Streaming API for real-time content delivery with markdown support, error handling, response regeneration, and request abortion.",
      "Led development of a real-time in-house chat platform with Node.js + Socket.IO, replacing a third-party vendor — cutting issue resolution time by 55%, saving $30,000+ annually, and earning the Excellence Award.",
      "Revamped wiki docs with Next.js (SSG + Incremental Builds) for a blazing-fast, searchable documentation experience.",
      "Built a no-code offers management platform enabling vendors to create and schedule ad campaigns via Cron-based automation — adopted by 3+ high-profile vendors.",
    ],
    tech: ["React", "Next.js", "Node.js", "Socket.IO", "OpenAI API", "TypeScript", "Jest", "Stripe"],
  },
  {
    id: 2,
    role: "Web Developer",
    company: "MiniOrange",
    period: "Jul 2022 — Nov 2022",
    type: "Full-time",
    current: false,
    description:
      "Focused on performance optimization and frontend improvements for WordPress plugins and React applications.",
    highlights: [
      "Optimized the WordPress SSO plugin — reduced bundle size from 1.5 MB to 270 KB, leading to a 70% increase in downloads.",
      "Improved React application performance through code refactoring and optimizations for faster load times.",
      "Crafted wireframes and interactive prototypes in Figma, improving visual consistency across the app.",
    ],
    tech: ["React", "WordPress", "JavaScript", "Figma", "CSS"],
  },
];

export const EDUCATION = [
  {
    id: 1,
    degree: "Bachelor of Engineering",
    field: "Computer Engineering",
    institution: "P.E.S. Modern College of Engineering, Pune",
    period: "2018 — 2022",
    grade: "9.05 CGPA",
    description:
      "Core CS fundamentals — Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, and Web Development.",
  },
];
