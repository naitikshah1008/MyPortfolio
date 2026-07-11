import { motion } from "framer-motion";
import { formatSkillCategory } from "../utils/constants";

const SkillCard = ({ skill }) => {
  const accentColor = skill.color || "#2d9c86";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card relative overflow-hidden p-5"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      {/* Content */}
      <div>
        {/* Skill Name */}
        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
          {skill.name}
        </h3>

        {/* Progress Bar */}
        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-dark-700">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Level Percentage with Animation */}
        <div className="flex items-center justify-between">
          <motion.span
            className="text-sm font-semibold"
            style={{ color: accentColor }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            {skill.level}%
          </motion.span>
          <span className="max-w-[60%] truncate text-right text-xs font-medium text-gray-500 dark:text-gray-400">
            {formatSkillCategory(skill.category)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
