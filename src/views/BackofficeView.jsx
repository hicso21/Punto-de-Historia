import BackofficeSection from "../components/BackofficeSection";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import BackofficeLogin from "../components/BackofficeLogin";
import {
  createHistoryCard,
  getHistoryCards,
  updateHistoryCard,
} from "../lib/api/historyCards";
import { createCourse, getCourses, updateCourse } from "../lib/api/courses";
import {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
} from "../lib/api/testimonials";
import { getSiteConfig, updateSiteConfig } from "../lib/api/siteConfig";
import { signIn, signOut } from "../lib/api/auth";

export default function BackofficeView() {
  const [activeTab, setActiveTab] = useState("history_cards");
  const [historyCards, setHistoryCards] = useState([]);
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [siteConfig, setSiteConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === "history_cards") {
        fetchHistoryCards();
      } else if (activeTab === "courses") {
        fetchCourses();
      } else if (activeTab === "testimonials") {
        fetchTestimonials();
      } else if (activeTab === "site_config") {
        fetchSiteConfig();
      }
    }
  }, [activeTab, isAuthenticated]);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const { data, error } = await signIn(email.trim(), password);

      if (error) {
        setLoginError(error.message);
        console.error("Login error:", error);
      } else if (data.session) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Login exception:", err);
      setLoginError("Error al intentar iniciar sesión. Verifica tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeeLandingPage = async () => {
    window.location.replace(window.location.origin);
  };

  const handleLogout = async () => {
    await signOut();
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  const fetchHistoryCards = async () => {
    setLoading(true);
    const { data, error } = await getHistoryCards();
    if (!error) setHistoryCards(data || []);
    setLoading(false);
  };

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await getCourses();
    if (!error) setCourses(data || []);
    setLoading(false);
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await getTestimonials();
    if (!error) setTestimonials(data || []);
    setLoading(false);
  };

  const fetchSiteConfig = async () => {
    setLoading(true);
    const { data, error } = await getSiteConfig();
    if (!error && data) {
      setSiteConfig(data);
      setFormData(data);
    }
    setLoading(false);
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      if (activeTab === "history_cards") {
        setFormData({
          title: "",
          period: "",
          description: "",
          icon: "",
          order_index: 0,
        });
      } else if (activeTab === "courses") {
        setFormData({
          title: "",
          short_description: "",
          full_description: "",
          image_url: "",
          purchase_link: "",
          order_index: 0,
        });
      } else if (activeTab === "testimonials") {
        setFormData({
          first_name: "",
          last_name: "",
          message: "",
        });
      }
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (activeTab === "history_cards") {
      if (editingItem) {
        const { error } = await updateHistoryCard(editingItem.id, updates);

        if (!error) fetchHistoryCards();
      } else {
        const { error } = await createHistoryCard(formData);

        if (!error) fetchHistoryCards();
      }
    } else if (activeTab === "courses") {
      if (editingItem) {
        const { error } = await updateCourse(editingItem.id, formData);

        if (!error) fetchCourses();
      } else {
        const { error } = await createCourse(formData);

        if (!error) fetchCourses();
      }
    } else if (activeTab === "testimonials") {
      if (editingItem) {
        const { error } = await updateTestimonial(editingItem.id, formData);

        if (!error) fetchTestimonials();
      } else {
        const { error } = await createTestimonial(formData);

        if (!error) fetchTestimonials();
      }
    } else if (activeTab === "site_config") {
      // Para site_config siempre es una actualización
      if (siteConfig?.id) {
        const { error } = await updateSiteConfig(formData, siteConfig.id);

        if (!error) fetchSiteConfig();
      }
    }

    setLoading(false);
    closeModal();
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este elemento?")) return;

    setLoading(true);
    const table =
      activeTab === "history_cards"
        ? "history_cards"
        : activeTab === "courses"
        ? "courses"
        : "testimonials";
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (!error) {
      if (activeTab === "history_cards") fetchHistoryCards();
      else if (activeTab === "courses") fetchCourses();
      else fetchTestimonials();
    }
    setLoading(false);
  };

  const getModalTitle = () => {
    if (activeTab === "history_cards") return "Carta de Historia";
    if (activeTab === "courses") return "Curso";
    if (activeTab === "testimonials") return "Testimonio";
    return "Configuración del Sitio";
  };

  const getTableTitle = () => {
    if (activeTab === "history_cards") return "Gestión de Cartas de Historia";
    if (activeTab === "courses") return "Gestión de Cursos";
    if (activeTab === "testimonials") return "Gestión de Testimonios";
    return "Configuración del Sitio";
  };

  if (!isAuthenticated) {
    return (
      <BackofficeLogin
        handleLogin={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        loading={loading}
      />
    );
  }

  return (
    <BackofficeSection
      handleSeeLandingPage={handleSeeLandingPage}
      handleLogout={handleLogout}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      getModalTitle={getModalTitle}
      getTableTitle={getTableTitle}
      formData={formData}
      setFormData={setFormData}
      siteConfig={siteConfig}
      historyCards={historyCards}
      courses={courses}
      testimonials={testimonials}
      editingItem={editingItem}
      showModal={showModal}
      openModal={openModal}
      closeModal={closeModal}
      loading={loading}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  );
}
