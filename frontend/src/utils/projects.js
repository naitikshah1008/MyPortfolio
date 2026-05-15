import api from "./api";

const PROJECTS_CACHE_KEY = "projects-data-v1";
let projectsPromise;

const preloadProjectImages = (projects) => {
  projects.slice(0, 6).forEach((project) => {
    if (!project.image) return;

    const image = new Image();
    image.src = project.image;
  });
};

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
        preloadProjectImages(data);
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

export const invalidateProjectsCache = () => {
  projectsPromise = null;
  localStorage.removeItem(PROJECTS_CACHE_KEY);
};
