import { supabase } from "../supabase";

/**
 * Obtener todos los cursos ordenados
 */
export const getCourses = async () => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching courses:", error);
    return { data: null, error };
  }

  return { data: data || [], error: null };
};

/**
 * Obtener un curso por ID
 */
export const getCourseById = async (id) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching course:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Crear un nuevo curso
 */
export const createCourse = async (course) => {
  const { data, error } = await supabase
    .from("courses")
    .insert([course])
    .select()
    .single();

  if (error) {
    console.error("Error creating course:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Actualizar un curso
 */
export const updateCourse = async (id, updates) => {
  const { data, error } = await supabase
    .from("courses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating course:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Eliminar un curso
 */
export const deleteCourse = async (id) => {
  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) {
    console.error("Error deleting course:", error);
    return { data: false, error };
  }

  return { data: true, error: null };
};
