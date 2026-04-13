import { useState, useEffect, useRef } from "react";
import {
  Moon,
  Sun,
  Mail,
  Phone,
  Download,
  ArrowDown,
  ExternalLink,
  ChevronRight,
  Database,
  Layers,
  Shield,
  Zap,
  Globe,
  Code2,
  Menu,
  X,
} from "lucide-react";

// ─── GitHub SVG ───────────────────────────────────────────────────────────────
const GitHubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// ─── LinkedIn SVG ─────────────────────────────────────────────────────────────
const LinkedInIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MY_PHOTO = "/piyush.jpg";
const PROJECT_IMAGES = {
  "Safely Rest": "/safely-rest.png",
  "Save Rupeee": "/save-rupeee.png",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    title: "Safely Rest",
    description:
      "A full-stack multi-role house booking platform where guests discover and book stays, hosts manage listings, and admins oversee the platform — built with production-grade backend architecture.",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "React",
      "Redux Toolkit",
      "Cloudinary",
      "JWT",
    ],
    features: [
      "Role-based dashboards for guest, host, and admin",
      "Multi-filter listing browse with pagination (20/page)",
      "Availability date picker with real-time conflict check",
      "Favourite toggle with per-user persistent list",
    ],
    engineering: [
      "ACID transaction booking engine with dual overlap detection (house-level + guest-level) and query-time stale booking expiry",
      "Cascading deletion across 4 collections — Cloudinary asset cleanup, booking removal, and orphaned favourites via Mongoose pre-hook",
      "Google OAuth with server-side idToken verification handling 3 account states; sparse unique index supports hybrid auth in one collection",
    ],
    demo: "https://safely-rest-frontend.vercel.app/",
    github: "https://github.com/Piyussh-22/SafelyRest-Development",
  },
  {
    title: "Save Rupeee",
    description:
      "A personal finance tracker supporting expense, earning, and investment tracking with financial summaries, monthly breakdowns, and PDF export — backed by PostgreSQL with Google OAuth.",
    tech: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "React",
      "Redux Toolkit",
      "Passport.js",
      "PDFKit",
      "JWT",
    ],
    features: [
      "3 transaction types across 18 type-scoped categories",
      "Date-range and type filters with paginated history",
      "Monthly bar chart breakdown for the full year",
      "Account recovery flow with 30-day window on login page",
    ],
    engineering: [
      "Soft-delete system with 30-day recovery window — deletion status validated on every authenticated request, not just at login",
      "Financial summary engine using SQL CASE/COALESCE aggregation computing earned, spent, invested, and net balance in a single query",
      "Server-side PDF export via PDFKit streamed directly to response (no temp files), with auto page breaks at 700pt and validated date-range filters",
    ],
    demo: "https://save-rupeee.vercel.app/login",
    github: "https://github.com/Piyussh-22/Save-Rupeee-Backend",
  },
];

const BUILD_STEPS = [
  {
    icon: Database,
    step: "01",
    title: "Plan data models first",
    desc: "Define schemas, relationships, and constraints before writing a single route.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Design API structure",
    desc: "Map endpoints, HTTP methods, request/response shapes, and error contracts.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Separate concerns",
    desc: "Routes → Controllers → Services. Each layer owns exactly one responsibility.",
  },
  {
    icon: Shield,
    step: "04",
    title: "Auth & validation",
    desc: "JWT auth and input validation live at the middleware layer, not the controller.",
  },
  {
    icon: Zap,
    step: "05",
    title: "Optimize queries",
    desc: "Add indexes, use projections, and benchmark with explain() before shipping.",
  },
  {
    icon: Globe,
    step: "06",
    title: "Build frontend last",
    desc: "React consumes stable, documented APIs. UI never drives backend decisions.",
  },
];

const SKILLS = [
  { category: "Languages", items: ["Java", "JavaScript"] },
  {
    category: "Frontend",
    items: ["HTML", "Tailwind CSS", "React", "Redux Toolkit"],
  },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL"] },
  {
    category: "Core",
    items: [
      "Object Oriented Programming",
      "DBMS",
      "Computer Network",
      "Operating Systems",
      "Data Structures And Algorithms",
    ],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "Postman",
      "Cloudinary",
      "JWT Auth",
      "Passport.js",
      "PDFKit",
    ],
  },
];

