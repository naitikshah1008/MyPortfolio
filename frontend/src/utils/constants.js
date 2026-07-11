export const API_URL = import.meta.env.VITE_API_URL || "https://portfolio-server-sigma-liart.vercel.app";

export const ROUTES = {
  HOME: "/",
  PROJECTS: "/projects",
  SKILLS: "/skills",
  BLOG: "/blog",
  CONTACT: "/contact",
  ADMIN: "/admin",
  LOGIN: "/login",
};

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

export const SKILL_CATEGORIES = [
  "languages",
  "backend",
  "distributed systems",
  "ml/ai",
  "cloud & devops",
  "tools & infrastructure",
  "database",
  "frontend",
];

export const SKILL_CATEGORY_LABELS = {
  languages: "Languages",
  backend: "Backend & APIs",
  "distributed systems": "Distributed Systems",
  "ml/ai": "AI/ML",
  "cloud & devops": "Cloud & DevOps",
  "tools & infrastructure": "Systems & Tooling",
  database: "Data & Storage",
  frontend: "Frontend & UI",
};

export const SKILL_FILTERS = [
  { id: "all", label: "All Skills", categories: SKILL_CATEGORIES },
  { id: "frontend", label: "Frontend & UI", categories: ["frontend"] },
  { id: "backend", label: "Backend & APIs", categories: ["backend"] },
  {
    id: "systems-cloud",
    label: "Systems & Cloud",
    categories: [
      "distributed systems",
      "cloud & devops",
      "tools & infrastructure",
    ],
  },
  { id: "data-storage", label: "Data & Storage", categories: ["database"] },
  { id: "ai-ml", label: "AI/ML", categories: ["ml/ai"] },
  { id: "languages", label: "Languages", categories: ["languages"] },
];

export const SKILL_DISPLAY_ORDER = [
  "Java",
  "Spring Boot",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Go",
  "Kafka",
  "Docker",
  "Kubernetes",
  "AWS",
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Git",
  "PyTorch",
  "TensorFlow",
  "Angular",
  "C++",
  "HTML",
];

export const PROJECT_CATEGORIES = [
  "web",
  "mobile application",
  "scientific visualization",
  "web application",
  "fullstack",
  "ai/ml",
  "other",
];

export const PROJECT_FILTERS = [
  { id: "all", label: "All", categories: PROJECT_CATEGORIES },
  { id: "fullstack", label: "Full-Stack Systems", categories: ["fullstack"] },
  {
    id: "web-apps",
    label: "Web Applications",
    categories: ["web", "web application"],
  },
  {
    id: "ai-data",
    label: "AI, Data & Visualization",
    categories: ["ai/ml", "scientific visualization"],
  },
  {
    id: "other-builds",
    label: "Other Builds",
    categories: ["mobile application", "other"],
  },
];

export const PROJECT_CATEGORY_LABELS = {
  all: "All",
  web: "Web Application",
  "mobile application": "Mobile App",
  "scientific visualization": "Data Visualization",
  "web application": "Web Application",
  fullstack: "Full-Stack System",
  "ai/ml": "AI/ML",
  other: "Other",
};

export const formatSkillCategory = (category) =>
  SKILL_CATEGORY_LABELS[category] ||
  category
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") ||
  "";

export const formatProjectCategory = (category) =>
  PROJECT_CATEGORY_LABELS[category] ||
  category
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") ||
  "";
