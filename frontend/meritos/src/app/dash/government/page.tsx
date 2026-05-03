"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";

/* ─── DATA ─────────────────────────────────────────────── */
const SECTOR_DATA = [
  { sector: "AI / Machine Learning", startups: 284, researchers: 142, trend: "+18%", color: "#1A56DB", spark: [140,165,188,200,220,245,261,284] },
  { sector: "BioTech & Health",       startups: 196, researchers: 213, trend: "+24%", color: "#0E7A4E", spark: [90,108,120,138,150,168,180,196] },
  { sector: "CleanTech & Energy",     startups: 158, researchers:  89, trend: "+31%", color: "#7C3AED", spark: [68,78,88,100,112,128,142,158] },
  { sector: "Quantum Computing",      startups:  47, researchers:  68, trend: "+42%", color: "#B45309", spark: [14,18,22,27,32,38,43,47] },
  { sector: "AgriTech",               startups: 112, researchers:  54, trend: "+9%",  color: "#0C444C", spark: [80,84,88,90,95,100,105,112] },
];

const GRANTS = [
  { name: "Young Innovator Research Fund",     budget: "₱50M",  distributed: 62, total: 100, applicants: 384, deadline: "May 20", status: "Open",   color: "#0E7A4E" },
  { name: "University–Industry Bridge Grant",  budget: "₱120M", distributed: 28, total: 40,  applicants: 156, deadline: "Jun 5",  status: "Open",   color: "#1A56DB" },
  { name: "National Quantum Initiative",       budget: "₱200M", distributed:  5, total: 15,  applicants:  48, deadline: "Jul 1",  status: "Open",   color: "#B45309" },
  { name: "CleanTech Accelerator Fund",        budget: "₱85M",  distributed: 40, total: 40,  applicants:   0, deadline: "Closed", status: "Closed", color: "#9B9890" },
];

const UNIVERSITIES = [
  { name: "University of the Philippines", location: "Quezon City", students: 1840, researchers: 214, startups: 38, status: "Active" },
  { name: "Ateneo de Manila University",   location: "Manila",      students:  920, researchers:  98, startups: 22, status: "Active" },
  { name: "De La Salle University",        location: "Manila",      students:  760, researchers:  76, startups: 17, status: "Active" },
  { name: "Mapúa University",              location: "Manila",      students:  430, researchers:  44, startups: 11, status: "Onboarding" },
  { name: "MSU-IIT",                       location: "Iligan",      students:  280, researchers:  31, startups:  6, status: "Onboarding" },
];

const REGIONAL = [
  { region: "NCR",       startups: 612, growth: "+22%", color: "#1A56DB" },
  { region: "Region VII", startups: 184, growth: "+35%", color: "#0E7A4E" },
  { region: "Region XI", startups: 143, growth: "+28%", color: "#7C3AED" },
  { region: "Region III",startups:  97, growth: "+14%", color: "#B45309" },
  { region: "Region VI", startups:  82, growth: "+19%", color: "#0C444C" },
];

const POLICY = [
  { name: "Innovation Economy Act 2024",  aligned: 142, type: "Startup",       level: "High",     color: "#0E7A4E" },
  { name: "National AI Strategy Framework",aligned:  89, type: "Research",      level: "High",     color: "#1A56DB" },
  { name: "Digital Economy Roadmap",      aligned:  67, type: "Startup + Corp", level: "Moderate", color: "#B45309" },
];

const ECOSYSTEM_TREND = [820,940,1010,1080,1140,1210,1280,1340,1390,1440,1490,1520];
const GRANT_TREND     = [120,180,210,260,290,330,370,410,440,455];

