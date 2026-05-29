import { useState, useEffect, useRef } from "react";
import "./DevGosthLanding.css";
import devgosthLogo from "./assets/devgosth-logo.png";
import { translations } from "./i18n.js";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
  useScroll,
  useInView as useFramerInView,
} from "framer-motion";

/* ─── DATA ─── */
const PROJECTS = [
  { title: "E-Commerce Dashboard", tag: "React · Supabase", desc: "Panel de ventas en tiempo real con gestión de inventario y reportes automáticos.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80", accent: "#00e87c" },
  { title: "Landing SaaS", tag: "Next.js · Tailwind", desc: "Landing de conversión alta con A/B testing integrado y formularios dinámicos.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80", accent: "#3b82f6" },
  { title: "App de Reservas", tag: "React · Node.js", desc: "Sistema de citas médicas con calendario sincronizado y recordatorios por WhatsApp.", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80", accent: "#8b5cf6" },
  { title: "Vitrina Digital PyME", tag: "React · SINPE Móvil", desc: "Tienda online para negocio costarricense con pago nativo y panel de pedidos.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80", accent: "#f59e0b" },
  { title: "Portal Corporativo", tag: "Next.js · PostgreSQL", desc: "Intranet empresarial con roles, gestión documental y reportes exportables.", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80", accent: "#00e87c" },
];

const TECH_ITEMS = ["React","Next.js","Node.js","TypeScript","PostgreSQL","Supabase","Tailwind CSS","Figma","REST APIs","Prisma","Vercel","AWS"];
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

/* ─── HOOKS ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useCursor() {
  const dotRef = useRef(null), ringRef = useRef(null), posRef = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches || "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    };
    let rx = -100, ry = -100, raf;
    const tick = () => {
      rx += (posRef.current.x - rx) * 0.1; ry += (posRef.current.y - ry) * 0.1;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onEnter = () => document.body.classList.add("cursor--hover");
    const onLeave = () => document.body.classList.remove("cursor--hover");
    const t = setTimeout(() => {
      document.querySelectorAll("a,button,.feature-card,.plan-card,.testimonial-card,.faq-item,.process-card,.project-card")
        .forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    }, 400);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); clearTimeout(t); };
  }, []);
  return { dotRef, ringRef };
}

/* ─── SHARED 3D SPRING CONFIG ─── */
const SPRING_3D = { stiffness: 200, damping: 24 };

/* ─── TILT CARD 3D (usado en toda la página) ─── */
function TiltCard({ children, className = "", style = {}, popularCard = false, perspective = 800, maxTilt = 14 }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [maxTilt, -maxTilt]), SPRING_3D);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-maxTilt, maxTilt]), SPRING_3D);
  const gx = useTransform(mx, [-0.5, 0.5], [10, 90]);
  const gy = useTransform(my, [-0.5, 0.5], [10, 90]);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(0,232,124,0.18) 0%, transparent 65%)`;
  const onMouseMove = (e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); };
  const onMouseLeave = () => { mx.set(0); my.set(0); };
  return (
    <motion.div
      className={`tilt-card ${className}`}
      style={{ rotateX: rotX, rotateY: rotY, y: popularCard ? -10 : 0, transformPerspective: perspective, ...style }}
      whileHover={{ scale: 1.035, z: 40 }}
      transition={{ scale: { type: "spring", stiffness: 260, damping: 22 } }}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
    >
      <motion.div className="tilt-glow" style={{ background: glowBg }} />
      {children}
    </motion.div>
  );
}

/* ─── 3D FLOAT (idle floating animation con perspectiva) ─── */
function Float3D({ children, amplitude = 12, duration = 7, delay = 0, style = {} }) {
  return (
    <motion.div
      style={{ transformPerspective: 900, ...style }}
      animate={{ y: [0, -amplitude, -amplitude * 0.4, 0], rotateX: [0, 2, -1, 0], rotateY: [0, -1.5, 2, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut", times: [0, 0.33, 0.66, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── STAGGER REVEAL 3D al entrar en viewport ─── */
function Reveal3D({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref} className={className}
      initial={{ opacity: 0, y: 48, rotateX: 20, scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 800 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── CLIP-PATH REVEAL (persiana hacia arriba) ─── */
function RevealUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.4 });
  return (
    <div ref={ref} style={{ overflow: "hidden" }} className={className}>
      <motion.div
        initial={{ y: "108%", opacity: 0 }}
        animate={isInView ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── WORD-BY-WORD REVEAL ─── */
function RevealWords({ text, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.4 });
  return (
    <span ref={ref} style={{ display: "inline" }}>
      {text.split(" ").map((w, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.3em", paddingBottom: "0.12em", verticalAlign: "bottom" }}>
          <motion.span
            className={className}
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.62, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── COUNTUP ─── */
function CountUp({ target, suffix = "", prefix = "", duration = 1800, started }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let st = null;
    const step = (ts) => { if (!st) st = ts; const p = Math.min((ts - st) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return <>{prefix}{count}{suffix}</>;
}

/* ─── CURSOR ─── */
function Cursor() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    setIsTouch(touch);
  }, []);
  const { dotRef, ringRef } = useCursor();
  if (isTouch) return null;
  return (<><div ref={ringRef} className="cursor__ring" /><div ref={dotRef} className="cursor__dot" /></>);
}

/* ─── MARQUEE ─── */
function Marquee() {
  const items = [...TECH_ITEMS, ...TECH_ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (<span key={i} className="marquee__item">{item}<span className="marquee__sep">·</span></span>))}
      </div>
    </div>
  );
}

/* ─── ANIMATED SECTION ─── */
function AnimatedSection({ children, id, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <section ref={ref} id={id} className={`animate-section ${visible ? "animate-section--visible" : "animate-section--hidden"} ${className}`}>
      {children}
    </section>
  );
}

/* ─── ICONS ─── */
function CheckIcon() { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>); }
function StarIcon() { return (<svg width="13" height="13" viewBox="0 0 24 24" fill="var(--green)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>); }

/* ─── FAQ ITEM ─── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className={`faq-item ${open ? "faq-item--open" : ""}`} onClick={() => setOpen(!open)} layout>
      <div className="faq-item__header">
        <span className="faq-item__question">{q}</span>
        <motion.span className="faq-item__toggle" animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }}>{open ? "−" : "+"}</motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="faq-item__answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── LOGO & LANG ─── */
function Logo({ size = "default" }) {
  return (<a href="#" className="nav__logo"><img src={devgosthLogo} alt="DevGosth" className="nav__logo-img" style={{ height: size === "small" ? 52 : 64 }} /></a>);
}
function LangToggle({ lang, setLang }) {
  return (
    <div className="lang-toggle">
      <button className={`lang-toggle__btn ${lang === "es" ? "lang-toggle__btn--active" : ""}`} onClick={() => setLang("es")} aria-label="Español">🇨🇷 ES</button>
      <span className="lang-toggle__sep">|</span>
      <button className={`lang-toggle__btn ${lang === "en" ? "lang-toggle__btn--active" : ""}`} onClick={() => setLang("en")} aria-label="English">🇺🇸 EN</button>
    </div>
  );
}

/* ─── PARTICLES ─── */
const PARTICLES = [
  { size: 4, left: "12%", top: "22%", delay: 0, dur: 11 },
  { size: 6, left: "78%", top: "14%", delay: 2.5, dur: 15 },
  { size: 3, left: "88%", top: "68%", delay: 4, dur: 9 },
  { size: 5, left: "28%", top: "78%", delay: 1.2, dur: 13 },
  { size: 4, left: "52%", top: "38%", delay: 3.5, dur: 17 },
  { size: 7, left: "8%", top: "58%", delay: 5, dur: 10 },
  { size: 3, left: "65%", top: "85%", delay: 0.8, dur: 14 },
];
function HeroParticles() {
  return (<>{PARTICLES.map((p, i) => (<motion.span key={i} className="hero__particle" style={{ width: p.size, height: p.size, left: p.left, top: p.top, boxShadow: `0 0 ${p.size * 4}px var(--green)` }} animate={{ opacity: [0.1, 0.7, 0.15, 0.6, 0.1], scale: [1, 1.9, 0.6, 1.5, 1], y: [0, -22, 8, -16, 0] }} transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />))}</>);
}

/* ─── HERO BROWSER ─── */
function HeroBrowser() {
  return (
    <Float3D amplitude={14} duration={8} delay={1.8}>
      <div className="browser">
        <div className="browser__bar">
          <div className="browser__dots"><span /><span /><span /></div>
          <div className="browser__url">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            tu-proyecto.com
          </div>
          <div className="browser__bar-spacer" />
        </div>
        <div className="browser__page">
          <div className="bw-nav"><div className="bw-nav__logo" /><div className="bw-nav__links"><div /><div /><div /></div><div className="bw-nav__cta" /></div>
          <div className="bw-hero">
            <div className="bw-badge" />
            <div className="bw-title"><div className="bw-line bw-line--xl" /><div className="bw-line bw-line--lg bw-line--accent" /><div className="bw-line bw-line--md" /></div>
            <div className="bw-desc"><div className="bw-line bw-line--sm" /><div className="bw-line bw-line--sm bw-line--short" /></div>
            <div className="bw-btns"><div className="bw-btn bw-btn--filled" /><div className="bw-btn" /></div>
          </div>
          <div className="bw-cards">
            <div className="bw-card"><div className="bw-card__dot" /><div className="bw-card__lines"><div /><div /></div></div>
            <div className="bw-card bw-card--active"><div className="bw-card__dot bw-card__dot--green" /><div className="bw-card__lines"><div /><div /></div></div>
            <div className="bw-card"><div className="bw-card__dot" /><div className="bw-card__lines"><div /><div /></div></div>
          </div>
          <div className="bw-footer"><div className="bw-footer__bar" /><div className="bw-footer__bar bw-footer__bar--sm" /></div>
        </div>
        <div className="browser__chip browser__chip--tl">
          <div className="browser__chip-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg></div>
          <div className="browser__chip-body"><div className="browser__chip-label">Conversión</div><div className="browser__chip-value">+127%</div></div>
        </div>
        <div className="browser__chip browser__chip--br">
          <div className="browser__chip-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
          <div className="browser__chip-body"><div className="browser__chip-label">PageSpeed</div><div className="browser__chip-value">98 / 100</div></div>
        </div>
      </div>
    </Float3D>
  );
}

/* ─── PROJECTS ─── */
function ProjectsScroller() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const xSlow = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <div ref={containerRef} className="projects-scroller">
      <div className="projects-scroller__header">
        <div className="projects-scroller__title-row">
          <RevealUp delay={0}><span className="section-tag">Proyectos</span></RevealUp>
          <h2 className="section__title" style={{ marginTop: 12 }}>
            <RevealWords text="Trabajo que" delay={0.05} />{" "}
            <RevealWords text="habla solo" className="text-gradient" delay={0.18} />
          </h2>
        </div>
      </div>

      {isMobile ? (
        /* Móvil: scroll horizontal táctil nativo (swipe) */
        <div className="projects-track-wrap projects-track-wrap--scroll">
          <div className="projects-track projects-track--native">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} disableTilt />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop: parallax atado al scroll */
        <div className="projects-track-wrap">
          <motion.div className="projects-track" style={{ x }}>
            {PROJECTS.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </motion.div>
        </div>
      )}

      <div className="projects-counter">
        <motion.span style={isMobile ? {} : { x: xSlow }} className="projects-counter__num">0{PROJECTS.length}</motion.span>
        <span className="projects-counter__label">proyectos · deslizá →</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, disableTilt = false }) {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true, amount: 0.25 });
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), SPRING_3D);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), SPRING_3D);
  const onMouseMove = (e) => { if (disableTilt) return; const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      className="project-card"
      style={disableTilt ? {} : { rotateX: rotX, rotateY: rotY, transformPerspective: 700 }}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-card__img-wrap">
        <motion.img
          src={project.img} alt={project.title}
          className="project-card__img"
          whileHover={disableTilt ? {} : { scale: 1.08 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
        />
        <motion.div className="project-card__overlay" style={{ background: `${project.accent}18` }} initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
        <div className="project-card__tag">{project.tag}</div>
      </div>
      <div className="project-card__body">
        <div className="project-card__num">0{index + 1}</div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__arrow">→</div>
      </div>
    </motion.div>
  );
}

/* ─── MAIN ─── */
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
  const [statsStarted, setStatsStarted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [lang, setLang] = useState(() => navigator.language?.startsWith("es") ? "es" : "en");
  const t = translations[lang];

  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const el = document.documentElement;
      setScrollProgress((el.scrollHeight - el.clientHeight) > 0 ? (y / (el.scrollHeight - el.clientHeight)) * 100 : 0);
      if (y > 60) setStatsStarted(true);
      const sections = ["servicios", "proceso", "paquetes", "testimonios", "faq", "contacto"];
      const mid = y + window.innerHeight / 2.5;
      let current = "";
      for (const id of sections) {
        const sec = document.getElementById(id);
        if (sec && sec.offsetTop <= mid) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", h, { passive: true });
    const timer = setTimeout(() => setStatsStarted(true), 1400);
    return () => { window.removeEventListener("scroll", h); clearTimeout(timer); };
  }, []);

  const handleSubmit = async () => {
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) return;
    setSending(true); setFormError(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: t.contact.emailSubject(nombre), from_name: nombre, email, message: mensaje }) });
      const data = await res.json();
      if (data.success) setSubmitted(true); else setFormError(true);
    } catch { setFormError(true); } finally { setSending(false); }
  };

  /* variantes de stagger para grids */
  const gridContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
  const gridItem3D = { hidden: { opacity: 0, y: 50, rotateX: 22, scale: 0.93 }, visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className="landing">
      <Cursor />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* ─ AMBIENT BLOBS ─ */}
      <div className="ambient-blobs">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
      </div>

      {/* ─ NAV ─ */}
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <Logo />
          <div className="nav__links">
            <a href="#servicios" className={`nav-link ${activeSection === "servicios" ? "nav-link--active" : ""}`}>{t.nav.services}</a>
            <a href="#proceso" className={`nav-link ${activeSection === "proceso" ? "nav-link--active" : ""}`}>{t.nav.process}</a>
            <a href="#paquetes" className={`nav-link ${activeSection === "paquetes" ? "nav-link--active" : ""}`}>{t.nav.packages}</a>
            <a href="#testimonios" className={`nav-link ${activeSection === "testimonios" ? "nav-link--active" : ""}`}>{t.nav.clients}</a>
            <a href="#faq" className={`nav-link ${activeSection === "faq" ? "nav-link--active" : ""}`}>{t.nav.faq}</a>
            <LangToggle lang={lang} setLang={setLang} />
            <a href="#contacto">
              <motion.button className="btn-primary btn-primary--sm" whileHover={{ scale: 1.06, rotateY: 4 }} whileTap={{ scale: 0.95 }} style={{ transformPerspective: 400 }}>
                {t.nav.cta}
              </motion.button>
            </a>
          </div>
          <button className="nav__mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            <span className={`nav__hamburger ${mobileMenu ? "nav__hamburger--open" : ""}`} />
          </button>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div className="nav__mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {t.nav.navLinks.map(([id, label]) => (<a key={id} href={`#${id}`} className="nav-link" onClick={() => setMobileMenu(false)}>{label}</a>))}
              <LangToggle lang={lang} setLang={setLang} />
              <a href="#contacto" onClick={() => setMobileMenu(false)}><button className="btn-primary btn-primary--full">{t.nav.cta}</button></a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─ HERO ─ */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb" />
          <div className="hero__grid" />
          <div className="hero__noise" />
          <HeroParticles />
        </div>
        <div className="hero__inner">
          <div className="hero__content">
            {/* Badge */}
            <motion.div className="hero__badge" initial={{ opacity: 0, y: -16, scale: 0.88, rotateX: -20 }} animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} style={{ transformPerspective: 400 }}>
              <span className="hero__badge-dot" />{t.hero.badge}
            </motion.div>

            {/* Título clip-path 3D */}
            <h1 className="hero__title">
              <div style={{ overflow: "hidden" }}>
                <motion.span style={{ display: "block" }} initial={{ y: "108%", rotateX: 30, opacity: 0 }} animate={{ y: "0%", rotateX: 0, opacity: 1 }} transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
                  {t.hero.title1}
                </motion.span>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.span style={{ display: "block" }} initial={{ y: "108%", rotateX: 30, opacity: 0 }} animate={{ y: "0%", rotateX: 0, opacity: 1 }} transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}>
                  {t.hero.title2} <span className="hero__title-em">{t.hero.titleEm}</span>
                </motion.span>
              </div>
            </h1>

            {/* Línea animada */}
            <motion.div style={{ height: 1, background: "var(--border-3)", marginBottom: 20 }} initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: 0.52, ease: [0.16, 1, 0.3, 1] }} />

            <motion.p className="hero__desc" initial={{ opacity: 0, y: 18, rotateX: 12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ transformPerspective: 500 }}>
              {t.hero.desc}
            </motion.p>

            <motion.div className="hero__actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}>
              <a href="#contacto">
                <motion.button className="btn-primary" whileHover={{ scale: 1.06, rotateY: 5, z: 20 }} whileTap={{ scale: 0.96 }} style={{ transformPerspective: 400 }}>
                  {t.hero.ctaPrimary}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </motion.button>
              </a>
              <a href="#paquetes">
                <motion.button className="btn-ghost" whileHover={{ scale: 1.06, rotateY: -5, z: 20 }} whileTap={{ scale: 0.96 }} style={{ transformPerspective: 400 }}>
                  {t.hero.ctaSecondary}
                </motion.button>
              </a>
            </motion.div>

            {/* Stats CountUp */}
            <motion.div className="hero__stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.7 }}>
              {t.heroStats.map((stat, i) => {
                const m = String(stat.value).match(/(\d+)/);
                const num = m ? parseInt(m[1]) : 0;
                const prefix = m ? stat.value.slice(0, m.index) : "";
                const suffix = m ? stat.value.slice(m.index + m[0].length) : "";
                return (
                  <div key={stat.label} className="hero__stat">
                    {i > 0 && <div className="hero__stat-sep" />}
                    <motion.div whileHover={{ scale: 1.1, rotateY: 8 }} style={{ transformPerspective: 300 }}>
                      <div className="hero__stat-value"><CountUp target={num} prefix={prefix} suffix={suffix} started={statsStarted} /></div>
                      <div className="hero__stat-label">{stat.label}</div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <motion.div className="hero__visual" initial={{ opacity: 0, x: 60, rotateY: -20, scale: 0.9 }} animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }} transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }} style={{ transformPerspective: 1000 }}>
            <HeroBrowser />
          </motion.div>
        </div>
      </section>

      {/* ─ MARQUEE ─ */}
      <Marquee />

      {/* ─ PROJECTS ─ */}
      <ProjectsScroller />

      {/* ─ SERVICES ─ */}
      <AnimatedSection id="servicios" className="section-alt">
        <div className="container section">
          <div className="section__header">
            <RevealUp><span className="section-tag">{t.services.tag}</span></RevealUp>
            <h2 className="section__title" style={{ marginTop: 8 }}>
              <RevealWords text={t.services.title1} delay={0.04} /><br />
              <RevealWords text={t.services.title2} className="text-gradient" delay={0.16} />
            </h2>
            <motion.p className="section__subtitle" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.28 }}>
              {t.services.subtitle}
            </motion.p>
          </div>
          <motion.div
            className="features-grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ transformPerspective: 1200 }}
          >
            {t.services.items.map((service, i) => (
              <motion.div key={i} variants={gridItem3D} style={{ transformPerspective: 800 }}>
                <TiltCard className="feature-card" perspective={700}>
                  <div className="feature-card__top">
                    <div className="feature-card__icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={SERVICE_ICONS[i]} /></svg>
                    </div>
                    <span className="feature-card__num">0{i + 1}</span>
                  </div>
                  <h3 className="feature-card__title">{service.title}</h3>
                  <p className="feature-card__desc">{service.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ─ PROCESS ─ */}
      <AnimatedSection id="proceso">
        <div className="container section">
          <div className="section__header">
            <RevealUp><span className="section-tag">{t.process.tag}</span></RevealUp>
            <h2 className="section__title" style={{ marginTop: 8 }}>
              <RevealWords text={t.process.title1} delay={0.04} /><br />
              <RevealWords text={t.process.title2} className="text-gradient" delay={0.16} />
            </h2>
            <motion.p className="section__subtitle" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.26 }}>
              {t.process.subtitle}
            </motion.p>
          </div>
          <motion.div
            className="process-grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ transformPerspective: 1200 }}
          >
            {t.process.steps.map((step, i) => (
              <motion.div key={i} variants={gridItem3D} style={{ transformPerspective: 800 }}>
                <TiltCard className="process-card" perspective={700} maxTilt={10}>
                  <div className="process-card__num">0{i + 1}</div>
                  <div className="process-card__icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={PROCESS_ICONS[i]} /></svg>
                  </div>
                  <h3 className="process-card__title">{step.title}</h3>
                  <p className="process-card__desc">{step.desc}</p>
                  {i < t.process.steps.length - 1 && <div className="process-card__connector" aria-hidden="true" />}
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ─ PRICING ─ */}
      <AnimatedSection id="paquetes" className="section-alt">
        <div className="container section">
          <div className="section__header">
            <RevealUp><span className="section-tag">{t.pricing.tag}</span></RevealUp>
            <h2 className="section__title" style={{ marginTop: 8 }}>
              <RevealWords text={t.pricing.title1} delay={0.04} /><br />
              <RevealWords text={t.pricing.title2} className="text-gradient" delay={0.16} />
            </h2>
            <motion.p className="section__subtitle" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.26 }}>
              {t.pricing.subtitle}
            </motion.p>
          </div>
          <motion.div
            className="plans-grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ transformPerspective: 1400 }}
          >
            {t.plans.map((plan, i) => (
              <motion.div key={i} variants={gridItem3D} style={{ transformPerspective: 900 }}>
                <TiltCard className={`plan-card ${plan.popular ? "plan-card--popular" : ""}`} popularCard={plan.popular} perspective={900} maxTilt={12}>
                  {plan.popular && <div className="plan-card__badge">{t.pricing.popularBadge}</div>}
                  <div className="plan-card__name">{plan.name}</div>
                  <div className="plan-card__price">{plan.price}</div>
                  <p className="plan-card__desc">{plan.desc}</p>
                  <ul className="plan-card__features">
                    {plan.features.map((feat, j) => (<li key={j} className="plan-card__feature"><CheckIcon />{feat}</li>))}
                  </ul>
                  <a href="#contacto">
                    <motion.button className={plan.popular ? "btn-primary btn-primary--full" : "btn-ghost btn-ghost--full"} whileHover={{ scale: 1.04, rotateX: -3 }} whileTap={{ scale: 0.97 }} style={{ transformPerspective: 300 }}>
                      {plan.cta}
                    </motion.button>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
          <p className="plans-note">{t.pricing.note}{" "}<a href="#contacto" className="plans-note__link">{t.pricing.noteLink}</a></p>
        </div>
      </AnimatedSection>

      {/* ─ TESTIMONIALS ─ */}
      <AnimatedSection id="testimonios">
        <div className="container section">
          <div className="section__header">
            <RevealUp><span className="section-tag">{t.testimonials.tag}</span></RevealUp>
            <h2 className="section__title" style={{ marginTop: 8 }}>
              <RevealWords text={t.testimonials.title1} delay={0.04} /><br />
              <RevealWords text={t.testimonials.title2} className="text-gradient" delay={0.16} />
            </h2>
          </div>
          <motion.div
            className="testimonials-grid"
            variants={gridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ transformPerspective: 1200 }}
          >
            {t.testimonials.items.map((item, i) => (
              <motion.div key={i} variants={gridItem3D} style={{ transformPerspective: 800 }}>
                <TiltCard className="testimonial-card" perspective={700} maxTilt={8}>
                  <div className="testimonial-card__stars">{[...Array(item.stars)].map((_, s) => <StarIcon key={s} />)}</div>
                  <p className="testimonial-card__text">"{item.text}"</p>
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">{item.avatar}</div>
                    <div>
                      <div className="testimonial-card__name">{item.name}</div>
                      <div className="testimonial-card__biz">{item.biz}</div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ─ FAQ ─ */}
      <AnimatedSection id="faq" className="section-alt">
        <div className="container--narrow section">
          <div className="section__header">
            <RevealUp><span className="section-tag">{t.faq.tag}</span></RevealUp>
            <h2 className="section__title" style={{ marginTop: 8 }}>
              <RevealWords text={t.faq.title} delay={0.04} />
            </h2>
            <motion.p className="section__subtitle" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.22 }}>
              {t.faq.subtitle}
            </motion.p>
          </div>
          {t.faq.items.map((faq, i) => (
            <Reveal3D key={i} delay={i * 0.07}>
              <FaqItem q={faq.q} a={faq.a} />
            </Reveal3D>
          ))}
        </div>
      </AnimatedSection>

      {/* ─ CTA BANNER ─ */}
      <section className="cta-banner">
        <div className="cta-banner__bg">
          <div className="cta-banner__orb cta-banner__orb--1" />
          <div className="cta-banner__orb cta-banner__orb--2" />
          <div className="hero__grid" style={{ opacity: 0.4 }} />
          <div className="hero__noise" />
        </div>
        <div className="cta-banner__inner">
          <RevealUp><span className="section-tag">{t.cta.tag}</span></RevealUp>
          <h2 className="cta-banner__title" style={{ marginTop: 12 }}>
            <RevealWords text={t.cta.title1} delay={0.05} /><br />
            <RevealWords text={t.cta.title2} className="text-gradient" delay={0.2} />
          </h2>
          <motion.p className="cta-banner__desc" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 }}>
            {t.cta.desc}
          </motion.p>
          <motion.div className="cta-banner__actions" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.45 }}>
            <a href="#contacto">
              <motion.button className="btn-primary cta-banner__btn" whileHover={{ scale: 1.07, rotateY: 6, z: 30 }} whileTap={{ scale: 0.96 }} style={{ transformPerspective: 400 }}>
                {t.cta.btnPrimary}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </motion.button>
            </a>
            <a href="https://wa.me/50685763191" target="_blank" rel="noopener noreferrer">
              <motion.button className="btn-ghost" whileHover={{ scale: 1.07, rotateY: -6, z: 30 }} whileTap={{ scale: 0.96 }} style={{ transformPerspective: 400 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                {t.cta.btnWhatsApp}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─ CONTACT ─ */}
      <AnimatedSection id="contacto" className="section-alt">
        <div className="container--cta contact">
          <RevealUp><span className="section-tag">{t.contact.tag}</span></RevealUp>
          <h2 className="section__title" style={{ marginTop: 8 }}>
            <RevealWords text={t.contact.title} delay={0.05} />
          </h2>
          <motion.p className="contact__desc" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            {t.contact.desc}
          </motion.p>

          <div className="contact__layout">
            <Reveal3D delay={0.1}>
              <div className="contact__info">
                <p className="contact__info-title">{t.contact.infoTitle}</p>
                <a href="mailto:jarethmoraga@icloud.com" className="contact__info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="contact__info-icon"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
                  jarethmoraga@icloud.com
                </a>
                <a href="tel:+50685763191" className="contact__info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="contact__info-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z" /></svg>
                  +506 8576 3191
                </a>
                <a href="https://wa.me/50685763191" target="_blank" rel="noopener noreferrer" className="contact__info-item contact__info-item--whatsapp">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="contact__info-icon"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                  {t.contact.whatsappLabel}
                </a>
              </div>
            </Reveal3D>

            <div className="contact__divider" />

            <Reveal3D delay={0.18}>
              <div className="contact__form-col">
                {submitted ? (
                  <motion.div className="contact__success" initial={{ opacity: 0, scale: 0.88, rotateX: 20 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} style={{ transformPerspective: 500 }}>
                    <div className="contact__success-icon">✓</div>
                    <p className="contact__success-title">{t.contact.success.title}</p>
                    <p className="contact__success-text">{t.contact.success.text}</p>
                  </motion.div>
                ) : (
                  <div className="contact__form">
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={t.contact.form.namePlaceholder} className="contact__input" disabled={sending} />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.contact.form.emailPlaceholder} className="contact__input" disabled={sending} />
                    <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder={t.contact.form.messagePlaceholder} className="contact__textarea" rows={4} disabled={sending} />
                    {formError && <p className="contact__form-error">{t.contact.form.errorMsg}</p>}
                    <motion.button className="btn-primary btn-primary--full" onClick={handleSubmit} disabled={sending || !nombre.trim() || !email.trim() || !mensaje.trim()} whileHover={{ scale: 1.03, rotateX: -3, z: 15 }} whileTap={{ scale: 0.97 }} style={{ transformPerspective: 400 }}>
                      {sending ? t.contact.form.submitSending : t.contact.form.submitIdle}
                    </motion.button>
                  </div>
                )}
                <p className="contact__disclaimer">{t.contact.form.disclaimer}</p>
              </div>
            </Reveal3D>
          </div>
        </div>
      </AnimatedSection>

      {/* ─ FOOTER ─ */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo size="small" />
            <p className="footer__brand-desc">{t.footer.brandDesc}</p>
            <div className="footer__socials">
              {[
                { href: "https://wa.me/50685763191", title: "WhatsApp", icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />, fill: true },
                { href: "mailto:jarethmoraga@icloud.com", title: "Email", icon: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></>, fill: false },
                { href: "#", title: "GitHub", icon: <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />, fill: true },
                { href: "#", title: "LinkedIn", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />, fill: true },
              ].map(({ href, title, icon, fill }) => (
                <motion.a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="footer__social" title={title} whileHover={{ scale: 1.2, rotateY: 15, z: 10 }} whileTap={{ scale: 0.9 }} style={{ transformPerspective: 200 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke={fill ? undefined : "currentColor"} strokeWidth={fill ? undefined : "2"} strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="footer__links-group">
            <div>
              <h4 className="footer__col-title">{t.footer.servicesTitle}</h4>
              {t.plans.map((plan) => (<a key={plan.name} href="#paquetes" className="footer__link">{plan.name}</a>))}
            </div>
            <div>
              <h4 className="footer__col-title">{t.footer.navTitle}</h4>
              {t.footer.navLinks.map(([href, label]) => (<a key={href} href={href} className="footer__link">{label}</a>))}
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
