import logo from "../assets/logo_punto_de_historia.png";

const Navbar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: "about", label: "Sobre Mí" },
    { id: "history", label: "Historia de España" },
    { id: "courses", label: "Cursos y E-books" },
    { id: "testimonials", label: "Testimonios" },
    { id: "contact", label: "Contacto" },
  ];

  const toAdmin = () => {
    window.location.replace(window.location.origin + "/admin");
  };

  return (
    <nav className="bg-[#0a1128] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <img
              onClick={toAdmin}
              src={logo}
              alt="Punto de Historia"
              className="h-14 w-14 object-contain"
            />
            <span className="text-[#ff5722] text-2xl font-bold">
              Punto de Historia
            </span>
          </div>

          <div className="hidden md:flex space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? "bg-[#ff5722] text-white"
                    : "text-gray-300 hover:text-white hover:bg-[#1a2744]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => {
                const menu = document.getElementById("mobile-menu");
                menu.classList.toggle("hidden");
              }}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="hidden md:hidden bg-[#0a1128] border-t border-[#1a2744]"
      >
        <div className="px-4 py-4 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                document.getElementById("mobile-menu").classList.add("hidden");
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-[#ff5722] text-white"
                  : "text-gray-300 hover:text-white hover:bg-[#1a2744]"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
