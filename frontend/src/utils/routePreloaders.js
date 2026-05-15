import { prefetchExperiences } from "./experiences";
import { prefetchProjects } from "./projects";
import { prefetchSkills } from "./skills";

export const loadProjectsPage = () => import("../pages/Projects");
export const loadSkillsPage = () => import("../pages/Skills");
export const loadExperiencePage = () => import("../pages/Experience");

export const preloadProjectsView = () => {
  loadProjectsPage();
  prefetchProjects();
};

export const preloadExperienceView = () => {
  loadExperiencePage();
  prefetchExperiences();
};

export const preloadSkillsView = () => {
  loadSkillsPage();
  prefetchSkills();
};

export const preloadPrimaryViews = () => {
  preloadProjectsView();
  preloadSkillsView();
  preloadExperienceView();
};

export const preloadViewForPath = (path) => {
  if (path === "/projects") {
    preloadProjectsView();
  }

  if (path === "/skills") {
    preloadSkillsView();
  }

  if (path === "/experience") {
    preloadExperienceView();
  }
};
