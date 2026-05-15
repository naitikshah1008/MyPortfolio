import Project from "../models/Project.js";
import { setCollectionCacheHeaders } from "../utils/cache.js";

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { category, featured, search, summary } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (featured) filter.featured = featured === "true";
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const query = Project.find(filter).sort({
      order: 1,
      projectDate: -1,
      createdAt: -1,
    });

    if (summary === "true") {
      query.select(
        "title description image techStack category links featured order projectDate createdAt"
      );
    }

    const projects = await query.lean();
    setCollectionCacheHeaders(req, res);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      fullDescription: req.body.fullDescription,
      image: req.body.image,
      images: req.body.images || [],
      techStack: req.body.techStack,
      category: req.body.category,
      links: req.body.links,
      featured: req.body.featured || false,
      status: req.body.status || "completed",
      tags: req.body.tags || [],
      projectDate: req.body.projectDate || null,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      if (req.body.title !== undefined) project.title = req.body.title;
      if (req.body.description !== undefined) {
        project.description = req.body.description;
      }
      if (req.body.fullDescription !== undefined) {
        project.fullDescription = req.body.fullDescription;
      }
      if (req.body.image !== undefined) project.image = req.body.image;
      if (req.body.images !== undefined) project.images = req.body.images;
      if (req.body.techStack !== undefined) {
        project.techStack = req.body.techStack;
      }
      if (req.body.category !== undefined) project.category = req.body.category;
      if (req.body.links !== undefined) {
        project.links = {
          ...(project.links?.toObject?.() || project.links || {}),
          ...req.body.links,
        };
      }
      project.featured =
        req.body.featured !== undefined ? req.body.featured : project.featured;
      if (req.body.status !== undefined) project.status = req.body.status;
      if (req.body.tags !== undefined) project.tags = req.body.tags;
      if (req.body.projectDate !== undefined) {
        project.projectDate = req.body.projectDate;
      }

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: "Project removed" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reorder projects (for drag & drop)
// @route   POST /api/projects/reorder
// @access  Private/Admin
export const reorderProjects = async (req, res) => {
  try {
    const { projects } = req.body; // Array of { id, order }

    const updatePromises = projects.map((item) =>
      Project.findByIdAndUpdate(item.id, { order: item.order })
    );

    await Promise.all(updatePromises);

    res.json({ message: "Projects reordered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
