import { useState, useEffect, useRef } from "react";
import "./DevGosthLanding.css";
import devgosthLogo from "./assets/devgosth-logo.png";
import { translations } from "./i18n.js";

const TECH_ITEMS = [
  "React", "Next.js", "Node.js", "TypeScript", "PostgreSQL",
  "Supabase", "Tailwind CSS", "Figma", "REST APIs", "Prisma", "Vercel", "AWS",
];

const SERVICE_ICONS = [
  "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  "M13 10V3L4 14h7v7l9-11h-7z",
  "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
];

const PROCESS_ICONS = [
  "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
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

function LangToggle({ lang, setLang }) {
  return (
    <div className="lang-toggle">
      <button
        className={`lang-toggle__btn ${lang === "es" ? "lang-toggle__btn--active" : ""}`}
        onClick={() => setLang("es")}
        aria-label="Español"
      >
        🇨🇷 ES
      </button>
      <span className="lang-toggle__sep">|</span>
      <button
        className={`lang-toggle__btn ${lang === "en" ? "lang-toggle__btn--active" : ""}`}
        onClick={() => setLang("en")}
        aria-label="English"
      >
        🇺🇸 EN
      </button>
    </div>
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
  const [lang, setLang] = useState(() =>
    navigator.language?.startsWith("es") ? "es" : "en"
  );

  const t = translations[lang];

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
          subject: t.contact.emailSubject(nombre),
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
            <a href="#servicios" className="nav-link">{t.nav.services}</a>
            <a href="#proceso" className="nav-link">{t.nav.process}</a>
            <a href="#paquetes" className="nav-link">{t.nav.packages}</a>
            <a href="#testimonios" className="nav-link">{t.nav.clients}</a>
            <a href="#faq" className="nav-link">{t.nav.faq}</a>
            <LangToggle lang={lang} setLang={setLang} />
            <a href="#contacto">
              <button className="btn-primary btn-primary--sm">{t.nav.cta}</button>
            </a>
          </div>
          <button className="nav__mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            <span className={`nav__hamburger ${mobileMenu ? "nav__hamburger--open" : ""}`} />
          </button>
        </div>
        {mobileMenu && (
          <div className="nav__mobile-menu">
            {t.nav.navLinks.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="nav-link" onClick={() => setMobileMenu(false)}>{label}</a>
            ))}
            <LangToggle lang={lang} setLang={setLang} />
            <a href="#contacto" onClick={() => setMobileMenu(false)}>
              <button className="btn-primary btn-primary--full">{t.nav.cta}</button>
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
          <div className="hero__content">
            <div className="hero__badge">
              <span className="hero__badge-dot" />
              {t.hero.badge}
            </div>

            <h1 className="hero__title">
              {t.hero.title1}<br />
              {t.hero.title2} <span className="hero__title-em">{t.hero.titleEm}</span>
            </h1>

            <p className="hero__desc">{t.hero.desc}</p>

            <div className="hero__actions">
              <a href="#contacto">
                <button className="btn-primary">
                  {t.hero.ctaPrimary}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </a>
              <a href="#paquetes">
                <button className="btn-ghost">{t.hero.ctaSecondary}</button>
              </a>
            </div>

            <div className="hero__stats">
              {t.heroStats.map((stat, i) => (
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
            <span className="section-tag">{t.services.tag}</span>
            <h2 className="section__title">
              {t.services.title1}<br />
              <span className="text-gradient">{t.services.title2}</span>
            </h2>
            <p className="section__subtitle">{t.services.subtitle}</p>
          </div>
          <div className="features-grid">
            {t.services.items.map((service, i) => (
              <div key={i} className="feature-card">
                <div className="feature-card__top">
                  <div className="feature-card__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={SERVICE_ICONS[i]} />
                    </svg>
                  </div>
                  <span className="feature-card__num">0{i + 1}</span>
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
            <span className="section-tag">{t.process.tag}</span>
            <h2 className="section__title">
              {t.process.title1}<br />
              <span className="text-gradient">{t.process.title2}</span>
            </h2>
            <p className="section__subtitle">{t.process.subtitle}</p>
          </div>
          <div className="process-grid">
            {t.process.steps.map((step, i) => (
              <div key={i} className="process-card">
                <div className="process-card__num">0{i + 1}</div>
                <div className="process-card__icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={PROCESS_ICONS[i]} />
                  </svg>
                </div>
                <h3 className="process-card__title">{step.title}</h3>
                <p className="process-card__desc">{step.desc}</p>
                {i < t.process.steps.length - 1 && <div className="process-card__connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* PRICING */}
      <AnimatedSection id="paquetes" className="section-alt">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">{t.pricing.tag}</span>
            <h2 className="section__title">
              {t.pricing.title1}<br />
              <span className="text-gradient">{t.pricing.title2}</span>
            </h2>
            <p className="section__subtitle">{t.pricing.subtitle}</p>
          </div>
          <div className="plans-grid">
            {t.plans.map((plan, i) => (
              <div key={i} className={`plan-card ${plan.popular ? "plan-card--popular" : ""}`}>
                {plan.popular && <div className="plan-card__badge">{t.pricing.popularBadge}</div>}
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
            {t.pricing.note}{" "}
            <a href="#contacto" className="plans-note__link">{t.pricing.noteLink}</a>
          </p>
        </div>
      </AnimatedSection>

      {/* TESTIMONIALS */}
      <AnimatedSection id="testimonios">
        <div className="container section">
          <div className="section__header">
            <span className="section-tag">{t.testimonials.tag}</span>
            <h2 className="section__title">
              {t.testimonials.title1}<br />
              <span className="text-gradient">{t.testimonials.title2}</span>
            </h2>
          </div>
          <div className="testimonials-grid">
            {t.testimonials.items.map((item, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {[...Array(item.stars)].map((_, s) => <StarIcon key={s} />)}
                </div>
                <p className="testimonial-card__text">"{item.text}"</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{item.avatar}</div>
                  <div>
                    <div className="testimonial-card__name">{item.name}</div>
                    <div className="testimonial-card__biz">{item.biz}</div>
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
            <span className="section-tag">{t.faq.tag}</span>
            <h2 className="section__title">{t.faq.title}</h2>
            <p className="section__subtitle">{t.faq.subtitle}</p>
          </div>
          {t.faq.items.map((faq, i) => (
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
          <span className="section-tag">{t.cta.tag}</span>
          <h2 className="cta-banner__title">
            {t.cta.title1}
            <br />
            <span className="text-gradient">{t.cta.title2}</span>
          </h2>
          <p className="cta-banner__desc">{t.cta.desc}</p>
          <div className="cta-banner__actions">
            <a href="#contacto">
              <button className="btn-primary cta-banner__btn">
                {t.cta.btnPrimary}
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
                {t.cta.btnWhatsApp}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <AnimatedSection id="contacto" className="section-alt">
        <div className="container--cta contact">
          <span className="section-tag">{t.contact.tag}</span>
          <h2 className="section__title">{t.contact.title}</h2>
          <p className="contact__desc">{t.contact.desc}</p>

          <div className="contact__layout">
            <div className="contact__info">
              <p className="contact__info-title">{t.contact.infoTitle}</p>
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
                {t.contact.whatsappLabel}
              </a>
            </div>

            <div className="contact__divider" />

            <div className="contact__form-col">
              {submitted ? (
                <div className="contact__success">
                  <div className="contact__success-icon">✓</div>
                  <p className="contact__success-title">{t.contact.success.title}</p>
                  <p className="contact__success-text">{t.contact.success.text}</p>
                </div>
              ) : (
                <div className="contact__form">
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder={t.contact.form.namePlaceholder}
                    className="contact__input"
                    disabled={sending}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.contact.form.emailPlaceholder}
                    className="contact__input"
                    disabled={sending}
                  />
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="contact__textarea"
                    rows={4}
                    disabled={sending}
                  />
                  {formError && (
                    <p className="contact__form-error">{t.contact.form.errorMsg}</p>
                  )}
                  <button
                    className="btn-primary btn-primary--full"
                    onClick={handleSubmit}
                    disabled={sending || !nombre.trim() || !email.trim() || !mensaje.trim()}
                  >
                    {sending ? t.contact.form.submitSending : t.contact.form.submitIdle}
                  </button>
                </div>
              )}
              <p className="contact__disclaimer">{t.contact.form.disclaimer}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo size="small" />
            <p className="footer__brand-desc">{t.footer.brandDesc}</p>
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
              <h4 className="footer__col-title">{t.footer.servicesTitle}</h4>
              {t.plans.map((plan) => (
                <a key={plan.name} href="#paquetes" className="footer__link">{plan.name}</a>
              ))}
            </div>
            <div>
              <h4 className="footer__col-title">{t.footer.navTitle}</h4>
              {t.footer.navLinks.map(([href, label]) => (
                <a key={href} href={href} className="footer__link">{label}</a>
              ))}
            </div>
            <div>
              <h4 className="footer__col-title">{t.footer.contactTitle}</h4>
              <a href="#contacto" className="footer__link">{t.footer.contactForm}</a>
              <a href="https://wa.me/50685763191" className="footer__link">WhatsApp</a>
              <a href="mailto:jarethmoraga@icloud.com" className="footer__link">Email</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">{t.footer.copy}</span>
          <span className="footer__copy footer__copy--built">{t.footer.built}</span>
        </div>
      </footer>
    </div>
  );
}
