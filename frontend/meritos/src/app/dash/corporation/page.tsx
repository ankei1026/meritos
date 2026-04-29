"use client";
import { useState } from "react";

const NAV = [
  { icon: "⊞", label: "Overview", id: "overview" },
  { icon: "🔍", label: "Talent Scout", id: "talent" },
  { icon: "🔬", label: "R&D Matches", id: "rd" },
  { icon: "📋", label: "Job Requisitions", id: "jobs" },
  { icon: "⚗️", label: "Innovation Lab", id: "lab" },
  { icon: "📊", label: "Analytics", id: "analytics" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const TALENT_PIPELINE = [
  { name: "Aisha Bautista", role: "CS Graduate · AI/ML", match: 96, stage: "Interview", color: "#1A56DB", light: "#EEF3FF", initials: "AB", skills: ["Python", "ML", "Research"] },
  { name: "Marco Reyes", role: "PhD Candidate · Materials Sci.", match: 92, stage: "Screening", color: "#7C3AED", light: "#F5F3FF", initials: "MR", skills: ["Materials", "Quantum", "Lab"] },
  { name: "Lena Kim", role: "MS Robotics · Stanford", match: 88, stage: "Offer Sent", color: "#0E7A4E", light: "#ECFDF5", initials: "LK", skills: ["Robotics", "CV", "C++"] },
  { name: "Dr. James Osei", role: "Post-doc · BioInformatics", match: 85, stage: "Screening", color: "#B45309", light: "#FFFBEB", initials: "JO", skills: ["BioInfo", "R", "Statistics"] },
  { name: "Sofia Tan", role: "BS Computer Eng · UP Diliman", match: 79, stage: "Matched", color: "#0C444C", light: "#F0FAFB", initials: "ST", skills: ["Embedded", "IoT", "C"] },
];

const RD_MATCHES = [
  { researcher: "Dr. Chen Wei", inst: "MIT", paper: "Quantum-Assisted Drug Target Identification", relevance: "Drug discovery pipeline", match: 95, color: "#0E7A4E", light: "#ECFDF5" },
  { researcher: "Prof. Aisha Patel", inst: "IIT Bombay", paper: "Neural Compression for Edge AI", relevance: "Edge device optimization", match: 89, color: "#1A56DB", light: "#EEF3FF" },
  { researcher: "Dr. Luis Santos", inst: "UP Diliman", paper: "Next-Gen Energy Storage Materials", relevance: "Battery R&D program", match: 83, color: "#7C3AED", light: "#F5F3FF" },
];

const JOBS = [
  { title: "Senior AI Research Engineer", dept: "Innovation Lab", applicants: 24, matched: 8, status: "Active", urgent: true },
  { title: "Materials Science Intern", dept: "R&D Division", applicants: 41, matched: 12, status: "Active", urgent: false },
  { title: "Data Science Lead", dept: "Product Analytics", applicants: 18, matched: 5, status: "Active", urgent: true },
  { title: "Quantum Computing Researcher", dept: "Innovation Lab", applicants: 9, matched: 3, status: "Draft", urgent: false },
];

const PROJECTS = [
  { name: "AI Drug Discovery Pipeline", stage: "Active", budget: "$2.4M", researchers: 3, progress: 65, color: "#0E7A4E" },
  { name: "Edge AI Compression", stage: "In Review", budget: "$800k", researchers: 2, progress: 40, color: "#1A56DB" },
  { name: "Next-Gen Battery Materials", stage: "Scoping", budget: "$1.2M", researchers: 1, progress: 15, color: "#7C3AED" },
];

const STAGES = ["Matched", "Screening", "Interview", "Offer Sent", "Hired"];

export default function CorporationDashboard() {
  const [active, setActive] = useState("overview");
  const [tab, setTab] = useState("talent");
  const accent = "#0C444C";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif", background: "#FAFAF8", fontSize: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#E8E5DF;border-radius:4px;}
        h1,h2,h3{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:.875rem;font-weight:500;color:#6B6860;transition:all .15s;border:none;background:none;width:100%;text-align:left;}
        .nav-item:hover{background:#F5F3EF;color:#111110;}
        .nav-item.active{background:#F0FAFB;color:#0C444C;}
        .card{background:#fff;border:1px solid #E8E5DF;border-radius:14px;padding:1.25rem;}
        .badge{font-size:.65rem;font-weight:600;padding:3px 8px;border-radius:100px;}
        .btn-a{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#fff;background:#0C444C;border:none;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:opacity .15s;}
        .btn-a:hover{opacity:.85;}
        .btn-out{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#6B6860;background:transparent;border:1px solid #E8E5DF;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:all .15s;}
        .btn-out:hover{border-color:#c0bcb5;color:#111110;}
        .tag{font-size:.63rem;font-weight:500;background:#F3F4F6;color:#6B7280;padding:2px 7px;border-radius:5px;}
        .tab-btn{font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;color:#6B6860;background:none;border:1px solid transparent;cursor:pointer;padding:.4rem 1rem;border-radius:100px;transition:all .15s;}
        .tab-btn.on{background:#fff;border-color:#E8E5DF;color:#111110;box-shadow:0 1px 3px rgba(0,0,0,.06);}
        .tab-btn:hover{background:#F5F3EF;}
        .stage-pill{font-size:.65rem;font-weight:600;padding:3px 9px;border-radius:100px;}
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width: 224, background: "#fff", borderRight: "1px solid #E8E5DF", display: "flex", flexDirection: "column", padding: "1.25rem .75rem", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.75rem", paddingLeft: 4 }}>
          <div style={{ width: 28, height: 28, background: "#1A56DB", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 9l3.5 3.5L14 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#111110" }}>Meritos</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((n) => (
            <button key={n.id} className={`nav-item${active === n.id ? " active" : ""}`} onClick={() => setActive(n.id)}>
              <span style={{ fontSize: 15 }}>{n.icon}</span><span>{n.label}</span>
            </button>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>VC</div>
          <div>
            <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>Vertex Corp</div>
            <div style={{ fontSize: ".68rem", color: "#9B9890" }}>Enterprise · BioTech + AI</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflow: "auto", padding: "1.75rem 2rem" }}>
        {/* TOPBAR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#111110" }}>Innovation & Talent Hub 🏢</h1>
            <p style={{ fontSize: ".85rem", color: "#6B6860", fontWeight: 300 }}>5 new AI-matched candidates · 3 researchers interested in your R&D problems.</p>
          </div>
          <div style={{ display: "flex", gap: ".625rem" }}>
            <button className="btn-out">📋 Post Job Requisition</button>
            <button className="btn-a">Scout Talent Now →</button>
          </div>
        </div>

        {/* KPI STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: ".875rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Talent Matches", value: "73", note: "↑ 5 new today", color: accent },
            { label: "R&D Interests", value: "12", note: "3 high signal", color: "#1A56DB" },
            { label: "Active Job Reqs", value: "4", note: "2 urgent", color: "#B45309" },
            { label: "Hiring Funnel", value: "8", note: "In pipeline", color: "#7C3AED" },
            { label: "Lab Projects", value: "3", note: "$4.4M total", color: "#0E7A4E" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: ".875rem" }}>
              <div style={{ fontSize: ".63rem", color: "#9B9890", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: "1.65rem", fontWeight: 700, fontFamily: "'Bricolage Grotesque',sans-serif", color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: ".65rem", color: "#6B6860", marginTop: 4, fontWeight: 500 }}>{s.note}</div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem" }}>
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* TABS: Talent / R&D */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", padding: "1rem 1.25rem", borderBottom: "1px solid #F3F4F6" }}>
                <button className={`tab-btn${tab === "talent" ? " on" : ""}`} onClick={() => setTab("talent")}>👥 Talent Scouting</button>
                <button className={`tab-btn${tab === "rd" ? " on" : ""}`} onClick={() => setTab("rd")}>🔬 R&D Matches</button>
              </div>

              <div style={{ padding: "1.25rem" }}>
                {tab === "talent" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                    {TALENT_PIPELINE.map((t) => (
                      <div key={t.name} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".875rem", background: "#FAFAF8", border: "1px solid #E8E5DF", borderRadius: 11 }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".72rem", fontWeight: 700, color: t.color, flexShrink: 0 }}>{t.initials}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                            <span style={{ fontSize: ".875rem", fontWeight: 600, color: "#111110" }}>{t.name}</span>
                          </div>
                          <div style={{ fontSize: ".73rem", color: "#6B6860", marginBottom: 5 }}>{t.role}</div>
                          <div style={{ display: "flex", gap: 4 }}>{t.skills.map(s => <span key={s} className="tag">{s}</span>)}</div>
                        </div>
                        <div style={{ textAlign: "center", flexShrink: 0 }}>
                          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: t.color, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{t.match}%</div>
                          <div style={{ fontSize: ".6rem", color: "#9B9890" }}>match</div>
                        </div>
                        <div style={{ flexShrink: 0, minWidth: 90, textAlign: "center" }}>
                          <span className="stage-pill" style={{
                            background: t.stage === "Offer Sent" ? "#ECFDF5" : t.stage === "Interview" ? "#EEF3FF" : t.stage === "Screening" ? "#F5F3FF" : "#F3F4F6",
                            color: t.stage === "Offer Sent" ? "#0E7A4E" : t.stage === "Interview" ? "#1A56DB" : t.stage === "Screening" ? "#7C3AED" : "#6B7280"
                          }}>{t.stage}</span>
                        </div>
                        <button className="btn-a" style={{ background: t.color, whiteSpace: "nowrap" }}>View Profile</button>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "rd" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                    {RD_MATCHES.map((r) => (
                      <div key={r.researcher} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: ".875rem", background: "#FAFAF8", border: "1px solid #E8E5DF", borderRadius: 11 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: r.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".75rem", fontWeight: 700, color: r.color, flexShrink: 0 }}>{r.researcher.split(" ")[1]?.slice(0,2) || "DR"}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: ".875rem", fontWeight: 600, color: "#111110", marginBottom: 1 }}>{r.researcher}</div>
                          <div style={{ fontSize: ".72rem", color: "#9B9890", marginBottom: 4 }}>{r.inst}</div>
                          <div style={{ fontSize: ".78rem", color: "#6B6860", fontStyle: "italic", marginBottom: 4 }}>"{r.paper}"</div>
                          <div style={{ fontSize: ".72rem", fontWeight: 500, color: r.color }}>🎯 Relevant to: {r.relevance}</div>
                        </div>
                        <div style={{ textAlign: "center", flexShrink: 0 }}>
                          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: r.color, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{r.match}%</div>
                          <div style={{ fontSize: ".6rem", color: "#9B9890" }}>align</div>
                        </div>
                        <button className="btn-a" style={{ background: r.color, whiteSpace: "nowrap", alignSelf: "center" }}>Request Call</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* HIRING FUNNEL */}
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110" }}>Hiring Funnel</h3>
                <button className="btn-out" style={{ fontSize: ".72rem", padding: "4px 10px" }}>View All</button>
              </div>
              <div style={{ display: "flex", gap: "1px", marginBottom: "1rem", height: 8, borderRadius: 100, overflow: "hidden" }}>
                {[{ w: 40, c: "#E8E5DF" }, { w: 25, c: "#7C3AED" }, { w: 20, c: "#1A56DB" }, { w: 10, c: "#0E7A4E" }, { w: 5, c: accent }].map((b, i) => (
                  <div key={i} style={{ flex: b.w, background: b.c }} />
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {[
                  { stage: "Matched", n: 73, color: "#9B9890" },
                  { stage: "Screening", n: 18, color: "#7C3AED" },
                  { stage: "Interview", n: 8, color: "#1A56DB" },
                  { stage: "Offer", n: 3, color: "#0E7A4E" },
                  { stage: "Hired", n: 2, color: accent },
                ].map((f) => (
                  <div key={f.stage} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: f.color, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{f.n}</div>
                    <div style={{ fontSize: ".65rem", color: "#9B9890" }}>{f.stage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* JOB REQUISITIONS */}
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110" }}>Job Requisitions</h3>
                <button className="btn-a" style={{ fontSize: ".72rem", padding: "4px 10px" }}>+ New</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".625rem" }}>
                {JOBS.map((j) => (
                  <div key={j.title} style={{ padding: ".75rem", background: "#FAFAF8", border: "1px solid #E8E5DF", borderRadius: 10 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 3, gap: 4 }}>
                      <span style={{ fontSize: ".78rem", fontWeight: 600, color: "#111110", lineHeight: 1.3 }}>{j.title}</span>
                      {j.urgent && <span className="badge" style={{ background: "#FEF2F2", color: "#DC2626", whiteSpace: "nowrap", flexShrink: 0 }}>Urgent</span>}
                    </div>
                    <div style={{ fontSize: ".68rem", color: "#9B9890", marginBottom: 6 }}>{j.dept} · {j.status}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".68rem" }}>
                      <span style={{ color: "#6B6860" }}>👥 {j.applicants} applicants</span>
                      <span style={{ fontWeight: 600, color: accent }}>✦ {j.matched} AI-matched</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INNOVATION LAB PROJECTS */}
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110" }}>Innovation Lab Projects</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}>
                {PROJECTS.map((p) => (
                  <div key={p.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: ".78rem", fontWeight: 600, color: "#111110" }}>{p.name}</span>
                      <span style={{ fontSize: ".68rem", fontWeight: 600, color: p.color }}>{p.budget}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ flex: 1, height: 5, background: "#F3F4F6", borderRadius: 100, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${p.progress}%`, background: p.color, borderRadius: 100 }} />
                      </div>
                      <span style={{ fontSize: ".65rem", fontWeight: 600, color: p.color, minWidth: 28 }}>{p.progress}%</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: ".68rem", color: "#9B9890" }}>{p.researchers} researcher{p.researchers > 1 ? "s" : ""} linked</span>
                      <span className="badge" style={{
                        background: p.stage === "Active" ? "#ECFDF5" : p.stage === "In Review" ? "#EEF3FF" : "#F9FAFB",
                        color: p.stage === "Active" ? "#0E7A4E" : p.stage === "In Review" ? "#1A56DB" : "#374151"
                      }}>{p.stage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI INSIGHT */}
            <div className="card" style={{ background: accent }}>
              <div style={{ fontSize: ".7rem", fontWeight: 600, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: ".5rem" }}>💡 AI Scouting Insight</div>
              <div style={{ fontSize: ".82rem", fontWeight: 500, color: "#fff", lineHeight: 1.5, marginBottom: ".875rem" }}>
                Dr. Chen Wei (MIT) has 3 active publications aligned to your drug discovery pipeline. 2 competitors have already contacted him.
              </div>
              <button style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.25)", borderRadius: 7, padding: ".45rem 1rem", fontSize: ".78rem", fontWeight: 500, cursor: "pointer", width: "100%" }}>
                Connect with Dr. Chen Wei →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}