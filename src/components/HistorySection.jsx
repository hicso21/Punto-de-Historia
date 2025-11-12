const HistorySection = ({ periods, icons, youtube_link }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a1128] mb-4">
            Historia de España
          </h2>
          <div className="w-24 h-1 bg-[#ff5722] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un viaje a través de los momentos más importantes que han forjado la
            identidad española
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {periods.map((period, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-[#ff5722] group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ff5722] to-[#ff8a50] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {icons[index % icons.length]}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#0a1128] mb-2">
                    {period?.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#ff5722] mb-4">
                    {period?.period}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {period?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#0a1128] to-[#1a2744] rounded-2xl p-8 shadow-2xl">
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Quieres profundizar más?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              En mi canal de YouTube encontrarás videos detallados sobre estos y
              muchos otros temas de la historia española. ¡Suscríbete para no
              perderte ningún contenido!
            </p>
            <a
              href={youtube_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#ff5722] hover:bg-[#ff6b3d] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              <span>Ver Canal de YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
