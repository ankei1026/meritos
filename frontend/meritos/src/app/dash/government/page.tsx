"use client";
import { useState } from "react";

const NAV = [
  { icon: "⊞", label: "Ecosystem Health", id: "overview" },
  { icon: "🎁", label: "Grant Programs", id: "grants" },
  { icon: "📈", label: "Sector Activity", id: "sectors" },
  { icon: "🏫", label: "University Links", id: "universities" },
  { icon: "🗺️", label: "Regional Map", id: "map" },
  { icon: "📄", label: "Policy Matching", id: "policy" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const SECTOR_DATA = [
  { sector: "AI / Machine Learning", startups: 284, researchers: 142, trend: "+18%", color: "#1A56DB", pct: 88 },
  { sector: "BioTech & Health", startups: 196, researchers: 213, trend: "+24%", color: "#0E7A4E", pct: 76 },
  { sector: "CleanTech & Energy", startups: 158, researchers: 89, trend: "+31%", color: "#7C3AED", pct: 62 },
  { sector: "Quantum Computing", startups: 47, researchers: 68, trend: "+42%", color: "#B45309", pct: 35 },
  { sector: "AgriTech", startups: 112, researchers: 54, trend: "+9%", color: "#0C444C", pct: 44 },
];

const GRANTS = [
  { name: "Young Innovator Research Fund", budget: "₱50M", distributed: 62, total: 100, applicants: 384, deadline: "May 20", status: "Open" },
  { name: "University–Industry Bridge Grant", budget: "₱120M", distributed: 28, total: 40, applicants: 156, deadline: "Jun 5", status: "Open" },
  { name: "National Quantum Initiative", budget: "₱200M", distributed: 5, total: 15, applicants: 48, deadline: "Jul 1", status: "Open" },
  { name: "CleanTech Accelerator Fund", budget: "₱85M", distributed: 40, total: 40, applicants: 0, deadline: "Closed", status: "Closed" },
];

const UNIVERSITIES = [
  { name: "University of the Philippines", location: "Quezon City", students: 1840, researchers: 214, startups: 38, status: "Active" },
  { name: "Ateneo de Manila University", location: "Manila", students: 920, researchers: 98, startups: 22, status: "Active" },
  { name: "De La Salle University", location: "Manila", students: 760, researchers: 76, startups: 17, status: "Active" },
  { name: "Mapúa University", location: "Manila", students: 430, researchers: 44, startups: 11, status: "Onboarding" },
  { name: "MSU-IIT", location: "Iligan", students: 280, researchers: 31, startups: 6, status: "Onboarding" },
];

const POLICY_MATCHES = [
  { policy: "Innovation Economy Act 2024", matched: 142, type: "Startup", status: "High alignment", color: "#0E7A4E" },
  { policy: "National AI Strategy Framework", matched: 89, type: "Research", status: "High alignment", color: "#1A56DB" },
  { policy: "Digital Economy Roadmap", matched: 67, type: "Startup + Corp", status: "Moderate", color: "#B45309" },
];

const REGIONAL = [
  { region: "NCR", startups: 612, growth: "+22%", color: "#1A56DB" },
  { region: "Region VII", startups: 184, growth: "+35%", color: "#0E7A4E" },
  { region: "Region XI", startups: 143, growth: "+28%", color: "#7C3AED" },
  { region: "Region III", startups: 97, growth: "+14%", color: "#B45309" },
  { region: "Region VI", startups: 82, growth: "+19%", color: "#0C444C" },
];

export default function GovernmentDashboard() {
  const [active, setActive] = useState("overview");
  const accent = "#374151";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif", background: "#FAFAF8", fontSize: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#E8E5DF;border-radius:4px;}
        h1,h2,h3{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:.875rem;font-weight:500;color:#6B6860;transition:all .15s;border:none;background:none;width:100%;text-align:left;}
        .nav-item:hover{background:#F5F3EF;color:#111110;}
        .nav-item.active{background:#F9FAFB;color:#374151;font-weight:600;}
        .card{background:#fff;border:1px solid #E8E5DF;border-radius:14px;padding:1.25rem;}
        .badge{font-size:.65rem;font-weight:600;padding:3px 8px;border-radius:100px;}
        .btn-a{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#fff;background:#374151;border:none;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:opacity .15s;}
        .btn-a:hover{opacity:.85;}
        .btn-out{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#6B6860;background:transparent;border:1px solid #E8E5DF;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:all .15s;}
        .btn-out:hover{border-color:#c0bcb5;color:#111110;}
        .tbl-row{display:grid;align-items:center;padding:.625rem .75rem;border-radius:8px;transition:background .15s;}
        .tbl-row:hover{background:#F9FAFB;}
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
          <div style={{ width: 32, height: 32, borderRadius: 9, background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>DO</div>
          <div>
            <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>DOST Philippines</div>
            <div style={{ fontSize: ".68rem", color: "#9B9890" }}>Dept. of Science & Technology</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflow: "auto", padding: "1.75rem 2rem" }}>
        {/* TOPBAR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#111110" }}>National Innovation Ecosystem 🏛️</h1>
            <p style={{ fontSize: ".85rem", color: "#6B6860", fontWeight: 300 }}>Live view of the Philippine innovation landscape · Last refreshed 4 min ago.</p>
          </div>
          <div style={{ display: "flex", gap: ".625rem" }}>
            <button className="btn-out">📥 Export Report</button>
            <button className="btn-a">Manage Grant Programs →</button>
          </div>
        </div>

        {/* TOP KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: ".875rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Registered Startups", value: "1,118", note: "↑ +43 this month", color: "#1A56DB" },
            { label: "Active Researchers", value: "3,240", note: "Across 5 universities", color: "#0E7A4E" },
            { label: "Students on Platform", value: "8,420", note: "↑ +380 this week", color: "#7C3AED" },
            { label: "Grants Distributed", value: "₱455M", note: "This fiscal year", color: accent },
            { label: "Corporate Partners", value: "38", note: "14 MNCs, 24 local", color: "#B45309" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: ".875rem" }}>
              <div style={{ fontSize: ".63rem", color: "#9B9890", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "'Bricolage Grotesque',sans-serif", color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: ".65rem", color: "#6B6860", marginTop: 4, fontWeight: 500 }}>{s.note}</div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
          {/* SECTOR ACTIVITY */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: ".95rem", fontWeight: 700, color: "#111110" }}>Sector Activity by Growth</h2>
              <span style={{ fontSize: ".72rem", color: "#9B9890" }}>Live · 30-day trend</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {SECTOR_DATA.map((s) => (
                <div key={s.sector}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <div>
                      <span style={{ fontSize: ".82rem", fontWeight: 600, color: "#111110" }}>{s.sector}</span>
                      <div style={{ fontSize: ".68rem", color: "#9B9890", marginTop: 1 }}>{s.startups} startups · {s.researchers} researchers</div>
                    </div>
                    <span style={{ fontSize: ".8rem", fontWeight: 700, color: s.color, alignSelf: "center" }}>{s.trend}</span>
                  </div>
                  <div style={{ height: 6, background: "#F3F4F6", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: 100, transition: "width .5s" }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GRANT PROGRAMS */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: ".95rem", fontWeight: 700, color: "#111110" }}>Grant Programs</h2>
              <button className="btn-a" style={{ fontSize: ".72rem", padding: "4px 10px" }}>+ Create Grant</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}>
              {GRANTS.map((g) => (
                <div key={g.name} style={{ padding: ".875rem", background: "#FAFAF8", border: "1px solid #E8E5DF", borderRadius: 11 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                    <div style={{ flex: 1, paddingRight: 8 }}>
                      <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110", marginBottom: 1 }}>{g.name}</div>
                      <div style={{ fontSize: ".68rem", color: "#9B9890" }}>{g.budget} · {g.applicants > 0 ? `${g.applicants} applicants` : "Closed"} · Due {g.deadline}</div>
                    </div>
                    <span className="badge" style={{ background: g.status === "Open" ? "#ECFDF5" : "#F3F4F6", color: g.status === "Open" ? "#0E7A4E" : "#9B9890", flexShrink: 0 }}>{g.status}</span>
                  </div>
                  {g.status === "Open" && (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".65rem", color: "#9B9890", marginBottom: 4 }}>
                        <span>Slots distributed</span>
                        <span style={{ fontWeight: 600, color: "#111110" }}>{g.distributed} / {g.total}</span>
                      </div>
                      <div style={{ height: 5, background: "#E8E5DF", borderRadius: 100, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${(g.distributed / g.total) * 100}%`, background: "#0E7A4E", borderRadius: 100 }}/>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 280px", gap: "1.25rem" }}>
          {/* UNIVERSITY PARTNERSHIPS */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: ".95rem", fontWeight: 700, color: "#111110" }}>University Partnerships</h2>
              <span style={{ fontSize: ".65rem", color: "#9B9890" }}>5 of 12 active</span>
            </div>
            {/* Table header */}
            <div className="tbl-row" style={{ gridTemplateColumns: "1fr 60px 60px 60px 70px", borderBottom: "1px solid #F3F4F6", borderRadius: 0, marginBottom: 2, paddingBottom: "0.5rem" }}>
              {["University","Students","Research","Startups","Status"].map(h => (
                <span key={h} style={{ fontSize: ".65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em", color: "#9B9890" }}>{h}</span>
              ))}
            </div>
            {UNIVERSITIES.map((u) => (
              <div key={u.name} className="tbl-row" style={{ gridTemplateColumns: "1fr 60px 60px 60px 70px" }}>
                <div>
                  <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>{u.name}</div>
                  <div style={{ fontSize: ".65rem", color: "#9B9890" }}>{u.location}</div>
                </div>
                <span style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>{u.students.toLocaleString()}</span>
                <span style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>{u.researchers}</span>
                <span style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>{u.startups}</span>
                <span className="badge" style={{
                  background: u.status === "Active" ? "#ECFDF5" : "#EEF3FF",
                  color: u.status === "Active" ? "#0E7A4E" : "#1A56DB"
                }}>{u.status}</span>
              </div>
            ))}
            <button className="btn-out" style={{ width: "100%", marginTop: ".875rem" }}>+ Onboard University</button>
          </div>

          {/* POLICY MATCHING */}
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: ".95rem", fontWeight: 700, color: "#111110" }}>Policy Alignment</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".875rem", marginBottom: "1.25rem" }}>
              {POLICY_MATCHES.map((p) => (
                <div key={p.policy} style={{ padding: ".875rem", background: "#FAFAF8", border: "1px solid #E8E5DF", borderRadius: 11 }}>
                  <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110", marginBottom: 3 }}>{p.policy}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: ".7rem", color: "#6B6860" }}>{p.matched} entities aligned · {p.type}</span>
                    </div>
                    <span className="badge" style={{ background: p.color === "#0E7A4E" ? "#ECFDF5" : p.color === "#1A56DB" ? "#EEF3FF" : "#FFFBEB", color: p.color }}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#111110", borderRadius: 12, padding: "1.25rem" }}>
              <div style={{ fontSize: ".68rem", fontWeight: 600, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: ".5rem" }}>🤖 AI Policy Insight</div>
              <div style={{ fontSize: ".8rem", color: "#fff", lineHeight: 1.6, marginBottom: ".875rem", fontWeight: 300 }}>
                42 startups in the AI sector are not yet aligned to the National AI Strategy Framework. Targeted outreach could increase policy uptake by 37%.
              </div>
              <button style={{ background: "#1A56DB", color: "#fff", border: "none", borderRadius: 7, padding: ".45rem 1rem", fontSize: ".78rem", fontWeight: 500, cursor: "pointer" }}>
                Send Outreach Campaign →
              </button>
            </div>
          </div>

          {/* REGIONAL BREAKDOWN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Regional Breakdown</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {REGIONAL.map((r) => (
                  <div key={r.region}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>{r.region}</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: ".7rem", fontWeight: 600, color: r.color }}>{r.growth}</span>
                        <span style={{ fontSize: ".78rem", fontWeight: 700, color: "#111110" }}>{r.startups}</span>
                      </div>
                    </div>
                    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 100, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(r.startups / 612) * 100}%`, background: r.color, borderRadius: 100 }}/>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem", padding: ".75rem", background: "#F9FAFB", borderRadius: 9, border: "1px solid #E8E5DF" }}>
                <div style={{ fontSize: ".72rem", fontWeight: 600, color: "#374151", marginBottom: 2 }}>📍 Emerging Hub</div>
                <div style={{ fontSize: ".7rem", color: "#6B6860", fontWeight: 300 }}>Region XI (Davao) has fastest startup growth at +35%. Consider priority grant allocation.</div>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: ".875rem" }}>Quick Actions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                {[
                  { label: "📢 Send Ecosystem Alert", color: accent },
                  { label: "🎁 Open New Grant Round", color: "#0E7A4E" },
                  { label: "🏫 Invite University", color: "#1A56DB" },
                  { label: "📊 Download Full Report", color: "#7C3AED" },
                ].map((a) => (
                  <button key={a.label} style={{ width: "100%", background: "#FAFAF8", border: "1px solid #E8E5DF", borderRadius: 8, padding: ".55rem 1rem", fontSize: ".8rem", fontWeight: 500, color: "#111110", cursor: "pointer", textAlign: "left", transition: "all .15s" }}
                    onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = a.color; (e.target as HTMLElement).style.color = a.color; }}
                    onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "#E8E5DF"; (e.target as HTMLElement).style.color = "#111110"; }}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}