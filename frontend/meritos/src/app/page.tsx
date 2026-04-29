"use client";

import { useState, useEffect } from "react";

const SUPPLY_USERS = [
  {
    id: "students",
    icon: "🎓",
    label: "Students",
    headline: "Break into early-stage startups and innovation labs",
    body: "Skip the closed-door networks. Meritos auto-builds your profile from LinkedIn, GitHub, and academic records — then surfaces you directly to verified investors and corporate recruiters looking for emerging talent.",
    perks: ["Auto-profile from LinkedIn & GitHub", "Access exclusive pitch competitions", "Connect with startup founders actively hiring"],
    color: "#1A56DB", light: "#EEF3FF", tag: "Free forever",
    stats: { profiles: "8.2k", profilesNote: "↑ 420 this month", matchRate: "74%" },
    signals: [{ label: "Skills alignment", pct: 87 }, { label: "Domain relevance", pct: 74 }, { label: "Network proximity", pct: 62 }],
  },
  {
    id: "founders",
    icon: "🚀",
    label: "Startup Founders",
    headline: "Spend more time building, less time fundraising",
    body: "Stop cold-emailing VCs into the void. Meritos' AI matching engine delivers your pitch to investors whose mandates align with your stage, sector, and traction — before your competitors are even on their radar.",
    perks: ["AI-matched to aligned investors", "Data room integrations built-in", "Bypass gatekeepers and closed networks"],
    color: "#7C3AED", light: "#F5F3FF", tag: "Free forever",
    stats: { profiles: "3.4k", profilesNote: "↑ 180 this month", matchRate: "81%" },
    signals: [{ label: "Skills alignment", pct: 92 }, { label: "Domain relevance", pct: 85 }, { label: "Network proximity", pct: 70 }],
  },
  {
    id: "researchers",
    icon: "🔬",
    label: "Researchers",
    headline: "Turn your academic breakthroughs into commercial reality",
    body: "Your research deserves more than a journal shelf. Meritos connects you to corporations actively scouting IP and R&D talent, creating direct pathways from the lab to the market.",
    perks: ["Direct visibility to corporate innovation labs", "Paper-to-profile AI parsing", "IP licensing deal flow support"],
    color: "#0E7A4E", light: "#ECFDF5", tag: "Free forever",
    stats: { profiles: "1.9k", profilesNote: "↑ 95 this month", matchRate: "68%" },
    signals: [{ label: "Skills alignment", pct: 78 }, { label: "Domain relevance", pct: 91 }, { label: "Network proximity", pct: 55 }],
  },
];

