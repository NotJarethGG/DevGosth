import { useState, useEffect, useRef } from "react";
import "./NexoShopLanding.css";

/* ===== DATA ===== */
const PLANS = [
  {
    name: "Starter",
    price: "Gratis",
    period: "",
    desc: "Para empezar a vender",
    features: [
      "1 tienda en linea",
      "Hasta 20 productos",
      "Pagos con SINPE Movil",
      "Subdominio nexoshop.cr",
      "Soporte por chat",
    ],
    cta: "Empezar gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "\u20A112,500",
    period: "/mes",
    desc: "Para crecer tu negocio",
    features: [
      "Productos ilimitados",
      "Dominio personalizado",
      "Inventario inteligente",
      "Reportes de ventas",
      "0% comision por venta",
      "Soporte prioritario",
    ],
    cta: "Unirme a la waitlist",
    popular: true,
  },
  {
    name: "Business",
    price: "\u20A129,900",
    period: "/mes",
    desc: "Para operaciones avanzadas",
    features: [
      "Todo de Pro",
      "Multi-sucursal",
      "API para integraciones",
      "Facturacion electronica",
      "Manager dedicado",
      "Onboarding personalizado",
    ],
    cta: "Contactar ventas",
    popular: false,
  },
];

const FEATURES = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Setup en minutos",
    desc: "Crea tu tienda en menos de 10 minutos. Sin codigo, sin complicaciones.",
  },
  {
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    title: "SINPE Movil nativo",
    desc: "Tus clientes pagan con SINPE, transferencia o tarjeta. Sin friccion.",
  },
  {
    icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    title: "Catalogo profesional",
    desc: "Subi tus productos con fotos, precios y variantes. Se ve increible en cualquier dispositivo.",
  },
  {
    icon: "M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H4V8h16v10z",
    title: "Compra sin registro",
    desc: "El cliente elige, paga y listo. Cero formularios, cero cuentas obligatorias.",
  },
  {
    icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    title: "Inventario inteligente",
    desc: "Controla tu stock en tiempo real. Alertas cuando un producto se esta agotando.",
  },
  {
    icon: "M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z",
    title: "Reportes claros",
    desc: "Ve tus ventas, productos top y tendencias. Datos que te ayudan a decidir.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria R.",
    biz: "Reposteria Dulce Hogar",
    text: "Antes vendia solo por WhatsApp y perdia pedidos. Con NexoShop mis clientes ven todo el catalogo y pagan con SINPE al toque.",
    avatar: "MR",
  },
  {
    name: "Carlos V.",
    biz: "Barberia The Cut",
    text: "Monte mi pagina en literal 8 minutos. Mis clientes ahora reservan y pagan en linea. Game changer total.",
    avatar: "CV",
  },
  {
    name: "Ana L.",
    biz: "Tienda Botanica Verde",
    text: "Lo que mas me gusta es que mis clientes no tienen que crear cuenta. Eligen la planta, pagan y yo la envio. Simple.",
    avatar: "AL",
  },
];

const FAQS = [
  {
    q: "Necesito saber programar?",
    a: "No. NexoShop esta disenado para que cualquier persona pueda crear su tienda sin conocimientos tecnicos. Si sabes usar WhatsApp, podes usar NexoShop.",
  },
  {
    q: "Como funciona el pago con SINPE Movil?",
    a: "Integramos SINPE Movil de forma nativa. Tu cliente selecciona SINPE al pagar, recibe la notificacion en su banco y confirma. Vos recibis el pago directo en tu cuenta.",
  },
  {
    q: "Puedo usar mi propio dominio?",
    a: "Si! En el plan Pro y Business podes conectar tu dominio personalizado (ej: www.tunegocio.cr). En el plan Starter te damos un subdominio tunegocio.nexoshop.cr.",
  },
  {
    q: "Hay algun contrato o permanencia?",
    a: "No. Podes cancelar cuando quieras. Sin letras pequenas, sin penalidades. Creemos que te quedas porque te gusta, no porque te obligamos.",
  },
  {
    q: "Que metodos de pago aceptan mis clientes?",
    a: "SINPE Movil, transferencia bancaria, y tarjetas de credito/debito. Estamos trabajando en mas opciones para el futuro.",
  },
  {
    q: "Cuanto se tardan en activar mi tienda?",
    a: "Menos de 10 minutos. Creas tu cuenta, subis tus productos, configuras tus metodos de pago y listo. Tu tienda esta en linea.",
  },
];

