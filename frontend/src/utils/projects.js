import api from "./api";

const PROJECTS_CACHE_KEY = "projects-data-v1";
let projectsPromise;

export const getCachedProjects = () => {
  try {
    const cached = localStorage.getItem(PROJECTS_CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch (error) {
    return [];
  }
};

export const loadProjects = async () => {
  if (!projectsPromise) {
    projectsPromise = api
      .get("/projects", { params: { summary: true } })
      .then(({ data }) => {
        localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(data));
        return data;
      })
      .catch((error) => {
        projectsPromise = null;
        throw error;
      });
  }

  return projectsPromise;
};

export const prefetchProjects = () => loadProjects().catch(() => {});
