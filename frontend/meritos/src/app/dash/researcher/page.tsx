"use client";
import { useState } from "react";

const NAV = [
  { icon: "⊞", label: "Overview", id: "overview" },
  { icon: "🔬", label: "Publications", id: "publications" },
  { icon: "💡", label: "IP Pipeline", id: "ip" },
  { icon: "🏛️", label: "Grants", id: "grants" },
  { icon: "🤝", label: "Collaborations", id: "collab" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const CORP_INTEREST = [
  { org: "Vertex BioSciences", sector: "BioTech", interest: "Quantum drug synthesis paper", signal: "High", match: 95, color: "#0E7A4E", light: "#ECFDF5" },
  { org: "Luminary AI", sector: "AI Research", interest: "Neural network compression", signal: "High", match: 91, color: "#1A56DB", light: "#EEF3FF" },
  { org: "GridFlow Energy", sector: "CleanTech", interest: "Energy storage materials", signal: "Medium", match: 78, color: "#B45309", light: "#FFFBEB" },
  { org: "Nuvola Labs", sector: "Quantum Computing", interest: "Error correction algorithm", signal: "Medium", match: 72, color: "#7C3AED", light: "#F5F3FF" },
];

const PUBLICATIONS = [
  { title: "Quantum-Assisted Drug Target Identification via Vector Embeddings", journal: "Nature Methods", year: 2024, citations: 84, views: 2840 },
  { title: "Neural Network Compression for Edge Deployment in Clinical Settings", journal: "IEEE Trans. Med.", year: 2024, citations: 47, views: 1620 },
  { title: "Cosine Similarity Matching in Biomedical Knowledge Graphs", journal: "Bioinformatics", year: 2023, citations: 112, views: 4100 },
];

const GRANTS = [
  { name: "DOST Quantum Research Fund", amount: "₱2.5M", deadline: "May 20, 2025", match: 92, status: "Apply" },
  { name: "NIH R01 Innovation Grant", amount: "$450k", deadline: "Jun 5, 2025", match: 87, status: "Apply" },
  { name: "EU Horizon Research Award", amount: "€300k", deadline: "Jul 1, 2025", match: 81, status: "Apply" },
];

export default function ResearcherDashboard() {
  const [active, setActive] = useState("overview");
  const accent = "#0E7A4E";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif", background: "#FAFAF8", fontSize: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#E8E5DF;border-radius:4px;}
        h1,h2,h3{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em;}
        .nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;cursor:pointer;font-size:.875rem;font-weight:500;color:#6B6860;transition:all .15s;border:none;background:none;width:100%;text-align:left;}
        .nav-item:hover{background:#F5F3EF;color:#111110;}
        .nav-item.active{background:#ECFDF5;color:#0E7A4E;}
        .card{background:#fff;border:1px solid #E8E5DF;border-radius:14px;padding:1.25rem;}
        .badge{font-size:.65rem;font-weight:600;padding:3px 8px;border-radius:100px;}
        .btn-a{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#fff;background:#0E7A4E;border:none;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:opacity .15s;}
        .btn-a:hover{opacity:.88;}
        .btn-out{font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:500;color:#6B6860;background:transparent;border:1px solid #E8E5DF;cursor:pointer;padding:.45rem 1rem;border-radius:7px;transition:all .15s;}
        .btn-out:hover{border-color:#c0bcb5;color:#111110;}
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
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".7rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>CW</div>
          <div><div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>Dr. Chen Wei</div><div style={{ fontSize: ".68rem", color: "#9B9890" }}>MIT · Quantum Computing</div></div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflow: "auto", padding: "1.75rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h1 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#111110" }}>Research Intelligence Hub 🔬</h1>
            <p style={{ fontSize: ".85rem", color: "#6B6860", fontWeight: 300 }}>4 corporations are viewing your publications · 3 grants matched this week.</p>
          </div>
          <div style={{ display: "flex", gap: ".625rem" }}>
            <button className="btn-out">📄 Update Publications</button>
            <button className="btn-a">Manage IP Portfolio →</button>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "h-Index", value: "24", note: "Top 8% in field", color: accent },
            { label: "Total Citations", value: "1,843", note: "↑ 47 this month", color: "#111110" },
            { label: "Corp. Interest", value: "4", note: "Active this week", color: "#1A56DB" },
            { label: "Grant Matches", value: "7", note: "₱5.2M total value", color: "#B45309" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: "1rem" }}>
              <div style={{ fontSize: ".68rem", color: "#9B9890", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: "1.75rem", fontWeight: 700, fontFamily: "'Bricolage Grotesque',sans-serif", color: s.color, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: ".68rem", color: "#6B6860", marginTop: 4, fontWeight: 500 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* CORP INTEREST */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111110" }}>Corporate Interest Signals 🏢</h2>
                <span style={{ fontSize: ".72rem", color: "#9B9890" }}>Updated live</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {CORP_INTEREST.map((c) => (
                  <div key={c.org} className="card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: c.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".75rem", fontWeight: 700, color: c.color, flexShrink: 0 }}>{c.org.slice(0,2)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: ".875rem", fontWeight: 600, color: "#111110" }}>{c.org}</span>
                        <span className="badge" style={{ background: c.signal === "High" ? "#ECFDF5" : "#FFFBEB", color: c.signal === "High" ? "#0E7A4E" : "#B45309" }}>{c.signal} Interest</span>
                      </div>
                      <div style={{ fontSize: ".75rem", color: "#6B6860" }}>{c.sector} · Interested in: "{c.interest}"</div>
                    </div>
                    <div style={{ textAlign: "center", flexShrink: 0 }}>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: c.color, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{c.match}%</div>
                      <div style={{ fontSize: ".6rem", color: "#9B9890" }}>align</div>
                    </div>
                    <button className="btn-a" style={{ background: c.color, whiteSpace: "nowrap" }}>Connect</button>
                  </div>
                ))}
              </div>
            </div>

            {/* PUBLICATIONS */}
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Publications Impact</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {PUBLICATIONS.map((p) => (
                  <div key={p.title} className="card">
                    <div style={{ fontSize: ".875rem", fontWeight: 600, color: "#111110", marginBottom: 4, lineHeight: 1.4 }}>{p.title}</div>
                    <div style={{ fontSize: ".75rem", color: "#6B6860", marginBottom: "1rem" }}>{p.journal} · {p.year}</div>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                      <div><div style={{ fontSize: ".65rem", color: "#9B9890", textTransform: "uppercase", letterSpacing: ".05em" }}>Citations</div><div style={{ fontSize: "1rem", fontWeight: 700, color: accent, fontFamily: "'Bricolage Grotesque',sans-serif" }}>{p.citations}</div></div>
                      <div><div style={{ fontSize: ".65rem", color: "#9B9890", textTransform: "uppercase", letterSpacing: ".05em" }}>Views</div><div style={{ fontSize: "1rem", fontWeight: 700, color: "#111110", fontFamily: "'Bricolage Grotesque',sans-serif" }}>{p.views.toLocaleString()}</div></div>
                      <button className="btn-out" style={{ marginLeft: "auto", alignSelf: "center" }}>View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* IP PIPELINE */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>IP Licensing Pipeline</h3>
              {[
                { ip: "Quantum Synthesis Patent", stage: "Negotiation", corp: "Vertex Bio", value: "$120k" },
                { ip: "NN Compression Algorithm", stage: "Due Diligence", corp: "Luminary AI", value: "$85k" },
                { ip: "Knowledge Graph Method", stage: "Intro", corp: "Nuvola Labs", value: "$40k" },
              ].map((ip) => (
                <div key={ip.ip} style={{ padding: ".75rem 0", borderBottom: "1px solid #F3F4F6" }}>
                  <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110", marginBottom: 2 }}>{ip.ip}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: ".7rem", color: "#6B6860" }}>{ip.corp}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: ".65rem", background: "#ECFDF5", color: "#0E7A4E", padding: "2px 7px", borderRadius: 100, fontWeight: 600 }}>{ip.stage}</span>
                      <span style={{ fontSize: ".75rem", fontWeight: 700, color: accent }}>{ip.value}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "1rem", padding: ".875rem", background: "#111110", borderRadius: 10 }}>
                <div style={{ fontSize: ".68rem", color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 4 }}>Total Pipeline Value</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", fontFamily: "'Bricolage Grotesque',sans-serif" }}>$245k</div>
                <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.45)", marginTop: 2 }}>3 active negotiations</div>
              </div>
            </div>

            {/* GRANTS */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Matched Grants</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {GRANTS.map((g) => (
                  <div key={g.name} style={{ background: "#FAFAF8", border: "1px solid #E8E5DF", borderRadius: 10, padding: ".875rem" }}>
                    <div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110", marginBottom: 3 }}>{g.name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: ".72rem", color: "#6B6860" }}>Due {g.deadline}</span>
                      <span style={{ fontSize: ".75rem", fontWeight: 700, color: accent }}>{g.amount}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 60, height: 4, background: "#E8E5DF", borderRadius: 100, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${g.match}%`, background: accent, borderRadius: 100 }}/>
                        </div>
                        <span style={{ fontSize: ".65rem", fontWeight: 600, color: accent }}>{g.match}%</span>
                      </div>
                      <button className="btn-a" style={{ padding: "4px 12px", fontSize: ".72rem" }}>Apply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLLAB REQUEST */}
            <div className="card">
              <h3 style={{ fontSize: ".9rem", fontWeight: 700, color: "#111110", marginBottom: "1rem" }}>Collaboration Requests</h3>
              {[
                { name: "Prof. Aisha Patel", inst: "IIT Bombay · AI Research", initials: "AP", color: "#1A56DB" },
                { name: "Dr. Luis Santos", inst: "UP Diliman · Materials Sci.", initials: "LS", color: "#7C3AED" },
              ].map((c) => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: ".75rem" }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".65rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{c.initials}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: ".8rem", fontWeight: 600, color: "#111110" }}>{c.name}</div><div style={{ fontSize: ".68rem", color: "#9B9890" }}>{c.inst}</div></div>
                  <button className="btn-a" style={{ padding: "4px 10px", fontSize: ".7rem" }}>Accept</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}