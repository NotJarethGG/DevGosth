import { useState, useEffect, useRef } from "react";
import "./DevGosthLanding.css";
import devgosthLogo from "./assets/devgosth-logo.png";

/* ===== DATA ===== */
const PLANS = [
  {
    name: "Landing Page",
    price: "$700",
    desc: "Tu vitrina digital, lista para convertir.",
    features: [
      "Diseño 100% personalizado",
      "Hasta 5 secciones",
      "Formulario de contacto funcional",
      "SEO básico + meta tags",
      "Responsivo en todos los dispositivos",
      "Entrega en 1–2 semanas",
      "1 mes de soporte incluido",
    ],
    cta: "Solicitar cotización",
    popular: false,
  },
  {
    name: "Página Informativa",
    price: "$1,000",
    desc: "Un sitio completo que cuenta toda tu historia.",
    features: [
      "Hasta 6 páginas únicas",
      "Diseño 100% personalizado",
      "Formulario de contacto funcional",
      "SEO básico + meta tags",
      "Responsivo en todos los dispositivos",
      "Entrega en 2–3 semanas",
      "2 meses de soporte incluido",
    ],
    cta: "Solicitar cotización",
    popular: false,
  },
  {
    name: "Landing + Dashboard",
    price: "$1,500",
    desc: "Tu web pública más un panel para gestionar todo.",
    features: [
      "Todo lo de Landing Page",
      "Panel de administración a medida",
      "Gestión de contenido dinámico",
      "Sistema de usuarios y roles",
      "Base de datos en la nube",
      "Entrega en 3–5 semanas",
      "3 meses de soporte incluido",
    ],
    cta: "Solicitar cotización",
    popular: true,
  },
  {
    name: "App Web Completa",
    price: "$3,000",
    desc: "Una plataforma digital hecha a la medida de tu negocio.",
    features: [
      "Todo lo de Landing + Dashboard",
      "E-commerce o flujos complejos",
      "Integración con pasarelas de pago",
      "APIs externas y automatizaciones",
      "Diseño UX/UI desde cero",
      "Entrega en 6–10 semanas",
      "6 meses de soporte incluido",
    ],
    cta: "Hablemos del proyecto",
    popular: false,
  },
];

