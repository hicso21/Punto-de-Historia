import { supabase } from "../supabase";

export const sendContactEmail = async ({
  firstName,
  lastName,
  email,
  message,
}) => {
  try {
    // Invoca la Edge Function con el body que contiene los datos del formulario
    const { data, error } = await supabase.functions.invoke("resend-email", {
      body: {
        firstName,
        lastName,
        email,
        message,
      },
    });
    // Si hay un error, lanza una excepción
    if (error) {
      throw new Error(error.message || "Error al enviar el mensaje");
    }
    // Retorna los datos de éxito (puedes personalizar esto según lo que devuelva tu función)
    return data;
  } catch (err) {
    // Maneja errores y lanza una excepción para que el componente la capture
    throw new Error(err.message || "Error desconocido al enviar el email");
  }
};
