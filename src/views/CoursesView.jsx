import CoursesSection from "../components/CoursesSection";
import LoadingSection from "../components/LoadingSection";
import { useEffect, useState } from "react";
import { getCourses } from "../lib/api/courses";

export default function CoursesView() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await getCourses();

      if (error) throw error;

      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSection />;

  return (
    <CoursesSection
      courses={courses}
      selectedCourse={selectedCourse}
      setSelectedCourse={setSelectedCourse}
    />
  );
}