const SERVICES = [
  {
    num: "01",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    title: "Diseño premium",
    desc: "Interfaces que impactan desde el primer segundo. Limpias, modernas y fieles a tu marca, sin importar el dispositivo.",
  },
  {
    num: "02",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Entregas rápidas",
    desc: "Landing pages listas en 1–2 semanas. Proyectos más grandes con cronograma claro desde el día uno. Sin excusas.",
  },
  {
    num: "03",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    title: "Stack moderno",
    desc: "React, Next.js, Node.js y bases de datos en la nube. Código mantenible, escalable y listo para crecer contigo.",
  },
  {
    num: "04",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Dashboards a medida",
    desc: "Paneles de control para que gestiones tu negocio sin saber programar. Métricas, usuarios, contenido — todo en un lugar.",
  },
  {
    num: "05",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    title: "SEO y velocidad",
    desc: "Código optimizado para Google y para tus usuarios. Primeras posiciones y tiempos de carga que no espantan a nadie.",
  },
  {
    num: "06",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    title: "Soporte de verdad",
    desc: "No desaparezco al entregar. Correcciones, dudas y mejoras durante todo tu período de soporte. Siempre disponible.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Brief",
    desc: "Hablamos de tu negocio, tus objetivos y el problema que queremos resolver. Definimos el alcance exacto.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    num: "02",
    title: "Diseño",
    desc: "Prototipamos la solución visualmente. Revisamos juntos hasta que el diseño sea exactamente lo que imaginabas.",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  },
  {
    num: "03",
    title: "Desarrollo",
    desc: "Código limpio, responsivo y optimizado. Te mantengo informado con actualizaciones regulares en cada etapa.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    num: "04",
    title: "Entrega",
    desc: "Deploy en producción, capacitación del panel y traspaso completo. Tu proyecto vive — y yo sigo disponible.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const TESTIMONIALS = [
  {
    name: "Laura M.",
    biz: "Consultora de Marketing Digital",
    text: "Pedí una landing page y en una semana tenía algo que superó todas mis expectativas. El primer mes conseguí 3 clientes nuevos solo gracias a la web. La inversión se pagó sola.",
    avatar: "LM",
    stars: 5,
  },
  {
    name: "Diego F.",
    biz: "Fundador, Tienda Artesanal",
    text: "Tenía una idea muy vaga y la convirtió en una tienda online completa con carrito y pagos. El proceso fue transparente, sin sorpresas de precio y el resultado fue mejor de lo que imaginé.",
    avatar: "DF",
    stars: 5,
  },
  {
    name: "Sofía R.",
    biz: "Directora, Clínica Dental",
    text: "El dashboard que nos desarrolló automatizó tareas que nos robaban 3 horas al día. En 2 meses la inversión estaba más que recuperada. 100% lo recomiendo.",
    avatar: "SR",
    stars: 5,
  },
];

const FAQS = [
  {
    q: "¿Cuánto tarda en estar lista mi web?",
    a: "Una landing page: 1–2 semanas. Un sitio informativo: 2–3 semanas. Landing + dashboard: 3–5 semanas. App web completa: 6–10 semanas. Siempre con un cronograma claro desde el primer día para que sepas exactamente qué esperar y cuándo.",
  },
  {
    q: "¿Qué necesito tener listo para arrancar?",
    a: "Con el logo, los colores de tu marca, los textos que querés mostrar y algunas referencias de diseño es suficiente para empezar. Si no tenés todo eso, no hay problema — te ayudo a definirlo en la primera llamada.",
  },
  {
    q: "¿Puedo pedir cambios una vez entregado?",
    a: "Sí. Durante el desarrollo tenés rondas de revisión incluidas para ajustar lo que sea. Una vez entregado, el período de soporte cubre correcciones de bugs y ajustes menores. Los cambios de alcance o nuevas funcionalidades se cotizan aparte, siempre con presupuesto previo.",
  },
  {
    q: "¿El precio incluye hosting y dominio?",
    a: "Los precios cubren únicamente el desarrollo. El hosting y dominio los contratás vos — te recomiendo las mejores opciones según tu proyecto (y muchas veces son muy económicas). Si preferís, puedo incluirlos en la cotización y gestionar todo yo.",
  },
  {
    q: "¿Trabajás con clientes de otros países?",
    a: "Sí, trabajo 100% remoto con clientes de toda Latinoamérica y España. La comunicación es por WhatsApp, Zoom o email según prefieras. La diferencia horaria nunca ha sido un problema.",
  },
  {
    q: "¿Qué pasa si el proyecto cambia a mitad del desarrollo?",
    a: "Pasa más seguido de lo que pensás. Si el alcance cambia, paramos, lo re-evaluamos y te presento un ajuste de presupuesto antes de continuar. Sin sorpresas, sin costos ocultos.",
  },
];

const HERO_STATS = [
  { value: "15+", label: "Proyectos entregados" },
  { value: "<24h", label: "Tiempo de respuesta" },
  { value: "100%", label: "Clientes satisfechos" },
];

const TECH_ITEMS = [
  "React", "Next.js", "Node.js", "TypeScript", "PostgreSQL",
  "Supabase", "Tailwind CSS", "Figma", "REST APIs", "Prisma", "Vercel", "AWS",
];

/* ===== HOOKS ===== */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      }
    };
    let rx = -100, ry = -100, raf;
    const tick = () => {
      rx += (posRef.current.x - rx) * 0.1;
      ry += (posRef.current.y - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => document.body.classList.add("cursor--hover");
    const onLeave = () => document.body.classList.remove("cursor--hover");
    const timeout = setTimeout(() => {
      document.querySelectorAll("a, button, .feature-card, .plan-card, .testimonial-card, .faq-item, .process-card")
        .forEach(el => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    }, 400);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, []);

  return { dotRef, ringRef };
}

/* ===== COMPONENTS ===== */
function Cursor() {
  const { dotRef, ringRef } = useCursor();
  return (
    <>
      <div ref={ringRef} className="cursor__ring" />
      <div ref={dotRef} className="cursor__dot" />
    </>
  );
}

function Marquee() {
  const items = [...TECH_ITEMS, ...TECH_ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}<span className="marquee__sep">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--green)">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-item__header">
        <span className="faq-item__question">{q}</span>
        <span className="faq-item__toggle">{open ? "−" : "+"}</span>
      </div>
      <div className="faq-item__answer"><p>{a}</p></div>
    </div>
  );
}

function Logo({ size = "default" }) {
  const s = size === "small";
  return (
    <a href="#" className="nav__logo">
      <img
        src={devgosthLogo}
        alt="DevGosth"
        className="nav__logo-img"
        style={{ height: s ? 52 : 64 }}
      />
    </a>
  );
}

