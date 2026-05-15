import api from "./api";

const EXPERIENCES_CACHE_KEY = "experiences-data-v1";
let experiencesPromise;

export const getCachedExperiences = () => {
  try {
    const cached = localStorage.getItem(EXPERIENCES_CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch (error) {
    return [];
  }
};

export const loadExperiences = async () => {
  if (!experiencesPromise) {
    experiencesPromise = api
      .get("/experiences")
      .then(({ data }) => {
        localStorage.setItem(EXPERIENCES_CACHE_KEY, JSON.stringify(data));
        return data;
      })
      .catch((error) => {
        experiencesPromise = null;
        throw error;
      });
  }

  return experiencesPromise;
};

export const prefetchExperiences = () => loadExperiences().catch(() => {});
