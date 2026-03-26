import { useState, useEffect, useRef } from "react";
import "./DevGosthLanding.css";

/* ===== DATA ===== */
const PLANS = [
  {
    name: "Landing Page",
    price: "$700",
    period: "",
    desc: "Tu presencia profesional en internet",
    features: [
      "Diseño personalizado y responsivo",
      "Hasta 5 secciones",
      "Formulario de contacto",
      "SEO básico incluido",
      "Entrega en 1-2 semanas",
      "1 mes de soporte",
    ],
    cta: "Solicitar cotización",
    popular: false,
  },
  {
    name: "Página Informativa",
    price: "$1,000",
    period: "",
    desc: "Sitio web multi-página para tu negocio",
    features: [
      "Hasta 6 páginas (Inicio, Servicios, Nosotros, Contacto...)",
      "Diseño personalizado y responsivo",
      "Formulario de contacto",
      "SEO básico incluido",
      "Entrega en 2-3 semanas",
      "2 meses de soporte",
    ],
    cta: "Solicitar cotización",
    popular: false,
  },
  {
    name: "Landing + Dashboard",
    price: "$1,500",
    period: "",
    desc: "Tu sitio con panel de administración",
    features: [
      "Todo de Landing Page",
      "Panel de administración",
      "Gestión de contenido",
      "Usuarios y roles",
      "Base de datos incluida",
      "Entrega en 3-5 semanas",
      "3 meses de soporte",
    ],
    cta: "Solicitar cotización",
    popular: true,
  },
  {
    name: "App Web Completa",
    price: "$3,000",
    period: "",
    desc: "Solución web a medida para tu negocio",
    features: [
      "Todo de Landing + Dashboard",
      "E-commerce o flujos complejos",
      "Integración con pagos",
      "APIs y automatizaciones",
      "Diseño UX/UI a medida",
      "Entrega en 6-10 semanas",
      "6 meses de soporte",
    ],
    cta: "Hablemos del proyecto",
    popular: false,
  },
];

const SERVICES = [
  {
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    title: "Diseño moderno",
    desc: "Interfaces limpias, atractivas y adaptadas a tu marca. Se ven increíbles en cualquier dispositivo.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Entrega rápida",
    desc: "Landings en 1-2 semanas. Proyectos complejos con cronograma claro desde el inicio. Sin esperas eternas.",
  },
  {
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    title: "Stack moderno",
    desc: "React, Node.js, bases de datos en la nube. Tecnología actual, mantenible y lista para escalar.",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Dashboard a medida",
    desc: "Paneles de control para gestionar tu negocio y ver métricas. Sin tocar una línea de código.",
  },
  {
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    title: "SEO y rendimiento",
    desc: "Código optimizado para Google y para tus usuarios. Velocidad y visibilidad desde el día uno.",
  },
  {
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    title: "Soporte real",
    desc: "No desaparezco al entregar. Correcciones, dudas y mejoras durante todo el período de soporte.",
  },
];

const TESTIMONIALS = [
  {
    name: "Laura M.",
    biz: "Consultora de Marketing",
    text: "Me hizo la landing en una semana y quedó increíble. Conseguí 3 clientes nuevos el primer mes gracias a la web.",
    avatar: "LM",
  },
  {
    name: "Diego F.",
    biz: "Tienda Artesanal",
    text: "Tenía una idea vaga y la convirtió en una tienda online completa. El proceso fue claro y sin sorpresas.",
    avatar: "DF",
  },
  {
    name: "Sofía R.",
    biz: "Clínica Dental",
    text: "El dashboard que desarrolló nos ahorró horas de trabajo cada semana. La inversión se pagó sola en 2 meses.",
    avatar: "SR",
  },
];

const FAQS = [
  {
    q: "¿Cuánto tarda en estar lista mi web?",
    a: "Una landing page tarda entre 1 y 2 semanas. Un proyecto con dashboard entre 3 y 5 semanas. Una app web completa entre 6 y 10 semanas. Siempre con cronograma definido desde el inicio.",
  },
  {
    q: "¿Qué necesito tener listo para empezar?",
    a: "Con el logo, colores de tu marca, textos que quieras mostrar y referencias de diseño es suficiente. Si no tenés todo eso, te ayudo a definirlo.",
  },
  {
    q: "¿Puedo pedir cambios después de la entrega?",
    a: "Incluyo rondas de revisión durante el desarrollo. Una vez entregado, el período de soporte cubre correcciones de bugs. Cambios de alcance se cotizan aparte.",
  },
  {
    q: "¿El precio incluye hosting y dominio?",
    a: "Los precios son del desarrollo. El hosting y dominio los gestionás vos (te recomiendo opciones según tu proyecto), o los incluyo si lo acordamos en la cotización.",
  },
  {
    q: "¿Trabajás con clientes fuera de tu país?",
    a: "Sí, trabajo de forma remota con clientes de toda Latinoamérica. La comunicación es por WhatsApp, videollamadas y email, según prefieran.",
  },
];

