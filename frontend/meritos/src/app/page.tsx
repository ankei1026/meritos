"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Supply-side user types (Free) ─── */
const SUPPLY = [
  {
    icon: "🎓",
    label: "Students",
    color: "#1A56DB",
    light: "#EEF3FF",
    desc: "Break into innovation without cold emails or closed networks.",
    tag: "Free forever",
  },
  {
    icon: "🚀",
    label: "Startup Founders",
    color: "#7C3AED",
    light: "#F5F3FF",
    desc: "Spend less time fundraising. Get matched to aligned investors directly.",
    tag: "Free forever",
  },
  {
    icon: "🔬",
    label: "Researchers",
    color: "#0E7A4E",
    light: "#ECFDF5",
    desc: "Turn academic breakthroughs into commercial reality — without the gatekeepers.",
    tag: "Free forever",
  },
];

/* ─── Demand-side user types (Paid) ─── */
const DEMAND = [
  {
    icon: "💼",
    label: "Investors",
    color: "#B45309",
    light: "#FFFBEB",
    desc: "AI-curated deal flow matched to your mandate. Zero noise, only signal.",
    tag: "Subscription",
  },
  {
    icon: "🏢",
    label: "Corporations",
    color: "#0C444C",
    light: "#F0FAFB",
    desc: "Scout niche R&D talent and acquire IP before your competitors do.",
    tag: "Enterprise",
  },
  {
    icon: "🏛️",
    label: "Government",
    color: "#374151",
    light: "#F9FAFB",
    desc: "Monitor national innovation in real time. Direct grants to the right people.",
    tag: "Institutional",
  },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    quote:
      "Meritos cut our investor search from months to two weeks. The AI matched us to funds that actually understood our space.",
    name: "Sarah Chen",
    role: "Founder, NanoMed Labs",
    initials: "SC",
    color: "#7C3AED",
  },
  {
    quote:
      "As a researcher, I had zero commercial pathway. Within 30 days on Meritos I had three corporations actively requesting calls.",
    name: "Dr. Chen Wei",
    role: "MIT · Quantum Computing",
    initials: "CW",
    color: "#0E7A4E",
  },
  {
    quote:
      "We replaced an entire scouting team with one Meritos subscription. Deal flow quality went up. Noise went to zero.",
    name: "James Okafor",
    role: "Partner, Apex Growth Fund",
    initials: "JO",
    color: "#B45309",
  },
];

