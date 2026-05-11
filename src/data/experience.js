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
      "Built a high-performance React-Table library from scratch with priority-based sorting, multi-column filtering, full accessibility (WCAG), 90% test coverage, CI/CD pipelines, and Docusaurus docs — adopted company-wide across multiple teams.",
      "Migrated Vuex → Pinia, refactored legacy components to Composition API, and implemented dynamic routing with Vue Router for route-based code splitting.",
      "Integrated OpenAI's Streaming API for real-time content delivery with markdown support, error handling, response regeneration, and request abortion.",
      "Led development of a real-time in-house chat platform with Node.js + Socket.IO, replacing a third-party tool — cutting issue resolution time by 55% and saving $30,000+ annually.",
      "Revamped wiki docs with Next.js (SSG + Incremental Builds) for a blazing-fast, searchable documentation experience.",
      "Built a no-code offers management platform enabling vendors to create ad campaigns with Cron-based scheduling — adopted by 3+ high-profile vendors.",
    ],
    tech: ["React", "Vue", "Next.js", "Node.js", "Socket.IO", "OpenAI API", "TypeScript", "Jest"],
  },
  {
    id: 2,
    role: "Web Developer",
    company: "MiniOrange",
    period: "Jul 2022 — Nov 2022",
    type: "Internship",
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
