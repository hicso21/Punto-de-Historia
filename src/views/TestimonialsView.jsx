import { useEffect, useState } from "react";
import LoadingSection from "../components/LoadingSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { getTestimonials } from "../lib/api/testimonials";

const TestimonialsView = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await getTestimonials();

      if (!error) setTestimonials(data || []);

      setLoading(false);
    };

    fetch();
  }, []);

  if (loading) return <LoadingSection />;

  return <TestimonialsSection testimonials={testimonials} loading={loading} />;
};

export default TestimonialsView;
