import {
  Mail,
  Send,
  Youtube,
  Instagram,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ContactSection = ({
  formData,
  status,
  isSubmitting,
  handleChange,
  handleSubmit,
  configSite,
}) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a1128] mb-4">Contacto</h2>
          <div className="w-24 h-1 bg-[#ff5722] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes alguna pregunta o sugerencia? ¡Me encantaría escucharte!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold text-[#0a1128] mb-6">
              Sígueme en Redes Sociales
            </h3>

            <div className="space-y-4 mb-8">
              <a
                href={configSite?.youtube_owner}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-[#ff5722]"
              >
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#0a1128]">YouTube</p>
                  <p className="text-sm text-gray-600">Punto de Historia</p>
                </div>
              </a>

              <a
                href={configSite?.instagram_owner}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:border-[#ff5722]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#0a1128]">Instagram</p>
                  <p className="text-sm text-gray-600">@puntodehistoria</p>
                </div>
              </a>
            </div>

            <div className="bg-gradient-to-br from-[#0a1128] to-[#1a2744] rounded-xl p-6 text-white">
              <Mail className="w-12 h-12 mb-4 text-[#ff5722]" />
              <h4 className="text-xl font-bold mb-2">
                ¿Prefieres escribir un email directo?
              </h4>
              <p className="text-gray-300">
                También puedes contactarme directamente a través del formulario
                de contacto. Respondo todos los mensajes personalmente.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-[#0a1128] mb-6">
              Envíame un Mensaje
            </h3>

            {status?.message && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
                  status.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`text-sm ${
                    status.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {status.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData?.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5722] focus:border-transparent transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Apellido *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData?.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5722] focus:border-transparent transition-all"
                    placeholder="Tu apellido"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5722] focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData?.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5722] focus:border-transparent transition-all resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ff5722] hover:bg-[#ff6b3d] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