/* ─── Animated counter ─── */
function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all .25s",
        background: scrolled ? "rgba(250,250,248,.94)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid #E8E5DF" : "1px solid transparent",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              background: "#1A56DB",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 9l3.5 3.5L14 4"
                stroke="#fff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#111110",
              letterSpacing: "-.02em",
            }}
          >
            Meritos
          </span>
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          className="nav-desktop"
        >
          {["How it works", "For Talent", "For Enterprise", "Roadmap"].map(
            (l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: ".875rem",
                  fontWeight: 500,
                  color: "#6B6860",
                  textDecoration: "none",
                  transition: "color .15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#111110")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#6B6860")
                }
              >
                {l}
              </a>
            )
          )}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: ".625rem", alignItems: "center" }}>
          <a
            href="/login"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: ".875rem",
              fontWeight: 500,
              color: "#6B6860",
              textDecoration: "none",
              padding: ".5rem .875rem",
            }}
          >
            Log in
          </a>
          <a
            href="/signup"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: ".875rem",
              fontWeight: 500,
              color: "#fff",
              background: "#111110",
              textDecoration: "none",
              padding: ".5rem 1.125rem",
              borderRadius: 8,
              transition: "opacity .15s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = ".85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            Join free →
          </a>
        </div>
      </div>

      <style>{`
        @media(max-width:768px) { .nav-desktop { display:none !important; } }
      `}</style>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function Home() {
  const [activeRole, setActiveRole] = useState<"talent" | "enterprise">(
    "talent"
  );
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'DM Sans', sans-serif;
          background: #FAFAF8;
          color: #111110;
          -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, h4 {
          font-family: 'Bricolage Grotesque', sans-serif;
          letter-spacing: -.025em;
        }

        /* ── hero animations ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity:0; transform:scale(.96); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes floatA {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-10px); }
        }
        @keyframes floatB {
          0%,100% { transform:translateY(0px); }
          50%      { transform:translateY(-7px); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; }
          50%      { opacity:.4; }
        }
        @keyframes marquee {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }

        .fade-1 { animation: fadeUp .7s ease .1s both; }
        .fade-2 { animation: fadeUp .7s ease .22s both; }
        .fade-3 { animation: fadeUp .7s ease .34s both; }
        .fade-4 { animation: fadeUp .7s ease .46s both; }
        .scale-in { animation: scaleIn .8s ease .5s both; }

        /* ── role card hover ── */
        .role-card {
          transition: border-color .2s, box-shadow .2s, transform .2s;
          cursor: default;
        }
        .role-card:hover {
          border-color: #C8C4BC !important;
          box-shadow: 0 6px 24px rgba(0,0,0,.07);
          transform: translateY(-2px);
        }

        /* ── CTA button ── */
        .cta-btn {
          transition: opacity .15s, transform .1s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          border: none;
        }
        .cta-btn:hover { opacity: .88; }
        .cta-btn:active { transform: scale(.98); }

        /* ── marquee strip ── */
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }

        /* ── step connector ── */
        .step-connector {
          position: absolute;
          top: 22px;
          left: calc(50% + 22px);
          right: calc(-50% + 22px);
          height: 1px;
          background: #E8E5DF;
          z-index: 0;
        }

        /* ── testimonial card ── */
        .tcard:hover {
          border-color: #C8C4BC !important;
          box-shadow: 0 4px 20px rgba(0,0,0,.06);
        }

        /* ── email input ── */
        .email-input:focus {
          outline: none;
          border-color: #111110 !important;
          box-shadow: 0 0 0 3px rgba(17,17,16,.1);
        }

        @media(max-width:900px) {
          .hero-grid  { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .step-connector { display: none !important; }
          .tgrid      { grid-template-columns: 1fr !important; }
        }
        @media(max-width:600px) {
          .role-grid  { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .hero-ctas  { flex-direction: column !important; }
        }
      `}</style>

      <Nav />

      {/* ═══ HERO ═══════════════════════════════════ */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 100,
          paddingLeft: "2rem",
          paddingRight: "2rem",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Eyebrow */}
        <div
          className="fade-1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "#EEF3FF",
            border: "1px solid #C7D9FA",
            borderRadius: 999,
            padding: "5px 14px",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#1A56DB",
              animation: "pulse 2s infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: ".78rem",
              fontWeight: 600,
              color: "#1A56DB",
            }}
          >
            Ecosystem-as-a-Service · Now in public beta
          </span>
        </div>

        {/* Headline + sub */}
        <div
          style={{
            maxWidth: 780,
            marginBottom: "2.5rem",
          }}
        >
          <h1
            className="fade-2"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.06,
              color: "#111110",
              marginBottom: "1.25rem",
            }}
          >
            The platform where{" "}
            <span
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <span style={{ color: "#1A56DB" }}>innovators</span>
              <svg
                viewBox="0 0 200 12"
                style={{
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: "100%",
                  height: 8,
                  overflow: "visible",
                }}
              >
                <path
                  d="M2 8 Q50 2 100 8 Q150 14 198 6"
                  stroke="#1A56DB"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity=".4"
                />
              </svg>
            </span>{" "}
            meet{" "}
            <span style={{ color: "#0E7A4E" }}>capital</span>{" "}
            and opportunity.
          </h1>
          <p
            className="fade-3"
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.175rem)",
              color: "#6B6860",
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: 640,
            }}
          >
            Meritos is an AI-powered Ecosystem-as-a-Service platform that
            connects{" "}
            <strong style={{ fontWeight: 500, color: "#111110" }}>
              Students, Founders, and Researchers
            </strong>{" "}
            with{" "}
            <strong style={{ fontWeight: 500, color: "#111110" }}>
              Investors, Corporations, and Government
            </strong>{" "}
            — using AI matching that removes the gatekeepers.
          </p>
        </div>

        {/* Single primary CTA */}
        <div
          className="fade-4 hero-ctas"
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".875rem",
            marginBottom: "1.5rem",
          }}
        >
          <a
            href="/signup"
            className="cta-btn"
            style={{
              background: "#111110",
              color: "#fff",
              padding: ".875rem 2rem",
              borderRadius: 11,
              fontSize: "1rem",
            }}
          >
            Join the ecosystem — free
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="/enterprise"
            className="cta-btn"
            style={{
              background: "transparent",
              color: "#6B6860",
              border: "1px solid #E8E5DF",
              padding: ".875rem 1.5rem",
              borderRadius: 11,
              fontSize: "1rem",
            }}
          >
            Request enterprise access
          </a>
        </div>

        <p
          className="fade-4"
          style={{ fontSize: ".78rem", color: "#9B9890" }}
        >
          <strong style={{ fontWeight: 500, color: "#6B6860" }}>
            Talent side is 100% free.
          </strong>{" "}
          &nbsp;·&nbsp; Investors & Corporations access via subscription.
        </p>

        {/* Dashboard preview */}
        <div
          className="scale-in"
          style={{
            marginTop: "4rem",
            position: "relative",
          }}
        >
          {/* Floating match cards */}
          <div
            style={{
              position: "absolute",
              top: -20,
              left: -16,
              background: "#fff",
              border: "1px solid #E8E5DF",
              borderRadius: 12,
              padding: "10px 14px",
              boxShadow: "0 8px 28px rgba(0,0,0,.09)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              zIndex: 2,
              animation: "floatA 4.5s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#ECFDF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
              }}
            >
              🔬
            </div>
            <div>
              <div
                style={{
                  fontSize: ".75rem",
                  fontWeight: 600,
                  color: "#111110",
                }}
              >
                Dr. Chen Wei matched
              </div>
              <div style={{ fontSize: ".65rem", color: "#9B9890" }}>
                97% fit · MIT · Quantum
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: -16,
              right: -8,
              background: "#fff",
              border: "1px solid #E8E5DF",
              borderRadius: 12,
              padding: "10px 14px",
              boxShadow: "0 8px 28px rgba(0,0,0,.09)",
              zIndex: 2,
              animation: "floatB 5s ease-in-out 1s infinite",
            }}
          >
            <div
              style={{
                fontSize: ".65rem",
                fontWeight: 600,
                color: "#9B9890",
                textTransform: "uppercase",
                letterSpacing: ".06em",
                marginBottom: 3,
              }}
            >
              ⚡ First-look available
            </div>
            <div
              style={{
                fontSize: ".9rem",
                fontWeight: 700,
                color: "#B45309",
                fontFamily: "'Bricolage Grotesque', sans-serif",
              }}
            >
              NanoMed Labs · Seed
            </div>
            <div style={{ fontSize: ".65rem", color: "#9B9890", marginTop: 1 }}>
              2 investors already viewed · 47h left
            </div>
          </div>

          {/* Main dashboard mock */}
          <div
            style={{
              background: "#111110",
              borderRadius: 20,
              border: "1px solid #1F1F1E",
              overflow: "hidden",
              boxShadow:
                "0 24px 60px rgba(0,0,0,.18), 0 4px 12px rgba(0,0,0,.1)",
            }}
          >
            {/* Window bar */}
            <div
              style={{
                background: "#1A1A19",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderBottom: "1px solid #2A2A28",
              }}
            >
              {["#EF4444", "#F59E0B", "#22C55E"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    background: "#2A2A28",
                    borderRadius: 6,
                    padding: "3px 20px",
                    fontSize: ".7rem",
                    color: "rgba(255,255,255,.3)",
                  }}
                >
                  app.meritos.io/dash/investor
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div style={{ padding: "1.5rem", display: "flex", gap: "1.25rem" }}>
              {/* Sidebar mock */}
              <div
                style={{
                  width: 140,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {[
                  { icon: "⊞", label: "Deal Flow", active: true },
                  { icon: "📁", label: "Portfolio", active: false },
                  { icon: "🔍", label: "Due Diligence", active: false },
                  { icon: "⚡", label: "First Look", active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "7px 10px",
                      borderRadius: 7,
                      background: item.active
                        ? "rgba(180,83,9,.2)"
                        : "transparent",
                      borderLeft: item.active
                        ? "2px solid #B45309"
                        : "2px solid transparent",
                    }}
                  >
                    <span style={{ fontSize: 12 }}>{item.icon}</span>
                    <span
                      style={{
                        fontSize: ".7rem",
                        fontWeight: item.active ? 600 : 400,
                        color: item.active
                          ? "#F59E0B"
                          : "rgba(255,255,255,.45)",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Main area mock */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: ".65rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,.35)",
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    marginBottom: 12,
                  }}
                >
                  AI-Matched Deal Flow · 5 new today
                </div>

                {/* KPI row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  {[
                    { label: "Match Precision", value: "93%", color: "#F59E0B" },
                    { label: "New Deals", value: "5", color: "#fff" },
                    { label: "Portfolio", value: "$3.1M", color: "#4ADE80" },
                  ].map((k) => (
                    <div
                      key={k.label}
                      style={{
                        background: "rgba(255,255,255,.05)",
                        border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: 9,
                        padding: "10px 12px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: ".58rem",
                          color: "rgba(255,255,255,.35)",
                          marginBottom: 3,
                          textTransform: "uppercase",
                          letterSpacing: ".05em",
                        }}
                      >
                        {k.label}
                      </div>
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: k.color,
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}
                      >
                        {k.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Deal rows */}
                {[
                  { name: "NanoMed Labs", type: "BioTech · Seed · $1.2M", match: 97, color: "#4ADE80" },
                  { name: "GridFlow Energy", type: "CleanTech · Pre-seed · $500k", match: 93, color: "#60A5FA" },
                  { name: "Draftly AI", type: "SaaS · Seed · $800k", match: 89, color: "#A78BFA" },
                ].map((d) => (
                  <div
                    key={d.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 12px",
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.06)",
                      borderRadius: 8,
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        background: "rgba(255,255,255,.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: ".68rem",
                        fontWeight: 700,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {d.name.slice(0, 2)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: ".78rem",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      >
                        {d.name}
                      </div>
                      <div
                        style={{
                          fontSize: ".65rem",
                          color: "rgba(255,255,255,.4)",
                        }}
                      >
                        {d.type}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: ".9rem",
                        fontWeight: 700,
                        color: d.color,
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      }}
                    >
                      {d.match}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE LOGOS ═══════════════════════════ */}
      <div
        style={{
          borderTop: "1px solid #E8E5DF",
          borderBottom: "1px solid #E8E5DF",
          background: "#fff",
          padding: "18px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: ".68rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: ".1em",
            color: "#9B9890",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Trusted by universities, funds and innovation labs
        </div>
        <div style={{ overflow: "hidden" }}>
          <div className="marquee-inner">
            {[
              "MIT TTO",
              "Andreessen Horowitz",
              "Y Combinator",
              "PwC Ventures",
              "DOST Philippines",
              "Stanford OTL",
              "UP Diliman",
              "Sequoia Capital",
              "MIT TTO",
              "Andreessen Horowitz",
              "Y Combinator",
              "PwC Ventures",
              "DOST Philippines",
              "Stanford OTL",
              "UP Diliman",
              "Sequoia Capital",
            ].map((name, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#C8C4BC",
                  padding: "0 2rem",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ WHO IT'S FOR ════════════════════════════ */}
      <section
        id="for-talent"
        style={{
          padding: "100px 2rem",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Section header */}
        <div style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontSize: ".72rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              color: "#1A56DB",
              marginBottom: ".6rem",
            }}
          >
            The ecosystem
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "#111110",
              marginBottom: ".875rem",
              maxWidth: 560,
            }}
          >
            Built for both sides of innovation
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#6B6860",
              fontWeight: 300,
              maxWidth: 500,
              lineHeight: 1.7,
            }}
          >
            Meritos is a two-sided marketplace. One side is free and builds
            talent supply. The other is paid and drives commercial demand.
          </p>
        </div>

        {/* Toggle */}
        <div
          style={{
            display: "inline-flex",
            background: "#F3F4F6",
            borderRadius: 10,
            padding: 3,
            marginBottom: "2rem",
          }}
        >
          {(["talent", "enterprise"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveRole(t)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".875rem",
                fontWeight: 500,
                color: activeRole === t ? "#111110" : "#9B9890",
                background: activeRole === t ? "#fff" : "transparent",
                border: "none",
                cursor: "pointer",
                padding: "7px 20px",
                borderRadius: 7,
                boxShadow:
                  activeRole === t
                    ? "0 1px 4px rgba(0,0,0,.08)"
                    : "none",
                transition: "all .15s",
                textTransform: "capitalize",
              }}
            >
              {t === "talent"
                ? "🎓 🚀 🔬  Talent (Free)"
                : "💼 🏢 🏛️  Enterprise (Paid)"}
            </button>
          ))}
        </div>

        {/* Role cards */}
        <div
          className="role-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}
        >
          {(activeRole === "talent" ? SUPPLY : DEMAND).map((u) => (
            <div
              key={u.label}
              className="role-card"
              style={{
                background: "#fff",
                border: "1px solid #E8E5DF",
                borderRadius: 16,
                padding: "1.625rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 11,
                    background: u.light,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {u.icon}
                </div>
                <span
                  style={{
                    fontSize: ".65rem",
                    fontWeight: 600,
                    background:
                      activeRole === "talent" ? "#ECFDF5" : "#FFFBEB",
                    color:
                      activeRole === "talent" ? "#0E7A4E" : "#B45309",
                    padding: "3px 10px",
                    borderRadius: 999,
                  }}
                >
                  {u.tag}
                </span>
              </div>
              <h3
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#111110",
                  marginBottom: ".5rem",
                }}
              >
                {u.label}
              </h3>
              <p
                style={{
                  fontSize: ".875rem",
                  color: "#6B6860",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                {u.desc}
              </p>
              <div
                style={{
                  marginTop: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: ".8rem",
                  fontWeight: 600,
                  color: u.color,
                  cursor: "pointer",
                }}
              >
                Learn more
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ════════════════════════════ */}
      <section
        id="how-it-works"
        style={{
          background: "#fff",
          padding: "100px 2rem",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                fontSize: ".72rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                color: "#1A56DB",
                marginBottom: ".6rem",
              }}
            >
              How it works
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 700,
                color: "#111110",
                marginBottom: ".875rem",
              }}
            >
              From sign-up to match in minutes
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#6B6860",
                fontWeight: 300,
                maxWidth: 480,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              No recruiter needed. No cold emails. The AI does the work —
              you just show up and connect.
            </p>
          </div>

          <div
            className="steps-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "1.5rem",
              position: "relative",
            }}
          >
            {[
              {
                n: "01",
                title: "Select your role",
                body: "Pick from 6 ecosystem roles. Your dashboard and match engine are tailored to you from the start.",
                color: "#1A56DB",
                light: "#EEF3FF",
                icon: "👤",
              },
              {
                n: "02",
                title: "Build your profile",
                body: "Our AI parses your LinkedIn, GitHub, and publications to auto-generate your profile in seconds.",
                color: "#7C3AED",
                light: "#F5F3FF",
                icon: "⚡",
              },
              {
                n: "03",
                title: "Get AI-matched",
                body: "The matching engine runs vector embeddings and knowledge graphs to surface the highest-fit connections.",
                color: "#0E7A4E",
                light: "#ECFDF5",
                icon: "✦",
              },
              {
                n: "04",
                title: "Connect & grow",
                body: "Accept introductions, join events, apply to grants, or review deal flow — all inside one platform.",
                color: "#B45309",
                light: "#FFFBEB",
                icon: "🚀",
              },
            ].map((step, i) => (
              <div
                key={step.n}
                style={{
                  background: "#FAFAF8",
                  border: "1px solid #E8E5DF",
                  borderRadius: 16,
                  padding: "1.625rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 11,
                    background: step.light,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    marginBottom: "1rem",
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    fontSize: ".65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    color: step.color,
                    marginBottom: ".375rem",
                  }}
                >
                  Step {step.n}
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#111110",
                    marginBottom: ".5rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: ".875rem",
                    color: "#6B6860",
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AI ENGINE STRIP ═════════════════════════ */}
      <section
        style={{
          background: "#111110",
          padding: "80px 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          <div>
            <p
              style={{
                fontSize: ".72rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                color: "rgba(255,255,255,.35)",
                marginBottom: ".75rem",
              }}
            >
              Intelligence core
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}
            >
              AI that cuts through noise — not keyword search
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(255,255,255,.55)",
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              Three-layer architecture delivers contextual relevance at
              scale. The right match, at the right moment.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".875rem",
              }}
            >
              {[
                {
                  title: "NLP & Vector Embeddings (GPT-4o)",
                  body: "Converts research papers and pitch decks into mathematical vectors, then calculates Cosine Similarity against investor mandates.",
                },
                {
                  title: "Knowledge Graphs (Neo4j)",
                  body: "Maps hidden relationships — shared university ties, co-authorship, and research niche overlap — to find non-obvious matches.",
                },
                {
                  title: "Vector Database (Pinecone)",
                  body: "Lightning-fast retrieval across millions of data points so your dashboard is always live and current.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  style={{
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.09)",
                    borderRadius: 12,
                    padding: "1rem 1.25rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".85rem",
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    style={{
                      fontSize: ".8rem",
                      color: "rgba(255,255,255,.45)",
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}
                  >
                    {c.body}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live match visual */}
          <div
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.09)",
              borderRadius: 20,
              padding: "1.75rem",
            }}
          >
            <div
              style={{
                fontSize: ".65rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".08em",
                color: "rgba(255,255,255,.3)",
                marginBottom: "1.25rem",
              }}
            >
              Live match results · Investor view
            </div>
            {[
              { emoji: "🚀", name: "NanoMed Labs", type: "Seed · BioTech", score: 97, color: "#4ADE80" },
              { emoji: "🔬", name: "Dr. Chen Wei", type: "MIT · Quantum Computing", score: 91, color: "#60A5FA" },
              { emoji: "🎓", name: "Aisha Bautista", type: "CS Graduate · AI/ML", score: 85, color: "#A78BFA" },
              { emoji: "🚀", name: "GridFlow Energy", type: "Pre-seed · CleanTech", score: 79, color: "#4ADE80" },
            ].map((m) => (
              <div
                key={m.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.07)",
                  borderRadius: 10,
                  padding: ".875rem 1rem",
                  marginBottom: ".625rem",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: "rgba(255,255,255,.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {m.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: ".82rem",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      fontSize: ".68rem",
                      color: "rgba(255,255,255,.4)",
                    }}
                  >
                    {m.type}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: m.color,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    {m.score}%
                  </div>
                  <div
                    style={{
                      fontSize: ".58rem",
                      color: "rgba(255,255,255,.3)",
                    }}
                  >
                    match
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══════════════════════════════════ */}
      <section
        style={{
          background: "#1A56DB",
          padding: "72px 2rem",
        }}
      >
        <div
          className="stats-grid"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          {[
            { to: 13500, suffix: "+", label: "Ecosystem members globally" },
            { to: 93, suffix: "%", label: "AI match precision rate" },
            { to: 3, suffix: "×", label: "Faster deal sourcing" },
            { to: 80, suffix: "%", label: "Less time fundraising" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: "clamp(2.25rem,5vw,3.25rem)",
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div
                style={{
                  fontSize: ".875rem",
                  color: "rgba(255,255,255,.65)",
                  fontWeight: 300,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ════════════════════════════ */}
      <section
        style={{
          padding: "100px 2rem",
          background: "#FAFAF8",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                fontSize: ".72rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                color: "#1A56DB",
                marginBottom: ".6rem",
              }}
            >
              Testimonials
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "#111110",
              }}
            >
              Loved by every side of the ecosystem
            </h2>
          </div>
          <div
            className="tgrid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "1.25rem",
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="tcard"
                style={{
                  background: "#fff",
                  border: "1px solid #E8E5DF",
                  borderRadius: 16,
                  padding: "1.75rem",
                  transition: "border-color .2s, box-shadow .2s",
                }}
              >
                <div
                  style={{
                    color: "#F59E0B",
                    fontSize: ".875rem",
                    marginBottom: "1rem",
                    letterSpacing: 2,
                  }}
                >
                  ★★★★★
                </div>
                <p
                  style={{
                    fontSize: ".9375rem",
                    color: "#111110",
                    lineHeight: 1.7,
                    fontWeight: 300,
                    marginBottom: "1.25rem",
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: t.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: ".65rem",
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: ".825rem",
                        fontWeight: 600,
                        color: "#111110",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: ".75rem", color: "#9B9890" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA — single focused action ═══════ */}
      <section
        id="for-enterprise"
        style={{ padding: "100px 2rem", background: "#fff" }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "#EEF3FF",
              border: "1px solid #C7D9FA",
              borderRadius: 999,
              padding: "5px 14px",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#1A56DB",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: ".75rem",
                fontWeight: 600,
                color: "#1A56DB",
              }}
            >
              Join 13,500+ ecosystem members
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem,5vw,3.25rem)",
              fontWeight: 800,
              color: "#111110",
              marginBottom: "1rem",
              lineHeight: 1.1,
            }}
          >
            Ready to plug into the innovation ecosystem?
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#6B6860",
              fontWeight: 300,
              lineHeight: 1.7,
              marginBottom: "2.5rem",
            }}
          >
            Students, founders, and researchers join free. Investors,
            corporations, and government agencies get enterprise access.
            Everyone gets the AI.
          </p>

          {/* Email capture */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: ".625rem",
                maxWidth: 480,
                margin: "0 auto 1rem",
                flexWrap: "wrap",
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                style={{
                  flex: 1,
                  minWidth: 200,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: ".9375rem",
                  color: "#111110",
                  background: "#FAFAF8",
                  border: "1.5px solid #E8E5DF",
                  borderRadius: 10,
                  padding: ".75rem 1rem",
                  outline: "none",
                  transition: "border-color .15s, box-shadow .15s",
                }}
              />
              <button
                type="submit"
                disabled={submitting}
                className="cta-btn"
                style={{
                  background: "#111110",
                  color: "#fff",
                  padding: ".75rem 1.5rem",
                  borderRadius: 10,
                  fontSize: ".9375rem",
                  opacity: submitting ? 0.65 : 1,
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
              >
                {submitting ? "Joining…" : "Join free →"}
              </button>
            </form>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                background: "#ECFDF5",
                border: "1px solid #D1FAE5",
                borderRadius: 12,
                padding: "1rem 1.5rem",
                maxWidth: 480,
                margin: "0 auto 1rem",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#0E7A4E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: ".8rem",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: ".875rem",
                    fontWeight: 600,
                    color: "#0E7A4E",
                  }}
                >
                  You're on the list!
                </div>
                <div
                  style={{
                    fontSize: ".78rem",
                    color: "#065F46",
                    fontWeight: 300,
                  }}
                >
                  We'll reach out within 24 hours to set up your account.
                </div>
              </div>
            </div>
          )}

          <p style={{ fontSize: ".75rem", color: "#9B9890" }}>
            Talent side is free — no credit card. &nbsp;·&nbsp;{" "}
            <a
              href="/enterprise"
              style={{ color: "#6B6860", textDecoration: "underline" }}
            >
              Request enterprise access instead
            </a>
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════ */}
      <footer
        style={{
          background: "#111110",
          padding: "56px 2rem 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: "3rem",
              marginBottom: "3rem",
            }}
            className="hero-grid"
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: ".875rem",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: "#1A56DB",
                    borderRadius: 7,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 9l3.5 3.5L14 4"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#fff",
                  }}
                >
                  Meritos
                </span>
              </div>
              <p
                style={{
                  fontSize: ".875rem",
                  color: "rgba(255,255,255,.45)",
                  lineHeight: 1.65,
                  fontWeight: 300,
                  maxWidth: 260,
                }}
              >
                The Ecosystem-as-a-Service platform connecting innovation
                with capital, talent with opportunity.
              </p>
            </div>

            {[
              {
                title: "Platform",
                links: [
                  "For Students",
                  "For Founders",
                  "For Researchers",
                  "For Investors",
                  "For Corporations",
                  "For Government",
                ],
              },
              {
                title: "Company",
                links: [
                  "About Meritos",
                  "University Partners",
                  "Blog",
                  "Careers",
                  "Contact",
                ],
              },
              {
                title: "Legal",
                links: [
                  "Privacy Policy",
                  "Terms of Service",
                  "GDPR",
                  "Security",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    fontSize: ".72rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: ".08em",
                    color: "rgba(255,255,255,.35)",
                    marginBottom: "1rem",
                  }}
                >
                  {col.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                  }}
                >
                  {col.links.map((l) => (
                    <a
                      key={l}
                      href="#"
                      style={{
                        fontSize: ".875rem",
                        color: "rgba(255,255,255,.5)",
                        textDecoration: "none",
                        fontWeight: 300,
                        transition: "color .15s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,.85)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,.5)")
                      }
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,.08)",
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <p
              style={{
                fontSize: ".78rem",
                color: "rgba(255,255,255,.3)",
              }}
            >
              © {new Date().getFullYear()} Meritos · Ecosystem-as-a-Service
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy", "Terms", "Sitemap"].map((l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontSize: ".78rem",
                    color: "rgba(255,255,255,.3)",
                    textDecoration: "none",
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}