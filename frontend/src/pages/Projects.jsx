import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import ProjectCard from "../components/ProjectCard";
import { PROJECT_FILTERS } from "../utils/constants";
import { getCachedProjects, loadProjects } from "../utils/projects";

const Projects = () => {
  const [projects, setProjects] = useState(getCachedProjects);
  const [loading, setLoading] = useState(projects.length === 0);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadProjects()
      .then(setProjects)
      .catch(() => toast.error("Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  const categories = PROJECT_FILTERS;
  const selectedCategory =
    categories.find((category) => category.id === filter) || categories[0];
  const visibleProjects =
    filter === "all"
      ? projects
      : projects.filter((project) =>
          selectedCategory.categories.includes(project.category)
        );

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
            <h1 className="text-5xl font-bold mb-4">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Software projects across full-stack systems, data workflows,
              AI/ML, and polished web experiences.
            </p>
          </motion.div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === cat.id
                    ? "bg-primary-700 text-white shadow-sm dark:bg-primary-400 dark:text-dark-900"
                    : "bg-stone-200 text-gray-700 hover:bg-stone-300 dark:bg-dark-700 dark:text-gray-300 dark:hover:bg-dark-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card p-6 animate-pulse">
                  <div className="bg-gray-300 dark:bg-dark-700 h-48 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-300 dark:bg-dark-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : visibleProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400">
                No projects found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
