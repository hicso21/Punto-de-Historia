import { User } from "lucide-react";

const AboutSection = ({
  biography_paragraph,
  biography_src,
  biography_footer,
}) => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a1128] mb-4">Sobre Mí</h2>
          <div className="w-24 h-1 bg-[#ff5722] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-[#ff5722] to-[#ff8a50] p-1 shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden">
                  {biography_src ? (
                    <img src={biography_src} alt="Autoretrato" />
                  ) : (
                    <User className="w-32 h-32 text-gray-400" />
                  )}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0a1128] rounded-full opacity-10"></div>
            </div>
          </div>

          <div className="space-y-6">
            {biography_paragraph
              .split("\n")
              .filter((item) => item.length > 1)
              .map((item, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-700 leading-relaxed"
                >
                  {item}
                </p>
              ))}

            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600 italic">"{biography_footer}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
