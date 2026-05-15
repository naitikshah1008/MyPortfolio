import { prefetchExperiences } from "./experiences";
import { prefetchProjects } from "./projects";

export const loadProjectsPage = () => import("../pages/Projects");
export const loadExperiencePage = () => import("../pages/Experience");

export const preloadProjectsView = () => {
  loadProjectsPage();
  prefetchProjects();
};

export const preloadExperienceView = () => {
  loadExperiencePage();
  prefetchExperiences();
};

export const preloadViewForPath = (path) => {
  if (path === "/projects") {
    preloadProjectsView();
  }

  if (path === "/experience") {
    preloadExperienceView();
  }
};
