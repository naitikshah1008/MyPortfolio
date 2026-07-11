import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const ProjectCard = ({ project }) => {
  return (
    <motion.div whileHover={{ y: -4 }} className="card group overflow-hidden">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-stone-100 dark:bg-dark-700">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-primary-700 dark:text-primary-300">
            {project.title}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-2 text-gray-900 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} GitHub repository`}
              >
                <FiGithub size={20} />
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-2 text-gray-900 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} live site`}
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="rounded-md bg-primary-50 px-3 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-200"
            >
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className="rounded-md bg-stone-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-dark-700 dark:text-gray-300">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        {/* View Details */}
        <Link
          to={`/projects/${project._id}`}
          className="inline-flex items-center gap-2 font-medium text-primary-700 transition-colors duration-200 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-200"
        >
          View Details
          <FiExternalLink size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