// ─── Theme tokens ─────────────────────────────────────────────────────────────

const tk = (dark) => ({
  bg: dark ? "#0b1120" : "#f0f4f8",
  surface: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.85)",
  border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)",
  text: dark ? "#e2e8f0" : "#1e293b",
  muted: "#64748b",
  sub: dark ? "#94a3b8" : "#475569",
});

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ label }) {
  return (
    <span
      style={{
        padding: "3px 9px",
        fontSize: 11,
        fontFamily: "monospace",
        border: "1px solid rgba(34,197,94,0.32)",
        color: "#22c55e",
        background: "rgba(34,197,94,0.06)",
        borderRadius: 2,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <span
        style={{
          width: 24,
          height: 1,
          background: "#22c55e",
          display: "block",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontFamily: "monospace",
          color: "#22c55e",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function DotGrid({ dark }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        backgroundImage: `radial-gradient(circle, ${dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.065)"} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}
    />
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = tk(dark);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: scrolled ? "blur(16px)" : "none",
        background: scrolled
          ? dark
            ? "rgba(11,17,32,0.88)"
            : "rgba(240,244,248,0.88)"
          : menuOpen
            ? dark
              ? "rgba(11,17,32,0.98)"
              : "rgba(240,244,248,0.98)"
            : "transparent",
        borderBottom: `1px solid ${scrolled || menuOpen ? theme.border : "transparent"}`,
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 20px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontWeight: 700,
            color: "#22c55e",
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          Piyush Raj
        </span>

        {isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={toggleDark}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: theme.muted,
                display: "flex",
                alignItems: "center",
                padding: 4,
              }}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: theme.muted,
                display: "flex",
                alignItems: "center",
                padding: 4,
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {["projects", "process", "skills", "contact"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "monospace",
                  textTransform: "capitalize",
                  letterSpacing: "0.05em",
                  color: theme.muted,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = theme.text)}
                onMouseLeave={(e) => (e.target.style.color = theme.muted)}
              >
                {s}
              </button>
            ))}
            <button
              onClick={toggleDark}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: theme.muted,
                display: "flex",
                alignItems: "center",
                padding: 4,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu dropdown */}
      {isMobile && menuOpen && (
        <div
          style={{
            borderTop: `1px solid ${theme.border}`,
            padding: "12px 20px 20px",
          }}
        >
          {["projects", "process", "skills", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "monospace",
                textTransform: "capitalize",
                letterSpacing: "0.05em",
                color: theme.muted,
                padding: "10px 0",
                borderBottom: `1px solid ${theme.border}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ dark }) {
  const theme = tk(dark);
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: isMobile ? 300 : 500,
          height: isMobile ? 300 : 500,
          background:
            "radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: isMobile ? "100px 20px 60px" : "80px 24px 40px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 32 : 48,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Photo — shown first on mobile */}
          {isMobile && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                animation: "fadeUp 0.65s ease both",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: 160,
                    height: 160,
                    overflow: "hidden",
                    border: "2px solid rgba(34,197,94,0.45)",
                    boxShadow: "0 0 36px rgba(34,197,94,0.14)",
                    borderRadius: 3,
                  }}
                >
                  <img
                    src={MY_PHOTO}
                    alt="Piyush Raj"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    width: 16,
                    height: 16,
                    border: "2px solid #22c55e",
                    borderTop: "none",
                    borderLeft: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -5,
                    left: -5,
                    width: 16,
                    height: 16,
                    border: "2px solid #22c55e",
                    borderBottom: "none",
                    borderRight: "none",
                  }}
                />
              </div>
            </div>
          )}

          {/* Left — text */}
          <div
            style={{
              animation: "fadeUp 0.65s ease both",
              textAlign: isMobile ? "center" : "left",
              flex: 1,
              minWidth: 0,
            }}
          >
            <h1
              style={{
                fontSize: isMobile
                  ? "clamp(36px,9vw,52px)"
                  : "clamp(44px,6vw,74px)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-2px",
                marginBottom: 10,
                color: theme.text,
                wordBreak: "break-word",
              }}
            >
              Piyush Raj
            </h1>
            <h2
              style={{
                fontSize: isMobile ? 16 : "clamp(16px,2.2vw,21px)",
                fontWeight: 500,
                color: "#22c55e",
                marginBottom: 20,
                letterSpacing: "-0.2px",
              }}
            >
              Software Engineer
            </h2>
            <p
              style={{
                fontSize: isMobile ? 15 : 17,
                fontWeight: 600,
                maxWidth: isMobile ? "100%" : 460,
                marginBottom: 10,
                color: theme.text,
                lineHeight: 1.5,
                marginLeft: isMobile ? "auto" : 0,
                marginRight: isMobile ? "auto" : 0,
              }}
            >
              I build scalable web apps with clean architecture.
            </p>
            <p
              style={{
                fontSize: 14,
                maxWidth: isMobile ? "100%" : 400,
                marginBottom: 36,
                color: theme.muted,
                lineHeight: 1.75,
                marginLeft: isMobile ? "auto" : 0,
                marginRight: isMobile ? "auto" : 0,
              }}
            >
              Focused on MERN stack, backend systems, and real-world
              applications.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 22px",
                  background: "#22c55e",
                  color: "#000",
                  fontSize: 13,
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 28px rgba(34,197,94,0.28)",
                  borderRadius: 2,
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#16a34a";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#22c55e";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View Projects <ArrowDown size={14} />
              </button>
              <a
                href="/Piyush-Resume.pdf"
                download="Piyush-Resume.pdf"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 22px",
                  border: `1px solid ${theme.border}`,
                  color: theme.text,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  borderRadius: 2,
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#22c55e";
                  e.currentTarget.style.color = "#22c55e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.color = theme.text;
                }}
              >
                Download Resume <Download size={14} />
              </a>
            </div>
          </div>

          {/* Right photo — desktop only */}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 18,
                animation: "fadeUp 0.65s ease 0.15s both",
                flexShrink: 0,
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: 300,
                    height: 300,
                    overflow: "hidden",
                    border: "2px solid rgba(34,197,94,0.45)",
                    boxShadow: "0 0 36px rgba(34,197,94,0.14)",
                    borderRadius: 3,
                  }}
                >
                  <img
                    src={MY_PHOTO}
                    alt="Piyush Raj"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: -5,
                    width: 20,
                    height: 20,
                    border: "2px solid #22c55e",
                    borderTop: "none",
                    borderLeft: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: -5,
                    left: -5,
                    width: 20,
                    height: 20,
                    border: "2px solid #22c55e",
                    borderBottom: "none",
                    borderRight: "none",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function ProjectCard({ project, dark, delay }) {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  const theme = tk(dark);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? hov
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
        border: `1px solid ${hov ? "rgba(34,197,94,0.42)" : theme.border}`,
        background: theme.surface,
        boxShadow: hov
          ? "0 0 36px rgba(34,197,94,0.09), 0 16px 40px rgba(0,0,0,0.15)"
          : "none",
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 196,
          overflow: "hidden",
          borderBottom: `1px solid ${theme.border}`,
          flexShrink: 0,
        }}
      >
        <img
          src={PROJECT_IMAGES[project.title]}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease",
            transform: hov ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      <div
        style={{
          padding: "22px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 10,
            gap: 8,
          }}
        >
          <h3
            style={{
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "-0.5px",
              color: theme.text,
              flex: 1,
              minWidth: 0,
            }}
          >
            {project.title}
          </h3>
          <div
            style={{ display: "flex", gap: 8, marginLeft: 8, flexShrink: 0 }}
          >
            <a
              href={project.demo}
              style={{
                color: theme.muted,
                display: "flex",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#22c55e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
            >
              <ExternalLink size={15} />
            </a>
            <a
              href={project.github}
              style={{
                color: theme.muted,
                display: "flex",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#22c55e")}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
            >
              <GitHubIcon size={15} />
            </a>
          </div>
        </div>

        <p
          style={{
            fontSize: 13,
            lineHeight: 1.75,
            color: theme.muted,
            marginBottom: 14,
          }}
        >
          {project.description}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 18,
          }}
        >
          {project.tech.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: theme.muted,
              marginBottom: 8,
            }}
          >
            Features
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {project.features.map((f) => (
              <li
                key={f}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  fontSize: 12.5,
                  color: theme.sub,
                }}
              >
                <ChevronRight
                  size={11}
                  style={{ color: "#22c55e", marginTop: 2, flexShrink: 0 }}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            borderLeft: "3px solid #22c55e",
            background: "rgba(34,197,94,0.04)",
            padding: "12px 14px",
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#22c55e",
              marginBottom: 8,
            }}
          >
            Engineering
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {project.engineering.map((e) => (
              <li
                key={e}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  fontSize: 12,
                  color: theme.muted,
                }}
              >
                <span
                  style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}
                >
                  →
                </span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: "auto",
          }}
        >
          <a
            href={project.demo}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "#22c55e",
              color: "#000",
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
              borderRadius: 2,
              transition: "background 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#16a34a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#22c55e")}
          >
            Live Demo <ExternalLink size={11} />
          </a>
          <a
            href={project.github}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              border: `1px solid ${theme.border}`,
              color: theme.text,
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: 2,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#22c55e";
              e.currentTarget.style.color = "#22c55e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.border;
              e.currentTarget.style.color = theme.text;
            }}
          >
            GitHub <GitHubIcon size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects({ dark }) {
  const theme = tk(dark);
  const isMobile = useIsMobile();
  return (
    <section
      id="projects"
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: isMobile ? "80px 20px" : "100px 24px",
        position: "relative",
        zIndex: 1,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <FadeIn>
        <SectionLabel text="Work" />
        <h2
          style={{
            fontSize: "clamp(26px,4vw,40px)",
            fontWeight: 900,
            letterSpacing: "-1.5px",
            marginBottom: 48,
            color: theme.text,
          }}
        >
          Selected Projects
        </h2>
      </FadeIn>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} dark={dark} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

function Process({ dark }) {
  const theme = tk(dark);
  const isMobile = useIsMobile();
  return (
    <section
      id="process"
      style={{
        position: "relative",
        zIndex: 1,
        background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)",
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`,
        padding: isMobile ? "80px 0" : "100px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 24px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <FadeIn>
          <SectionLabel text="Methodology" />
          <h2
            style={{
              fontSize: "clamp(26px,4vw,40px)",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              marginBottom: 8,
              color: theme.text,
            }}
          >
            How I Build Apps
          </h2>
          <p
            style={{
              fontSize: 13,
              color: theme.muted,
              maxWidth: 380,
              marginBottom: 52,
              lineHeight: 1.7,
            }}
          >
            Backend-first. API-driven. Clean separation at every layer.
          </p>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 52,
          }}
        >
          {BUILD_STEPS.map(({ icon: Icon, step, title, desc }, i) => (
            <FadeIn key={step} delay={i * 0.07}>
              <div
                style={{
                  padding: "20px 22px",
                  height: "100%",
                  border: `1px solid ${theme.border}`,
                  background: theme.surface,
                  borderRadius: 3,
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(34,197,94,0.38)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = theme.border)
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "#22c55e",
                      fontWeight: 700,
                    }}
                  >
                    {step}
                  </span>
                  <Icon size={13} style={{ color: "#22c55e" }} />
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 6,
                    color: theme.text,
                  }}
                >
                  {title}
                </p>
                <p
                  style={{ fontSize: 12, lineHeight: 1.7, color: theme.muted }}
                >
                  {desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills({ dark }) {
  const theme = tk(dark);
  const isMobile = useIsMobile();
  return (
    <section
      id="skills"
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: isMobile ? "80px 20px" : "100px 24px",
        position: "relative",
        zIndex: 1,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <FadeIn>
        <SectionLabel text="Stack" />
        <h2
          style={{
            fontSize: "clamp(26px,4vw,40px)",
            fontWeight: 900,
            letterSpacing: "-1.5px",
            marginBottom: 48,
            color: theme.text,
          }}
        >
          Skills
        </h2>
      </FadeIn>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: 14,
        }}
      >
        {SKILLS.map(({ category, items }, ci) => (
          <FadeIn key={category} delay={ci * 0.08}>
            <div
              style={{
                padding: "22px 16px",
                height: "100%",
                border: `1px solid ${theme.border}`,
                background: theme.surface,
                borderRadius: 3,
                transition: "border-color 0.25s",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(34,197,94,0.38)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = theme.border)
              }
            >
              <p
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#22c55e",
                  marginBottom: 16,
                }}
              >
                {category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {items.map((name) => (
                  <span
                    key={name}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      padding: "4px 10px",
                      background: dark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                      border: `1px solid ${theme.border}`,
                      color: theme.sub,
                      borderRadius: 2,
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact({ dark }) {
  const theme = tk(dark);
  const isMobile = useIsMobile();
  const links = [
    {
      icon: Mail,
      label: "piyushraj4734@gmail.com",
      href: "mailto:piyushraj4734@gmail.com",
      note: "Email",
      custom: false,
    },
    {
      icon: Phone,
      label: "+91 6207704008",
      href: "tel:+916207704008",
      note: "Phone",
      custom: false,
    },
    {
      icon: null,
      label: "piyush-raj-tech",
      href: "https://linkedin.com/in/piyush-raj-tech",
      note: "LinkedIn",
      custom: "linkedin",
    },
    {
      icon: null,
      label: "piyussh-22",
      href: "https://github.com/piyussh-22",
      note: "GitHub",
      custom: "github",
    },
  ];

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 1,
        background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.025)",
        borderTop: `1px solid ${theme.border}`,
        padding: isMobile ? "80px 0" : "100px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -80,
          right: -80,
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 24px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <FadeIn>
          <SectionLabel text="Contact" />
          <h2
            style={{
              fontSize: "clamp(26px,4vw,40px)",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              marginBottom: 8,
              color: theme.text,
            }}
          >
            Get in Touch
          </h2>
          <p
            style={{
              fontSize: 13,
              color: theme.muted,
              maxWidth: 340,
              marginBottom: 44,
              lineHeight: 1.7,
            }}
          >
            Open to internships and full-time roles. Reach out directly.
          </p>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: 12,
            marginBottom: 28,
          }}
        >
          {links.map(({ icon: Icon, label, href, note, custom }, i) => (
            <FadeIn key={label} delay={i * 0.07}>
              <a
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "16px 20px",
                  border: `1px solid ${theme.border}`,
                  background: theme.surface,
                  textDecoration: "none",
                  borderRadius: 3,
                  transition: "all 0.25s",
                  boxSizing: "border-box",
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(34,197,94,0.42)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(34,197,94,0.1)",
                    flexShrink: 0,
                    borderRadius: 2,
                    color: "#22c55e",
                  }}
                >
                  {custom === "linkedin" ? (
                    <LinkedInIcon size={15} />
                  ) : custom === "github" ? (
                    <GitHubIcon size={15} />
                  ) : (
                    <Icon size={15} />
                  )}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: theme.muted,
                      letterSpacing: "0.08em",
                      marginBottom: 2,
                    }}
                  >
                    {note}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontFamily: "monospace",
                      color: theme.sub,
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.28}>
          <a
            href="/Piyush-Resume.pdf"
            download="Piyush-Resume.pdf"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 22px",
              background: "#22c55e",
              color: "#000",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(34,197,94,0.22)",
              borderRadius: 2,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#16a34a";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#22c55e";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Download Resume <Download size={14} />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ dark }) {
  const theme = tk(dark);
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: `1px solid ${theme.border}`,
        padding: "24px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            color: "#22c55e",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Piyush Raj
        </span>
        <div style={{ display: "flex", gap: 16 }}>
          <a
            href="https://github.com/piyussh-22"
            style={{
              color: theme.muted,
              display: "flex",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#22c55e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
          >
            <GitHubIcon size={15} />
          </a>
          <a
            href="https://linkedin.com/in/piyush-raj-tech"
            style={{
              color: theme.muted,
              display: "flex",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#22c55e")}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.muted)}
          >
            <LinkedInIcon size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(true);
  const theme = tk(dark);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Inter', sans-serif",
        backgroundColor: theme.bg,
        color: theme.text,
        minHeight: "100vh",
        transition: "background-color 0.3s, color 0.3s",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { overflow-x: hidden; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink  { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(34,197,94,0.28); border-radius: 2px; }
        a { text-decoration: none; }
        button { font-family: inherit; }
        img { max-width: 100%; }
      `}</style>
      <DotGrid dark={dark} />
      <Navbar dark={dark} toggleDark={() => setDark((d) => !d)} />
      <Hero dark={dark} />
      <Projects dark={dark} />
      <Process dark={dark} />
      <Skills dark={dark} />
      <Contact dark={dark} />
      <Footer dark={dark} />
    </div>
  );
}
