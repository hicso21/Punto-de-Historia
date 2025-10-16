import { useState } from 'react';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import HistorySection from './components/HistorySection';
import CoursesSection from './components/CoursesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      case 'history':
        return <HistorySection />;
      case 'courses':
        return <CoursesSection />;
      case 'testimonials':
        return <TestimonialsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>{renderSection()}</main>
      <footer className="bg-[#0a1128] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Punto de Historia. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
