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

export const SKILL_CATEGORY_OPTIONS = [
  {
    value: "frontend & ui",
    label: "Frontend & UI",
    aliases: ["frontend"],
  },
  {
    value: "backend & apis",
    label: "Backend & APIs",
    aliases: ["backend"],
  },
  {
    value: "systems & cloud",
    label: "Systems & Cloud",
    aliases: [
      "distributed systems",
      "cloud & devops",
      "tools & infrastructure",
    ],
  },
  {
    value: "data & storage",
    label: "Data & Storage",
    aliases: ["database"],
  },
  {
    value: "ai/ml",
    label: "AI/ML",
    aliases: ["ml/ai"],
  },
  {
    value: "languages",
    label: "Languages",
    aliases: [],
  },
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
  "frontend & ui": "Frontend & UI",
  "backend & apis": "Backend & APIs",
  "systems & cloud": "Systems & Cloud",
  "data & storage": "Data & Storage",
  "ai/ml": "AI/ML",
};

const getOptionValues = (option) => [option.value, ...(option.aliases || [])];

export const SKILL_FILTERS = [
  {
    id: "all",
    label: "All Skills",
    categories: SKILL_CATEGORY_OPTIONS.flatMap(getOptionValues),
  },
  ...SKILL_CATEGORY_OPTIONS.map((option) => ({
    id: option.value,
    label: option.label,
    categories: getOptionValues(option),
  })),
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

export const PROJECT_CATEGORY_OPTIONS = [
  {
    value: "full-stack systems",
    label: "Full-Stack Systems",
    aliases: ["fullstack"],
  },
  {
    value: "web applications",
    label: "Web Applications",
    aliases: ["web", "web application"],
  },
  {
    value: "ai data visualization",
    label: "AI, Data & Visualization",
    aliases: ["ai/ml", "scientific visualization"],
  },
  {
    value: "other builds",
    label: "Other Builds",
    aliases: ["mobile application", "other"],
  },
];

export const PROJECT_FILTERS = [
  {
    id: "all",
    label: "All",
    categories: PROJECT_CATEGORY_OPTIONS.flatMap(getOptionValues),
  },
  ...PROJECT_CATEGORY_OPTIONS.map((option) => ({
    id: option.value,
    label: option.label,
    categories: getOptionValues(option),
  })),
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
  "full-stack systems": "Full-Stack Systems",
  "web applications": "Web Applications",
  "ai data visualization": "AI, Data & Visualization",
  "other builds": "Other Builds",
};

export const getCanonicalProjectCategory = (category) =>
  PROJECT_CATEGORY_OPTIONS.find((option) =>
    getOptionValues(option).includes(category)
  )?.value ||
  category ||
  PROJECT_CATEGORY_OPTIONS[0].value;

export const getCanonicalSkillCategory = (category) =>
  SKILL_CATEGORY_OPTIONS.find((option) =>
    getOptionValues(option).includes(category)
  )?.value ||
  category ||
  SKILL_CATEGORY_OPTIONS[0].value;

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
