// ─────────────────────────────────────────────────────────
// RESEARCHER DASHBOARD  →  app/dashboard/researcher/page.tsx
// ─────────────────────────────────────────────────────────
"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";

const CORP_INTEREST = [
  { org:"Vertex BioSciences", interest:"Quantum drug synthesis paper", match:95, color:"#0E7A4E", light:"#ECFDF5", signal:"High" },
  { org:"Luminary AI", interest:"Neural network compression", match:91, color:"#1A56DB", light:"#EEF3FF", signal:"High" },
  { org:"GridFlow Energy", interest:"Energy storage materials", match:78, color:"#B45309", light:"#FFFBEB", signal:"Medium" },
  { org:"Nuvola Labs", interest:"Error correction algorithm", match:72, color:"#7C3AED", light:"#F5F3FF", signal:"Medium" },
];
const PUBLICATIONS = [
  { title:"Quantum-Assisted Drug Target Identification via Vector Embeddings", journal:"Nature Methods", year:2024, citations:84, trend:[20,32,45,58,70,84] },
  { title:"Neural Network Compression for Edge Deployment in Clinical Settings", journal:"IEEE Trans. Med.", year:2024, citations:47, trend:[10,18,25,31,40,47] },
  { title:"Cosine Similarity Matching in Biomedical Knowledge Graphs", journal:"Bioinformatics", year:2023, citations:112, trend:[30,52,71,88,99,112] },
];
const IP_DEALS = [
  { ip:"Quantum Synthesis Patent", corp:"Vertex Bio", stage:"Negotiation", value:"$120k", pct:80 },
  { ip:"NN Compression Algorithm", corp:"Luminary AI", stage:"Due Diligence", value:"$85k", pct:55 },
  { ip:"Knowledge Graph Method", corp:"Nuvola Labs", stage:"Intro", value:"$40k", pct:20 },
];
const GRANTS = [
  { name:"DOST Quantum Research Fund", amount:"₱2.5M", match:92, deadline:"May 20" },
  { name:"NIH R01 Innovation Grant", amount:"$450k", match:87, deadline:"Jun 5" },
  { name:"EU Horizon Research Award", amount:"€300k", match:81, deadline:"Jul 1" },
];

