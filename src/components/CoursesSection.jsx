import { useState, useEffect } from 'react';
import { X, ExternalLink, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';

const CourseModal = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-75" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="bg-white">
            <div className="relative h-64 overflow-hidden">
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="p-8">
              <h3 className="text-3xl font-bold text-[#0a1128] mb-4">{course.title}</h3>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-[#ff5722]">
                <p className="text-gray-700 font-medium">{course.short_description}</p>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-[#0a1128] mb-3">Descripción Completa</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {course.full_description}
                </p>
              </div>

              <div className="flex justify-center">
                <a
                  href={course.purchase_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#ff5722] hover:bg-[#ff6b3d] text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>Comprar Ahora</span>
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5722]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0a1128] mb-4">Cursos y E-books</h2>
            <div className="w-24 h-1 bg-[#ff5722] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profundiza en la historia española con mis cursos especializados y e-books detallados
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Próximamente nuevos cursos y e-books</p>
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
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </>
  );
};

export default CoursesSection;
