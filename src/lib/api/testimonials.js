import { supabase } from "../supabase";

/**
 * Obtener todos los testimonios
 */
export const getTestimonials = async () => {
  const { data, error } = await supabase.from("testimonials").select("*");

  if (error) {
    console.error("Error fetching testimonials:", error);
    return { data: null, error };
  }

  return { data: data || [], error: null };
};

/**
 * Obtener un testimonio por ID
 */
export const getTestimonialById = async (id) => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching testimonial:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Crear un nuevo testimonio
 */
export const createTestimonial = async (testimonial) => {
  const { data, error } = await supabase
    .from("testimonials")
    .insert([testimonial])
    .select()
    .single();

  if (error) {
    console.error("Error creating testimonial:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Actualizar un testimonio
 */
export const updateTestimonial = async (id, updates) => {
  const { data, error } = await supabase
    .from("testimonials")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating testimonial:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Eliminar un testimonio
 */
export const deleteTestimonial = async (id) => {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    console.error("Error deleting testimonial:", error);
    return { data: false, error };
  }

  return { data: true, error: null };
};