function MiniSparkline({ data, color }:{ data:number[]; color:string }) {
  const max=Math.max(...data),min=Math.min(...data),w=64,h=22;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/(max-min))*(h-3)-1.5}`).join(" ");
  return <svg width={w} height={h} style={{overflow:"visible"}}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx={w} cy={h-((data[data.length-1]-min)/(max-min))*(h-3)-1.5} r="2.5" fill={color}/></svg>;
}

export function ResearcherDashboard() {
  const [loaded,setLoaded]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),600);return()=>clearTimeout(t);},[]);
  return (
    <DashboardLayout role="researcher" user={{name:"Dr. Chen Wei",subtitle:"MIT · Quantum Computing"}} pageTitle="Research Intelligence Hub 🔬" pageSubtitle="4 corporations viewing your work · 3 grants matched this week" notifications={4}
      headerActions={<><button className="btn btn-secondary btn-sm">Update Publications</button><button className="btn btn-primary btn-sm" style={{background:"#0E7A4E"}}>Manage IP Portfolio</button></>}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.df{animation:fadeUp .35s ease both}.ir:hover{background:#FAFAF8!important}@media(max-width:1100px){.tc{grid-template-columns:1fr!important}}@media(max-width:768px){.fc{grid-template-columns:1fr 1fr!important}}`}</style>

      {/* KPIs */}
      <div className="fc df" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:20}}>
        {[
          {label:"h-Index",value:"24",note:"Top 8% in field",color:"#0E7A4E"},
          {label:"Total Citations",value:"1,843",note:"↑ 47 this month",color:"#111110"},
          {label:"Corporate Interest",value:"4",note:"Active this week",color:"#1A56DB"},
          {label:"Grant Matches",value:"7",note:"₱5.2M total value",color:"#B45309"},
        ].map((s,i)=>(
          <div key={s.label} className="df" style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"14px 16px",animationDelay:`${i*.05}s`}}>
            <div style={{fontSize:".63rem",fontWeight:500,textTransform:"uppercase",letterSpacing:".06em",color:"#9B9890",marginBottom:6}}>{s.label}</div>
            <div style={{fontSize:"1.75rem",fontWeight:700,fontFamily:"'Bricolage Grotesque',sans-serif",color:s.color,lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:".68rem",color:"#6B6860",marginTop:4,fontWeight:500}}>{s.note}</div>
          </div>
        ))}
      </div>

      <div className="tc" style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:20}}>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* Corporate interest */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"14px 20px",borderBottom:"1px solid #F3F4F6",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:".9rem",fontWeight:700,color:"#111110"}}>Corporate Interest Signals</span>
              <span style={{fontSize:".68rem",color:"#9B9890"}}>Updated live</span>
            </div>
            {CORP_INTEREST.map((c,i)=>(
              <div key={c.org} className="ir" style={{display:"flex",alignItems:"center",gap:14,padding:"13px 20px",borderBottom:i<CORP_INTEREST.length-1?"1px solid #F9F9F7":"none",cursor:"default",transition:"background .12s"}}>
                <div style={{width:40,height:40,borderRadius:10,background:c.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".72rem",fontWeight:700,color:c.color,flexShrink:0}}>{c.org.slice(0,2)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:".85rem",fontWeight:600,color:"#111110",marginBottom:2}}>{c.org}</div>
                  <div style={{fontSize:".72rem",color:"#9B9890",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Interested in: "{c.interest}"</div>
                </div>
                <span style={{fontSize:".63rem",fontWeight:600,background:c.signal==="High"?"#ECFDF5":"#FFFBEB",color:c.signal==="High"?"#0E7A4E":"#B45309",padding:"3px 9px",borderRadius:99,flexShrink:0}}>{c.signal}</span>
                <div style={{textAlign:"center",flexShrink:0,width:44}}>
                  <svg width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="14" fill="none" stroke="#F3F4F6" strokeWidth="2.5"/><circle cx="18" cy="18" r="14" fill="none" stroke={c.color} strokeWidth="2.5" strokeDasharray={`${(c.match/100)*88} 88`} strokeLinecap="round" transform="rotate(-90 18 18)" opacity=".85"/><text x="18" y="22" textAnchor="middle" fontSize="9" fontWeight="600" fill={c.color} fontFamily="'Bricolage Grotesque',sans-serif">{c.match}%</text></svg>
                </div>
                <button style={{fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",fontWeight:500,color:"#fff",background:c.color,border:"none",cursor:"pointer",padding:"5px 12px",borderRadius:6,flexShrink:0}}>Connect</button>
              </div>
            ))}
          </div>

          {/* Publications */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,overflow:"hidden"}}>
            <div style={{padding:"14px 20px",borderBottom:"1px solid #F3F4F6"}}><span style={{fontSize:".9rem",fontWeight:700,color:"#111110"}}>Publications Impact</span></div>
            {PUBLICATIONS.map((p,i)=>(
              <div key={p.title} className="ir" style={{display:"flex",alignItems:"center",gap:16,padding:"14px 20px",borderBottom:i<PUBLICATIONS.length-1?"1px solid #F9F9F7":"none",cursor:"default",transition:"background .12s"}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:".82rem",fontWeight:600,color:"#111110",marginBottom:2,lineHeight:1.35}}>{p.title}</div>
                  <div style={{fontSize:".7rem",color:"#9B9890"}}>{p.journal} · {p.year}</div>
                </div>
                <div style={{textAlign:"center",flexShrink:0}}>
                  <MiniSparkline data={p.trend} color="#0E7A4E"/>
                  <div style={{fontSize:".7rem",fontWeight:700,color:"#0E7A4E",fontFamily:"'Bricolage Grotesque',sans-serif",marginTop:2}}>{p.citations} citations</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* IP Pipeline */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"16px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontSize:".85rem",fontWeight:700,color:"#111110"}}>IP Licensing Pipeline</span>
              <span style={{fontSize:".72rem",fontWeight:700,color:"#0E7A4E",fontFamily:"'Bricolage Grotesque',sans-serif"}}>$245k</span>
            </div>
            {IP_DEALS.map((ip)=>(
              <div key={ip.ip} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:".78rem",fontWeight:600,color:"#111110"}}>{ip.ip}</span>
                  <span style={{fontSize:".72rem",fontWeight:700,color:"#0E7A4E"}}>{ip.value}</span>
                </div>
                <div style={{fontSize:".67rem",color:"#9B9890",marginBottom:5}}>{ip.corp} · {ip.stage}</div>
                <div style={{height:4,background:"#F3F4F6",borderRadius:99,overflow:"hidden"}}>
                  <div style={{height:"100%",width:loaded?`${ip.pct}%`:"0%",background:"#0E7A4E",borderRadius:99,transition:"width .8s ease"}}/>
                </div>
              </div>
            ))}
          </div>
          {/* Grants */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"16px 20px"}}>
            <span style={{fontSize:".85rem",fontWeight:700,color:"#111110",display:"block",marginBottom:12}}>Matched Grants</span>
            {GRANTS.map(g=>(
              <div key={g.name} style={{padding:"10px 12px",background:"#FAFAF8",border:"1px solid #F3F4F6",borderRadius:9,marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:".78rem",fontWeight:600,color:"#111110",flex:1,paddingRight:8}}>{g.name}</span>
                  <span style={{fontSize:".72rem",fontWeight:700,color:"#0E7A4E",flexShrink:0}}>{g.amount}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:50,height:4,background:"#E8E5DF",borderRadius:99,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${g.match}%`,background:"#0E7A4E",borderRadius:99}}/>
                    </div>
                    <span style={{fontSize:".63rem",fontWeight:600,color:"#0E7A4E"}}>{g.match}%</span>
                  </div>
                  <span style={{fontSize:".65rem",color:"#9B9890"}}>Due {g.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ResearcherDashboard;