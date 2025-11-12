import { supabase } from "../supabase";

/**
 * Obtener todas las tarjetas de historia ordenadas
 */
export const getHistoryCards = async () => {
  const { data, error } = await supabase
    .from("history_cards")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching history cards:", error);
    return { data: null, error };
  }

  return { data: data || [], error: null };
};

/**
 * Obtener una tarjeta de historia por ID
 */
export const getHistoryCardById = async (id) => {
  const { data, error } = await supabase
    .from("history_cards")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching history card:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Crear una nueva tarjeta de historia
 */
export const createHistoryCard = async (card) => {
  const { data, error } = await supabase
    .from("history_cards")
    .insert([card])
    .select()
    .single();

  if (error) {
    console.error("Error creating history card:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Actualizar una tarjeta de historia
 */
export const updateHistoryCard = async (id, updates) => {
  const { data, error } = await supabase
    .from("history_cards")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating history card:", error);
    return { data: null, error };
  }

  return { data, error: null };
};

/**
 * Eliminar una tarjeta de historia
 */
export const deleteHistoryCard = async (id) => {
  const { error } = await supabase.from("history_cards").delete().eq("id", id);

  if (error) {
    console.error("Error deleting history card:", error);
    return { data: false, error };
  }

  return { data: true, error: null };
};

/**
 * Reordenar tarjetas de historia
 */
export const reorderHistoryCards = async (cardIds) => {
  try {
    // Actualizar el order_index de cada tarjeta
    const updates = cardIds.map((id, index) =>
      supabase
        .from("history_cards")
        .update({ order_index: index + 1 })
        .eq("id", id)
    );

    await Promise.all(updates);
    return { data: true, error: null };
  } catch (error) {
    console.error("Error reordering history cards:", error);
    return { data: false, error };
  }
};