const DEMAND_USERS = [
  {
    id: "investors",
    icon: "💼",
    label: "Investors",
    headline: "AI-curated deal flow, not noise",
    body: "Stop sifting through thousands of unvetted pitches. Meritos' vector matching engine scores and ranks startups against your exact investment mandate — delivering high-signal opportunities directly to your dashboard.",
    perks: ["First-look access before public channels", "Mandate-matched startup scoring", "Integrated due diligence data rooms"],
    color: "#B45309", light: "#FFFBEB", tag: "Paid access",
    stats: { saved: "40hrs", matchRate: "93%" },
    signals: [{ label: "Investment mandate fit", pct: 93 }, { label: "Stage alignment", pct: 87 }, { label: "Network proximity", pct: 79 }],
  },
  {
    id: "corporations",
    icon: "🏢",
    label: "Corporations",
    headline: "Scout niche talent and acquire R&D before competitors do",
    body: "Your next breakthrough hire or IP acquisition is already on Meritos. Access a pre-vetted database of researchers and founders matched to your innovation lab's specific problem statements.",
    perks: ["AI-matched researchers and student talent", "Early-stage R&D scouting", "Bulk HR and innovation lab licensing"],
    color: "#0C444C", light: "#F0FAFB", tag: "Enterprise subscription",
    stats: { saved: "60hrs", matchRate: "89%" },
    signals: [{ label: "R&D problem alignment", pct: 89 }, { label: "IP commercializability", pct: 82 }, { label: "Network proximity", pct: 74 }],
  },
  {
    id: "government",
    icon: "🏛️",
    label: "Government",
    headline: "Accelerate national innovation through a single platform",
    body: "From grant distribution to startup ecosystem monitoring, Meritos gives government innovation agencies a live view of the talent and ventures shaping tomorrow's economy.",
    perks: ["Ecosystem health dashboards", "Grant program pipeline management", "University and research institution integrations"],
    color: "#374151", light: "#F9FAFB", tag: "Institutional plan",
    stats: { saved: "28hrs", matchRate: "85%" },
    signals: [{ label: "Policy mandate match", pct: 85 }, { label: "Grant eligibility", pct: 78 }, { label: "Network proximity", pct: 65 }],
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSupply, setActiveSupply] = useState("students");
  const [activeDemand, setActiveDemand] = useState("investors");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const su = SUPPLY_USERS.find((u) => u.id === activeSupply)!;
  const du = DEMAND_USERS.find((u) => u.id === activeDemand)!;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{--bg:#FAFAF8;--surface:#fff;--border:#E8E5DF;--t1:#111110;--t2:#6B6860;--t3:#9B9890;--accent:#1A56DB;--accent-lt:#EEF3FF;--accent-dk:#1344B8;}
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--t1);line-height:1.6;font-size:16px;-webkit-font-smoothing:antialiased;}
        h1,h2,h3,h4{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em;}

        .nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 2rem;transition:all .25s;}
        .nav.scrolled{background:rgba(250,250,248,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);}
        .nav-inner{max-width:1200px;margin:0 auto;height:68px;display:flex;align-items:center;justify-content:space-between;}
        .logo{font-family:'Bricolage Grotesque',sans-serif;font-size:1.35rem;font-weight:700;color:var(--t1);text-decoration:none;display:flex;align-items:center;gap:9px;}
        .logo-mark{width:30px;height:30px;background:var(--accent);border-radius:8px;display:flex;align-items:center;justify-content:center;}
        .logo-mark svg{width:16px;height:16px;}
        .nav-links{display:flex;align-items:center;gap:2rem;list-style:none;}
        .nav-links a{font-size:.875rem;font-weight:500;color:var(--t2);text-decoration:none;transition:color .15s;}
        .nav-links a:hover{color:var(--t1);}
        .nav-actions{display:flex;align-items:center;gap:.75rem;}
        .btn-ghost{font-family:'DM Sans',sans-serif;font-size:.875rem;font-weight:500;color:var(--t2);background:none;border:none;cursor:pointer;padding:.5rem 1rem;border-radius:8px;text-decoration:none;transition:color .15s,background .15s;}
        .btn-ghost:hover{color:var(--t1);background:var(--border);}
        .btn-primary{font-family:'DM Sans',sans-serif;font-size:.875rem;font-weight:500;color:#fff;background:var(--accent);border:none;cursor:pointer;padding:.5rem 1.125rem;border-radius:8px;text-decoration:none;transition:background .15s,transform .1s;display:inline-flex;align-items:center;gap:6px;}
        .btn-primary:hover{background:var(--accent-dk);}
        .btn-primary:active{transform:scale(.98);}
        .btn-primary-lg{font-size:1rem;padding:.75rem 1.75rem;border-radius:10px;}
        .btn-outline-lg{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:500;color:var(--t1);background:transparent;border:1px solid var(--border);cursor:pointer;padding:.75rem 1.75rem;border-radius:10px;text-decoration:none;transition:border-color .15s,background .15s;display:inline-flex;align-items:center;gap:8px;}
        .btn-outline-lg:hover{border-color:#c0bcb5;background:#F5F3EF;}
        .hamburger{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;padding:6px;}
        .hamburger span{display:block;width:22px;height:2px;background:var(--t1);border-radius:2px;}

        /* HERO */
        .hero{padding:148px 2rem 80px;max-width:1200px;margin:0 auto;}
        .hero-top{text-align:center;max-width:820px;margin:0 auto 4rem;}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:var(--accent-lt);border:1px solid #C7D9FA;color:var(--accent);font-size:.8rem;font-weight:500;padding:5px 14px;border-radius:100px;margin-bottom:1.5rem;}
        .pulse{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:p 2s infinite;}
        @keyframes p{0%,100%{opacity:1}50%{opacity:.35}}
        .hero h1{font-size:clamp(2.75rem,5.5vw,4.25rem);font-weight:700;line-height:1.08;color:var(--t1);margin-bottom:1.25rem;}
        .hero h1 em{font-style:normal;color:var(--accent);}
        .hero-sub{font-size:1.1rem;color:var(--t2);max-width:640px;margin:0 auto 2rem;line-height:1.7;font-weight:300;}
        .hero-ctas{display:flex;align-items:center;justify-content:center;gap:.875rem;flex-wrap:wrap;margin-bottom:1.5rem;}
        .hero-note{font-size:.78rem;color:var(--t3);}
        .hero-note strong{color:var(--t2);font-weight:500;}

        /* MARKETPLACE */
        .marketplace{display:grid;grid-template-columns:1fr auto 1fr;gap:2rem;align-items:center;max-width:1100px;margin:0 auto;}
        .mkt-side{display:flex;flex-direction:column;gap:.75rem;}
        .mkt-card{background:#fff;border:1px solid var(--border);border-radius:12px;padding:1rem 1.25rem;display:flex;align-items:center;gap:12px;transition:border-color .2s,box-shadow .2s,transform .2s;}
        .mkt-card:hover{border-color:#c0bcb5;box-shadow:0 4px 16px rgba(0,0,0,.07);transform:translateY(-2px);}
        .mkt-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
        .mkt-card-text{flex:1;}
        .mkt-card-title{font-size:.875rem;font-weight:600;color:var(--t1);}
        .mkt-card-sub{font-size:.75rem;color:var(--t2);font-weight:300;}
        .mkt-tag{font-size:.65rem;font-weight:600;padding:3px 8px;border-radius:100px;white-space:nowrap;}
        .mkt-center{display:flex;flex-direction:column;align-items:center;gap:.5rem;}
        .mkt-engine{background:var(--t1);border-radius:20px;padding:2rem 1.5rem;display:flex;flex-direction:column;align-items:center;gap:.75rem;text-align:center;min-width:180px;}
        .mkt-engine-icon{width:52px;height:52px;background:var(--accent);border-radius:14px;display:flex;align-items:center;justify-content:center;}
        .mkt-engine-icon svg{width:26px;height:26px;color:#fff;}
        .mkt-engine-title{font-family:'Bricolage Grotesque',sans-serif;font-size:.95rem;font-weight:700;color:#fff;}
        .mkt-engine-sub{font-size:.7rem;color:rgba(255,255,255,.5);line-height:1.5;font-weight:300;}
        .mkt-arrow{font-size:.9rem;color:var(--border);font-weight:500;}
        .side-label{font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;text-align:center;margin-bottom:.25rem;}

        /* SECTIONS */
        .section{padding:96px 2rem;}
        .section-inner{max-width:1200px;margin:0 auto;}
        .section-label{font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--accent);margin-bottom:.75rem;}
        .section-title{font-size:clamp(1.75rem,3.5vw,2.5rem);font-weight:700;line-height:1.2;color:var(--t1);margin-bottom:1rem;max-width:640px;}
        .section-body{font-size:1rem;color:var(--t2);max-width:520px;line-height:1.7;font-weight:300;}

        /* LOGOS */
        .logos-strip{padding:36px 2rem;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:#fff;text-align:center;}
        .logos-strip-label{font-size:.72rem;color:var(--t3);font-weight:500;text-transform:uppercase;letter-spacing:.09em;margin-bottom:1.25rem;}
        .logos-row{display:flex;align-items:center;justify-content:center;gap:3rem;flex-wrap:wrap;}
        .logo-name{font-family:'Bricolage Grotesque',sans-serif;font-size:1.05rem;font-weight:700;color:var(--t3);transition:color .2s;}
        .logo-name:hover{color:var(--t2);}

        /* USER TABS */
        .user-tabs{display:flex;gap:.5rem;margin-bottom:2rem;}
        .user-tab{font-family:'DM Sans',sans-serif;font-size:.875rem;font-weight:500;color:var(--t2);background:none;border:1px solid transparent;cursor:pointer;padding:.5rem 1.1rem;border-radius:100px;transition:all .2s;display:flex;align-items:center;gap:6px;}
        .user-tab:hover{background:#F5F3EF;border-color:var(--border);}
        .user-tab.active{background:#fff;border-color:var(--border);color:var(--t1);box-shadow:0 1px 4px rgba(0,0,0,.06);}
        .user-panel{background:#fff;border:1px solid var(--border);border-radius:20px;padding:2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
        .user-panel-badge{display:inline-flex;align-items:center;gap:6px;font-size:.72rem;font-weight:600;padding:4px 11px;border-radius:100px;margin-bottom:1rem;}
        .user-panel h3{font-size:1.5rem;font-weight:700;color:var(--t1);line-height:1.25;margin-bottom:.875rem;}
        .user-panel p{font-size:.9375rem;color:var(--t2);line-height:1.7;font-weight:300;margin-bottom:1.5rem;}
        .perks{list-style:none;display:flex;flex-direction:column;gap:.625rem;margin-bottom:2rem;}
        .perk{display:flex;align-items:flex-start;gap:10px;font-size:.875rem;color:var(--t1);}
        .perk-check{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
        .perk-check svg{width:9px;height:9px;}
        .panel-ctas{display:flex;gap:.75rem;flex-wrap:wrap;}
        .panel-right{background:var(--bg);border:1px solid var(--border);border-radius:14px;padding:1.5rem;}
        .stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:.875rem;}
        .stat-box{background:#fff;border:1px solid var(--border);border-radius:10px;padding:.875rem;}
        .stat-box-label{font-size:.65rem;color:var(--t3);font-weight:500;text-transform:uppercase;letter-spacing:.05em;margin-bottom:3px;}
        .stat-box-value{font-family:'Bricolage Grotesque',sans-serif;font-size:1.5rem;font-weight:700;line-height:1;}
        .stat-box-note{font-size:.65rem;font-weight:500;margin-top:2px;}
        .signal-box{background:#fff;border:1px solid var(--border);border-radius:10px;padding:.875rem;}
        .signal-title{font-size:.72rem;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.625rem;}
        .signal-row{display:flex;align-items:center;gap:8px;margin-bottom:.5rem;}
        .signal-row:last-child{margin-bottom:0;}
        .signal-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
        .signal-bar-wrap{flex:1;height:6px;background:var(--bg);border-radius:100px;overflow:hidden;}
        .signal-bar{height:100%;border-radius:100px;}
        .signal-pct{font-size:.7rem;color:var(--t2);font-weight:500;min-width:36px;text-align:right;}

        /* SPLIT */
        .side-split{display:grid;grid-template-columns:1fr 1fr;gap:2px;border:1px solid var(--border);border-radius:20px;overflow:hidden;}
        .split-panel{padding:3rem;}
        .split-panel.supply{background:#fff;}
        .split-panel.demand{background:var(--t1);}
        .split-tag{display:inline-flex;align-items:center;gap:5px;font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;padding:4px 10px;border-radius:100px;margin-bottom:1.25rem;}
        .supply .split-tag{background:var(--accent-lt);color:var(--accent);}
        .demand .split-tag{background:rgba(255,255,255,.1);color:rgba(255,255,255,.7);}
        .split-title{font-size:1.4rem;font-weight:700;line-height:1.25;margin-bottom:.75rem;}
        .supply .split-title{color:var(--t1);}
        .demand .split-title{color:#fff;}
        .split-body{font-size:.875rem;line-height:1.65;font-weight:300;margin-bottom:1.75rem;}
        .supply .split-body{color:var(--t2);}
        .demand .split-body{color:rgba(255,255,255,.6);}
        .split-list{list-style:none;display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.75rem;}
        .split-item{display:flex;align-items:center;gap:8px;font-size:.825rem;}
        .supply .split-item{color:var(--t2);}
        .demand .split-item{color:rgba(255,255,255,.75);}
        .split-bullet{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
        .supply .split-bullet{background:var(--accent);}
        .demand .split-bullet{background:rgba(255,255,255,.4);}
        .btn-supply{font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:500;color:#fff;background:var(--accent);border:none;cursor:pointer;padding:.6875rem 1.5rem;border-radius:9px;text-decoration:none;transition:background .15s;display:inline-flex;align-items:center;gap:6px;}
        .btn-supply:hover{background:var(--accent-dk);}
        .btn-demand{font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:500;color:var(--t1);background:#fff;border:none;cursor:pointer;padding:.6875rem 1.5rem;border-radius:9px;text-decoration:none;transition:opacity .15s;display:inline-flex;align-items:center;gap:6px;}
        .btn-demand:hover{opacity:.9;}

        /* AI */
        .ai-section{background:var(--t1);}
        .ai-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
        .ai-label{font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:.75rem;}
        .ai-title{font-size:clamp(1.75rem,3.5vw,2.5rem);font-weight:700;line-height:1.2;color:#fff;margin-bottom:1rem;}
        .ai-body{font-size:1rem;color:rgba(255,255,255,.55);line-height:1.7;font-weight:300;}
        .ai-cards{display:flex;flex-direction:column;gap:.75rem;margin-top:2rem;}
        .ai-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:1.25rem;display:flex;gap:1rem;align-items:flex-start;}
        .ai-card-icon{width:40px;height:40px;border-radius:10px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .ai-card-icon svg{width:18px;height:18px;color:rgba(255,255,255,.8);}
        .ai-card h4{font-size:.9rem;font-weight:600;color:#fff;margin-bottom:3px;}
        .ai-card p{font-size:.8rem;color:rgba(255,255,255,.5);line-height:1.55;font-weight:300;}
        .ai-visual{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:2rem;}
        .ai-vis-label{font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.4);margin-bottom:1.25rem;}
        .match-result{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:1rem 1.25rem;margin-bottom:.75rem;display:flex;align-items:center;gap:12px;}
        .match-result:last-child{margin-bottom:0;}
        .match-avatar{width:36px;height:36px;border-radius:9px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
        .match-info{flex:1;}
        .match-name{font-size:.825rem;font-weight:600;color:#fff;}
        .match-type{font-size:.7rem;color:rgba(255,255,255,.45);font-weight:300;}
        .score-num{font-family:'Bricolage Grotesque',sans-serif;font-size:1.1rem;font-weight:700;}
        .score-label{font-size:.6rem;color:rgba(255,255,255,.35);}

        /* STATS */
        .stats-section{background:var(--accent);}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;text-align:center;}
        .stat-value{font-family:'Bricolage Grotesque',sans-serif;font-size:3rem;font-weight:700;color:#fff;line-height:1;margin-bottom:8px;}
        .stat-label{font-size:.875rem;color:rgba(255,255,255,.65);font-weight:300;}

        /* ROADMAP */
        .roadmap-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3.5rem;}
        .roadmap-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:1.75rem;position:relative;overflow:hidden;}
        .roadmap-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;}
        .phase-1::before{background:var(--accent);}
        .phase-2::before{background:#7C3AED;}
        .phase-3::before{background:#0E7A4E;}
        .roadmap-phase{font-size:.7rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.75rem;}
        .phase-1 .roadmap-phase{color:var(--accent);}
        .phase-2 .roadmap-phase{color:#7C3AED;}
        .phase-3 .roadmap-phase{color:#0E7A4E;}
        .roadmap-card h3{font-size:1.05rem;font-weight:700;color:var(--t1);margin-bottom:.5rem;}
        .roadmap-card p{font-size:.875rem;color:var(--t2);line-height:1.6;font-weight:300;}
        .roadmap-milestone{margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);font-size:.78rem;font-weight:500;color:var(--t3);display:flex;align-items:center;gap:6px;}

        /* CTA */
        .cta-section{background:var(--bg);}
        .cta-box{background:var(--t1);border-radius:24px;padding:5rem 3rem;text-align:center;max-width:900px;margin:0 auto;}
        .cta-box h2{font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;margin-bottom:1rem;line-height:1.15;}
        .cta-box p{font-size:1.0625rem;color:rgba(255,255,255,.6);margin-bottom:2.25rem;font-weight:300;}
        .cta-actions{display:flex;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap;}
        .btn-cta-white{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:500;color:var(--t1);background:#fff;border:none;cursor:pointer;padding:.8125rem 1.875rem;border-radius:10px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:opacity .15s;}
        .btn-cta-white:hover{opacity:.9;}
        .btn-cta-outline{font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:500;color:#fff;background:transparent;border:1.5px solid rgba(255,255,255,.25);cursor:pointer;padding:.8125rem 1.875rem;border-radius:10px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:border-color .15s;}
        .btn-cta-outline:hover{border-color:rgba(255,255,255,.55);}

        /* FOOTER */
        .footer{background:#fff;border-top:1px solid var(--border);padding:60px 2rem 40px;}
        .footer-inner{max-width:1200px;margin:0 auto;}
        .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem;}
        .footer-brand p{font-size:.875rem;color:var(--t2);line-height:1.6;margin-top:.875rem;max-width:260px;font-weight:300;}
        .footer-col h4{font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--t1);margin-bottom:1rem;}
        .footer-col ul{list-style:none;display:flex;flex-direction:column;gap:.6rem;}
        .footer-col ul a{font-size:.875rem;color:var(--t2);text-decoration:none;transition:color .15s;font-weight:300;}
        .footer-col ul a:hover{color:var(--t1);}
        .footer-bottom{border-top:1px solid var(--border);padding-top:1.5rem;display:flex;align-items:center;justify-content:space-between;}
        .footer-copy{font-size:.8rem;color:var(--t3);}
        .footer-legal{display:flex;gap:1.5rem;}
        .footer-legal a{font-size:.8rem;color:var(--t3);text-decoration:none;}
        .footer-legal a:hover{color:var(--t2);}

        @media(max-width:1024px){
          .marketplace{grid-template-columns:1fr;}
          .mkt-side{flex-direction:row;flex-wrap:wrap;}
          .mkt-center{flex-direction:row;}
          .mkt-arrow{transform:rotate(90deg);}
          .ai-grid{grid-template-columns:1fr;}
          .side-split{grid-template-columns:1fr;border-radius:16px;}
          .user-panel{grid-template-columns:1fr;}
          .footer-top{grid-template-columns:1fr 1fr;}
          .roadmap-grid{grid-template-columns:1fr;}
          .stats-grid{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:768px){
          .nav-links,.nav-actions{display:none;}
          .hamburger{display:flex;}
          .hero h1{font-size:2.25rem;}
          .user-tabs{overflow-x:auto;}
          .footer-top{grid-template-columns:1fr;gap:2rem;}
          .footer-bottom{flex-direction:column;gap:1rem;text-align:center;}
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="logo">
            <div className="logo-mark">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2 9l3.5 3.5L14 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            Meritos
          </a>
          <ul className="nav-links">
            <li><a href="#users">Who it's for</a></li>
            <li><a href="#model">How it works</a></li>
            <li><a href="#ai">AI Engine</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
          </ul>
          <div className="nav-actions">
            <a href="/login" className="btn-ghost">Log in</a>
            <a href="/signup" className="btn-primary">
              Join free
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <button className="hamburger" aria-label="Menu"><span/><span/><span/></button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "var(--bg)" }}>
        <div className="hero">
          <div className="hero-top">
            <div className="hero-eyebrow">
              <div className="pulse"/>
              Ecosystem-as-a-Service · Now in public beta
            </div>
            <h1>Where <em>Innovation</em> Meets<br/>Capital and Opportunity</h1>
            <p className="hero-sub">
              Meritos is the AI-powered platform bridging the gap between innovators and those who fund, hire, and commercialize them — connecting Students, Founders, and Researchers with Investors, Corporations, and Government.
            </p>
            <div className="hero-ctas">
              <a href="/signup" className="btn-primary btn-primary-lg">
                Join free as Talent →
              </a>
              <a href="/enterprise" className="btn-outline-lg">Request enterprise access</a>
            </div>
            <p className="hero-note">
              <strong>Supply side is 100% free</strong> &nbsp;·&nbsp; Investors &amp; Corporations access via subscription
            </p>
          </div>

          <div className="marketplace">
            <div>
              <div className="side-label" style={{ color: "var(--accent)" }}>Supply Side · Free</div>
              <div className="mkt-side">
                {SUPPLY_USERS.map((u) => (
                  <div key={u.id} className="mkt-card">
                    <div className="mkt-icon" style={{ background: u.light }}>{u.icon}</div>
                    <div className="mkt-card-text">
                      <div className="mkt-card-title">{u.label}</div>
                      <div className="mkt-card-sub">{u.id === "students" ? "Academic talent" : u.id === "founders" ? "Early-stage startups" : "Academic researchers"}</div>
                    </div>
                    <span className="mkt-tag" style={{ background: u.light, color: u.color }}>Free</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mkt-center">
              <span className="mkt-arrow">→</span>
              <div className="mkt-engine">
                <div className="mkt-engine-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="mkt-engine-title">AI Matching Engine</div>
                <div className="mkt-engine-sub">NLP · Vectors · Knowledge Graphs</div>
              </div>
              <span className="mkt-arrow">→</span>
            </div>
            <div>
              <div className="side-label" style={{ color: "#0E7A4E" }}>Demand Side · Paid</div>
              <div className="mkt-side">
                {DEMAND_USERS.map((u) => (
                  <div key={u.id} className="mkt-card">
                    <div className="mkt-icon" style={{ background: u.light }}>{u.icon}</div>
                    <div className="mkt-card-text">
                      <div className="mkt-card-title">{u.label}</div>
                      <div className="mkt-card-sub">{u.id === "investors" ? "VCs & private equity" : u.id === "corporations" ? "Innovation & HR labs" : "Public sector agencies"}</div>
                    </div>
                    <span className="mkt-tag" style={{ background: "#ECFDF5", color: "#0E7A4E" }}>Paid</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div className="logos-strip">
        <div className="logos-strip-label">Trusted by universities, funds, and innovation labs</div>
        <div className="logos-row">
          {["MIT TTO", "Andreessen", "Y Combinator", "PwC Venturaes", "DOST", "Stanford OTL"].map((n) => (
            <span key={n} className="logo-name">{n}</span>
          ))}
        </div>
      </div>

      {/* SUPPLY TABS */}
      <section className="section" id="users">
        <div className="section-inner">
          <p className="section-label">Supply side · Free to join</p>
          <h2 className="section-title" style={{ marginBottom: "2rem" }}>Built for innovators at every stage</h2>
          <div className="user-tabs">
            {SUPPLY_USERS.map((u) => (
              <button key={u.id} className={`user-tab${activeSupply === u.id ? " active" : ""}`} onClick={() => setActiveSupply(u.id)}>
                {u.icon} {u.label}
              </button>
            ))}
          </div>
          <div className="user-panel">
            <div>
              <div className="user-panel-badge" style={{ background: su.light, color: su.color }}>
                {su.icon} {su.label} · {su.tag}
              </div>
              <h3>{su.headline}</h3>
              <p>{su.body}</p>
              <ul className="perks">
                {su.perks.map((p) => (
                  <li key={p} className="perk">
                    <div className="perk-check" style={{ background: su.light }}>
                      <svg viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke={su.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="panel-ctas">
                <a href="/signup" className="btn-primary btn-primary-lg" style={{ background: su.color }}>
                  Join free as {su.label === "Startup Founders" ? "Founder" : su.label.slice(0, -1)}
                </a>
                <a href="#demo" className="btn-outline-lg" style={{ fontSize: ".9rem", padding: ".625rem 1.25rem" }}>Learn more</a>
              </div>
            </div>
            <div className="panel-right">
              <div className="stat-grid">
                <div className="stat-box">
                  <div className="stat-box-label">Active profiles</div>
                  <div className="stat-box-value" style={{ color: su.color }}>{su.stats.profiles}</div>
                  <div className="stat-box-note" style={{ color: su.color }}>{su.stats.profilesNote}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-box-label">Avg. match rate</div>
                  <div className="stat-box-value" style={{ color: su.color }}>{su.stats.matchRate}</div>
                  <div className="stat-box-note" style={{ color: su.color }}>AI-scored</div>
                </div>
              </div>
              <div className="signal-box">
                <div className="signal-title">AI Match Signals</div>
                {su.signals.map((s) => (
                  <div key={s.label} className="signal-row">
                    <div className="signal-dot" style={{ background: su.color }}/>
                    <div className="signal-bar-wrap">
                      <div className="signal-bar" style={{ width: `${s.pct}%`, background: su.color, opacity: .75 }}/>
                    </div>
                    <div className="signal-pct">{s.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMAND TABS */}
      <section className="section" style={{ background: "#fff", paddingTop: 0 }}>
        <div className="section-inner">
          <p className="section-label">Demand side · Enterprise access</p>
          <h2 className="section-title" style={{ marginBottom: "2rem" }}>AI-curated access for those who fund and scale</h2>
          <div className="user-tabs">
            {DEMAND_USERS.map((u) => (
              <button key={u.id} className={`user-tab${activeDemand === u.id ? " active" : ""}`} onClick={() => setActiveDemand(u.id)}>
                {u.icon} {u.label}
              </button>
            ))}
          </div>
          <div className="user-panel">
            <div>
              <div className="user-panel-badge" style={{ background: du.light, color: du.color }}>
                {du.icon} {du.label} · {du.tag}
              </div>
              <h3>{du.headline}</h3>
              <p>{du.body}</p>
              <ul className="perks">
                {du.perks.map((p) => (
                  <li key={p} className="perk">
                    <div className="perk-check" style={{ background: du.light }}>
                      <svg viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke={du.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="panel-ctas">
                <a href="/enterprise" className="btn-primary btn-primary-lg" style={{ background: du.color }}>
                  Request access
                </a>
                <a href="#demo" className="btn-outline-lg" style={{ fontSize: ".9rem", padding: ".625rem 1.25rem" }}>See a demo</a>
              </div>
            </div>
            <div className="panel-right">
              <div className="stat-grid">
                <div className="stat-box">
                  <div className="stat-box-label">Avg. time saved</div>
                  <div className="stat-box-value" style={{ color: du.color }}>{du.stats.saved}</div>
                  <div className="stat-box-note" style={{ color: du.color }}>per month</div>
                </div>
                <div className="stat-box">
                  <div className="stat-box-label">Match precision</div>
                  <div className="stat-box-value" style={{ color: du.color }}>{du.stats.matchRate}</div>
                  <div className="stat-box-note" style={{ color: du.color }}>AI-scored</div>
                </div>
              </div>
              <div className="signal-box">
                <div className="signal-title">Top Match Signals</div>
                {du.signals.map((s) => (
                  <div key={s.label} className="signal-row">
                    <div className="signal-dot" style={{ background: du.color }}/>
                    <div className="signal-bar-wrap">
                      <div className="signal-bar" style={{ width: `${s.pct}%`, background: du.color, opacity: .7 }}/>
                    </div>
                    <div className="signal-pct">{s.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-SIDED MODEL */}
      <section className="section" id="model" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="section-label">Marketplace model</p>
            <h2 className="section-title" style={{ maxWidth: "100%", margin: "0 auto .875rem" }}>A platform built for both sides of innovation</h2>
            <p className="section-body" style={{ maxWidth: "580px", margin: "0 auto" }}>Meritos creates value by removing friction on both ends — making talent visible, and making discovery effortless.</p>
          </div>
          <div className="side-split">
            <div className="split-panel supply">
              <div className="split-tag">🎓 🚀 🔬 &nbsp;Supply Side</div>
              <h3 className="split-title">For talent: a launchpad, not a job board</h3>
              <p className="split-body">Students, founders, and researchers get instant visibility to verified investors and corporations — bypassing cold emails and closed networks. Profiles are auto-built from LinkedIn, GitHub, and published papers.</p>
              <ul className="split-list">
                {["100% free, always", "AI-parsed profiles from your existing digital footprint", "Access to pitch competitions and grant events exclusively on platform", "Direct invitations from verified investors & corporations"].map((i) => (
                  <li key={i} className="split-item"><span className="split-bullet"/>{i}</li>
                ))}
              </ul>
              <a href="/signup" className="btn-supply">Join as talent — it's free →</a>
            </div>
            <div className="split-panel demand">
              <div className="split-tag">💼 🏢 🏛️ &nbsp;Demand Side</div>
              <h3 className="split-title">For enterprises: curated signal, not noise</h3>
              <p className="split-body">Investors, corporations, and government agencies access a pre-vetted database matched to their exact mandates — scored by AI, not filtered by a human assistant.</p>
              <ul className="split-list">
                {["Tiered SaaS subscriptions for VC, corporate, and public sector", "First-look access to high-potential talent before public channels", "Integrated due diligence tools and data room access", "GDPR/CCPA-compliant data with accreditation verification"].map((i) => (
                  <li key={i} className="split-item"><span className="split-bullet"/>{i}</li>
                ))}
              </ul>
              <a href="/enterprise" className="btn-demand">Request enterprise access →</a>
            </div>
          </div>
        </div>
      </section>

      {/* AI ENGINE */}
      <section className="section ai-section" id="ai">
        <div className="section-inner">
          <div className="ai-grid">
            <div>
              <p className="ai-label">Intelligence Core</p>
              <h2 className="ai-title">The AI matching engine that cuts through noise</h2>
              <p className="ai-body">Meritos doesn't rely on keyword search. Our three-layer AI architecture calculates contextual relevance at scale — delivering the right match, at the right time.</p>
              <div className="ai-cards">
                {[
                  { title: "NLP & Vector Embeddings (GPT-4o)", body: "Converts research papers and pitch decks into mathematical vectors, calculating Cosine Similarity against investor mandates and corporate problem statements." },
                  { title: "Knowledge Graphs (Neo4j)", body: "Maps hidden relationships across the ecosystem — matching a researcher to an investor based on shared university ties, co-authorship, or overlapping research niche." },
                  { title: "Vector Database (Pinecone)", body: "Lightning-fast retrieval of top-ranked matches across millions of data points so your dashboard updates in real time as new talent joins." },
                ].map((c) => (
                  <div key={c.title} className="ai-card">
                    <div className="ai-card-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div><h4>{c.title}</h4><p>{c.body}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ai-visual">
              <div className="ai-vis-label">Live Match Results · Investor Dashboard</div>
              {[
                { emoji: "🚀", name: "NanoMed Labs", type: "Seed-stage BioTech startup", score: 97, color: "#4ADE80" },
                { emoji: "🔬", name: "Dr. Chen Wei", type: "MIT Researcher · Quantum Computing", score: 91, color: "#60A5FA" },
                { emoji: "🎓", name: "Aisha Bautista", type: "CS Graduate · AI/ML Focus", score: 85, color: "#A78BFA" },
                { emoji: "🏛️", name: "GridFlow Energy", type: "Gov-backed CleanTech initiative", score: 79, color: "#34D399" },
              ].map((m) => (
                <div key={m.name} className="match-result">
                  <div className="match-avatar">{m.emoji}</div>
                  <div className="match-info">
                    <div className="match-name">{m.name}</div>
                    <div className="match-type">{m.type}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="score-num" style={{ color: m.color }}>{m.score}%</div>
                    <div className="score-label">match</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section stats-section">
        <div className="section-inner">
          <div className="stats-grid">
            {[
              { value: "13,500+", label: "Ecosystem members globally" },
              { value: "93%", label: "AI match precision rate" },
              { value: "3×", label: "Faster deal sourcing for investors" },
              { value: "80%", label: "Less time spent fundraising" },
            ].map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="section" id="roadmap" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <p className="section-label">Strategic roadmap</p>
          <h2 className="section-title">Built to scale from liquidity to market dominance</h2>
          <p className="section-body">A three-phase strategy designed to build critical mass before monetization, ensuring sustainable network effects.</p>
          <div className="roadmap-grid">
            {[
              { cls: "phase-1", phase: "Phase 1 · Liquidity Build", title: "MVP Launch & University Partnerships", body: "Launch the MVP and partner with 3 major universities to onboard 5,000+ students and researchers. Supply side must reach critical mass before the demand side opens.", milestone: "Target: 5,000+ supply-side profiles" },
              { cls: "phase-2", phase: "Phase 2 · Monetization", title: "Open to Investors & Corporations", body: "Open the platform to a waitlist of 50 VC firms and corporate innovation labs. Begin generating SaaS revenue through tiered subscriptions and 3-month free pilots.", milestone: "Target: $1M ARR from demand side" },
              { cls: "phase-3", phase: "Phase 3 · Scale", title: "C-Corp Conversion & Seed Round", body: "Transition from LLC to Delaware C-Corp. Raise a Seed round to scale the sales team, expand to national university ecosystems, and introduce placement success fees.", milestone: "Target: Seed round · National expansion" },
            ].map((r) => (
              <div key={r.phase} className={`roadmap-card ${r.cls}`}>
                <div className="roadmap-phase">{r.phase}</div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                <div className="roadmap-milestone">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {r.milestone}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="cta-box">
          <h2>Ready to plug into the innovation ecosystem?</h2>
          <p>Whether you're building, researching, investing, or hiring — Meritos is your platform. Join the ecosystem shortening the distance between big ideas and the capital they need.</p>
          <div className="cta-actions">
            <a href="/signup" className="btn-cta-white">
              Join free as Talent →
            </a>
            <a href="/enterprise" className="btn-cta-outline">Request enterprise access</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo">
                <div className="logo-mark">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M2 9l3.5 3.5L14 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                Meritos
              </a>
              <p>The Ecosystem-as-a-Service platform connecting innovation with capital, talent with opportunity.</p>
            </div>
            <div className="footer-col">
              <h4>Platform</h4>
              <ul>
                {["For Students", "For Founders", "For Researchers", "For Investors", "For Corporations", "For Government"].map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                {["About Meritos", "University Partners", "Blog", "Careers", "Contact"].map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                {["Privacy Policy", "Terms of Service", "GDPR Compliance", "Security"].map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© {new Date().getFullYear()} Meritos · Ecosystem-as-a-Service</p>
            <div className="footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}