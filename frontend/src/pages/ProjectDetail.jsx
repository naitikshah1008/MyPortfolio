import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiGithub,
  FiExternalLink,
  FiCalendar,
  FiTag,
} from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";
import { formatProjectCategory } from "../utils/constants";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project details");
        navigate("/projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 section">
        <div className="container">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-dark-700 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-300 dark:bg-dark-700 rounded mb-8"></div>
            <div className="h-12 bg-gray-300 dark:bg-dark-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-dark-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 section">
        <div className="container text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Project Not Found
          </h1>
          <Link to="/projects" className="btn-primary inline-block">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-20 dark:bg-dark-900">
      <div className="section">
        <div className="container">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-medium text-primary-700 transition-colors duration-200 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
            >
              <FiArrowLeft size={20} />
              Back to Projects
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-3d overflow-hidden"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-96 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-96 w-full items-center justify-center bg-stone-100 text-2xl font-semibold text-primary-700 dark:bg-dark-700 dark:text-primary-300">
                    {project.title}
                  </div>
                )}
              </motion.div>

              {/* Project Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card-3d p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
                      {project.title}
                    </h1>
                    {project.featured && (
                      <span className="inline-flex items-center rounded-md border border-accent-200 bg-accent-50 px-3 py-1 text-sm font-medium text-accent-800 dark:border-accent-800 dark:bg-accent-900/30 dark:text-accent-200">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed content-display">
                  {project.description}
                </p>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card-3d p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <FiTag className="text-primary-600 dark:text-primary-400" />
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.techStack?.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-primary-50 px-4 py-2 font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card-3d p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Project Links
                </h3>
                <div className="space-y-3">
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-stone-100 p-3 transition-colors duration-200 hover:bg-stone-200 dark:bg-dark-700 dark:hover:bg-dark-600"
                    >
                      <FiGithub className="text-xl text-gray-700 dark:text-gray-300" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        View Source Code
                      </span>
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-primary-700 p-3 text-white transition-colors duration-200 hover:bg-primary-800 dark:bg-primary-400 dark:text-dark-900 dark:hover:bg-primary-300"
                    >
                      <FiExternalLink className="text-xl" />
                      <span className="font-medium">View Live Demo</span>
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-3d p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Project Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                      Category
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {formatProjectCategory(project.category) || "Web Development"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-1">
                      <FiCalendar size={16} />
                      Created Date
                    </label>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {new Date(project.projectDate || project.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
