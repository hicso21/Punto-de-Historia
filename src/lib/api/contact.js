import { supabase } from "../supabase";
import { getSiteConfig } from "./siteConfig";

export const sendContactEmail = async ({
  firstName,
  lastName,
  email,
  message,
}) => {
  try {
    const { data: siteData, error: siteError } = await getSiteConfig();

    // Invoca la Edge Function con el body que contiene los datos del formulario
    const { data, error } = await supabase.functions.invoke("resend-email", {
      body: {
        firstName,
        lastName,
        email,
        message,
        // Asegúrate de usar un email con tu dominio verificado
        from: email, // o el email que hayas configurado
        to: siteData.email_owner
          ? siteData.email_owner
          : "puntodehistoria@gmail.com", // el email donde quieres recibir los mensajes
      },
    });

    // Si hay un error, lanza una excepción
    if (error) {
      throw new Error(error.message || "Error al enviar el mensaje");
    }

    // Retorna los datos de éxito
    return data;
  } catch (err) {
    // Maneja errores y lanza una excepción para que el componente la capture
    throw new Error(err.message || "Error desconocido al enviar el email");
  }
};
