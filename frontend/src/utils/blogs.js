import api from "./api";

const BLOGS_CACHE_KEY = "blogs-data-v1";
let blogsPromise;

const preloadBlogImages = (blogs) => {
  blogs.slice(0, 6).forEach((blog) => {
    const imageUrl = blog.coverImage || blog.image;
    if (!imageUrl) return;

    const image = new Image();
    image.src = imageUrl;
  });
};

export const getCachedBlogs = () => {
  try {
    const cached = localStorage.getItem(BLOGS_CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch (error) {
    return [];
  }
};

export const loadBlogs = async () => {
  if (!blogsPromise) {
    blogsPromise = api
      .get("/blogs", { params: { summary: true } })
      .then(({ data }) => {
        const publishedBlogs = data.filter((blog) => blog.published);
        localStorage.setItem(BLOGS_CACHE_KEY, JSON.stringify(publishedBlogs));
        preloadBlogImages(publishedBlogs);
        return publishedBlogs;
      })
      .catch((error) => {
        blogsPromise = null;
        throw error;
      });
  }

  return blogsPromise;
};

export const prefetchBlogs = () => loadBlogs().catch(() => {});

export const invalidateBlogsCache = () => {
  blogsPromise = null;
  localStorage.removeItem(BLOGS_CACHE_KEY);
};
