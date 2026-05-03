"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";

const OPPORTUNITIES = [
  { id: 1, type: "Internship", org: "NanoMed Labs", role: "AI Research Intern", match: 94, tags: ["AI/ML","BioTech"], color: "#1A56DB", light: "#EEF3FF", icon: "🚀", isNew: true },
  { id: 2, type: "Competition", org: "MIT Innovation Lab", role: "Startup Pitch Night", match: 88, tags: ["Pitch","$10k Prize"], color: "#7C3AED", light: "#F5F3FF", icon: "🏆", isNew: true },
  { id: 3, type: "Job", org: "Vertex Corp", role: "Junior Data Scientist", match: 82, tags: ["Data","Python"], color: "#0E7A4E", light: "#ECFDF5", icon: "🏢", isNew: false },
  { id: 4, type: "Grant", org: "DOST Philippines", role: "Young Innovator Grant", match: 79, tags: ["Research","₱200k"], color: "#B45309", light: "#FFFBEB", icon: "🏛️", isNew: false },
  { id: 5, type: "Internship", org: "GridFlow Energy", role: "Sustainability Analyst", match: 73, tags: ["CleanTech","Remote"], color: "#0C444C", light: "#F0FAFB", icon: "⚡", isNew: false },
];

const SKILLS = [
  { label: "Python", pct: 92 }, { label: "Machine Learning", pct: 85 },
  { label: "Research Writing", pct: 64 }, { label: "Business Dev", pct: 38 },
];

const ACTIVITY = [42,58,35,70,52,88,74,91,66,82,95,87];

const EVENTS = [
  { name: "Meritos Pitch Night #12", date: "May 3", type: "Pitch", spots: "24 left" },
  { name: "AI Founders Meetup Davao", date: "May 8", type: "Networking", spots: "12 left" },
  { name: "DOST Grant Writing Workshop", date: "May 15", type: "Workshop", spots: "Open" },
];

const CONNECTIONS = [
  { initials: "MR", name: "Maria Reyes", role: "CTO, NanoMed Labs", color: "#1A56DB" },
  { initials: "JO", name: "James Okafor", role: "Partner, Andreessen", color: "#7C3AED" },
  { initials: "SC", name: "Sarah Chen", role: "Founder, Draftly", color: "#0E7A4E" },
];

function Sparkline({ data, color = "#1A56DB", height = 32 }: { data: number[]; color?: string; height?: number }) {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 120, h = height;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      <circle cx={points.split(" ").at(-1)!.split(",")[0]} cy={points.split(" ").at(-1)!.split(",")[1]} r="2.5" fill={color}/>
    </svg>
  );
}

function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ height: 5, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width .6s ease" }}/>
    </div>
  );
}