const MOCK_PRODUCTS = [
  { name: "Pan de banano", price: "\u20A11,500" },
  { name: "Queque seco", price: "\u20A12,800" },
  { name: "Empanadas (x6)", price: "\u20A12,200" },
];

const HERO_STATS = [
  { value: "10 min", label: "Setup" },
  { value: "0%", label: "Comision*" },
  { value: "24/7", label: "Tu tienda activa" },
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
        stroke="#00ff88"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#00ff88">
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
        <span className={`faq-item__toggle ${open ? "faq-item__toggle--open" : ""}`}>
          +
        </span>
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
        N
      </div>
      <span className="nav__logo-text" style={{ fontSize }}>
        Nexo<span>Shop</span>
      </span>
    </a>
  );
}

/* ===== MAIN COMPONENT ===== */
export default function NexoShopLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = () => {
    if (email.includes("@")) setSubmitted(true);
  };

  return (
    <div className="landing">
      {/* ===== NAVBAR ===== */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <Logo />

          <div className="nav__links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#precios" className="nav-link">Precios</a>
            <a href="#testimonios" className="nav-link">Testimonios</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#waitlist">
              <button className="btn-glow btn-glow--sm">Unirme a la waitlist</button>
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
            <a href="#features" className="nav-link" onClick={() => setMobileMenu(false)}>Features</a>
            <a href="#precios" className="nav-link" onClick={() => setMobileMenu(false)}>Precios</a>
            <a href="#testimonios" className="nav-link" onClick={() => setMobileMenu(false)}>Testimonios</a>
            <a href="#faq" className="nav-link" onClick={() => setMobileMenu(false)}>FAQ</a>
            <a href="#waitlist" onClick={() => setMobileMenu(false)}>
              <button className="btn-glow btn-glow--full">Unirme a la waitlist</button>
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
              <span className="hero__badge-text">Proximamente en Costa Rica</span>
            </div>

            <h1 className="hero__title">
              Tu tienda en linea<br />
              <span>en minutos</span>
            </h1>

            <p className="hero__desc">
              La plataforma todo-en-uno para que tu negocio venda en linea.
              Catalogo, cobros con SINPE Movil y inventario. Sin codigo, sin estres.
            </p>

            <div className="hero__actions">
              <a href="#waitlist">
                <button className="btn-glow">Unirme a la waitlist</button>
              </a>
              <a href="#features">
                <button className="btn-ghost">Ver features</button>
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
                <div className="mockup__header-label">Panaderia Don Jose</div>
                <div className="mockup__header-url">nexoshop.cr/donjose</div>
              </div>

              {MOCK_PRODUCTS.map((product, i) => (
                <div key={i} className="mockup__product">
                  <div className="mockup__product-info">
                    <div
                      className="mockup__product-icon"
                      style={{ background: `rgba(0,255,136,${0.06 + i * 0.03})` }}
                    >
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
                          stroke="#00ff88"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                    <span className="mockup__product-name">{product.name}</span>
                  </div>
                  <span className="mockup__product-price">{product.price}</span>
                </div>
              ))}

              <button className="btn-glow btn-glow--full" style={{ marginTop: 20, padding: "12px", fontSize: 14 }}>
                Pagar con SINPE Movil
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <AnimatedSection id="features">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Features</span>
            <h2 className="section__title">Todo lo que tu negocio necesita</h2>
            <p className="section__subtitle">
              Herramientas pensadas para PyMEs de Costa Rica. Simples, rapidas y sin complicaciones.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#00ff88">
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== PRICING ===== */}
      <AnimatedSection id="precios">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Precios</span>
            <h2 className="section__title">Simple y transparente</h2>
            <p className="section__subtitle">Sin costos ocultos. Sin sorpresas. Empeza gratis.</p>
          </div>

          <div className="plans-grid">
            {PLANS.map((plan, i) => (
              <div key={i} className={`plan-card ${plan.popular ? "plan-card--popular" : ""}`}>
                {plan.popular && <div className="plan-card__badge">Mas popular</div>}
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
                <button className={plan.popular ? "btn-glow btn-glow--full" : "btn-ghost btn-ghost--full"}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== TESTIMONIALS ===== */}
      <AnimatedSection id="testimonios">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">Testimonios</span>
            <h2 className="section__title">Negocios que ya confian en NexoShop</h2>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {[...Array(5)].map((_, s) => (
                    <StarIcon key={s} />
                  ))}
                </div>
                <p className="testimonial-card__text">"{testimonial.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{testimonial.avatar}</div>
                  <div>
                    <div className="testimonial-card__name">{testimonial.name}</div>
                    <div className="testimonial-card__biz">{testimonial.biz}</div>
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

      {/* ===== WAITLIST ===== */}
      <AnimatedSection id="waitlist">
        <div className="container--cta waitlist">
          <span className="section-tag">Acceso anticipado</span>
          <h2 className="section__title">Se de los primeros</h2>
          <p className="waitlist__desc">
            Unete a la waitlist y obtene acceso anticipado + 3 meses gratis del plan Pro cuando lancemos.
          </p>

          <div className="waitlist__layout">
            <div className="waitlist__form-col">
              {submitted ? (
                <div className="waitlist__success">
                  <div className="waitlist__success-icon">&#10003;</div>
                  <p className="waitlist__success-title">Estas en la lista!</p>
                  <p className="waitlist__success-text">
                    Te avisaremos cuando NexoShop este listo. Gracias por confiar en nosotros.
                  </p>
                </div>
              ) : (
                <div className="waitlist__form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="waitlist__input"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                  <button className="btn-glow" onClick={handleSubmit}>
                    Unirme
                  </button>
                </div>
              )}
              <p className="waitlist__disclaimer">Sin spam. Solo te notificamos cuando lancemos.</p>
            </div>

            <div className="waitlist__divider" />

            <div className="waitlist__contact">
              <p className="waitlist__contact-title">Contacto directo</p>
              <a href="mailto:jarethmoraga@icloud.com" className="waitlist__contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="waitlist__contact-icon">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
                jarethmoraga@icloud.com
              </a>
              <a href="tel:+50685763191" className="waitlist__contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="waitlist__contact-icon">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z" />
                </svg>
                +506 8576 3191
              </a>
              <a href="https://wa.me/50685763191" target="_blank" rel="noopener noreferrer" className="waitlist__contact-item waitlist__contact-item--whatsapp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="waitlist__contact-icon">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                WhatsApp: +506 8576 3191
              </a>
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
              El nexo digital de tu negocio. Hecho con carino en Costa Rica.
            </p>
          </div>

          <div>
            <h4 className="footer__col-title">Producto</h4>
            {["Features", "Precios", "Integraciones", "Roadmap"].map((link) => (
              <a key={link} href="#" className="footer__link">{link}</a>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Empresa</h4>
            {["Sobre nosotros", "Blog", "Carreras", "Contacto"].map((link) => (
              <a key={link} href="#" className="footer__link">{link}</a>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Legal</h4>
            {["Terminos de uso", "Privacidad", "Cookies"].map((link) => (
              <a key={link} href="#" className="footer__link">{link}</a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">&copy; 2026 NexoShop. Todos los derechos reservados.</span>
          <span className="footer__copy">Hecho en Costa Rica</span>
        </div>
      </footer>
    </div>
  );
}