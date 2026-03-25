import Project from "../models/Project.js";
import Experience from "../models/Experience.js";
import Skill from "../models/Skill.js";

let cachedHomepageData = null;
let cachedAt = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export const getHomepageData = async (req, res) => {
  try {
    const now = Date.now();

    if (cachedHomepageData && now - cachedAt < CACHE_DURATION_MS) {
      return res.json(cachedHomepageData);
    }

    const [featuredProjects, totalProjects, skills, experiences] =
      await Promise.all([
        Project.find({ featured: true })
          .sort({ order: 1, projectDate: -1, createdAt: -1 })
          .limit(3)
          .lean(),

        Project.countDocuments(),

        Skill.find()
          .sort({ order: 1 })
          .limit(8)
          .lean(),

        Experience.find({
          category: { $in: ["work", "internship"] },
        }).lean(),
      ]);

    let totalMonths = 0;

    experiences.forEach((exp) => {
      const start = new Date(exp.startDate);
      const end =
        exp.current || !exp.endDate ? new Date() : new Date(exp.endDate);

      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

      if (months > 0) {
        totalMonths += months;
      }
    });

    const yearsExperience = Math.max(1, Math.floor(totalMonths / 12));

    const response = {
      featuredProjects,
      skills,
      stats: {
        totalProjects,
        yearsExperience,
      },
    };

    cachedHomepageData = response;
    cachedAt = now;

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};