const MOCK_STEPS = [
  { step: "01", label: "Brief", desc: "Definimos objetivos y alcance", status: "done" },
  { step: "02", label: "Diseño", desc: "Prototipo y revisión visual", status: "done" },
  { step: "03", label: "Desarrollo", desc: "Código limpio y responsivo", status: "active" },
  { step: "04", label: "Entrega", desc: "Deploy y traspaso del proyecto", status: "pending" },
];

const HERO_STATS = [
  { value: "1-2 sem", label: "Entrega landing" },
  { value: "React", label: "Stack moderno" },
  { value: "0 bugs", label: "Garantía de entrega" },
];

/* ===== HOOKS ===== */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

/* ===== SUB-COMPONENTS ===== */
function AnimatedSection({ children, id, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <section
      ref={ref}
      id={id}
      className={`animate-section ${visible ? "animate-section--visible" : "animate-section--hidden"} ${className}`}
    >
      {children}
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4 4L19 7"
        stroke="var(--green)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--green)">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" onClick={() => setOpen(!open)}>
      <div className="faq-item__header">
        <span className="faq-item__question">{q}</span>
        <span className={`faq-item__toggle ${open ? "faq-item__toggle--open" : ""}`}>+</span>
      </div>
      <div className={`faq-item__answer ${open ? "faq-item__answer--open" : ""}`}>
        <p>{a}</p>
      </div>
    </div>
  );
}

