import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { preloadPrimaryViews } from "../utils/routePreloaders";

const MainLayout = () => {
  useEffect(() => {
    let timeoutId;
    const frameId = window.requestAnimationFrame(() => {
      timeoutId = window.setTimeout(preloadPrimaryViews, 250);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
