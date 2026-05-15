import Blog from "../models/Blog.js";
import { setCollectionCacheHeaders } from "../utils/cache.js";

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const { published, category, tag, search, summary } = req.query;
    const isAdminRequest = req.user?.role === "admin";

    let filter = {};

    // Public callers only ever see published posts. Admin callers can request
    // drafts through the protected admin route.
    if (!isAdminRequest || published !== "false") filter.published = true;
    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    let query = Blog.find(filter).sort({ createdAt: -1 });

    if (summary === "true") {
      query = query.select(
        "title slug excerpt coverImage image tags published views createdAt"
      );
    } else {
      query = query.populate("author", "name avatar");
    }

    const blogs = await query.lean();

    if (!category && !tag && !search) {
      setCollectionCacheHeaders(req, res);
    }

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog by slug or ID
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Try to find by slug first
    let blog = await Blog.findOne({ slug, published: true }).populate(
      "author",
      "name avatar"
    );

    // If not found by slug, try by ID (for backward compatibility)
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findOne({ _id: slug, published: true }).populate(
        "author",
        "name avatar"
      );
    }

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      coverImage: req.body.coverImage || req.body.image || "",
      author: req.user._id,
      tags: req.body.tags || [],
      category: req.body.category || "general",
      published: req.body.published || false,
      readTime: req.body.readTime || 5,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      if (req.body.title !== undefined) blog.title = req.body.title;
      if (req.body.excerpt !== undefined) blog.excerpt = req.body.excerpt;
      if (req.body.content !== undefined) blog.content = req.body.content;
      if (req.body.coverImage !== undefined || req.body.image !== undefined) {
        blog.coverImage = req.body.coverImage ?? req.body.image;
      }
      if (req.body.tags !== undefined) blog.tags = req.body.tags;
      if (req.body.category !== undefined) blog.category = req.body.category;
      blog.published =
        req.body.published !== undefined ? req.body.published : blog.published;
      if (req.body.readTime !== undefined) blog.readTime = req.body.readTime;

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: "Blog removed" });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Increment blog views
// @route   POST /api/blogs/:id/views
// @access  Public
export const incrementViews = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.views += 1;
      await blog.save();
      res.json({ views: blog.views });
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