function Logo({ size = "default" }) {
  const iconSize = size === "small" ? 28 : 32;
  const fontSize = size === "small" ? 18 : 20;
  const iconFont = size === "small" ? 14 : 16;
  const radius = size === "small" ? 7 : 8;

  return (
    <a href="#" className="nav__logo">
      <div
        className="nav__logo-icon"
        style={{ width: iconSize, height: iconSize, borderRadius: radius, fontSize: iconFont }}
      >
        G
      </div>
      <span className="nav__logo-text" style={{ fontSize }}>
        Dev<span>Gosth</span>
      </span>
    </a>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function DevGosthLanding() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = () => {
    if (nombre.trim() && mensaje.trim()) setSubmitted(true);
  };

  return (
    <div className="landing">
      {/* ===== NAVBAR ===== */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <Logo />

          <div className="nav__links">
            <a href="#servicios" className="nav-link">Servicios</a>
            <a href="#paquetes" className="nav-link">Paquetes</a>
            <a href="#testimonios" className="nav-link">Testimonios</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#contacto">
              <button className="btn-glow btn-glow--sm">Hablemos</button>
            </a>
          </div>

          <button
            className="nav__mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? "\u2715" : "\u2630"}
          </button>
        </div>

        {mobileMenu && (
          <div className="nav__mobile-menu">
            <a href="#servicios" className="nav-link" onClick={() => setMobileMenu(false)}>Servicios</a>
            <a href="#paquetes" className="nav-link" onClick={() => setMobileMenu(false)}>Paquetes</a>
            <a href="#testimonios" className="nav-link" onClick={() => setMobileMenu(false)}>Testimonios</a>
            <a href="#faq" className="nav-link" onClick={() => setMobileMenu(false)}>FAQ</a>
            <a href="#contacto" onClick={() => setMobileMenu(false)}>
              <button className="btn-glow btn-glow--full">Hablemos</button>
            </a>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__grid-bg" />
        <div className="hero__glow hero__glow--primary" />
        <div className="hero__glow hero__glow--secondary" />

        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              <span className="hero__badge-text">Disponible para nuevos proyectos</span>
            </div>

            <h1 className="hero__title">
              Webs que<br />
              <span>convierten visitas</span><br />
              en clientes
            </h1>

            <p className="hero__desc">
              Desarrollo landing pages, dashboards y apps web a medida.
              Diseño profesional, código limpio y entrega rápida.
            </p>

            <div className="hero__actions">
              <a href="#contacto">
                <button className="btn-glow">Ver mi trabajo</button>
              </a>
              <a href="#paquetes">
                <button className="btn-ghost">Ver paquetes</button>
              </a>
            </div>

            <div className="hero__stats">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="hero__stat-value">{stat.value}</div>
                  <div className="hero__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__mockup">
            <div className="mockup">
              <div className="mockup__dots">
                <span className="mockup__dot mockup__dot--red" />
                <span className="mockup__dot mockup__dot--yellow" />
                <span className="mockup__dot mockup__dot--green" />
              </div>

              <div className="mockup__header">
                <div className="mockup__header-label">Proceso de trabajo</div>
                <div className="mockup__header-url">Tu proyecto</div>
              </div>

              {MOCK_STEPS.map((s, i) => (
                <div key={i} className={`mockup__step mockup__step--${s.status}`}>
                  <div className="mockup__step-indicator">
                    {s.status === "done" ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : s.status === "active" ? (
                      <span className="mockup__step-pulse" />
                    ) : (
                      <span>{s.step}</span>
                    )}
                  </div>
                  <div className="mockup__step-body">
                    <div className="mockup__step-label">{s.label}</div>
                    <div className="mockup__step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}

              <div className="mockup__footer">
                <span className="mockup__footer-dot" />
                <span className="mockup__footer-text">Proceso claro desde el día uno</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <AnimatedSection id="servicios" className="section-alt">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Servicios</span>
            <h2 className="section__title">Todo lo que necesitás para tu presencia digital</h2>
            <p className="section__subtitle">
              Desde una página de presentación hasta sistemas web completos. Siempre con diseño cuidado y código de calidad.
            </p>
          </div>

          <div className="features-grid">
            {SERVICES.map((service, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card__icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--green)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={service.icon} />
                  </svg>
                </div>
                <h3 className="feature-card__title">{service.title}</h3>
                <p className="feature-card__desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== PRICING ===== */}
      <AnimatedSection id="paquetes">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Paquetes</span>
            <h2 className="section__title">Precios claros, sin sorpresas</h2>
            <p className="section__subtitle">
              Elegís el paquete que mejor se adapta a tu proyecto. Todos incluyen diseño personalizado.
            </p>
          </div>

          <div className="plans-grid">
            {PLANS.map((plan, i) => (
              <div key={i} className={`plan-card ${plan.popular ? "plan-card--popular" : ""}`}>
                {plan.popular && <div className="plan-card__badge">Más popular</div>}
                <div className="plan-card__name">{plan.name}</div>
                <div className="plan-card__price-row">
                  <span className="plan-card__price">{plan.price}</span>
                  {plan.period && <span className="plan-card__period">{plan.period}</span>}
                </div>
                <p className="plan-card__desc">{plan.desc}</p>
                <ul className="plan-card__features">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="plan-card__feature">
                      <CheckIcon />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a href="#contacto">
                  <button className={plan.popular ? "btn-glow btn-glow--full" : "btn-ghost btn-ghost--full"}>
                    {plan.cta}
                  </button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== TESTIMONIALS ===== */}
      <AnimatedSection id="testimonios" className="section-alt">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Testimonios</span>
            <h2 className="section__title">Clientes que ya dieron el paso</h2>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {[...Array(5)].map((_, s) => <StarIcon key={s} />)}
                </div>
                <p className="testimonial-card__text">"{t.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__biz">{t.biz}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== FAQ ===== */}
      <AnimatedSection id="faq">
        <div className="container--narrow section">
          <div className="section__header">
            <span className="section-tag">FAQ</span>
            <h2 className="section__title">Preguntas frecuentes</h2>
          </div>

          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </AnimatedSection>

      {/* ===== CONTACT ===== */}
      <AnimatedSection id="contacto" className="section-alt">
        <div className="container--cta contact">
          <span className="section-tag">Contacto</span>
          <h2 className="section__title">¿Listo para empezar?</h2>
          <p className="contact__desc">
            Contame tu idea y te respondo en menos de 24 horas con una propuesta a medida.
          </p>

          <div className="contact__layout">
            <div className="contact__info">
              <p className="contact__info-title">Contacto directo</p>
              <a href="mailto:jarethmoraga@icloud.com" className="contact__info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="contact__info-icon">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
                jarethmoraga@icloud.com
              </a>
              <a href="tel:+50685763191" className="contact__info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="contact__info-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z" />
                </svg>
                +506 8576 3191
              </a>
              <a href="https://wa.me/50685763191" target="_blank" rel="noopener noreferrer" className="contact__info-item contact__info-item--whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="contact__info-icon">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                WhatsApp: +506 8576 3191
              </a>
            </div>

            <div className="contact__divider" />

            <div className="contact__form-col">
              {submitted ? (
                <div className="contact__success">
                  <div className="contact__success-icon">&#10003;</div>
                  <p className="contact__success-title">¡Mensaje recibido!</p>
                  <p className="contact__success-text">
                    Te respondo a la brevedad. Gracias por contactarme.
                  </p>
                </div>
              ) : (
                <div className="contact__form">
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="contact__input"
                  />
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Contame tu proyecto..."
                    className="contact__textarea"
                    rows={4}
                  />
                  <button className="btn-glow btn-glow--full" onClick={handleSubmit}>
                    Enviar mensaje
                  </button>
                </div>
              )}
              <p className="contact__disclaimer">Sin compromiso. Respuesta en menos de 24 horas.</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer__grid">
          <div>
            <Logo size="small" />
            <p className="footer__brand-desc" style={{ marginTop: 16 }}>
              Desarrollo web profesional para negocios que quieren crecer en internet.
            </p>
          </div>

          <div>
            <h4 className="footer__col-title">Servicios</h4>
            {["Landing Page", "Landing + Dashboard", "App Web Completa", "Consultoría"].map((link) => (
              <a key={link} href="#paquetes" className="footer__link">{link}</a>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Info</h4>
            {["Servicios", "Paquetes", "Testimonios", "FAQ"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="footer__link">{link}</a>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Contacto</h4>
            <a href="#contacto" className="footer__link">Formulario</a>
            <a href="#" className="footer__link">WhatsApp</a>
            <a href="#" className="footer__link">LinkedIn</a>
            <a href="#" className="footer__link">GitHub</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">&copy; 2026 DevGosth. Todos los derechos reservados.</span>
          <span className="footer__copy">Hecho con dedicación</span>
        </div>
      </footer>
    </div>
  );
}
