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

export const PROJECT_CATEGORIES = [
  "web",
  "mobile application",
  "scientific visualization",
  "web application",
  "fullstack",
  "ai/ml",
  "other",
];

export const PROJECT_CATEGORY_LABELS = {
  all: "All",
  web: "Web",
  "mobile application": "Mobile Application",
  "scientific visualization": "Scientific Visualization",
  "web application": "Web Application",
  fullstack: "Fullstack",
  "ai/ml": "AI/ML",
  other: "Other",
};

export const formatProjectCategory = (category) =>
  PROJECT_CATEGORY_LABELS[category] ||
  category
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") ||
  "";
