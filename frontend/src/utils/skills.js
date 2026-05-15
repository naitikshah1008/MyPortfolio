import api from "./api";

const SKILLS_CACHE_KEY = "skills-data-v1";
let skillsPromise;

export const getCachedSkills = () => {
  try {
    const cached = localStorage.getItem(SKILLS_CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch (error) {
    return [];
  }
};

export const loadSkills = async () => {
  if (!skillsPromise) {
    skillsPromise = api
      .get("/skills")
      .then(({ data }) => {
        localStorage.setItem(SKILLS_CACHE_KEY, JSON.stringify(data));
        return data;
      })
      .catch((error) => {
        skillsPromise = null;
        throw error;
      });
  }

  return skillsPromise;
};

export const prefetchSkills = () => loadSkills().catch(() => {});

export const invalidateSkillsCache = () => {
  skillsPromise = null;
  localStorage.removeItem(SKILLS_CACHE_KEY);
};
