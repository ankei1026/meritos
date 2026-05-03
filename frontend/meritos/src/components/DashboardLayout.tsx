"use client";

/**
 * ─────────────────────────────────────────────────────────────
 *  Meritos · DashboardLayout.tsx
 *  Place at: src/components/DashboardLayout.tsx
 *
 *  Self-contained — no external CSS file required.
 *  All 6 role colours, nav items, and active-state logic
 *  are handled inside this single component.
 *
 *  Usage in any dashboard page:
 *
 *    import DashboardLayout from "@/components/DashboardLayout";
 *
 *    export default function StudentDashboard() {
 *      return (
 *        <DashboardLayout
 *          role="student"
 *          user={{ name: "Aisha Bautista", subtitle: "CS Graduate · AI/ML" }}
 *          pageTitle="Good morning, Aisha 👋"
 *          pageSubtitle="3 new matches today"
 *          notifications={3}
 *          headerActions={<button>My Button</button>}
 *        >
 *          <YourPageContent />
 *        </DashboardLayout>
 *      );
 *    }
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, ReactNode, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ═══════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════ */
export type UserRole =
  | "student"
  | "founder"
  | "researcher"
  | "investor"
  | "corporation"
  | "government";

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

export interface DashboardLayoutProps {
  role: UserRole;
  user: {
    name: string;
    subtitle: string;
    initials?: string;
  };
  children: ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
  headerActions?: ReactNode;
  /** Number of unread notifications — shows red dot when > 0 */
  notifications?: number;
}