function HeroBrowser() {
  return (
    <div className="browser">
      <div className="browser__bar">
        <div className="browser__dots">
          <span /><span /><span />
        </div>
        <div className="browser__url">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          tu-proyecto.com
        </div>
        <div className="browser__bar-spacer" />
      </div>

      <div className="browser__page">
        <div className="bw-nav">
          <div className="bw-nav__logo" />
          <div className="bw-nav__links"><div /><div /><div /></div>
          <div className="bw-nav__cta" />
        </div>

        <div className="bw-hero">
          <div className="bw-badge" />
          <div className="bw-title">
            <div className="bw-line bw-line--xl" />
            <div className="bw-line bw-line--lg bw-line--accent" />
            <div className="bw-line bw-line--md" />
          </div>
          <div className="bw-desc">
            <div className="bw-line bw-line--sm" />
            <div className="bw-line bw-line--sm bw-line--short" />
          </div>
          <div className="bw-btns">
            <div className="bw-btn bw-btn--filled" />
            <div className="bw-btn" />
          </div>
        </div>

        <div className="bw-cards">
          <div className="bw-card"><div className="bw-card__dot" /><div className="bw-card__lines"><div /><div /></div></div>
          <div className="bw-card bw-card--active"><div className="bw-card__dot bw-card__dot--green" /><div className="bw-card__lines"><div /><div /></div></div>
          <div className="bw-card"><div className="bw-card__dot" /><div className="bw-card__lines"><div /><div /></div></div>
        </div>

        <div className="bw-footer">
          <div className="bw-footer__bar" />
          <div className="bw-footer__bar bw-footer__bar--sm" />
        </div>
      </div>

      <div className="browser__chip browser__chip--tl">
        <div className="browser__chip-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
          </svg>
        </div>
        <div className="browser__chip-body">
          <div className="browser__chip-label">Conversión</div>
          <div className="browser__chip-value">+127%</div>
        </div>
      </div>

      <div className="browser__chip browser__chip--br">
        <div className="browser__chip-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div className="browser__chip-body">
          <div className="browser__chip-label">PageSpeed</div>
          <div className="browser__chip-value">98 / 100</div>
        </div>
      </div>
    </div>
  );
}

