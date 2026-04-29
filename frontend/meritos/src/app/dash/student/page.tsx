"use client";
import { useState } from "react";

const NAV = [
  { icon: "⊞", label: "Overview", id: "overview" },
  { icon: "✦", label: "AI Matches", id: "matches" },
  { icon: "📅", label: "Events", id: "events" },
  { icon: "👤", label: "Profile", id: "profile" },
  { icon: "🔗", label: "Connections", id: "connections" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const OPPORTUNITIES = [
  { type: "Internship", org: "NanoMed Labs", role: "AI Research Intern", match: 94, tags: ["AI/ML", "BioTech"], color: "#1A56DB", light: "#EEF3FF", icon: "🚀", new: true },
  { type: "Competition", org: "MIT Innovation Lab", role: "Startup Pitch Competition", match: 88, tags: ["Pitch", "$10k Prize"], color: "#7C3AED", light: "#F5F3FF", icon: "🏆", new: true },
  { type: "Job", org: "Vertex Corp", role: "Junior Data Scientist", match: 82, tags: ["Data", "Python"], color: "#0E7A4E", light: "#ECFDF5", icon: "🏢", new: false },
  { type: "Grant", org: "DOST Philippines", role: "Young Innovator Grant", match: 79, tags: ["Research", "₱200k"], color: "#B45309", light: "#FFFBEB", icon: "🏛️", new: false },
  { type: "Internship", org: "GridFlow Energy", role: "Sustainability Analyst Intern", match: 73, tags: ["CleanTech", "Remote"], color: "#0C444C", light: "#F0FAFB", icon: "⚡", new: false },
];

const EVENTS = [
  { name: "Meritos Pitch Night #12", date: "May 3", type: "Pitch Competition", spots: "24 spots left" },
  { name: "AI Founders Meetup — Davao", date: "May 8", type: "Networking", spots: "12 spots left" },
  { name: "DOST Grant Writing Workshop", date: "May 15", type: "Workshop", spots: "Open" },
];

const SKILLS = [
  { label: "Machine Learning", pct: 85 },
  { label: "Python", pct: 92 },
  { label: "Research Writing", pct: 64 },
  { label: "Business Dev", pct: 38 },
];

const CONNECTIONS = [
  { initials: "MR", name: "Maria Reyes", role: "CTO, NanoMed Labs", color: "#1A56DB", action: "Wants to connect" },
  { initials: "JO", name: "James Okafor", role: "Partner, Andreessen", color: "#7C3AED", action: "Viewed your profile" },
  { initials: "SC", name: "Sarah Chen", role: "Founder, Draftly", color: "#0E7A4E", action: "Wants to connect" },
];

export default function StudentDashboard() {
  const [active, setActive] = useState("overview");
  const [sideOpen, setSideOpen] = useState(true);
  const accent = "#1A56DB";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif", background: "#FAFAF8", fontSize: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#E8E5DF;border-radius:4px;}
        h1,h2,h3,h4{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:.875rem;font-weight:500;color:#6B6860;transition:all .15s;border:none;background:none;width:100%;text-align:left;}
        .nav-item:hover{background:#F5F3EF;color:#111110;}
        .nav-item.active{background:#EEF3FF;color:#1A56DB;}
        .card{background:#fff;border:1px solid #E8E5DF;border-radius:14px;padding:1.25rem;}
        .badge{font-size:.65rem;font-weight:600;padding:3px 8px;border-radius:100px;}
        .btn-primary{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#fff;background:#1A56DB;border:none;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:opacity .15s;}
        .btn-primary:hover{opacity:.88;}
        .btn-outline{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#6B6860;background:transparent;border:1px solid #E8E5DF;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:all .15s;}
        .btn-outline:hover{border-color:#c0bcb5;color:#111110;}
        .tag{font-size:.65rem;font-weight:500;background:#F3F4F6;color:#6B7280;padding:2px 7px;border-radius:5px;}
        .match-bar-wrap{flex:1;height:5px;background:#F3F4F6;border-radius:100px;overflow:hidden;}
        .match-bar{height:100%;border-radius:100px;}
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width: sideOpen ? 220 : 64, background: "#fff", borderRight: "1px solid #E8E5DF", display: "flex", flexDirection: "column", padding: "1.25rem .75rem", transition: "width .2s", flexShrink: 0, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.75rem", paddingLeft: 4 }}>
          <div style={{ width: 28, height: 28, background: accent, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 9l3.5 3.5L14 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          {sideOpen && <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#111110", whiteSpace: "nowrap" }}>Meritos</span>}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((n) => (
            <button key={n.id} className={`nav-item${active === n.id ? " active" : ""}`} onClick={() => setActive(n.id)}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{n.icon}</span>
              {sideOpen && <span style={{ whiteSpace: "nowrap" }}>{n.label}</span>}
            </button>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #E8E5DF", paddingTop: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>AB</div>
          {sideOpen && <div><div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110", whiteSpace: "nowrap" }}>Aisha Bautista</div><div style={{ fontSize: ".68rem", color: "#9B9890" }}>CS Graduate · AI/ML</div></div>}
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflow: "auto", padding: "1.75rem 2rem" }}>
        {/* TOPBAR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#111110" }}>Good morning, Aisha 👋</h1>
            <p style={{ fontSize: ".85rem", color: "#6B6860", fontWeight: 300 }}>You have 3 new matches and 2 connection requests today.</p>
          </div>
          <div style={{ display: "flex", gap: ".625rem" }}>
            <button className="btn-outline">📄 Update Profile</button>
            <button className="btn-primary">View All Matches →</button>
          </div>
        </div>

        {/* PROFILE COMPLETENESS */}
        <div className="card" style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: ".82rem", fontWeight: 600, color: "#111110" }}>Profile Completeness</span>
              <span style={{ fontSize: ".82rem", fontWeight: 700, color: accent }}>74%</span>
            </div>
            <div style={{ height: 6, background: "#F3F4F6", borderRadius: 100, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "74%", background: accent, borderRadius: 100 }}/>
            </div>
            <p style={{ fontSize: ".72rem", color: "#6B6860", marginTop: 5, fontWeight: 300 }}>Add your GitHub URL and 2 skills to boost your match rate by +18%</p>
          </div>
          <button className="btn-primary" style={{ whiteSpace: "nowrap" }}>Complete Profile</button>
        </div>

        {/* STATS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "AI Match Score", value: "87%", note: "Top 12% of students", color: accent },
            { label: "Opportunities", value: "24", note: "↑ 5 new this week" , color: "#111110" },
            { label: "Profile Views", value: "138", note: "↑ 22 this month", color: "#111110" },
            { label: "Connections", value: "31", note: "3 pending requests", color: "#0E7A4E" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: "1rem" }}>
              <div style={{ fontSize: ".68rem", color: "#9B9890", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, fontFamily: "'Bricolage Grotesque',sans-serif", color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: ".68rem", color: "#6B6860", marginTop: 4, fontWeight: 500 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.25rem" }}>
          {/* OPPORTUNITIES */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111110" }}>AI-Matched Opportunities</h2>
              <span style={{ fontSize: ".72rem", color: "#9B9890" }}>Sorted by match score</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {OPPORTUNITIES.map((o) => (
                <div key={o.role} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: o.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{o.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{ fontSize: ".875rem", fontWeight: 600, color: "#111110" }}>{o.role}</span>
                      {o.new && <span className="badge" style={{ background: o.light, color: o.color }}>New</span>}
                    </div>
                    <div style={{ fontSize: ".75rem", color: "#6B6860", marginBottom: 5 }}>{o.org} · {o.type}</div>
                    <div style={{ display: "flex", gap: 4 }}>{o.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: o.color, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{o.match}%</div>
                    <div style={{ fontSize: ".6rem", color: "#9B9890" }}>match</div>
                  </div>
                  <button className="btn-primary" style={{ background: o.color, whiteSpace: "nowrap" }}>Apply</button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* EVENTS */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Upcoming Events</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {EVENTS.map((e) => (
                  <div key={e.name} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, color: accent, flexShrink: 0, textAlign: "center", lineHeight: 1.2 }}>{e.date.split(" ")[0]}<br/>{e.date.split(" ")[1]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>{e.name}</div>
                      <div style={{ fontSize: ".7rem", color: "#6B6860" }}>{e.type} · {e.spots}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-outline" style={{ width: "100%", marginTop: "1rem" }}>View all events</button>
            </div>

            {/* SKILLS */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Skill Strength</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {SKILLS.map((s) => (
                  <div key={s.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", color: "#6B6860", marginBottom: 4 }}>
                      <span>{s.label}</span><span style={{ fontWeight: 600, color: "#111110" }}>{s.pct}%</span>
                    </div>
                    <div className="match-bar-wrap">
                      <div className="match-bar" style={{ width: `${s.pct}%`, background: s.pct > 70 ? accent : s.pct > 50 ? "#7C3AED" : "#E5E7EB" }}/>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem", padding: ".75rem", background: "#FFFBEB", borderRadius: 9, border: "1px solid #FEF3C7" }}>
                <div style={{ fontSize: ".72rem", fontWeight: 600, color: "#B45309", marginBottom: 2 }}>💡 Skill Gap Alert</div>
                <div style={{ fontSize: ".7rem", color: "#92400E", fontWeight: 300 }}>Improving Business Dev to 60%+ would unlock 8 more opportunities.</div>
              </div>
            </div>

            {/* CONNECTIONS */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Connection Requests</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {CONNECTIONS.map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".65rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{c.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>{c.name}</div>
                      <div style={{ fontSize: ".68rem", color: "#9B9890" }}>{c.role}</div>
                    </div>
                    <button className="btn-primary" style={{ padding: "4px 10px", fontSize: ".7rem" }}>Accept</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}