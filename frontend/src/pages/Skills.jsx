import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import SkillCard from "../components/SkillCard";
import { getCachedSkills, loadSkills } from "../utils/skills";

const Skills = () => {
  const [skills, setSkills] = useState(getCachedSkills);
  const [loading, setLoading] = useState(skills.length === 0);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    loadSkills()
      .then(setSkills)
      .catch(() => toast.error("Failed to load skills"))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "languages", label: "Languages" },
    { id: "backend", label: "Backend" },
    { id: "distributed systems", label: "Distributed Systems" },
    { id: "ml/ai", label: "ML/AI" },
    { id: "cloud & devops", label: "Cloud & DevOps" },
    { id: "tools & infrastructure", label: "Tools & Infrastructure" },
    { id: "database", label: "Database" },
    { id: "frontend", label: "Frontend" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const skillsByCategory = categories.reduce((acc, cat) => {
    if (cat.id === "all") return acc;
    acc[cat.id] = skills.filter((s) => s.category === cat.id);
    return acc;
  }, {});

  return (
    <div className="min-h-screen pt-20">
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 font-display">
              My <span className="gradient-text">Skills</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I work with to build amazing projects
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-primary-700 text-white shadow-sm dark:bg-primary-400 dark:text-dark-900"
                    : "bg-stone-200 text-gray-700 hover:bg-stone-300 dark:bg-dark-700 dark:text-gray-300 dark:hover:bg-dark-600"
                }`}
              >
                {cat.label}
                {cat.id !== "all" && skillsByCategory[cat.id] && (
                  <span className="ml-2 text-sm opacity-75">
                    ({skillsByCategory[cat.id].length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="h-16 bg-gray-300 dark:bg-dark-700 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded mb-3"></div>
                  <div className="h-2 bg-gray-300 dark:bg-dark-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No skills found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                >
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Stats Section */}
          {!loading && skills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div className="card p-6 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {skills.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Skills
                </div>
              </div>
              {Object.entries(skillsByCategory)
                .slice(0, 3)
                .map(([cat, items]) => (
                  <div key={cat} className="card p-6 text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">
                      {items.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {cat}
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Skills;
