import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import Navbar from "./components/Navbar";
import AboutView from "./views/AboutView";
import BackofficeView from "./views/BackofficeView";
import ContactView from "./views/ContactView";
import CoursesView from "./views/CoursesView";
import HistoryView from "./views/HistoryView";
import TestimonialsView from "./views/TestimonialsView";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [path, setPath] = useState(window.location.pathname);

  const renderSection = () => {
    switch (activeSection) {
      case "about":
        return <AboutView />;
      case "history":
        return <HistoryView />;
      case "courses":
        return <CoursesView />;
      case "testimonials":
        return <TestimonialsView />;
      case "contact":
        return <ContactView />;
      default:
        return <AboutSection />;
    }
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    // Listen for popstate event (browser back/forward)
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  // Check if we're on the admin route
  const isAdminRoute = path === "/admin" || path === "/admin/";

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BackofficeView />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen bg-white">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main>{renderSection()}</main>
      <footer className="bg-[#0a1128] text-white py-8 lg:h-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Punto de Historia. Todos los
            derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