/* ===== MAIN ===== */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function DevGosthLanding() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setScrollProgress(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = async () => {
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) return;
    setSending(true);
    setFormError(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nuevo mensaje de ${nombre} — DevGosth`,
          from_name: nombre,
          email,
          message: mensaje,
        }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else setFormError(true);
    } catch {
      setFormError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="landing">
      <Cursor />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <Logo />
          <div className="nav__links">
            <a href="#servicios" className="nav-link">Servicios</a>
            <a href="#proceso" className="nav-link">Proceso</a>
            <a href="#paquetes" className="nav-link">Paquetes</a>
            <a href="#testimonios" className="nav-link">Clientes</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#contacto">
              <button className="btn-primary btn-primary--sm">Hablemos →</button>
            </a>
          </div>
          <button className="nav__mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            <span className={`nav__hamburger ${mobileMenu ? "nav__hamburger--open" : ""}`} />
          </button>
        </div>
        {mobileMenu && (
          <div className="nav__mobile-menu">
            {[["servicios","Servicios"],["proceso","Proceso"],["paquetes","Paquetes"],["testimonios","Clientes"],["faq","FAQ"]].map(([id,label]) => (
              <a key={id} href={`#${id}`} className="nav-link" onClick={() => setMobileMenu(false)}>{label}</a>
            ))}
            <a href="#contacto" onClick={() => setMobileMenu(false)}>
              <button className="btn-primary btn-primary--full">Hablemos →</button>
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb" />
          <div className="hero__grid" />
          <div className="hero__noise" />
        </div>

        <div className="hero__inner">
          {/* LEFT — text */}
          <div className="hero__content">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              Disponible · CR &amp; Latinoamérica
            </div>

            <h1 className="hero__title">
              Diseño y desarrollo<br />
              web <span className="hero__title-em">que convierte.</span>
            </h1>

            <p className="hero__desc">
              Landing pages, dashboards y apps web a medida.
              Diseño premium, código limpio y entrega puntual — sin excusas.
            </p>

            <div className="hero__actions">
              <a href="#contacto">
                <button className="btn-primary">
                  Empezar proyecto
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </a>
              <a href="#paquetes">
                <button className="btn-ghost">Ver paquetes</button>
              </a>
            </div>

            <div className="hero__stats">
              {HERO_STATS.map((stat, i) => (
                <div key={stat.label} className="hero__stat">
                  {i > 0 && <div className="hero__stat-sep" />}
                  <div>
                    <div className="hero__stat-value">{stat.value}</div>
                    <div className="hero__stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — browser preview */}
          <div className="hero__visual">
            <HeroBrowser />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* SERVICES */}
      <AnimatedSection id="servicios" className="section-alt">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Servicios</span>
            <h2 className="section__title">
              Todo lo que necesitás<br />
              <span className="text-gradient">para crecer online</span>
            </h2>
            <p className="section__subtitle">
              Desde una landing de alto impacto hasta sistemas web completos. Siempre con diseño premium y código de calidad.
            </p>
          </div>
          <div className="features-grid">
            {SERVICES.map((service, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card__top">
                  <div className="feature-card__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={service.icon} />
                    </svg>
                  </div>
                  <span className="feature-card__num">{service.num}</span>
                </div>
                <h3 className="feature-card__title">{service.title}</h3>
                <p className="feature-card__desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* PROCESS */}
      <AnimatedSection id="proceso">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Proceso</span>
            <h2 className="section__title">
              Así trabajamos<br />
              <span className="text-gradient">juntos</span>
            </h2>
            <p className="section__subtitle">
              Un proceso claro y transparente de principio a fin. Sin sorpresas, sin cajas negras.
            </p>
          </div>
          <div className="process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="process-card">
                <div className="process-card__num">{step.num}</div>
                <div className="process-card__icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={step.icon} />
                  </svg>
                </div>
                <h3 className="process-card__title">{step.title}</h3>
                <p className="process-card__desc">{step.desc}</p>
                {i < PROCESS_STEPS.length - 1 && <div className="process-card__connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* PRICING */}
      <AnimatedSection id="paquetes" className="section-alt">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Paquetes</span>
            <h2 className="section__title">
              Precios claros,<br />
              <span className="text-gradient">sin sorpresas</span>
            </h2>
            <p className="section__subtitle">
              Elegís el paquete que mejor se adapta a tu proyecto. Todos incluyen diseño personalizado y soporte post-entrega.
            </p>
          </div>
          <div className="plans-grid">
            {PLANS.map((plan, i) => (
              <div key={i} className={`plan-card ${plan.popular ? "plan-card--popular" : ""}`}>
                {plan.popular && <div className="plan-card__badge">⭐ Más popular</div>}
                <div className="plan-card__name">{plan.name}</div>
                <div className="plan-card__price">{plan.price}</div>
                <p className="plan-card__desc">{plan.desc}</p>
                <ul className="plan-card__features">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="plan-card__feature">
                      <CheckIcon />{feat}
                    </li>
                  ))}
                </ul>
                <a href="#contacto">
                  <button className={plan.popular ? "btn-primary btn-primary--full" : "btn-ghost btn-ghost--full"}>
                    {plan.cta}
                  </button>
                </a>
              </div>
            ))}
          </div>
          <p className="plans-note">
            ¿Tu proyecto no encaja en ningún paquete?{" "}
            <a href="#contacto" className="plans-note__link">Hablemos y lo cotizamos a medida →</a>
          </p>
        </div>
      </AnimatedSection>

      {/* TESTIMONIALS */}
      <AnimatedSection id="testimonios">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Clientes</span>
            <h2 className="section__title">
              Resultados que<br />
              <span className="text-gradient">hablan solos</span>
            </h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {[...Array(t.stars)].map((_, s) => <StarIcon key={s} />)}
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

      {/* FAQ */}
      <AnimatedSection id="faq" className="section-alt">
        <div className="container--narrow section">
          <div className="section__header">
            <span className="section-tag">FAQ</span>
            <h2 className="section__title">Preguntas frecuentes</h2>
            <p className="section__subtitle">Todo lo que querés saber antes de arrancar.</p>
          </div>
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </AnimatedSection>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-banner__bg">
          <div className="cta-banner__orb cta-banner__orb--1" />
          <div className="cta-banner__orb cta-banner__orb--2" />
          <div className="hero__grid" style={{ opacity: 0.4 }} />
          <div className="hero__noise" />
        </div>
        <div className="cta-banner__inner">
          <span className="section-tag">¿Empezamos?</span>
          <h2 className="cta-banner__title">
            Tu próximo proyecto
            <br />
            <span className="text-gradient">empieza con una conversación</span>
          </h2>
          <p className="cta-banner__desc">
            Contame tu idea. En menos de 24 horas te respondo con una propuesta real.
          </p>
          <div className="cta-banner__actions">
            <a href="#contacto">
              <button className="btn-primary cta-banner__btn">
                Escribime ahora
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </a>
            <a href="https://wa.me/50685763191" target="_blank" rel="noopener noreferrer">
              <button className="btn-ghost">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <AnimatedSection id="contacto" className="section-alt">
        <div className="container--cta contact">
          <span className="section-tag">Contacto</span>
          <h2 className="section__title">Hablemos de tu proyecto</h2>
          <p className="contact__desc">
            Sin compromiso. Contame tu idea y recibís una propuesta a medida en menos de 24 horas.
          </p>

          <div className="contact__layout">
            <div className="contact__info">
              <p className="contact__info-title">Contacto directo</p>
              <a href="mailto:jarethmoraga@icloud.com" className="contact__info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="contact__info-icon">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                </svg>
                jarethmoraga@icloud.com
              </a>
              <a href="tel:+50685763191" className="contact__info-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="contact__info-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/>
                </svg>
                +506 8576 3191
              </a>
              <a href="https://wa.me/50685763191" target="_blank" rel="noopener noreferrer" className="contact__info-item contact__info-item--whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="contact__info-icon">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp disponible
              </a>
            </div>

            <div className="contact__divider" />

            <div className="contact__form-col">
              {submitted ? (
                <div className="contact__success">
                  <div className="contact__success-icon">✓</div>
                  <p className="contact__success-title">¡Mensaje enviado!</p>
                  <p className="contact__success-text">Te respondo en menos de 24 horas. ¡Gracias por contactarme!</p>
                </div>
              ) : (
                <div className="contact__form">
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="contact__input"
                    disabled={sending}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu email (para responderte)"
                    className="contact__input"
                    disabled={sending}
                  />
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Contame tu proyecto: ¿qué necesitás y cuándo?"
                    className="contact__textarea"
                    rows={4}
                    disabled={sending}
                  />
                  {formError && (
                    <p className="contact__form-error">
                      Hubo un error al enviar. Intentá por WhatsApp o email directamente.
                    </p>
                  )}
                  <button
                    className="btn-primary btn-primary--full"
                    onClick={handleSubmit}
                    disabled={sending || !nombre.trim() || !email.trim() || !mensaje.trim()}
                  >
                    {sending ? "Enviando..." : "Enviar mensaje →"}
                  </button>
                </div>
              )}
              <p className="contact__disclaimer">Sin compromiso · Respuesta garantizada en menos de 24h</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo size="small" />
            <p className="footer__brand-desc">
              Desarrollo web profesional para negocios que quieren crecer en internet. Desde Costa Rica para toda Latinoamérica.
            </p>
            <div className="footer__socials">
              <a href="https://wa.me/50685763191" target="_blank" rel="noopener noreferrer" className="footer__social" title="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </a>
              <a href="mailto:jarethmoraga@icloud.com" className="footer__social" title="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                </svg>
              </a>
              <a href="#" className="footer__social" title="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="footer__social" title="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__links-group">
            <div>
              <h4 className="footer__col-title">Servicios</h4>
              {["Landing Page", "Página Informativa", "Landing + Dashboard", "App Web Completa"].map((l) => (
                <a key={l} href="#paquetes" className="footer__link">{l}</a>
              ))}
            </div>
            <div>
              <h4 className="footer__col-title">Navegación</h4>
              {[["#servicios","Servicios"],["#proceso","Proceso"],["#testimonios","Clientes"],["#faq","FAQ"]].map(([href,label]) => (
                <a key={href} href={href} className="footer__link">{label}</a>
              ))}
            </div>
            <div>
              <h4 className="footer__col-title">Contacto</h4>
              <a href="#contacto" className="footer__link">Formulario</a>
              <a href="https://wa.me/50685763191" className="footer__link">WhatsApp</a>
              <a href="mailto:jarethmoraga@icloud.com" className="footer__link">Email</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">&copy; 2026 DevGosth · Todos los derechos reservados.</span>
          <span className="footer__copy footer__copy--built">Diseñado y desarrollado con dedicación 🇨🇷</span>
        </div>
      </footer>
    </div>
  );
}
