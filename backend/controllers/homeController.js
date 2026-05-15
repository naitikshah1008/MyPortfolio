import Project from "../models/Project.js";
import Experience from "../models/Experience.js";
import Skill from "../models/Skill.js";
import User from "../models/User.js";
import CodingProfile from "../models/CodingProfile.js";
import { setCollectionCacheHeaders } from "../utils/cache.js";

const fallbackOwnerProfile = {
  name: "Naitik Shah",
  title: "Full Stack Developer",
  bio: "Full Stack Developer passionate about creating beautiful and functional web applications.",
  email: "",
  github: "",
  linkedin: "",
  hackerrank: "",
  resume: null,
  profileImage: null,
  codingProfiles: {},
  roles: [
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "MERN Stack Developer",
  ],
};

export const getHomepageData = async (req, res) => {
  try {
    const [owner, featuredProjects, totalProjects, skills, experiences, codingProfiles] =
      await Promise.all([
        User.findOne({ role: "admin" })
          .select(
            "name title bio email github linkedin hackerrank resume profileImage codingProfiles roles"
          )
          .lean(),

        Project.find({ featured: true })
          .sort({ order: 1, projectDate: -1, createdAt: -1 })
          .limit(3)
          .lean(),

        Project.countDocuments(),

        Skill.find().sort({ order: 1 }).limit(8).lean(),

        Experience.find({
          category: { $in: ["work", "internship"] },
        }).lean(),

        CodingProfile.find({ enabled: true })
          .select("platform profileUrl enabled")
          .sort({ platform: 1 })
          .lean(),
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

    setCollectionCacheHeaders(req, res);

    res.json({
      ownerProfile: owner || fallbackOwnerProfile,
      featuredProjects,
      skills,
      codingProfiles,
      stats: {
        totalProjects,
        yearsExperience,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
