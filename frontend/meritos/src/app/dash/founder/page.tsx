"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";

const PIPELINE_STAGES = [
  { label:"Matched", count:47, color:"#9B9890", light:"#F3F4F6" },
  { label:"Intro Sent", count:12, color:"#1A56DB", light:"#EEF3FF" },
  { label:"In Meeting", count:5, color:"#7C3AED", light:"#F5F3FF" },
  { label:"Due Diligence", count:3, color:"#B45309", light:"#FFFBEB" },
  { label:"Term Sheet", count:1, color:"#0E7A4E", light:"#ECFDF5" },
];

const INVESTORS = [
  { initials:"AB", name:"Andreessen Bio", mandate:"BioTech · Seed", match:97, color:"#7C3AED", light:"#F5F3FF", stage:"In Meeting", isNew:true },
  { initials:"VC", name:"Veritas Capital", mandate:"AI · Seed", match:93, color:"#1A56DB", light:"#EEF3FF", stage:"DD", isNew:true },
  { initials:"BH", name:"Blue Horizon", mandate:"CleanTech · Series A", match:87, color:"#0E7A4E", light:"#ECFDF5", stage:"Intro Sent", isNew:false },
  { initials:"TG", name:"Titan Growth", mandate:"SaaS · Seed+", match:81, color:"#B45309", light:"#FFFBEB", stage:"Matched", isNew:false },
];

const DECK_VIEWS = [12,18,14,22,19,31,28,38];
const MEETINGS_BOOKED = [1,2,1,3,2,4,3,5];

const MEETINGS = [
  { investor:"Andreessen Bio", type:"Partner Call", date:"Tomorrow, 10:00 AM", urgent:true },
  { investor:"Titan Growth", type:"Due Diligence", date:"May 5, 2:00 PM", urgent:false },
  { investor:"Veritas Capital", type:"Intro Call", date:"May 9, 11:00 AM", urgent:false },
];

function Sparkline({ data, color = "#7C3AED" }: { data: number[]; color?: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 80, h = 28;
  const points = data.map((v, i) => `${(i/(data.length-1))*w},${h-((v-min)/(max-min))*(h-4)-2}`).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow:"visible" }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={data.length>1 ? (w).toString():"0"} cy={h-((data[data.length-1]-min)/(max-min))*(h-4)-2} r="2.5" fill={color}/>
    </svg>
  );
}

