import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["languages", "backend", "distributed systems", "ml/ai", "cloud & devops", "database", "frontend"],
      required: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 50,
    },
    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    order: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