export default function StudentDashboard() {
  const [filter, setFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 600); return () => clearTimeout(t); }, []);

  const filtered = filter === "All" ? OPPORTUNITIES : OPPORTUNITIES.filter(o => o.type === filter);

  return (
    <DashboardLayout
      role="student"
      user={{ name: "Aisha Bautista", subtitle: "CS Graduate · AI/ML" }}
      pageTitle="Good morning, Aisha 👋"
      pageSubtitle="3 new AI matches · 2 connection requests · Pitch Night in 3 days"
      notifications={3}
      headerActions={<>
        <button className="btn btn-secondary btn-sm">Update Profile</button>
        <button className="btn btn-primary btn-sm" style={{ background: "#1A56DB" }}>View All Matches</button>
      </>}
    >
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .dash-fade { animation: fadeUp .35s ease both; }
        .opp-row:hover { background: #FAFAF8 !important; }
        .evt-row:hover { background: #F5F3EF !important; border-radius: 8px; }
        .conn-row:hover { background: #FAFAF8 !important; border-radius: 8px; }
        @media(max-width:1100px){ .two-col{ grid-template-columns:1fr !important; } }
        @media(max-width:768px){ .four-col{ grid-template-columns:1fr 1fr !important; } }
      `}</style>

      {/* Profile completeness */}
      <div className="dash-fade" style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px", marginBottom:20, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:200 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
            <span style={{ fontSize:".82rem", fontWeight:600, color:"#111110" }}>Profile completeness</span>
            <span style={{ fontSize:".82rem", fontWeight:700, color:"#1A56DB" }}>74%</span>
          </div>
          <div style={{ height:5, background:"#F3F4F6", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width: loaded ? "74%" : "0%", background:"#1A56DB", borderRadius:99, transition:"width .8s ease" }}/>
          </div>
          <p style={{ fontSize:".72rem", color:"#9B9890", marginTop:5, fontWeight:300 }}>Add GitHub + 2 skills → +18% match boost</p>
        </div>
        <button className="btn btn-primary btn-sm" style={{ background:"#1A56DB", flexShrink:0 }}>Complete Profile</button>
      </div>

      {/* KPI row */}
      <div className="four-col dash-fade" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:20, animationDelay:".05s" }}>
        {[
          { label:"AI Match Score", value:"87%", note:"Top 12% of students", color:"#1A56DB", spark: ACTIVITY },
          { label:"Opportunities", value:"24", note:"↑ 5 new this week", color:"#111110", spark: [10,14,11,18,16,22,20,24] },
          { label:"Profile Views", value:"138", note:"↑ 22 this month", color:"#111110", spark: [60,72,65,88,78,102,95,115,128,138] },
          { label:"Connections", value:"31", note:"3 pending", color:"#0E7A4E", spark: [18,20,22,22,25,27,27,30,31] },
        ].map((s, i) => (
          <div key={s.label} style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"14px 16px", animationDelay:`${.05 + i*.04}s` }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:".65rem", fontWeight:500, textTransform:"uppercase", letterSpacing:".06em", color:"#9B9890" }}>{s.label}</span>
              <Sparkline data={s.spark} color={s.color}/>
            </div>
            <div style={{ fontSize:"1.75rem", fontWeight:700, fontFamily:"'Bricolage Grotesque',sans-serif", color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:".68rem", color:"#6B6860", marginTop:4, fontWeight:500 }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:20 }}>

        {/* Left: Opportunities */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* Filter + list */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #F3F4F6", flexWrap:"wrap", gap:8 }}>
              <span style={{ fontSize:".9rem", fontWeight:700, color:"#111110" }}>AI-Matched Opportunities</span>
              <div style={{ display:"flex", gap:4 }}>
                {["All","Internship","Job","Grant"].map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".75rem", fontWeight:500, color: filter===f ? "#111110":"#9B9890", background: filter===f ? "#F3F4F6":"none", border:"none", cursor:"pointer", padding:"4px 10px", borderRadius:99, transition:"all .12s" }}>{f}</button>
                ))}
              </div>
            </div>
            <div>
              {filtered.map((o, i) => (
                <div key={o.id} className="opp-row" style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 20px", borderBottom: i < filtered.length-1 ? "1px solid #F9F9F7":"none", cursor:"default", transition:"background .12s" }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:o.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{o.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2, flexWrap:"wrap" }}>
                      <span style={{ fontSize:".85rem", fontWeight:600, color:"#111110" }}>{o.role}</span>
                      {o.isNew && <span style={{ fontSize:".6rem", fontWeight:600, background:o.light, color:o.color, padding:"2px 7px", borderRadius:99 }}>New</span>}
                    </div>
                    <div style={{ fontSize:".72rem", color:"#9B9890", marginBottom:5 }}>{o.org} · {o.type}</div>
                    <div style={{ display:"flex", gap:4 }}>
                      {o.tags.map(t => <span key={t} style={{ fontSize:".6rem", fontWeight:500, background:"#F3F4F6", color:"#6B7280", padding:"2px 7px", borderRadius:4 }}>{t}</span>)}
                    </div>
                  </div>
                  {/* match score gauge */}
                  <div style={{ textAlign:"center", flexShrink:0, width:52 }}>
                    <svg width="44" height="44" viewBox="0 0 44 44">
                      <circle cx="22" cy="22" r="18" fill="none" stroke="#F3F4F6" strokeWidth="3"/>
                      <circle cx="22" cy="22" r="18" fill="none" stroke={o.color} strokeWidth="3"
                        strokeDasharray={`${(o.match/100)*113} 113`} strokeLinecap="round"
                        transform="rotate(-90 22 22)" opacity="0.85"/>
                      <text x="22" y="26" textAnchor="middle" fontSize="11" fontWeight="600" fill={o.color} fontFamily="'Bricolage Grotesque',sans-serif">{o.match}%</text>
                    </svg>
                  </div>
                  <button style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".75rem", fontWeight:500, color:"#fff", background:o.color, border:"none", cursor:"pointer", padding:"6px 14px", borderRadius:7, flexShrink:0, transition:"opacity .12s" }} onMouseEnter={e=>(e.currentTarget.style.opacity=".85")} onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>Apply</button>
                </div>
              ))}
            </div>
          </div>

          {/* Skill strength */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{ fontSize:".9rem", fontWeight:700, color:"#111110" }}>Skill Strength</span>
              <span style={{ fontSize:".72rem", color:"#9B9890" }}>AI-assessed</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {SKILLS.map(s => (
                <div key={s.label}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:".78rem", marginBottom:5 }}>
                    <span style={{ color:"#6B6860" }}>{s.label}</span>
                    <span style={{ fontWeight:600, color: s.pct >= 80 ? "#0E7A4E" : s.pct >= 60 ? "#1A56DB" : "#9B9890" }}>{s.pct}%</span>
                  </div>
                  <MiniBar pct={s.pct} color={s.pct >= 80 ? "#0E7A4E" : s.pct >= 60 ? "#1A56DB" : "#E5E7EB"}/>
                </div>
              ))}
            </div>
            <div style={{ marginTop:16, padding:"10px 14px", background:"#FFFBEB", borderRadius:9, border:"1px solid #FEF3C7" }}>
              <span style={{ fontSize:".72rem", fontWeight:600, color:"#B45309" }}>💡 </span>
              <span style={{ fontSize:".72rem", color:"#92400E", fontWeight:300 }}>Raising Business Dev to 60%+ unlocks 8 more opportunities</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Activity heatmap-style */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <span style={{ fontSize:".85rem", fontWeight:700, color:"#111110" }}>Match Activity</span>
              <span style={{ fontSize:".68rem", color:"#9B9890" }}>Last 12 weeks</span>
            </div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:48 }}>
              {ACTIVITY.map((v, i) => (
                <div key={i} style={{ flex:1, height:`${(v/100)*48}px`, background:`rgba(26,86,219,${.15 + (v/100)*.85})`, borderRadius:3, transition:"height .5s ease" }}/>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
              <span style={{ fontSize:".6rem", color:"#9B9890" }}>12 wks ago</span>
              <span style={{ fontSize:".6rem", color:"#9B9890" }}>This week</span>
            </div>
          </div>

          {/* Events */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <span style={{ fontSize:".85rem", fontWeight:700, color:"#111110", display:"block", marginBottom:12 }}>Upcoming Events</span>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {EVENTS.map(e => (
                <div key={e.name} className="evt-row" style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 6px", cursor:"default", transition:"background .12s" }}>
                  <div style={{ width:32, height:32, borderRadius:7, background:"#EEF3FF", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:".55rem", fontWeight:600, color:"#1A56DB", lineHeight:1 }}>May</span>
                    <span style={{ fontSize:".72rem", fontWeight:700, color:"#1A56DB", lineHeight:1 }}>{e.date.split(" ")[1]}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:".78rem", fontWeight:600, color:"#111110", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.name}</div>
                    <div style={{ fontSize:".67rem", color:"#9B9890" }}>{e.type} · {e.spots}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connections */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <span style={{ fontSize:".85rem", fontWeight:700, color:"#111110" }}>Connection Requests</span>
              <span style={{ fontSize:".65rem", fontWeight:600, background:"#EEF3FF", color:"#1A56DB", padding:"2px 8px", borderRadius:99 }}>3 new</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {CONNECTIONS.map(c => (
                <div key={c.name} className="conn-row" style={{ display:"flex", alignItems:"center", gap:10, padding:"6px", cursor:"default", transition:"background .12s" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:c.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:".6rem", fontWeight:700, color:"#fff", flexShrink:0 }}>{c.initials}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:".78rem", fontWeight:600, color:"#111110", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.name}</div>
                    <div style={{ fontSize:".67rem", color:"#9B9890", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{c.role}</div>
                  </div>
                  <button style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".7rem", fontWeight:500, color:"#fff", background:c.color, border:"none", cursor:"pointer", padding:"4px 10px", borderRadius:6, flexShrink:0 }}>Accept</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}