export default function FounderDashboard() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 600); return () => clearTimeout(t); }, []);

  const totalPipeline = PIPELINE_STAGES.reduce((s, p) => s + p.count, 0);

  return (
    <DashboardLayout
      role="founder"
      user={{ name: "NanoMed Labs", subtitle: "BioTech · Seed Stage" }}
      pageTitle="Fundraising Dashboard 🚀"
      pageSubtitle="4 new investor matches · Andreessen Bio meeting tomorrow"
      notifications={4}
      headerActions={<>
        <button className="btn btn-secondary btn-sm">Update Deck</button>
        <button className="btn btn-primary btn-sm" style={{ background:"#7C3AED" }}>Browse Investors</button>
      </>}
    >
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .dash-fade { animation: fadeUp .35s ease both; }
        .inv-row:hover { background: #FAFAF8 !important; }
        .mtg-row:hover { background: #F5F3EF !important; }
        @media(max-width:1100px){ .two-col{ grid-template-columns:1fr !important; } }
        @media(max-width:768px){ .four-col{ grid-template-columns:1fr 1fr !important; } }
      `}</style>

      {/* Funding round progress */}
      <div className="dash-fade" style={{ background:"#111110", borderRadius:14, padding:"20px 24px", marginBottom:20, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:24, alignItems:"center" }}>
        <div>
          <div style={{ fontSize:".65rem", fontWeight:600, textTransform:"uppercase", letterSpacing:".08em", color:"rgba(255,255,255,.4)", marginBottom:8 }}>Seed Round Target</div>
          <div style={{ fontSize:"2.25rem", fontWeight:700, fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", lineHeight:1 }}>$340k</div>
          <div style={{ fontSize:".75rem", color:"rgba(255,255,255,.5)", marginTop:4 }}>of $1.5M · 22% committed</div>
          <div style={{ height:5, background:"rgba(255,255,255,.12)", borderRadius:99, marginTop:12, overflow:"hidden" }}>
            <div style={{ height:"100%", width: loaded ? "22%":"0%", background:"#7C3AED", borderRadius:99, transition:"width .9s ease" }}/>
          </div>
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:".65rem", fontWeight:600, textTransform:"uppercase", letterSpacing:".08em", color:"rgba(255,255,255,.4)", marginBottom:8 }}>Investors in Pipeline</div>
          <div style={{ fontSize:"2.25rem", fontWeight:700, fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", lineHeight:1 }}>{totalPipeline}</div>
          <div style={{ fontSize:".75rem", color:"rgba(255,255,255,.5)", marginTop:4 }}>5 in active conversations</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontSize:".65rem", fontWeight:600, textTransform:"uppercase", letterSpacing:".08em", color:"rgba(255,255,255,.4)", marginBottom:8 }}>Runway</div>
          <div style={{ fontSize:"2.25rem", fontWeight:700, fontFamily:"'Bricolage Grotesque',sans-serif", color:"#0E7A4E", lineHeight:1 }}>8 mo</div>
          <div style={{ fontSize:".75rem", color:"rgba(255,255,255,.5)", marginTop:4 }}>Extend before Jun 2025</div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="four-col dash-fade" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:20, animationDelay:".06s" }}>
        {[
          { label:"Investor Matches", value:"47", note:"↑ 4 new today", color:"#7C3AED", spark:DECK_VIEWS },
          { label:"Intros Sent", value:"12", note:"3 pending reply", color:"#111110", spark:[2,3,4,4,6,7,8,10,12] },
          { label:"Meetings Booked", value:"5", note:"2 this week", color:"#111110", spark:MEETINGS_BOOKED },
          { label:"Deck Views", value:"284", note:"↑ 38 this week", color:"#0E7A4E", spark:[80,95,110,130,155,180,210,245,284] },
        ].map((s, i) => (
          <div key={s.label} className="dash-fade" style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"14px 16px", animationDelay:`${.06+i*.04}s` }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:".63rem", fontWeight:500, textTransform:"uppercase", letterSpacing:".06em", color:"#9B9890" }}>{s.label}</span>
              <Sparkline data={s.spark} color={s.color}/>
            </div>
            <div style={{ fontSize:"1.75rem", fontWeight:700, fontFamily:"'Bricolage Grotesque',sans-serif", color:s.color, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:".68rem", color:"#6B6860", marginTop:4, fontWeight:500 }}>{s.note}</div>
          </div>
        ))}
      </div>

      <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:20 }}>

        {/* Left */}
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* Pipeline funnel */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{ fontSize:".9rem", fontWeight:700, color:"#111110" }}>Investor Pipeline</span>
              <span style={{ fontSize:".72rem", color:"#9B9890" }}>{totalPipeline} total</span>
            </div>
            <div style={{ display:"flex", gap:2, height:8, borderRadius:99, overflow:"hidden", marginBottom:12 }}>
              {PIPELINE_STAGES.map(p => (
                <div key={p.label} style={{ flex:p.count, background:p.color, opacity:.85 }}/>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              {PIPELINE_STAGES.map(p => (
                <div key={p.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:p.color }}/>
                  <span style={{ fontSize:".7rem", color:"#6B6860" }}>{p.label}</span>
                  <span style={{ fontSize:".7rem", fontWeight:700, color:"#111110" }}>{p.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Investor matches table */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", borderBottom:"1px solid #F3F4F6" }}>
              <span style={{ fontSize:".9rem", fontWeight:700, color:"#111110" }}>Top AI-Matched Investors</span>
            </div>
            {INVESTORS.map((inv, i) => (
              <div key={inv.name} className="inv-row" style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 20px", borderBottom: i<INVESTORS.length-1 ? "1px solid #F9F9F7":"none", cursor:"default", transition:"background .12s" }}>
                <div style={{ width:38, height:38, borderRadius:"50%", background:inv.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:".72rem", fontWeight:700, color:inv.color, flexShrink:0 }}>{inv.initials}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                    <span style={{ fontSize:".85rem", fontWeight:600, color:"#111110" }}>{inv.name}</span>
                    {inv.isNew && <span style={{ fontSize:".6rem", fontWeight:600, background:inv.light, color:inv.color, padding:"2px 7px", borderRadius:99 }}>New</span>}
                  </div>
                  <div style={{ fontSize:".72rem", color:"#9B9890" }}>{inv.mandate}</div>
                </div>
                <span style={{ fontSize:".65rem", fontWeight:600, background: inv.stage==="DD" ? "#ECFDF5" : inv.stage==="In Meeting" ? "#F5F3FF" : "#EEF3FF", color: inv.stage==="DD" ? "#0E7A4E" : inv.stage==="In Meeting" ? "#7C3AED" : "#1A56DB", padding:"3px 9px", borderRadius:99, flexShrink:0 }}>{inv.stage}</span>
                <div style={{ textAlign:"center", flexShrink:0, width:48 }}>
                  <div style={{ fontSize:"1rem", fontWeight:700, color:inv.color, fontFamily:"'Bricolage Grotesque',sans-serif" }}>{inv.match}%</div>
                  <div style={{ fontSize:".58rem", color:"#9B9890" }}>match</div>
                </div>
                <button style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".72rem", fontWeight:500, color:"#fff", background:inv.color, border:"none", cursor:"pointer", padding:"5px 12px", borderRadius:6, flexShrink:0 }}>Send Intro</button>
              </div>
            ))}
          </div>

          {/* Pitch analytics */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{ fontSize:".9rem", fontWeight:700, color:"#111110" }}>Pitch Deck Analytics</span>
              <span style={{ fontSize:".68rem", color:"#9B9890" }}>Last 8 weeks</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
              {[
                { label:"Avg. time on deck", value:"4m 32s" },
                { label:"Most-viewed slide", value:"Slide 6 · Traction" },
                { label:"Drop-off slide", value:"Slide 9 · Financials" },
                { label:"Unique investors", value:"38 this month" },
              ].map(a => (
                <div key={a.label} style={{ padding:"10px 14px", background:"#FAFAF8", borderRadius:9, border:"1px solid #F3F4F6" }}>
                  <div style={{ fontSize:".65rem", color:"#9B9890", marginBottom:3 }}>{a.label}</div>
                  <div style={{ fontSize:".82rem", fontWeight:600, color:"#111110" }}>{a.value}</div>
                </div>
              ))}
            </div>
            <div style={{ padding:"10px 14px", background:"#ECFDF5", borderRadius:9, border:"1px solid #D1FAE5" }}>
              <span style={{ fontSize:".72rem", fontWeight:600, color:"#0E7A4E" }}>💡 </span>
              <span style={{ fontSize:".72rem", color:"#064E3B", fontWeight:300 }}>Investors spend 2× longer on financials — add a unit economics breakdown to Slide 9</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <span style={{ fontSize:".85rem", fontWeight:700, color:"#111110", display:"block", marginBottom:12 }}>Upcoming Meetings</span>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {MEETINGS.map(m => (
                <div key={m.investor} className="mtg-row" style={{ padding:"10px 12px", background:"#FAFAF8", borderRadius:9, border:"1px solid #F3F4F6", cursor:"default", transition:"background .12s" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                    <span style={{ fontSize:".8rem", fontWeight:600, color:"#111110" }}>{m.investor}</span>
                    {m.urgent && <span style={{ fontSize:".6rem", fontWeight:600, background:"#FEF2F2", color:"#DC2626", padding:"2px 7px", borderRadius:99 }}>Tomorrow</span>}
                  </div>
                  <div style={{ fontSize:".7rem", color:"#9B9890" }}>{m.type} · {m.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Deck views chart */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
              <span style={{ fontSize:".85rem", fontWeight:700, color:"#111110" }}>Deck Views</span>
              <span style={{ fontSize:".68rem", color:"#9B9890" }}>8 weeks</span>
            </div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:56 }}>
              {DECK_VIEWS.map((v, i) => (
                <div key={i} style={{ flex:1, height:`${(v/Math.max(...DECK_VIEWS))*56}px`, background: i===DECK_VIEWS.length-1 ? "#7C3AED" : "rgba(124,58,237,.2)", borderRadius:"3px 3px 0 0", transition:"height .5s ease" }}/>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
              <span style={{ fontSize:".6rem", color:"#9B9890" }}>8w ago</span>
              <span style={{ fontSize:".6rem", fontWeight:600, color:"#7C3AED" }}>{DECK_VIEWS[DECK_VIEWS.length-1]} this week</span>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ background:"#fff", border:"1px solid #E8E5DF", borderRadius:14, padding:"16px 20px" }}>
            <span style={{ fontSize:".85rem", fontWeight:700, color:"#111110", display:"block", marginBottom:12 }}>Quick Actions</span>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {[
                { label:"📄 Update pitch deck", color:"#7C3AED" },
                { label:"📅 Schedule investor call", color:"#1A56DB" },
                { label:"📊 Export pipeline report", color:"#0E7A4E" },
              ].map(a => (
                <button key={a.label} style={{ width:"100%", background:"#FAFAF8", border:"1px solid #E8E5DF", borderRadius:8, padding:"9px 14px", fontSize:".8rem", fontWeight:500, color:"#111110", cursor:"pointer", textAlign:"left", fontFamily:"'DM Sans',sans-serif", transition:"all .12s" }} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=a.color;(e.currentTarget as HTMLElement).style.color=a.color;}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="#E8E5DF";(e.currentTarget as HTMLElement).style.color="#111110";}}>{a.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}