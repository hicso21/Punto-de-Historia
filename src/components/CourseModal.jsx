import { ExternalLink, X } from "lucide-react";

const CourseModal = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

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
              <h3 className="text-3xl font-bold text-[#0a1128] mb-4">
                {course.title}
              </h3>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-[#ff5722]">
                <p className="text-gray-700 font-medium">
                  {course.short_description}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-[#0a1128] mb-3">
                  Descripción Completa
                </h4>
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

export default CourseModal;