/* ═══════════════════════════════════════════════
   ROLE CONFIG
   ⚠️  Routes use /dash/ to match your project.
       Change these if your folder is named differently.
═══════════════════════════════════════════════ */
const ROLE_CONFIG = {
  student: {
    color:       "#1A56DB",
    light:       "#EEF3FF",
    icon:        "🎓",
    label:       "Student",
    darkSidebar: false,
    nav: [
      { icon: "⊞",  label: "Overview",    href: "/dash/student" },
      { icon: "✦",  label: "AI Matches",  href: "/dash/student/matches" },
      { icon: "📅", label: "Events",      href: "/dash/student/events" },
      { icon: "👤", label: "Profile",     href: "/dash/student/profile" },
      { icon: "🔗", label: "Connections", href: "/dash/student/connections" },
      { icon: "⚙️", label: "Settings",    href: "/dash/student/settings" },
    ] as NavItem[],
  },
  founder: {
    color:       "#7C3AED",
    light:       "#F5F3FF",
    icon:        "🚀",
    label:       "Founder",
    darkSidebar: false,
    nav: [
      { icon: "⊞",  label: "Overview",        href: "/dash/founder" },
      { icon: "💼", label: "Investors",        href: "/dash/founder/investors" },
      { icon: "📊", label: "Pitch Analytics", href: "/dash/founder/analytics" },
      { icon: "👥", label: "Team",             href: "/dash/founder/team" },
      { icon: "📅", label: "Meetings",         href: "/dash/founder/meetings" },
      { icon: "⚙️", label: "Settings",         href: "/dash/founder/settings" },
    ] as NavItem[],
  },
  researcher: {
    color:       "#0E7A4E",
    light:       "#ECFDF5",
    icon:        "🔬",
    label:       "Researcher",
    darkSidebar: false,
    nav: [
      { icon: "⊞",  label: "Overview",     href: "/dash/researcher" },
      { icon: "📄", label: "Publications", href: "/dash/researcher/publications" },
      { icon: "💡", label: "IP Pipeline",  href: "/dash/researcher/ip" },
      { icon: "🏛️", label: "Grants",       href: "/dash/researcher/grants" },
      { icon: "🤝", label: "Collabs",      href: "/dash/researcher/collabs" },
      { icon: "⚙️", label: "Settings",     href: "/dash/researcher/settings" },
    ] as NavItem[],
  },
  investor: {
    color:       "#B45309",
    light:       "#FFFBEB",
    icon:        "💼",
    label:       "Investor",
    darkSidebar: true,           // ← dark sidebar for Investor
    nav: [
      { icon: "⊞",  label: "Deal Flow",      href: "/dash/investor" },
      { icon: "📁", label: "Portfolio",      href: "/dash/investor/portfolio" },
      { icon: "🔍", label: "Due Diligence",  href: "/dash/investor/dd" },
      { icon: "⚡", label: "First Look",     href: "/dash/investor/firstlook" },
      { icon: "📊", label: "Analytics",      href: "/dash/investor/analytics" },
      { icon: "⚙️", label: "Settings",       href: "/dash/investor/settings" },
    ] as NavItem[],
  },
  corporation: {
    color:       "#0C444C",
    light:       "#F0FAFB",
    icon:        "🏢",
    label:       "Corporation",
    darkSidebar: false,
    nav: [
      { icon: "⊞",  label: "Overview",     href: "/dash/corporation" },
      { icon: "🔍", label: "Talent Scout", href: "/dash/corporation/talent" },
      { icon: "🔬", label: "R&D Matches",  href: "/dash/corporation/rd" },
      { icon: "📋", label: "Job Reqs",     href: "/dash/corporation/jobs" },
      { icon: "⚗️", label: "Innovation",   href: "/dash/corporation/lab" },
      { icon: "📊", label: "Analytics",    href: "/dash/corporation/analytics" },
      { icon: "⚙️", label: "Settings",     href: "/dash/corporation/settings" },
    ] as NavItem[],
  },
  government: {
    color:       "#374151",
    light:       "#F9FAFB",
    icon:        "🏛️",
    label:       "Government",
    darkSidebar: false,
    nav: [
      { icon: "⊞",  label: "Ecosystem",    href: "/dash/government" },
      { icon: "🎁", label: "Grants",        href: "/dash/government/grants" },
      { icon: "📈", label: "Sectors",       href: "/dash/government/sectors" },
      { icon: "🏫", label: "Universities",  href: "/dash/government/universities" },
      { icon: "📄", label: "Policy",        href: "/dash/government/policy" },
      { icon: "⚙️", label: "Settings",      href: "/dash/government/settings" },
    ] as NavItem[],
  },
} as const;

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
export default function DashboardLayout({
  role,
  user,
  children,
  pageTitle,
  pageSubtitle,
  headerActions,
  notifications = 0,
}: DashboardLayoutProps) {

  const pathname                      = usePathname();
  const [collapsed,   setCollapsed]   = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notifOpen,   setNotifOpen]   = useState(false);
  const sidebarRef                    = useRef<HTMLElement>(null);

  const cfg      = ROLE_CONFIG[role];
  const isDark   = cfg.darkSidebar;
  const initials = (
    user.initials ??
    user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
  );

  /* ── Close mobile sidebar on route change ── */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  /* ── Close mobile sidebar on outside click ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const handle = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [mobileOpen]);

  /* ── Active-route check ── */
  const isActive = (href: string) => {
    // exact match for the overview route, prefix match for sub-routes
    const base = `/dash/${role}`;
    if (href === base) return pathname === base;
    return pathname.startsWith(href);
  };

  /* ═══ COLOURS / TOKENS (inline — no globals.css needed) ══════ */
  const SB_BG      = isDark ? "#111110"                 : "#FFFFFF";
  const SB_BORDER  = isDark ? "rgba(255,255,255,.08)"   : "#E8E5DF";
  const SB_TEXT    = isDark ? "rgba(255,255,255,.55)"   : "#6B6860";
  const SB_USER_TT = isDark ? "#FFFFFF"                  : "#111110";
  const SB_USER_ST = isDark ? "rgba(255,255,255,.40)"   : "#9B9890";

  /* ═══ RENDER ══════════════════════════════════════════════════ */
  return (
    <div style={{
      display:    "flex",
      height:     "100vh",
      overflow:   "hidden",
      background: "#FAFAF8",
      fontFamily: "'DM Sans', sans-serif",
      fontSize:   16,
    }}>

      {/* ── GLOBAL STYLES (scoped inside the layout) ─────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');

        /* scrollbar */
        .meritos-scroll::-webkit-scrollbar        { width: 4px; height: 4px; }
        .meritos-scroll::-webkit-scrollbar-track  { background: transparent; }
        .meritos-scroll::-webkit-scrollbar-thumb  { background: #E8E5DF; border-radius: 999px; }

        /* nav hover */
        .m-nav-link:hover {
          background: ${isDark ? "rgba(255,255,255,.07)" : "#F5F3EF"} !important;
          color:      ${isDark ? "#fff"                  : "#111110"} !important;
        }

        /* topbar search focus */
        .m-search-wrap:focus-within {
          border-color: ${cfg.color} !important;
          box-shadow:   0 0 0 3px ${cfg.color}1a !important;
          background:   #fff !important;
        }

        /* page-header actions */
        .m-page-actions .btn {
          font-family: 'DM Sans', sans-serif;
          font-size:   0.82rem;
          font-weight: 500;
          border-radius: 8px;
          padding: 0.45rem 1rem;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: opacity .12s, background .12s;
        }
        .m-page-actions .btn:hover   { opacity: .88; }
        .m-page-actions .btn-primary { color:#fff; background:${cfg.color}; }
        .m-page-actions .btn-secondary {
          color: #6B6860;
          background: #fff;
          border: 1px solid #E8E5DF;
        }
        .m-page-actions .btn-secondary:hover {
          background: #F5F3EF;
          border-color: #C8C4BC;
          color: #111110;
        }
        .m-page-actions .btn-sm { font-size:.78rem; padding:.375rem .75rem; }

        /* page-content fade-in */
        @keyframes m-fade-up {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0);   }
        }
        .m-fade { animation: m-fade-up .3s ease both; }

        /* mobile sidebar overlay */
        .m-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,.35);
          z-index: 39;
          transition: opacity .2s;
        }

        /* hamburger button hidden on desktop */
        .m-hamburger { display: none !important; }

        /* mobile breakpoints */
        @media (max-width: 768px) {
          .m-sidebar {
            position:  fixed !important;
            top: 0; left: 0;
            height: 100vh !important;
            transform: translateX(-100%);
            transition: transform .25s ease !important;
            box-shadow: 0 8px 40px rgba(0,0,0,.18);
            z-index: 40;
          }
          .m-sidebar.open   { transform: translateX(0) !important; }
          .m-overlay        { display: block !important; }
          .m-hamburger      { display: flex !important; }
          .m-search-wrap    { display: none !important; }
          .m-topbar-title   { display: block; }
        }

        @media (min-width: 769px) {
          .m-topbar-title { display: none; }
        }
      `}</style>

      {/* ── MOBILE OVERLAY ───────────────────────────────────── */}
      <div
        className="m-overlay"
        style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? "auto" : "none" }}
        onClick={() => setMobileOpen(false)}
      />

      {/* ═══════════════════════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════════════════════════ */}
      <aside
        ref={sidebarRef}
        className={`m-sidebar${mobileOpen ? " open" : ""}`}
        style={{
          width:        collapsed ? 64 : 220,
          background:   SB_BG,
          borderRight:  `1px solid ${SB_BORDER}`,
          display:      "flex",
          flexDirection:"column",
          padding:      "20px 10px",
          flexShrink:   0,
          transition:   "width .2s ease",
          overflow:     "hidden",
        }}
      >
        {/* ── Logo + collapse button ── */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, paddingLeft:4 }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none", overflow:"hidden" }}>
            {/* logomark */}
            <div style={{ width:28, height:28, background:"#1A56DB", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 9l3.5 3.5L14 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* name — hidden when collapsed */}
            {!collapsed && (
              <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:"1.1rem", color: isDark ? "#fff":"#111110", whiteSpace:"nowrap" }}>
                Meritos
              </span>
            )}
          </Link>

          {/* collapse toggle (desktop only) */}
          <button
            onClick={() => setCollapsed(c => !c)}
            title={collapsed ? "Expand" : "Collapse"}
            style={{ background:"none", border:"none", cursor:"pointer", color: SB_TEXT, padding:4, borderRadius:5, display:"flex", alignItems:"center", flexShrink:0 }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path
                d={collapsed ? "M6 4l4 4-4 4" : "M10 4L6 8l4 4"}
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* ── Role chip ── */}
        {!collapsed && (
          <div style={{ display:"flex", alignItems:"center", gap:6, background: cfg.light, border:`1px solid ${cfg.color}22`, borderRadius:999, padding:"4px 10px", marginBottom:16, alignSelf:"flex-start" }}>
            <span style={{ fontSize:12 }}>{cfg.icon}</span>
            <span style={{ fontSize:".7rem", fontWeight:600, color:cfg.color }}>{cfg.label}</span>
          </div>
        )}

        {/* ── Nav items ── */}
        <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
          {cfg.nav.map(item => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="m-nav-link"
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            10,
                  padding:        "9px 12px",
                  borderRadius:   9,
                  fontSize:       ".875rem",
                  fontWeight:     active ? 600 : 500,
                  color:          active ? cfg.color : SB_TEXT,
                  background:     active ? cfg.light  : "transparent",
                  borderLeft:     `2px solid ${active ? cfg.color : "transparent"}`,
                  textDecoration: "none",
                  whiteSpace:     "nowrap",
                  overflow:       "hidden",
                  transition:     "all .12s ease",
                }}
              >
                <span style={{ fontSize:15, flexShrink:0 }}>{item.icon}</span>
                {!collapsed && <span style={{ overflow:"hidden", textOverflow:"ellipsis" }}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* ── User footer ── */}
        <div style={{ borderTop:`1px solid ${SB_BORDER}`, paddingTop:16, display:"flex", alignItems:"center", gap:8, overflow:"hidden" }}>
          {/* avatar */}
          <div style={{ width:32, height:32, borderRadius:"50%", background:cfg.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:".65rem", fontWeight:700, color:"#fff", flexShrink:0 }}>
            {initials}
          </div>

          {/* name + subtitle */}
          {!collapsed && (
            <div style={{ flex:1, overflow:"hidden" }}>
              <div style={{ fontSize:".8rem", fontWeight:600, color:SB_USER_TT, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                {user.name}
              </div>
              <div style={{ fontSize:".67rem", color:SB_USER_ST, whiteSpace:"nowrap" }}>
                {user.subtitle}
              </div>
            </div>
          )}

          {/* sign-out */}
          {!collapsed && (
            <Link
              href="/login"
              title="Sign out"
              style={{ display:"flex", alignItems:"center", color:SB_USER_ST, padding:4, borderRadius:5, textDecoration:"none", flexShrink:0 }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3H3a1 1 0 00-1 1v8a1 1 0 001 1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          )}
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════
          MAIN AREA (topbar + scrollable content)
      ══════════════════════════════════════════════════════════ */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

        {/* ── TOPBAR ── */}
        <header style={{
          height:       60,
          background:   "#FFFFFF",
          borderBottom: "1px solid #E8E5DF",
          display:      "flex",
          alignItems:   "center",
          justifyContent:"space-between",
          padding:      "0 24px",
          flexShrink:   0,
          gap:          16,
        }}>
          {/* Left side */}
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>

            {/* Mobile hamburger */}
            <button
              className="m-hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Open navigation"
              style={{ background:"none", border:"1px solid #E8E5DF", borderRadius:6, padding:7, cursor:"pointer", alignItems:"center", justifyContent:"center" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="#6B6860" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Mobile page title (hidden on desktop) */}
            <span className="m-topbar-title" style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:".95rem", color:"#111110" }}>
              {pageTitle ?? "Meritos"}
            </span>

            {/* Search bar (hidden on mobile) */}
            <div
              className="m-search-wrap"
              style={{ display:"flex", alignItems:"center", gap:6, background:"#FAFAF8", border:"1px solid #E8E5DF", borderRadius:9, padding:"6px 12px", width:220, transition:"all .15s" }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}>
                <circle cx="7" cy="7" r="5" stroke="#9B9890" strokeWidth="1.4"/>
                <path d="M11 11l3 3" stroke="#9B9890" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search Meritos…"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                style={{ background:"none", border:"none", outline:"none", fontFamily:"'DM Sans',sans-serif", fontSize:".82rem", color:"#111110", width:"100%" }}
              />
              <kbd style={{ fontSize:".58rem", color:"#9B9890", background:"#E8E5DF", padding:"1px 5px", borderRadius:4, fontFamily:"inherit" }}>
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right side */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>

            {/* Notification bell */}
            <button
              onClick={() => setNotifOpen(o => !o)}
              aria-label="Notifications"
              style={{ position:"relative", width:36, height:36, borderRadius:9, border:"1px solid #E8E5DF", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"background .12s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F5F3EF")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#6B6860" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#6B6860" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {notifications > 0 && (
                <span style={{ position:"absolute", top:7, right:7, width:7, height:7, borderRadius:"50%", background:"#DC2626", border:"1.5px solid #fff" }}/>
              )}
            </button>

            {/* Avatar */}
            <div
              title={user.name}
              style={{ width:36, height:36, borderRadius:"50%", background:cfg.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:".68rem", fontWeight:700, color:"#fff", cursor:"pointer", flexShrink:0, userSelect:"none" }}
            >
              {initials}
            </div>
          </div>
        </header>

        {/* ── SCROLLABLE CONTENT ── */}
        <main
          className="meritos-scroll"
          style={{ flex:1, overflowY:"auto", overflowX:"hidden", padding:"24px 32px" }}
        >
          {/* Page header (title + action buttons) */}
          {(pageTitle || headerActions) && (
            <div
              className="m-fade m-page-actions"
              style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20, gap:16, flexWrap:"wrap" }}
            >
              {pageTitle && (
                <div>
                  <h1 style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.375rem", fontWeight:700, color:"#111110", letterSpacing:"-.02em", marginBottom:2 }}>
                    {pageTitle}
                  </h1>
                  {pageSubtitle && (
                    <p style={{ fontSize:".85rem", color:"#6B6860", fontWeight:300 }}>
                      {pageSubtitle}
                    </p>
                  )}
                </div>
              )}
              {headerActions && (
                <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                  {headerActions}
                </div>
              )}
            </div>
          )}

          {/* Dashboard page content */}
          <div className="m-fade" style={{ animationDelay:".06s" }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}