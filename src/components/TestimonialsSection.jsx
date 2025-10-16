import { useState, useEffect } from 'react';
import { Quote, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

const mockTestimonials = [
  {
    id: 1,
    firstName: "Carlos",
    lastName: "Rodríguez",
    message: "Los cursos de Punto de Historia han transformado mi comprensión de la historia española. La forma de explicar es clara, entretenida y muy profesional. ¡Totalmente recomendado!",
  },
  {
    id: 2,
    firstName: "María",
    lastName: "González",
    message: "Como profesora de historia, estos recursos me han ayudado enormemente en mis clases. El contenido es riguroso pero accesible, perfecto para estudiantes de todos los niveles.",
  },
  {
    id: 3,
    firstName: "Javier",
    lastName: "Martínez",
    message: "Nunca pensé que la historia pudiera ser tan fascinante. Gracias a Punto de Historia he descubierto una pasión que no sabía que tenía. El e-book de batallas es excepcional.",
  },
  {
    id: 4,
    firstName: "Ana",
    lastName: "López",
    message: "La calidad del contenido es impresionante. Se nota la investigación y el cuidado en cada detalle. He aprendido más aquí que en años de estudio tradicional.",
  },
  {
    id: 5,
    firstName: "Pedro",
    lastName: "Sánchez",
    message: "Excelente trabajo divulgativo. Consigue hacer la historia accesible sin perder rigor académico. Los videos de YouTube son el complemento perfecto para los cursos.",
  },
  {
    id: 6,
    firstName: "Laura",
    lastName: "Fernández",
    message: "Me encanta cómo conecta los eventos históricos con el presente. Da una perspectiva única que no encuentras en otros lugares. ¡Sigue así!",
  },
]

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff5722]"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0a1128] mb-4">Testimonios</h2>
          <div className="w-24 h-1 bg-[#ff5722] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lo que dicen quienes han disfrutado del contenido de Punto de Historia
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Próximamente testimonios de nuestra comunidad</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ff5722] to-[#ff8a50] rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-white" />
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.message}"
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-[#0a1128] font-bold text-center">
                    {testimonial.first_name} {testimonial.last_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
