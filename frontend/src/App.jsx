import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import useThemeStore from "./store/themeStore";

// Layouts
import MainLayout from "./layouts/MainLayout";
import {
  loadBlogPage,
  loadExperiencePage,
  loadProjectsPage,
  loadSkillsPage,
} from "./utils/routePreloaders";

// Public Pages
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(loadProjectsPage);
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Skills = lazy(loadSkillsPage);
const Experience = lazy(loadExperiencePage);
const CodingStats = lazy(() => import("./pages/CodingStats"));
const Blog = lazy(loadBlogPage);
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));

// Admin Pages
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProjects = lazy(() => import("./pages/admin/Projects"));
const AdminSkills = lazy(() => import("./pages/admin/Skills"));
const AdminExperiences = lazy(() => import("./pages/admin/Experiences"));
const AdminBlogs = lazy(() => import("./pages/admin/Blogs"));
const AdminContacts = lazy(() => import("./pages/admin/Contacts"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply theme on mount
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-white dark:bg-dark-900" />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="skills" element={<Skills />} />
            <Route path="experience" element={<Experience />} />
            <Route path="coding-stats" element={<CodingStats />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogDetail />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="experiences" element={<AdminExperiences />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 - Catch all */}
          <Route path="*" element={<MainLayout />}>
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
