"use client";
import { useState } from "react";

const NAV = [
  { icon: "⊞", label: "Deal Flow", id: "dealflow" },
  { icon: "📁", label: "Portfolio", id: "portfolio" },
  { icon: "🔍", label: "Due Diligence", id: "dd" },
  { icon: "⚡", label: "First Look", id: "firstlook" },
  { icon: "📊", label: "Analytics", id: "analytics" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const DEALS = [
  { name: "NanoMed Labs", type: "BioTech", stage: "Seed", ask: "$1.2M", match: 97, tags: ["AI Drug", "Patent"], color: "#0E7A4E", light: "#ECFDF5", first: true },
  { name: "GridFlow Energy", type: "CleanTech", stage: "Pre-seed", ask: "$500k", match: 93, tags: ["Energy Storage", "IP"], color: "#1A56DB", light: "#EEF3FF", first: false },
  { name: "Draftly AI", type: "SaaS", stage: "Seed", ask: "$800k", match: 89, tags: ["B2B", "ARR $120k"], color: "#7C3AED", light: "#F5F3FF", first: false },
  { name: "Quantum Logistics", type: "DeepTech", stage: "Pre-seed", ask: "$350k", match: 84, tags: ["Quantum", "Logistics"], color: "#B45309", light: "#FFFBEB", first: true },
  { name: "Crestline Health", type: "HealthTech", stage: "Seed", ask: "$2M", match: 81, tags: ["Diagnostics", "FDA"], color: "#0C444C", light: "#F0FAFB", first: false },
];

const PORTFOLIO = [
  { name: "Vertex AI", stage: "Series A", invested: "$500k", current: "$2.1M", change: "+320%", color: "#0E7A4E" },
  { name: "Luminary Data", stage: "Seed", invested: "$250k", current: "$780k", change: "+212%", color: "#1A56DB" },
  { name: "Opaque Systems", stage: "Pre-seed", invested: "$100k", current: "$185k", change: "+85%", color: "#7C3AED" },
];

const DD_QUEUE = [
  { company: "NanoMed Labs", doc: "Cap Table", status: "Received", due: "May 3" },
  { company: "NanoMed Labs", doc: "Financial Model", status: "Pending", due: "May 3" },
  { company: "GridFlow Energy", doc: "Patent Portfolio", status: "Received", due: "May 7" },
  { company: "Draftly AI", doc: "Customer Contracts", status: "Reviewing", due: "May 10" },
];

export default function InvestorDashboard() {
  const [active, setActive] = useState("dealflow");
  const [mandateFilter, setMandateFilter] = useState("All");
  const accent = "#B45309";

  const filters = ["All", "BioTech", "SaaS", "CleanTech", "DeepTech"];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif", background: "#FAFAF8", fontSize: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#E8E5DF;border-radius:4px;}
        h1,h2,h3{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:.875rem;font-weight:500;color:#6B6860;transition:all .15s;border:none;background:none;width:100%;text-align:left;}
        .nav-item:hover{background:#F5F3EF;color:#111110;}
        .nav-item.active{background:#FFFBEB;color:#B45309;}
        .card{background:#fff;border:1px solid #E8E5DF;border-radius:14px;padding:1.25rem;}
        .badge{font-size:.65rem;font-weight:600;padding:3px 8px;border-radius:100px;}
        .btn-a{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#fff;background:#B45309;border:none;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:opacity .15s;}
        .btn-a:hover{opacity:.88;}
        .btn-out{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#6B6860;background:transparent;border:1px solid #E8E5DF;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:all .15s;}
        .btn-out:hover{border-color:#c0bcb5;color:#111110;}
        .tag{font-size:.65rem;font-weight:500;background:#F3F4F6;color:#6B7280;padding:2px 7px;border-radius:5px;}
        .filter-btn{font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:500;color:#6B6860;background:none;border:1px solid transparent;cursor:pointer;padding:5px 12px;border-radius:100px;transition:all .15s;}
        .filter-btn:hover{background:#F5F3EF;border-color:#E8E5DF;}
        .filter-btn.on{background:#fff;border-color:#E8E5DF;color:#111110;box-shadow:0 1px 3px rgba(0,0,0,.06);}
      `}</style>

      {/* SIDEBAR */}
      <aside style={{ width: 220, background: "#111110", borderRight: "1px solid #1F1F1E", display: "flex", flexDirection: "column", padding: "1.25rem .75rem", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1.75rem", paddingLeft: 4 }}>
          <div style={{ width: 28, height: 28, background: "#1A56DB", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 9l3.5 3.5L14 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>Meritos</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map((n) => (
            <button key={n.id} className={`nav-item${active === n.id ? " active" : ""}`}
              style={active === n.id ? { background: "rgba(180,83,9,.2)", color: "#F59E0B" } : { color: "rgba(255,255,255,.55)" }}
              onClick={() => setActive(n.id)}>
              <span style={{ fontSize: 15 }}>{n.icon}</span><span>{n.label}</span>
            </button>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>AG</div>
          <div><div style={{ fontSize: ".8rem", fontWeight: 600, color: "#fff" }}>Apex Growth</div><div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.4)" }}>Seed · BioTech · AI</div></div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflow: "auto", padding: "1.75rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#111110" }}>Deal Flow Intelligence 💼</h1>
            <p style={{ fontSize: ".85rem", color: "#6B6860", fontWeight: 300 }}>5 new mandate-matched deals · 2 first-look exclusives available.</p>
          </div>
          <div style={{ display: "flex", gap: ".625rem" }}>
            <button className="btn-out">⚙️ Edit Mandate</button>
            <button className="btn-a">Download Report →</button>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Mandate Match Score", value: "93%", note: "AI precision", color: accent },
            { label: "New Deals Today", value: "5", note: "2 first-look", color: "#111110" },
            { label: "In Due Diligence", value: "3", note: "NanoMed · GridFlow · Draftly", color: "#1A56DB" },
            { label: "Portfolio Value", value: "$3.1M", note: "↑ +$420k this qtr", color: "#0E7A4E" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: "1rem" }}>
              <div style={{ fontSize: ".68rem", color: "#9B9890", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, fontFamily: "'Bricolage Grotesque',sans-serif", color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: ".68rem", color: "#6B6860", marginTop: 4, fontWeight: 500 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* FILTERS + DEALS */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".875rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111110" }}>AI-Matched Deal Flow</h2>
                <div style={{ display: "flex", gap: 4 }}>
                  {filters.map((f) => (
                    <button key={f} className={`filter-btn${mandateFilter === f ? " on" : ""}`} onClick={() => setMandateFilter(f)}>{f}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {DEALS.filter(d => mandateFilter === "All" || d.type === mandateFilter).map((d) => (
                  <div key={d.name} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 11, background: d.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".82rem", fontWeight: 700, color: d.color, flexShrink: 0 }}>{d.name.slice(0,2)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                        <span style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110" }}>{d.name}</span>
                        {d.first && <span className="badge" style={{ background: "#FFFBEB", color: "#B45309" }}>⚡ First Look</span>}
                      </div>
                      <div style={{ fontSize: ".75rem", color: "#6B6860", marginBottom: 5 }}>{d.type} · {d.stage} · Asking {d.ask}</div>
                      <div style={{ display: "flex", gap: 4 }}>{d.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "1.25rem", fontWeight: 700, color: d.color, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{d.match}%</div>
                      <div style={{ fontSize: ".6rem", color: "#9B9890" }}>mandate match</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
                      <button className="btn-a" style={{ whiteSpace: "nowrap", background: d.color }}>View Deck</button>
                      <button className="btn-out" style={{ whiteSpace: "nowrap" }}>Pass</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PORTFOLIO */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Portfolio Performance</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".625rem" }}>
                {PORTFOLIO.map((p) => (
                  <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".75rem", background: "#FAFAF8", borderRadius: 10, border: "1px solid #E8E5DF" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{p.name.slice(0,2)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: ".85rem", fontWeight: 600, color: "#111110" }}>{p.name}</div>
                      <div style={{ fontSize: ".72rem", color: "#6B6860" }}>{p.stage} · Invested {p.invested}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110" }}>{p.current}</div>
                      <div style={{ fontSize: ".7rem", fontWeight: 600, color: "#0E7A4E" }}>{p.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* DD QUEUE */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Due Diligence Queue</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                {DD_QUEUE.map((d, i) => (
                  <div key={i} style={{ padding: ".625rem .75rem", background: "#FAFAF8", borderRadius: 8, border: "1px solid #E8E5DF" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <span style={{ fontSize: ".78rem", fontWeight: 600, color: "#111110" }}>{d.doc}</span>
                      <span className="badge" style={{
                        background: d.status === "Received" ? "#ECFDF5" : d.status === "Reviewing" ? "#EEF3FF" : "#FEF3C7",
                        color: d.status === "Received" ? "#0E7A4E" : d.status === "Reviewing" ? "#1A56DB" : "#B45309"
                      }}>{d.status}</span>
                    </div>
                    <div style={{ fontSize: ".68rem", color: "#9B9890" }}>{d.company} · Due {d.due}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* MANDATE */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Active Mandate</h3>
              {[
                { label: "Sectors", value: "BioTech, AI, CleanTech" },
                { label: "Stage", value: "Pre-seed → Seed" },
                { label: "Ticket Size", value: "$200k – $2M" },
                { label: "Geography", value: "SEA, US, EU" },
                { label: "Revenue Req.", value: "Pre-revenue OK" },
              ].map((m) => (
                <div key={m.label} style={{ display: "flex", justifyContent: "space-between", padding: ".5rem 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ fontSize: ".75rem", color: "#9B9890" }}>{m.label}</span>
                  <span style={{ fontSize: ".75rem", fontWeight: 600, color: "#111110", textAlign: "right", maxWidth: 140 }}>{m.value}</span>
                </div>
              ))}
              <button className="btn-out" style={{ width: "100%", marginTop: "1rem" }}>Edit Mandate</button>
            </div>

            {/* AI INSIGHT */}
            <div className="card" style={{ background: "#111110" }}>
              <div style={{ fontSize: ".7rem", fontWeight: 600, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: ".625rem" }}>⚡ First Look Available</div>
              <div style={{ fontSize: ".875rem", fontWeight: 600, color: "#fff", marginBottom: 4 }}>Quantum Logistics</div>
              <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.55)", marginBottom: "1rem", lineHeight: 1.5, fontWeight: 300 }}>Pre-seed DeepTech — 2 investors have already seen this. First-look window closes in 48hrs.</div>
              <button style={{ width: "100%", background: accent, color: "#fff", border: "none", borderRadius: 8, padding: ".6rem", fontSize: ".82rem", fontWeight: 500, cursor: "pointer" }}>View Exclusive Deal →</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}