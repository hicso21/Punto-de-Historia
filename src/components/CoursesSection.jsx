import { BookOpen, ExternalLink } from "lucide-react";
import CourseModal from "./CourseModal";

const CoursesSection = ({ courses, setSelectedCourse, selectedCourse }) => (
  <>
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a1128] mb-4">
            Cursos y E-books
          </h2>
          <div className="w-24 h-1 bg-[#ff5722] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Profundiza en la historia española con mis cursos especializados y
            e-books detallados
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Próximamente nuevos cursos y e-books
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0a1128] mb-3 group-hover:text-[#ff5722] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {course.short_description}
                  </p>
                  <button className="text-[#ff5722] font-semibold flex items-center space-x-2 group-hover:space-x-3 transition-all">
                    <span>Ver más detalles</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>

    {selectedCourse && (
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    )}
  </>
);

export default CoursesSection;
