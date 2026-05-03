"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";

const DEALS = [
  { name:"NanoMed Labs", type:"BioTech", stage:"Seed", ask:"$1.2M", match:97, tags:["AI Drug","Patent"], color:"#0E7A4E", light:"#ECFDF5", firstLook:true },
  { name:"GridFlow Energy", type:"CleanTech", stage:"Pre-seed", ask:"$500k", match:93, tags:["Energy","IP"], color:"#1A56DB", light:"#EEF3FF", firstLook:false },
  { name:"Draftly AI", type:"SaaS", stage:"Seed", ask:"$800k", match:89, tags:["B2B","ARR $120k"], color:"#7C3AED", light:"#F5F3FF", firstLook:false },
  { name:"Quantum Logistics", type:"DeepTech", stage:"Pre-seed", ask:"$350k", match:84, tags:["Quantum"], color:"#B45309", light:"#FFFBEB", firstLook:true },
  { name:"Crestline Health", type:"HealthTech", stage:"Seed", ask:"$2M", match:81, tags:["Diagnostics","FDA"], color:"#0C444C", light:"#F0FAFB", firstLook:false },
];

const PORTFOLIO = [
  { name:"Vertex AI", stage:"Series A", invested:"$500k", current:"$2.1M", roi:"+320%", color:"#0E7A4E" },
  { name:"Luminary Data", stage:"Seed", invested:"$250k", current:"$780k", roi:"+212%", color:"#1A56DB" },
  { name:"Opaque Systems", stage:"Pre-seed", invested:"$100k", current:"$185k", roi:"+85%", color:"#7C3AED" },
];

const DD_QUEUE = [
  { company:"NanoMed Labs", doc:"Cap Table", status:"Received" },
  { company:"NanoMed Labs", doc:"Financial Model", status:"Pending" },
  { company:"GridFlow Energy", doc:"Patent Portfolio", status:"Received" },
  { company:"Draftly AI", doc:"Customer Contracts", status:"Reviewing" },
];

const DEAL_FLOW_TREND = [8,12,9,16,14,21,18,26,22,31,27,35];

function Sparkline({ data, color = "#B45309" }: { data: number[]; color?: string }) {
  const max = Math.max(...data), min = Math.min(...data), w = 90, h = 30;
  const points = data.map((v, i) => `${(i/(data.length-1))*w},${h-((v-min)/(max-min))*(h-4)-2}`).join(" ");
  return <svg width={w} height={h} style={{overflow:"visible"}}><polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/><circle cx={w} cy={h-((data[data.length-1]-min)/(max-min))*(h-4)-2} r="2.5" fill={color}/></svg>;
}

