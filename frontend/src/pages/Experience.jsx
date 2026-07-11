import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiBook,
  FiCodepen,
  FiUsers,
  FiTrendingUp,
  FiStar,
  FiPackage,
} from "react-icons/fi";
import toast from "react-hot-toast";
import {
  getCachedExperiences,
  loadExperiences,
} from "../utils/experiences";

const Experience = () => {
  const [experiences, setExperiences] = useState(getCachedExperiences);
  const [loading, setLoading] = useState(experiences.length === 0);

  useEffect(() => {
    loadExperiences()
      .then(setExperiences)
      .catch(() => toast.error("Failed to load experiences"))
      .finally(() => setLoading(false));
  }, []);

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  // Group experiences by category
  const groupedExperiences = experiences.reduce((acc, exp) => {
    if (!acc[exp.category]) {
      acc[exp.category] = [];
    }
    acc[exp.category].push(exp);
    return acc;
  }, {});

  const categoryStyles = {
    work: {
      icon: "bg-primary-700 text-white dark:bg-primary-400 dark:text-dark-900",
      dot: "bg-primary-600 dark:bg-primary-300",
      badge:
        "border-primary-200 bg-primary-50 text-primary-800 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-200",
    },
    education: {
      icon: "bg-accent-600 text-white",
      dot: "bg-accent-500",
      badge:
        "border-accent-200 bg-accent-50 text-accent-800 dark:border-accent-800 dark:bg-accent-900/30 dark:text-accent-200",
    },
    internship: {
      icon: "bg-emerald-700 text-white",
      dot: "bg-emerald-600",
      badge:
        "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
    },
    freelance: {
      icon: "bg-orange-700 text-white",
      dot: "bg-orange-600",
      badge:
        "border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-200",
    },
    volunteer: {
      icon: "bg-rose-700 text-white",
      dot: "bg-rose-600",
      badge:
        "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-900/30 dark:text-rose-200",
    },
    certification: {
      icon: "bg-slate-700 text-white",
      dot: "bg-slate-600",
      badge:
        "border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-200",
    },
    project: {
      icon: "bg-cyan-700 text-white",
      dot: "bg-cyan-600",
      badge:
        "border-cyan-200 bg-cyan-50 text-cyan-800 dark:border-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-200",
    },
    achievement: {
      icon: "bg-yellow-600 text-dark-900",
      dot: "bg-yellow-500",
      badge:
        "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200",
    },
    other: {
      icon: "bg-gray-700 text-white",
      dot: "bg-gray-600",
      badge:
        "border-gray-200 bg-gray-50 text-gray-800 dark:border-dark-700 dark:bg-dark-700 dark:text-gray-200",
    },
  };

  const categoryIcons = {
    work: FiBriefcase,
    education: FiBook,
    internship: FiTrendingUp,
    freelance: FiCodepen,
    volunteer: FiUsers,
    certification: FiAward,
    project: FiPackage,
    achievement: FiStar,
    other: FiBriefcase,
  };

  return (
    <div className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and key achievements
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-6 bg-gray-300 dark:bg-dark-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No experience data available yet.
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              Check back soon for updates on my professional journey.
            </p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {Object.entries(groupedExperiences).map(
              ([category, categoryExps]) => {
                const CategoryIcon = categoryIcons[category] || FiBriefcase;
                const categoryStyle =
                  categoryStyles[category] || categoryStyles.other;
                return (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`rounded-lg p-2 ${categoryStyle.icon}`}
                      >
                        <CategoryIcon size={20} />
                      </div>
                      <h2 className="text-xl font-bold capitalize text-gray-900 dark:text-white">
                        {category}
                      </h2>
                      <div className="ml-4 h-px flex-1 bg-stone-200 dark:bg-dark-700"></div>
                    </div>

                    {/* Zigzag Timeline */}
                    <div className="relative">
                      {/* Center Vertical Line - Hidden on mobile, shown on desktop */}
                      <div className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 -translate-x-1/2 bg-stone-200 dark:bg-dark-700 md:block"></div>

                      {categoryExps.map((exp, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                          <motion.div
                            key={exp._id}
                            initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.35,
                              delay: index * 0.05,
                            }}
                            className={`experience-card-gsap relative mb-8 last:mb-0 md:w-1/2 ${
                              isLeft ? "md:pr-8" : "md:ml-auto md:pl-8"
                            }`}
                          >
                            {/* Timeline Dot - Center on desktop, left on mobile */}
                            <div
                              className={`absolute z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-stone-300 bg-white shadow-sm dark:border-dark-600 dark:bg-dark-800 md:h-8 md:w-8 ${
                                isLeft
                                  ? "-left-3 md:right-0 md:left-auto md:translate-x-1/2"
                                  : "-left-3 md:left-0 md:-translate-x-1/2"
                              } top-6`}
                            >
                              <div
                                className={`h-2 w-2 rounded-full md:h-3 md:w-3 ${categoryStyle.dot}`}
                              ></div>
                            </div>

                            {/* Content Card */}
                            <motion.div
                              whileHover={{ y: -3 }}
                              className={`card group ml-6 p-4 transition-all duration-200 md:ml-0 md:p-5 ${
                                isLeft
                                  ? "md:border-r-4 border-l-4 border-transparent hover:border-primary-500"
                                  : "md:border-l-4 border-l-4 border-transparent hover:border-primary-500"
                              }`}
                            >
                              {/* Header with Title, Subtitle and Date */}
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                <div className="flex-1 min-w-0">
                                  {/* Title */}
                                  <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                                    {exp.title}
                                  </h3>

                                  {/* Subtitle */}
                                  {exp.subtitle && (
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                      {exp.subtitle}
                                    </p>
                                  )}

                                  {/* Organization and Location */}
                                  <div className="flex flex-wrap items-center gap-3 mt-1">
                                    {exp.organization && (
                                      <p className="text-base font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1.5">
                                        <FiBriefcase
                                          size={14}
                                          className="flex-shrink-0"
                                        />
                                        <span className="truncate">
                                          {exp.organization}
                                        </span>
                                      </p>
                                    )}
                                    {exp.location && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                                        <FiMapPin
                                          size={12}
                                          className="flex-shrink-0"
                                        />
                                        <span className="truncate">
                                          {exp.location}
                                        </span>
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Date Badge */}
                                <div
                                  className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium ${categoryStyle.badge}`}
                                >
                                  <FiCalendar size={12} />
                                  <span className="whitespace-nowrap">
                                    {formatDate(exp.startDate)} -{" "}
                                    {exp.current
                                      ? "Present"
                                      : formatDate(exp.endDate)}
                                  </span>
                                </div>
                              </div>

                              {/* Description */}
                              {exp.description && (
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3 content-display">
                                  {exp.description}
                                </p>
                              )}

                              {/* Key Achievements */}
                              {exp.achievements &&
                                exp.achievements.length > 0 && (
                                  <div className="mb-3">
                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                      Key Achievements:
                                    </h4>
                                    <ul className="space-y-1.5">
                                      {exp.achievements
                                        .slice(0, 3)
                                        .map((achievement, idx) => (
                                          <li
                                            key={idx}
                                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                                          >
                                            <span
                                              className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${categoryStyle.dot}`}
                                            ></span>
                                            <span className="flex-1">
                                              {achievement}
                                            </span>
                                          </li>
                                        ))}
                                      {exp.achievements.length > 3 && (
                                        <li className="text-xs text-gray-500 dark:text-gray-500 ml-4">
                                          +{exp.achievements.length - 3} more
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                )}

                              {/* Skills/Technologies */}
                              {exp.technologies &&
                                exp.technologies.length > 0 && (
                                  <div className="pt-3 border-t border-gray-200 dark:border-dark-700">
                                    <div className="flex flex-wrap gap-1.5">
                                      {exp.technologies.map((tech, idx) => (
                                        <span
                                          key={idx}
                                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </motion.div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
