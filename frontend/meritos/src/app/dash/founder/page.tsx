"use client";
import { useState } from "react";

const NAV = [
  { icon: "⊞", label: "Overview", id: "overview" },
  { icon: "💼", label: "Investors", id: "investors" },
  { icon: "📊", label: "Pitch Analytics", id: "analytics" },
  { icon: "👥", label: "Team", id: "team" },
  { icon: "📅", label: "Meetings", id: "meetings" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const PIPELINE = [
  {
    stage: "Matched", color: "#E8E5DF", text: "#6B6860",
    deals: [
      { name: "Veritas Capital", type: "Seed VC", match: 94 },
      { name: "Lighthouse Fund", type: "Pre-seed", match: 88 },
    ],
  },
  {
    stage: "Intro Sent", color: "#EEF3FF", text: "#1A56DB",
    deals: [
      { name: "Apex Ventures", type: "Series A", match: 91 },
    ],
  },
  {
    stage: "In Meeting", color: "#F5F3FF", text: "#7C3AED",
    deals: [
      { name: "Andreessen Bio", type: "Seed VC", match: 97 },
      { name: "Blue Horizon", type: "Angel", match: 83 },
    ],
  },
  {
    stage: "Due Diligence", color: "#ECFDF5", text: "#0E7A4E",
    deals: [
      { name: "Titan Growth", type: "Series A", match: 89 },
    ],
  },
];

const INVESTORS = [
  { initials: "VG", name: "Veritas Growth", mandate: "BioTech · Seed · $500k–$2M", match: 97, color: "#7C3AED", light: "#F5F3FF", new: true },
  { initials: "AL", name: "Apex Lighthouse", mandate: "AI/ML · Pre-seed · $200k–$1M", match: 93, color: "#1A56DB", light: "#EEF3FF", new: true },
  { initials: "BH", name: "Blue Horizon", mandate: "CleanTech · Seed · $1M–$5M", match: 87, color: "#0E7A4E", light: "#ECFDF5", new: false },
  { initials: "TG", name: "Titan Growth", mandate: "SaaS · Series A · $5M+", match: 81, color: "#B45309", light: "#FFFBEB", new: false },
];

const MEETINGS = [
  { investor: "Andreessen Bio", type: "Partner Call", date: "Tomorrow, 10:00 AM", prep: "Send deck" },
  { investor: "Titan Growth", type: "Due Diligence", date: "May 5, 2:00 PM", prep: "Financials ready" },
  { investor: "Veritas Capital", type: "Intro Call", date: "May 9, 11:00 AM", prep: "Confirm" },
];

export default function FounderDashboard() {
  const [active, setActive] = useState("overview");
  const accent = "#7C3AED";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif", background: "#FAFAF8", fontSize: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#E8E5DF;border-radius:4px;}
        h1,h2,h3{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:.875rem;font-weight:500;color:#6B6860;transition:all .15s;border:none;background:none;width:100%;text-align:left;}
        .nav-item:hover{background:#F5F3EF;color:#111110;}
        .nav-item.active{background:#F5F3FF;color:#7C3AED;}
        .card{background:#fff;border:1px solid #E8E5DF;border-radius:14px;padding:1.25rem;}
        .badge{font-size:.65rem;font-weight:600;padding:3px 8px;border-radius:100px;}
        .btn-a{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#fff;background:#7C3AED;border:none;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:opacity .15s;}
        .btn-a:hover{opacity:.88;}
        .btn-out{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#6B6860;background:transparent;border:1px solid #E8E5DF;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:all .15s;}
        .btn-out:hover{border-color:#c0bcb5;color:#111110;}
        .pipe-card{background:#fff;border:1px solid #E8E5DF;border-radius:10px;padding:.75rem;margin-bottom:.5rem;font-size:.78rem;}
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width: 220, background: "#fff", borderRight: "1px solid #E8E5DF", display: "flex", flexDirection: "column", padding: "1.25rem .75rem", flexShrink: 0 }}>
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
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>NL</div>
          <div><div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>NanoMed Labs</div><div style={{ fontSize: ".68rem", color: "#9B9890" }}>Seed Stage · BioTech</div></div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflow: "auto", padding: "1.75rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#111110" }}>Fundraising Dashboard 🚀</h1>
            <p style={{ fontSize: ".85rem", color: "#6B6860", fontWeight: 300 }}>4 investor matches today · Andreessen Bio meeting tomorrow.</p>
          </div>
          <div style={{ display: "flex", gap: ".625rem" }}>
            <button className="btn-out">📄 Update Pitch Deck</button>
            <button className="btn-a">Browse All Investors →</button>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Investor Matches", value: "47", note: "↑ 4 new today", color: accent },
            { label: "Intros Sent", value: "12", note: "3 pending reply", color: "#111110" },
            { label: "Meetings Booked", value: "5", note: "2 this week", color: "#111110" },
            { label: "Deck Views", value: "284", note: "↑ 38 this week", color: "#0E7A4E" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: "1rem" }}>
              <div style={{ fontSize: ".68rem", color: "#9B9890", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, fontFamily: "'Bricolage Grotesque',sans-serif", color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: ".68rem", color: "#6B6860", marginTop: 4, fontWeight: 500 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem" }}>
          {/* PIPELINE */}
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Investor Pipeline</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: ".75rem" }}>
              {PIPELINE.map((p) => (
                <div key={p.stage}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".5rem" }}>
                    <span style={{ fontSize: ".72rem", fontWeight: 600, color: p.text }}>{p.stage}</span>
                    <span style={{ fontSize: ".65rem", background: p.color, color: p.text, padding: "2px 6px", borderRadius: 100, fontWeight: 600 }}>{p.deals.length}</span>
                  </div>
                  {p.deals.map((d) => (
                    <div key={d.name} className="pipe-card">
                      <div style={{ fontWeight: 600, color: "#111110", marginBottom: 2 }}>{d.name}</div>
                      <div style={{ color: "#9B9890", fontSize: ".7rem", marginBottom: 5 }}>{d.type}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ flex: 1, height: 4, background: "#F3F4F6", borderRadius: 100, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${d.match}%`, background: accent, borderRadius: 100 }}/>
                        </div>
                        <span style={{ fontSize: ".65rem", fontWeight: 600, color: accent }}>{d.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* TOP INVESTOR MATCHES */}
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111110", margin: "1.5rem 0 1rem" }}>Top AI-Matched Investors</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              {INVESTORS.map((inv) => (
                <div key={inv.name} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: inv.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".8rem", fontWeight: 700, color: inv.color, flexShrink: 0 }}>{inv.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{ fontSize: ".875rem", fontWeight: 600, color: "#111110" }}>{inv.name}</span>
                      {inv.new && <span className="badge" style={{ background: inv.light, color: inv.color }}>New</span>}
                    </div>
                    <div style={{ fontSize: ".75rem", color: "#6B6860" }}>{inv.mandate}</div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: inv.color, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{inv.match}%</div>
                    <div style={{ fontSize: ".6rem", color: "#9B9890" }}>match</div>
                  </div>
                  <button className="btn-a" style={{ whiteSpace: "nowrap" }}>Send Intro</button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* MEETINGS */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Upcoming Meetings</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}>
                {MEETINGS.map((m) => (
                  <div key={m.investor} style={{ paddingBottom: ".875rem", borderBottom: "1px solid #F3F4F6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>{m.investor}</span>
                      <span style={{ fontSize: ".65rem", background: "#F5F3FF", color: accent, padding: "2px 7px", borderRadius: 100, fontWeight: 600 }}>{m.type}</span>
                    </div>
                    <div style={{ fontSize: ".72rem", color: "#6B6860", marginBottom: 4 }}>📅 {m.date}</div>
                    <div style={{ fontSize: ".7rem", color: "#B45309", fontWeight: 500 }}>⚡ {m.prep}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PITCH ANALYTICS */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Pitch Deck Analytics</h3>
              {[
                { label: "Avg. time on deck", value: "4m 32s" },
                { label: "Most-viewed slide", value: "Traction (Slide 6)" },
                { label: "Drop-off slide", value: "Financials (Slide 9)" },
                { label: "Unique investors", value: "38 this month" },
              ].map((a) => (
                <div key={a.label} style={{ display: "flex", justifyContent: "space-between", padding: ".5rem 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ fontSize: ".78rem", color: "#6B6860" }}>{a.label}</span>
                  <span style={{ fontSize: ".78rem", fontWeight: 600, color: "#111110" }}>{a.value}</span>
                </div>
              ))}
              <div style={{ marginTop: "1rem", padding: ".75rem", background: "#ECFDF5", borderRadius: 9, border: "1px solid #D1FAE5" }}>
                <div style={{ fontSize: ".72rem", fontWeight: 600, color: "#0E7A4E", marginBottom: 2 }}>💡 AI Insight</div>
                <div style={{ fontSize: ".7rem", color: "#064E3B", fontWeight: 300 }}>Investors spend 2× longer on financial slides. Add a cleaner unit economics breakdown.</div>
              </div>
            </div>

            {/* FUNDING STATUS */}
            <div className="card" style={{ background: "#111110" }}>
              <div style={{ fontSize: ".72rem", fontWeight: 600, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: ".75rem" }}>Seed Round Status</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", fontFamily: "'Bricolage Grotesque',sans-serif", lineHeight: 1, marginBottom: 4 }}>$340k</div>
              <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.5)", marginBottom: "1rem" }}>of $1.5M target raised</div>
              <div style={{ height: 6, background: "rgba(255,255,255,.12)", borderRadius: 100, overflow: "hidden", marginBottom: ".75rem" }}>
                <div style={{ height: "100%", width: "22%", background: accent, borderRadius: 100 }}/>
              </div>
              <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.45)" }}>22% committed · 5 investors in DD</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}