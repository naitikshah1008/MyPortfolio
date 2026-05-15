import api from "./api";

const HOME_CACHE_KEY = "homepage-data-v1";

const getYearsExperience = (experiences = []) => {
  const totalMonths = experiences.reduce((months, experience) => {
    if (!["work", "internship"].includes(experience.category)) {
      return months;
    }

    const start = new Date(experience.startDate);
    const end =
      experience.current || !experience.endDate
        ? new Date()
        : new Date(experience.endDate);
    const duration =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    return duration > 0 ? months + duration : months;
  }, 0);

  return Math.max(1, Math.floor(totalMonths / 12));
};

const toHomepageShape = (data) => ({
  ownerProfile: data.ownerProfile || null,
  featuredProjects: Array.isArray(data.featuredProjects)
    ? data.featuredProjects.slice(0, 3)
    : [],
  skills: Array.isArray(data.skills) ? data.skills.slice(0, 8) : [],
  codingProfiles: Array.isArray(data.codingProfiles)
    ? data.codingProfiles.filter((profile) => profile.enabled !== false)
    : [],
  stats: {
    totalProjects: data.stats?.totalProjects || 0,
    yearsExperience: data.stats?.yearsExperience || 0,
  },
});

const hasCompleteHomepagePayload = (data) =>
  Boolean(data.ownerProfile) &&
  Array.isArray(data.featuredProjects) &&
  Array.isArray(data.skills) &&
  Array.isArray(data.codingProfiles);

const hasRenderableHomepageData = (data) =>
  Boolean(data?.ownerProfile) ||
  data?.featuredProjects?.length > 0 ||
  data?.skills?.length > 0 ||
  data?.codingProfiles?.length > 0;

const loadLegacyHomepageData = async () => {
  const [profileResult, projectsResult, skillsResult, experiencesResult, codingProfilesResult] =
    await Promise.allSettled([
      api.get("/auth/portfolio-owner"),
      api.get("/projects"),
      api.get("/skills"),
      api.get("/experiences"),
      api.get("/coding-profiles", { params: { summary: true } }),
    ]);

  const projects =
    projectsResult.status === "fulfilled" ? projectsResult.value.data : [];
  const experiences =
    experiencesResult.status === "fulfilled" ? experiencesResult.value.data : [];

  if (
    profileResult.status === "rejected" &&
    projectsResult.status === "rejected" &&
    skillsResult.status === "rejected"
  ) {
    throw new Error("Unable to load homepage data from available endpoints");
  }

  return {
    ownerProfile:
      profileResult.status === "fulfilled" ? profileResult.value.data : null,
    featuredProjects: projects
      .filter((project) => project.featured)
      .slice(0, 3),
    skills:
      skillsResult.status === "fulfilled"
        ? skillsResult.value.data.slice(0, 8)
        : [],
    codingProfiles:
      codingProfilesResult.status === "fulfilled"
        ? codingProfilesResult.value.data.filter((profile) => profile.enabled)
        : [],
    stats: {
      totalProjects: projects.length,
      yearsExperience: getYearsExperience(experiences),
    },
  };
};

export const getCachedHomepageData = () => {
  try {
    const cached = localStorage.getItem(HOME_CACHE_KEY);
    const parsed = cached ? JSON.parse(cached) : null;
    return hasRenderableHomepageData(parsed) ? parsed : null;
  } catch (error) {
    return null;
  }
};

export const cacheHomepageData = (data) => {
  if (hasRenderableHomepageData(data)) {
    localStorage.setItem(HOME_CACHE_KEY, JSON.stringify(data));
  }
};

export const loadHomepageData = async () => {
  try {
    const { data } = await api.get("/homepage");

    if (hasCompleteHomepagePayload(data)) {
      return toHomepageShape(data);
    }
  } catch (error) {
    // Deployed backends may not have the consolidated endpoint yet.
  }

  return loadLegacyHomepageData();
};
