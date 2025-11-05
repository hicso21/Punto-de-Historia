import { useEffect, useState } from "react";
import AboutSection from "../components/AboutSection";
import { getSiteConfig } from "../lib/request/siteConfig";
import { CloudCog } from "lucide-react";
import ContactSection from "../components/ContactSection";

const ContactView = function () {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [configSite, setConfigSite] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const apiUrl = `${
        import.meta.env.VITE_SUPABASE_URL
      }/functions/v1/send-contact-email`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setStatus({
        type: "success",
        message: "¡Mensaje enviado con éxito! Te responderé pronto.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Error al enviar el mensaje. Por favor, intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const config_site = localStorage.getItem("config_site");
    setConfigSite(JSON.parse(config_site));
    console.log(JSON.parse(config_site));
  }, []);

  return (
    <ContactSection
      formData={formData}
      status={status}
      isSubmitting={isSubmitting}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      configSite={configSite}
    />
  );
};

export default ContactView;