/* ─── MINI COMPONENTS ───────────────────────────────────── */
function Sparkline({ data, color = "#374151", width = 90, height = 30 }:
  { data: number[]; color?: string; width?: number; height?: number }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * width},${height - ((v - min) / (max - min || 1)) * (height - 4) - 2}`
  ).join(" ");
  const last = pts.split(" ").at(-1)!.split(",");
  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width .7s ease" }} />
    </div>
  );
}

function RadialBadge({ pct, color, size = 44 }: { pct: number; color: string; size?: number }) {
  const r = size / 2 - 4, circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F3F4F6" strokeWidth="2.5" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="2.5"
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} opacity="0.85" />
      <text x={size/2} y={size/2 + 4} textAnchor="middle" fontSize="10" fontWeight="600"
        fill={color} fontFamily="'Bricolage Grotesque',sans-serif">{pct}%</text>
    </svg>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────── */
export default function GovernmentDashboard() {
  const [tab, setTab]     = useState<"grants" | "universities">("grants");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <DashboardLayout
      role="government"
      user={{ name: "DOST Philippines", subtitle: "Dept. of Science & Technology" }}
      pageTitle="National Innovation Ecosystem 🏛️"
      pageSubtitle="Live view of the Philippine innovation landscape · Refreshed 4 min ago"
      notifications={2}
      headerActions={<>
        <button className="btn btn-secondary btn-sm">📥 Export Report</button>
        <button className="btn btn-primary btn-sm" style={{ background: "#374151" }}>
          Manage Grants →
        </button>
      </>}
    >
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        .df  { animation: fadeUp .35s ease both; }
        .row-hover:hover { background: #FAFAF8 !important; }
        .qa-btn:hover { border-color: var(--c) !important; color: var(--c) !important; }
        @media (max-width: 1200px) { .three-col { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 1000px) { .main-two  { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px)  {
          .five-kpi { grid-template-columns: repeat(2,1fr) !important; }
          .sector-inner { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px)  { .five-kpi { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ── KPI STRIP ── */}
      <div className="five-kpi df" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, marginBottom:20 }}>
        {[
          { label:"Registered Startups", value:"1,118", note:"↑ +43 this month", color:"#1A56DB", spark:ECOSYSTEM_TREND },
          { label:"Active Researchers",  value:"3,240", note:"Across 5 universities", color:"#0E7A4E", spark:[2100,2300,2600,2800,2940,3050,3150,3240] },
          { label:"Students on Platform",value:"8,420", note:"↑ +380 this week", color:"#7C3AED", spark:[5200,5900,6400,6900,7300,7700,8050,8420] },
          { label:"Grants Distributed",  value:"₱455M", note:"This fiscal year", color:"#374151", spark:GRANT_TREND },
          { label:"Corporate Partners",  value:"38", note:"14 MNCs · 24 local", color:"#B45309", spark:[12,16,20,24,26,30,34,38] },
        ].map((s, i) => (
          <div key={s.label} className="df" style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"14px 16px", animationDelay:`${i * .05}s` }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:".6rem", fontWeight:500, textTransform:"uppercase", letterSpacing:".06em", color:"#9B9890", maxWidth:70, lineHeight:1.4 }}>{s.label}</span>
              <Sparkline data={s.spark} color={s.color} width={70} height={24} />
            </div>
            <div style={{ fontSize:"1.6rem", fontWeight:700, fontFamily:"'Bricolage Grotesque',sans-serif", color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:".65rem", color:"#6B6860", marginTop:4, fontWeight:500 }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* ── ROW 1: Sector + Policy ── */}
      <div className="main-two df" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20, animationDelay:".08s" }}>

        {/* Sector activity */}
        <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid #F3F4F6", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:".9rem", fontWeight:700, color:"#111110" }}>Sector Activity</span>
            <span style={{ fontSize:".68rem", color:"#9B9890" }}>30-day growth</span>
          </div>
          <div style={{ padding:"4px 0" }}>
            {SECTOR_DATA.map((s, i) => (
              <div key={s.sector} className="row-hover" style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 20px", borderBottom: i < SECTOR_DATA.length - 1 ? "1px solid #F9F9F7":"none", cursor:"default", transition:"background .12s" }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:".82rem", fontWeight:600, color:"#111110" }}>{s.sector}</span>
                    <span style={{ fontSize:".78rem", fontWeight:700, color:s.color }}>{s.trend}</span>
                  </div>
                  <MiniBar pct={loaded ? (s.startups / 300) * 100 : 0} color={s.color} />
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                    <span style={{ fontSize:".63rem", color:"#9B9890" }}>{s.startups} startups</span>
                    <span style={{ fontSize:".63rem", color:"#9B9890" }}>{s.researchers} researchers</span>
                  </div>
                </div>
                <Sparkline data={s.spark} color={s.color} width={56} height={26} />
              </div>
            ))}
          </div>
        </div>

        {/* Policy alignment + AI insight */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, overflow:"hidden", flex:1 }}>
            <div style={{ padding:"14px 20px", borderBottom:"1px solid #F3F4F6" }}>
              <span style={{ fontSize:".9rem", fontWeight:700, color:"#111110" }}>Policy Alignment</span>
            </div>
            {POLICY.map((p, i) => (
              <div key={p.name} className="row-hover" style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 20px", borderBottom: i < POLICY.length - 1 ? "1px solid #F9F9F7":"none", cursor:"default", transition:"background .12s" }}>
                <RadialBadge pct={Math.round((p.aligned / 160) * 100)} color={p.color} size={42} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:".82rem", fontWeight:600, color:"#111110", marginBottom:2, lineHeight:1.3 }}>{p.name}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:".68rem", color:"#9B9890" }}>{p.aligned} entities · {p.type}</span>
                    <span style={{ fontSize:".63rem", fontWeight:600, padding:"2px 7px", borderRadius:99, background: p.level==="High" ? "#ECFDF5":"#FFFBEB", color: p.level==="High" ? "#0E7A4E":"#B45309" }}>{p.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI policy insight card */}
          <div style={{ background:"#111110", borderRadius:14, padding:"18px 20px" }}>
            <div style={{ fontSize:".63rem", fontWeight:600, textTransform:"uppercase", letterSpacing:".08em", color:"rgba(255,255,255,.35)", marginBottom:8 }}>🤖 AI Policy Insight</div>
            <p style={{ fontSize:".82rem", color:"#fff", lineHeight:1.65, marginBottom:14, fontWeight:300 }}>
              <strong style={{ fontWeight:600 }}>42 AI-sector startups</strong> are not yet aligned to the National AI Strategy Framework. Targeted outreach could increase policy uptake by <strong style={{ fontWeight:600, color:"#60A5FA" }}>37%</strong>.
            </p>
            <button style={{ width:"100%", background:"#1A56DB", color:"#fff", border:"none", borderRadius:8, padding:"9px", fontSize:".8rem", fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"opacity .12s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = ".85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Send Outreach Campaign →
            </button>
          </div>
        </div>
      </div>

      {/* ── ROW 2: Grants/Universities tabs + Regional + Quick Actions ── */}
      <div className="three-col df" style={{ display:"grid", gridTemplateColumns:"1fr 220px 200px", gap:20, animationDelay:".12s" }}>

        {/* Grants / Universities tabbed panel */}
        <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, overflow:"hidden" }}>
          <div style={{ display:"flex", gap:4, padding:"12px 20px", borderBottom:"1px solid #F3F4F6" }}>
            {(["grants","universities"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".8rem", fontWeight:500, color: tab===t ? "#111110":"#9B9890", background: tab===t ? "#F3F4F6":"none", border:"none", cursor:"pointer", padding:"6px 14px", borderRadius:99, transition:"all .12s", textTransform:"capitalize" }}>
                {t === "grants" ? "🎁 Grant Programs" : "🏫 University Partners"}
              </button>
            ))}
          </div>

          {/* Grants tab */}
          {tab === "grants" && (
            <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:10 }}>
              {GRANTS.map(g => (
                <div key={g.name} style={{ padding:"12px 14px", background:"#FAFAF8", border:"1px solid #F3F4F6", borderRadius:11 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5, gap:6 }}>
                    <span style={{ fontSize:".8rem", fontWeight:600, color:"#111110", lineHeight:1.3, flex:1 }}>{g.name}</span>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3, flexShrink:0 }}>
                      <span style={{ fontSize:".75rem", fontWeight:700, color:g.color }}>{g.budget}</span>
                      <span style={{ fontSize:".6rem", fontWeight:600, padding:"2px 7px", borderRadius:99, background: g.status==="Open" ? "#ECFDF5":"#F3F4F6", color: g.status==="Open" ? "#0E7A4E":"#9B9890" }}>{g.status}</span>
                    </div>
                  </div>
                  {g.status === "Open" && (
                    <>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:".65rem", color:"#9B9890", marginBottom:5 }}>
                        <span>{g.applicants} applicants · Due {g.deadline}</span>
                        <span style={{ fontWeight:600, color:"#111110" }}>{g.distributed}/{g.total} slots</span>
                      </div>
                      <MiniBar pct={loaded ? (g.distributed / g.total) * 100 : 0} color={g.color} />
                    </>
                  )}
                  {g.status === "Closed" && (
                    <div style={{ fontSize:".68rem", color:"#9B9890" }}>Closed · All {g.total} slots distributed</div>
                  )}
                </div>
              ))}
              <button style={{ width:"100%", fontFamily:"'DM Sans',sans-serif", fontSize:".8rem", fontWeight:500, color:"#fff", background:"#374151", border:"none", borderRadius:8, padding:"9px", cursor:"pointer", marginTop:2 }}>
                + Create New Grant Round
              </button>
            </div>
          )}

          {/* Universities tab */}
          {tab === "universities" && (
            <div>
              {/* Table header */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 60px 64px 58px 80px", gap:8, padding:"8px 20px 6px", borderBottom:"1px solid #F3F4F6" }}>
                {["University","Students","Research","Startups","Status"].map(h => (
                  <span key={h} style={{ fontSize:".6rem", fontWeight:600, textTransform:"uppercase", letterSpacing:".06em", color:"#9B9890" }}>{h}</span>
                ))}
              </div>
              {UNIVERSITIES.map((u, i) => (
                <div key={u.name} className="row-hover" style={{ display:"grid", gridTemplateColumns:"1fr 60px 64px 58px 80px", gap:8, alignItems:"center", padding:"11px 20px", borderBottom: i < UNIVERSITIES.length-1 ? "1px solid #F9F9F7":"none", cursor:"default", transition:"background .12s" }}>
                  <div>
                    <div style={{ fontSize:".78rem", fontWeight:600, color:"#111110", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{u.name}</div>
                    <div style={{ fontSize:".65rem", color:"#9B9890" }}>{u.location}</div>
                  </div>
                  <span style={{ fontSize:".78rem", fontWeight:600, color:"#111110" }}>{u.students.toLocaleString()}</span>
                  <span style={{ fontSize:".78rem", fontWeight:600, color:"#111110" }}>{u.researchers}</span>
                  <span style={{ fontSize:".78rem", fontWeight:600, color:"#111110" }}>{u.startups}</span>
                  <span style={{ fontSize:".63rem", fontWeight:600, padding:"3px 9px", borderRadius:99, background: u.status==="Active" ? "#ECFDF5":"#EEF3FF", color: u.status==="Active" ? "#0E7A4E":"#1A56DB" }}>{u.status}</span>
                </div>
              ))}
              <div style={{ padding:"12px 20px" }}>
                <button style={{ width:"100%", fontFamily:"'DM Sans',sans-serif", fontSize:".8rem", fontWeight:500, color:"#374151", background:"#F9FAFB", border:"1px solid #E8E5DF", borderRadius:8, padding:"8px", cursor:"pointer" }}>
                  + Onboard University
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Regional breakdown */}
        <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <span style={{ fontSize:".85rem", fontWeight:700, color:"#111110" }}>Regional Breakdown</span>
            <span style={{ fontSize:".65rem", color:"#9B9890" }}>Startups</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {REGIONAL.map(r => (
              <div key={r.region}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:".8rem", fontWeight:600, color:"#111110" }}>{r.region}</span>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:".7rem", fontWeight:600, color:r.color }}>{r.growth}</span>
                    <span style={{ fontSize:".8rem", fontWeight:700, fontFamily:"'Bricolage Grotesque',sans-serif", color:"#111110" }}>{r.startups}</span>
                  </div>
                </div>
                <MiniBar pct={loaded ? (r.startups / 612) * 100 : 0} color={r.color} />
              </div>
            ))}
          </div>
          <div style={{ marginTop:16, padding:"10px 12px", background:"#F9FAFB", border:"1px solid #E8E5DF", borderRadius:9 }}>
            <div style={{ fontSize:".7rem", fontWeight:600, color:"#374151", marginBottom:2 }}>📍 Emerging Hub</div>
            <div style={{ fontSize:".68rem", color:"#6B6860", lineHeight:1.5, fontWeight:300 }}>Region XI (Davao) growing fastest at +35% — consider priority grant allocation.</div>
          </div>
        </div>

        {/* Quick actions + ecosystem health */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {/* Ecosystem health score */}
          <div style={{ background:"#374151", borderRadius:14, padding:"18px 20px" }}>
            <div style={{ fontSize:".63rem", fontWeight:600, textTransform:"uppercase", letterSpacing:".08em", color:"rgba(255,255,255,.35)", marginBottom:10 }}>Ecosystem Health Score</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:10, marginBottom:12 }}>
              <div style={{ fontSize:"2.5rem", fontWeight:700, fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", lineHeight:1 }}>82</div>
              <div style={{ paddingBottom:4 }}>
                <div style={{ fontSize:".72rem", fontWeight:600, color:"#4ADE80" }}>↑ +6 pts</div>
                <div style={{ fontSize:".65rem", color:"rgba(255,255,255,.4)" }}>vs last quarter</div>
              </div>
            </div>
            <div style={{ height:5, background:"rgba(255,255,255,.12)", borderRadius:99, overflow:"hidden" }}>
              <div style={{ height:"100%", width: loaded ? "82%":"0%", background:"#4ADE80", borderRadius:99, transition:"width .9s ease" }}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:14 }}>
              {[
                { label:"Startup Growth", v:"88" },
                { label:"Research Output", v:"79" },
                { label:"Gov. Engagement", v:"74" },
                { label:"Corp. Adoption", v:"81" },
              ].map(m => (
                <div key={m.label} style={{ background:"rgba(255,255,255,.07)", borderRadius:8, padding:"8px 10px" }}>
                  <div style={{ fontSize:".6rem", color:"rgba(255,255,255,.4)", marginBottom:2 }}>{m.label}</div>
                  <div style={{ fontSize:".95rem", fontWeight:700, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif" }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <span style={{ fontSize:".82rem", fontWeight:700, color:"#111110", display:"block", marginBottom:10 }}>Quick Actions</span>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {[
                { label:"📢 Send Ecosystem Alert",     c:"#374151" },
                { label:"🎁 Open New Grant Round",     c:"#0E7A4E" },
                { label:"🏫 Invite University",        c:"#1A56DB" },
                { label:"📊 Download Full Report",     c:"#7C3AED" },
              ].map(a => (
                <button key={a.label} className="qa-btn" style={{ "--c": a.c } as React.CSSProperties & { "--c": string }}
                  onClick={() => {}}
                  onMouseEnter={e => { (e.currentTarget.style.borderColor = a.c); (e.currentTarget.style.color = a.c); }}
                  onMouseLeave={e => { (e.currentTarget.style.borderColor = "#E8E5DF"); (e.currentTarget.style.color = "#111110"); }}
                  style={{ width:"100%", background:"#FAFAF8", border:"1px solid #E8E5DF", borderRadius:8, padding:"8px 12px", fontSize:".78rem", fontWeight:500, color:"#111110", cursor:"pointer", textAlign:"left", fontFamily:"'DM Sans',sans-serif", transition:"all .12s" }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}