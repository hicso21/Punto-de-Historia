import { useEffect, useState } from "react";
import ContactSection from "../components/ContactSection";
import { sendContactEmail } from "../lib/api/contact";

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
      await sendContactEmail(formData);

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