export default function InvestorDashboard() {
  const [filter, setFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 600); return () => clearTimeout(t); }, []);

  const filtered = filter === "All" ? DEALS : DEALS.filter(d => d.type === filter);

  return (
    <DashboardLayout
      role="investor"
      user={{ name: "Apex Growth Fund", subtitle: "Seed · BioTech · AI" }}
      pageTitle="Deal Flow Intelligence 💼"
      pageSubtitle="5 mandate-matched deals today · 2 first-look exclusives"
      notifications={5}
      headerActions={<>
        <button className="btn btn-secondary btn-sm">Edit Mandate</button>
        <button className="btn btn-primary btn-sm" style={{background:"#B45309"}}>Download Report</button>
      </>}
    >
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.df{animation:fadeUp .35s ease both}.dr:hover{background:#FAFAF8!important}
        @media(max-width:1100px){.tc{grid-template-columns:1fr!important}}
        @media(max-width:768px){.fc{grid-template-columns:1fr 1fr!important}}
      `}</style>

      {/* KPIs */}
      <div className="fc df" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:20}}>
        {[
          { label:"Mandate Match Score", value:"93%", note:"AI precision", color:"#B45309", spark:DEAL_FLOW_TREND },
          { label:"New Deals Today", value:"5", note:"2 first-look", color:"#111110", spark:[2,3,2,4,3,5,4,5] },
          { label:"In Due Diligence", value:"3", note:"NanoMed·GridFlow·Draftly", color:"#1A56DB", spark:[0,1,1,2,1,2,3,3] },
          { label:"Portfolio Value", value:"$3.1M", note:"↑ +$420k this qtr", color:"#0E7A4E", spark:[1.5,1.8,2.1,2.1,2.4,2.6,2.8,3.1] },
        ].map((s,i)=>(
          <div key={s.label} className="df" style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"14px 16px",animationDelay:`${i*.05}s`}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:".63rem",fontWeight:500,textTransform:"uppercase",letterSpacing:".06em",color:"#9B9890"}}>{s.label}</span>
              <Sparkline data={s.spark} color={s.color}/>
            </div>
            <div style={{fontSize:"1.75rem",fontWeight:700,fontFamily:"'Bricolage Grotesque',sans-serif",color:s.color,lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:".68rem",color:"#6B6860",marginTop:4,fontWeight:500}}>{s.note}</div>
          </div>
        ))}
      </div>

      <div className="tc" style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:20}}>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* Deal flow */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"14px 20px",borderBottom:"1px solid #F3F4F6",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
              <span style={{fontSize:".9rem",fontWeight:700,color:"#111110"}}>AI-Matched Deal Flow</span>
              <div style={{display:"flex",gap:4}}>
                {["All","BioTech","SaaS","CleanTech","DeepTech"].map(f=>(
                  <button key={f} onClick={()=>setFilter(f)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",fontWeight:500,color:filter===f?"#111110":"#9B9890",background:filter===f?"#F3F4F6":"none",border:"none",cursor:"pointer",padding:"4px 10px",borderRadius:99,transition:"all .12s"}}>{f}</button>
                ))}
              </div>
            </div>
            {filtered.map((d,i)=>(
              <div key={d.name} className="dr" style={{display:"flex",alignItems:"center",gap:14,padding:"13px 20px",borderBottom:i<filtered.length-1?"1px solid #F9F9F7":"none",cursor:"default",transition:"background .12s"}}>
                <div style={{width:42,height:42,borderRadius:10,background:d.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".75rem",fontWeight:700,color:d.color,flexShrink:0}}>{d.name.slice(0,2)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2,flexWrap:"wrap"}}>
                    <span style={{fontSize:".875rem",fontWeight:600,color:"#111110"}}>{d.name}</span>
                    {d.firstLook && <span style={{fontSize:".6rem",fontWeight:600,background:"#FFFBEB",color:"#B45309",padding:"2px 7px",borderRadius:99}}>⚡ First Look</span>}
                  </div>
                  <div style={{fontSize:".72rem",color:"#9B9890",marginBottom:5}}>{d.type} · {d.stage} · Asking {d.ask}</div>
                  <div style={{display:"flex",gap:4}}>{d.tags.map(t=><span key={t} style={{fontSize:".6rem",fontWeight:500,background:"#F3F4F6",color:"#6B7280",padding:"2px 7px",borderRadius:4}}>{t}</span>)}</div>
                </div>
                <div style={{textAlign:"center",flexShrink:0,width:52}}>
                  <svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="none" stroke="#F3F4F6" strokeWidth="3"/><circle cx="22" cy="22" r="18" fill="none" stroke={d.color} strokeWidth="3" strokeDasharray={`${(d.match/100)*113} 113`} strokeLinecap="round" transform="rotate(-90 22 22)" opacity=".85"/><text x="22" y="26" textAnchor="middle" fontSize="10" fontWeight="600" fill={d.color} fontFamily="'Bricolage Grotesque',sans-serif">{d.match}%</text></svg>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:4,flexShrink:0}}>
                  <button style={{fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",fontWeight:500,color:"#fff",background:d.color,border:"none",cursor:"pointer",padding:"5px 12px",borderRadius:6}}>View Deck</button>
                  <button style={{fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",fontWeight:500,color:"#9B9890",background:"none",border:"1px solid #E8E5DF",cursor:"pointer",padding:"5px 12px",borderRadius:6}}>Pass</button>
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"14px 20px",borderBottom:"1px solid #F3F4F6"}}><span style={{fontSize:".9rem",fontWeight:700,color:"#111110"}}>Portfolio Performance</span></div>
            {PORTFOLIO.map((p,i)=>(
              <div key={p.name} className="dr" style={{display:"flex",alignItems:"center",gap:14,padding:"13px 20px",borderBottom:i<PORTFOLIO.length-1?"1px solid #F9F9F7":"none",cursor:"default",transition:"background .12s"}}>
                <div style={{width:36,height:36,borderRadius:9,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",fontWeight:700,color:"#fff",flexShrink:0}}>{p.name.slice(0,2)}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:".85rem",fontWeight:600,color:"#111110",marginBottom:1}}>{p.name}</div>
                  <div style={{fontSize:".7rem",color:"#9B9890"}}>{p.stage} · Invested {p.invested}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:".9rem",fontWeight:700,color:"#111110"}}>{p.current}</div>
                  <div style={{fontSize:".7rem",fontWeight:600,color:"#0E7A4E"}}>{p.roi}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* DD Queue */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"16px 20px"}}>
            <span style={{fontSize:".85rem",fontWeight:700,color:"#111110",display:"block",marginBottom:12}}>Due Diligence Queue</span>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {DD_QUEUE.map((d,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:"#FAFAF8",border:"1px solid #F3F4F6",borderRadius:8}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:".75rem",fontWeight:600,color:"#111110"}}>{d.doc}</div>
                    <div style={{fontSize:".65rem",color:"#9B9890"}}>{d.company}</div>
                  </div>
                  <span style={{fontSize:".63rem",fontWeight:600,padding:"2px 8px",borderRadius:99,background:d.status==="Received"?"#ECFDF5":d.status==="Reviewing"?"#EEF3FF":"#FFFBEB",color:d.status==="Received"?"#0E7A4E":d.status==="Reviewing"?"#1A56DB":"#B45309",flexShrink:0}}>{d.status}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Mandate */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"16px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontSize:".85rem",fontWeight:700,color:"#111110"}}>Active Mandate</span>
              <button style={{fontFamily:"'DM Sans',sans-serif",fontSize:".7rem",fontWeight:500,color:"#6B6860",background:"none",border:"1px solid #E8E5DF",cursor:"pointer",padding:"3px 9px",borderRadius:6}}>Edit</button>
            </div>
            {[{l:"Sectors",v:"BioTech, AI, CleanTech"},{l:"Stage",v:"Pre-seed → Seed"},{l:"Ticket",v:"$200k – $2M"},{l:"Geography",v:"SEA, US, EU"},{l:"Revenue",v:"Pre-revenue OK"}].map(m=>(
              <div key={m.l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #F9F9F7"}}>
                <span style={{fontSize:".75rem",color:"#9B9890"}}>{m.l}</span>
                <span style={{fontSize:".75rem",fontWeight:600,color:"#111110",textAlign:"right",maxWidth:140}}>{m.v}</span>
              </div>
            ))}
          </div>
          {/* First look alert */}
          <div style={{background:"#111110",borderRadius:14,padding:"16px 20px"}}>
            <div style={{fontSize:".65rem",fontWeight:600,textTransform:"uppercase",letterSpacing:".08em",color:"rgba(255,255,255,.4)",marginBottom:6}}>⚡ First Look Window</div>
            <div style={{fontSize:".85rem",fontWeight:600,color:"#fff",marginBottom:5}}>Quantum Logistics</div>
            <div style={{fontSize:".75rem",color:"rgba(255,255,255,.5)",lineHeight:1.55,marginBottom:12,fontWeight:300}}>2 investors already viewed. Window closes in 48 hours.</div>
            <button style={{width:"100%",background:"#B45309",color:"#fff",border:"none",borderRadius:8,padding:"9px",fontSize:".8rem",fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>View Exclusive Deal →</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}