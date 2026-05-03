"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";

const TALENT = [
  { initials:"AB", name:"Aisha Bautista", role:"CS Graduate · AI/ML", match:96, skills:["Python","ML","Research"], stage:"Interview", color:"#1A56DB", light:"#EEF3FF" },
  { initials:"MR", name:"Marco Reyes", role:"PhD · Materials Sci.", match:92, skills:["Materials","Quantum"], stage:"Screening", color:"#7C3AED", light:"#F5F3FF" },
  { initials:"LK", name:"Lena Kim", role:"MS Robotics · Stanford", match:88, skills:["Robotics","CV"], stage:"Offer Sent", color:"#0E7A4E", light:"#ECFDF5" },
  { initials:"JO", name:"Dr. James Osei", role:"Post-doc · BioInfo", match:85, skills:["BioInfo","R"], stage:"Screening", color:"#B45309", light:"#FFFBEB" },
];

const RD = [
  { name:"Dr. Chen Wei", inst:"MIT", topic:"Quantum-Assisted Drug Identification", align:"Drug discovery pipeline", match:95, color:"#0E7A4E", light:"#ECFDF5" },
  { name:"Prof. Aisha Patel", inst:"IIT Bombay", topic:"Neural Compression for Edge AI", align:"Edge device optimization", match:89, color:"#1A56DB", light:"#EEF3FF" },
  { name:"Dr. Luis Santos", inst:"UP Diliman", topic:"Next-Gen Energy Storage Materials", align:"Battery R&D program", match:83, color:"#7C3AED", light:"#F5F3FF" },
];

const JOBS = [
  { title:"Senior AI Research Engineer", dept:"Innovation Lab", applicants:24, matched:8, urgent:true },
  { title:"Materials Science Intern", dept:"R&D Division", applicants:41, matched:12, urgent:false },
  { title:"Data Science Lead", dept:"Product Analytics", applicants:18, matched:5, urgent:true },
  { title:"Quantum Computing Researcher", dept:"Innovation Lab", applicants:9, matched:3, urgent:false },
];

const PROJECTS = [
  { name:"AI Drug Discovery Pipeline", budget:"$2.4M", progress:65, color:"#0E7A4E", researchers:3 },
  { name:"Edge AI Compression", budget:"$800k", progress:40, color:"#1A56DB", researchers:2 },
  { name:"Next-Gen Battery Materials", budget:"$1.2M", progress:15, color:"#7C3AED", researchers:1 },
];

const FUNNEL = [
  { label:"Matched", n:73, color:"#E8E5DF" },
  { label:"Screening", n:18, color:"#7C3AED" },
  { label:"Interview", n:8, color:"#1A56DB" },
  { label:"Offer", n:3, color:"#0E7A4E" },
  { label:"Hired", n:2, color:"#0C444C" },
];

const STAGE_COLORS: Record<string, {bg:string;text:string}> = {
  "Offer Sent": {bg:"#ECFDF5",text:"#0E7A4E"},
  "Interview":  {bg:"#EEF3FF",text:"#1A56DB"},
  "Screening":  {bg:"#F5F3FF",text:"#7C3AED"},
  "Matched":    {bg:"#F3F4F6",text:"#6B7280"},
};

export default function CorporationDashboard() {
  const [tab, setTab] = useState<"talent"|"rd">("talent");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 600); return () => clearTimeout(t); }, []);

  return (
    <DashboardLayout
      role="corporation"
      user={{ name: "Vertex Corp", subtitle: "Enterprise · BioTech + AI" }}
      pageTitle="Innovation & Talent Hub 🏢"
      pageSubtitle="5 new AI-matched candidates · 3 researchers aligned to your R&D problems"
      notifications={5}
      headerActions={<>
        <button className="btn btn-secondary btn-sm">Post Job</button>
        <button className="btn btn-primary btn-sm" style={{background:"#0C444C"}}>Scout Talent</button>
      </>}
    >
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}.df{animation:fadeUp .35s ease both}.tr:hover{background:#FAFAF8!important}
        @media(max-width:1100px){.tc{grid-template-columns:1fr!important}}
        @media(max-width:768px){.fc{grid-template-columns:1fr 1fr!important}.five-col{grid-template-columns:1fr 1fr!important}}
      `}</style>

      {/* KPIs */}
      <div className="five-col df" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:20}}>
        {[
          {label:"Talent Matches",value:"73",note:"↑ 5 new today",color:"#0C444C"},
          {label:"R&D Interests",value:"12",note:"3 high signal",color:"#1A56DB"},
          {label:"Active Job Reqs",value:"4",note:"2 urgent",color:"#B45309"},
          {label:"Hiring Funnel",value:"8",note:"In pipeline",color:"#7C3AED"},
          {label:"Lab Projects",value:"3",note:"$4.4M total",color:"#0E7A4E"},
        ].map((s,i)=>(
          <div key={s.label} className="df" style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"12px 14px",animationDelay:`${i*.04}s`}}>
            <div style={{fontSize:".6rem",fontWeight:500,textTransform:"uppercase",letterSpacing:".06em",color:"#9B9890",marginBottom:5}}>{s.label}</div>
            <div style={{fontSize:"1.6rem",fontWeight:700,fontFamily:"'Bricolage Grotesque',sans-serif",color:s.color,lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:".65rem",color:"#6B6860",marginTop:3,fontWeight:500}}>{s.note}</div>
          </div>
        ))}
      </div>

      <div className="tc" style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:20}}>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>

          {/* Talent / R&D tabs */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,overflow:"hidden"}}>
            <div style={{display:"flex",alignItems:"center",gap:4,padding:"12px 20px",borderBottom:"1px solid #F3F4F6"}}>
              {(["talent","rd"] as const).map(t=>(
                <button key={t} onClick={()=>setTab(t)} style={{fontFamily:"'DM Sans',sans-serif",fontSize:".8rem",fontWeight:500,color:tab===t?"#111110":"#9B9890",background:tab===t?"#F3F4F6":"none",border:"none",cursor:"pointer",padding:"6px 14px",borderRadius:99,transition:"all .12s"}}>
                  {t==="talent" ? "👥 Talent Scouting" : "🔬 R&D Matches"}
                </button>
              ))}
            </div>
            <div style={{padding:"0"}}>
              {tab==="talent" && TALENT.map((t,i)=>(
                <div key={t.name} className="tr" style={{display:"flex",alignItems:"center",gap:14,padding:"13px 20px",borderBottom:i<TALENT.length-1?"1px solid #F9F9F7":"none",cursor:"default",transition:"background .12s"}}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:t.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".65rem",fontWeight:700,color:t.color,flexShrink:0}}>{t.initials}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:".85rem",fontWeight:600,color:"#111110",marginBottom:2}}>{t.name}</div>
                    <div style={{fontSize:".72rem",color:"#9B9890",marginBottom:5}}>{t.role}</div>
                    <div style={{display:"flex",gap:4}}>{t.skills.map(s=><span key={s} style={{fontSize:".6rem",fontWeight:500,background:"#F3F4F6",color:"#6B7280",padding:"2px 7px",borderRadius:4}}>{s}</span>)}</div>
                  </div>
                  <span style={{fontSize:".63rem",fontWeight:600,padding:"3px 9px",borderRadius:99,flexShrink:0,...(STAGE_COLORS[t.stage]||{bg:"#F3F4F6",text:"#6B7280"}),...{background:(STAGE_COLORS[t.stage]||{bg:"#F3F4F6"}).bg,color:(STAGE_COLORS[t.stage]||{text:"#6B7280"}).text}}}>{t.stage}</span>
                  <div style={{textAlign:"center",flexShrink:0,width:48}}>
                    <svg width="38" height="38" viewBox="0 0 38 38"><circle cx="19" cy="19" r="15" fill="none" stroke="#F3F4F6" strokeWidth="2.5"/><circle cx="19" cy="19" r="15" fill="none" stroke={t.color} strokeWidth="2.5" strokeDasharray={`${(t.match/100)*94} 94`} strokeLinecap="round" transform="rotate(-90 19 19)" opacity=".85"/><text x="19" y="23" textAnchor="middle" fontSize="9" fontWeight="600" fill={t.color} fontFamily="'Bricolage Grotesque',sans-serif">{t.match}%</text></svg>
                  </div>
                  <button style={{fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",fontWeight:500,color:"#fff",background:t.color,border:"none",cursor:"pointer",padding:"5px 12px",borderRadius:6,flexShrink:0}}>View</button>
                </div>
              ))}
              {tab==="rd" && RD.map((r,i)=>(
                <div key={r.name} className="tr" style={{display:"flex",alignItems:"flex-start",gap:14,padding:"14px 20px",borderBottom:i<RD.length-1?"1px solid #F9F9F7":"none",cursor:"default",transition:"background .12s"}}>
                  <div style={{width:40,height:40,borderRadius:10,background:r.light,display:"flex",alignItems:"center",justifyContent:"center",fontSize:".72rem",fontWeight:700,color:r.color,flexShrink:0}}>{r.name.split(" ").pop()?.slice(0,2)}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:".85rem",fontWeight:600,color:"#111110",marginBottom:1}}>{r.name}</div>
                    <div style={{fontSize:".68rem",color:"#9B9890",marginBottom:4}}>{r.inst}</div>
                    <div style={{fontSize:".75rem",color:"#6B6860",fontStyle:"italic",marginBottom:3}}>"{r.topic}"</div>
                    <div style={{fontSize:".7rem",fontWeight:500,color:r.color}}>→ {r.align}</div>
                  </div>
                  <div style={{textAlign:"center",flexShrink:0,width:48}}>
                    <div style={{fontSize:".95rem",fontWeight:700,color:r.color,fontFamily:"'Bricolage Grotesque',sans-serif"}}>{r.match}%</div>
                    <div style={{fontSize:".58rem",color:"#9B9890"}}>align</div>
                  </div>
                  <button style={{fontFamily:"'DM Sans',sans-serif",fontSize:".72rem",fontWeight:500,color:"#fff",background:r.color,border:"none",cursor:"pointer",padding:"5px 12px",borderRadius:6,flexShrink:0,alignSelf:"center"}}>Request</button>
                </div>
              ))}
            </div>
          </div>

          {/* Hiring funnel visual */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"16px 20px"}}>
            <span style={{fontSize:".9rem",fontWeight:700,color:"#111110",display:"block",marginBottom:14}}>Hiring Funnel</span>
            <div style={{display:"flex",gap:1,height:8,borderRadius:99,overflow:"hidden",marginBottom:10}}>
              {FUNNEL.map(f=><div key={f.label} style={{flex:f.n,background:f.color}}/>)}
            </div>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              {FUNNEL.map(f=>(
                <div key={f.label} style={{display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:f.color}}/>
                  <span style={{fontSize:".7rem",color:"#6B6860"}}>{f.label}</span>
                  <span style={{fontSize:".75rem",fontWeight:700,color:"#111110"}}>{f.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Job reqs */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"16px 20px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <span style={{fontSize:".85rem",fontWeight:700,color:"#111110"}}>Job Requisitions</span>
              <button style={{fontFamily:"'DM Sans',sans-serif",fontSize:".7rem",fontWeight:500,color:"#fff",background:"#0C444C",border:"none",cursor:"pointer",padding:"4px 10px",borderRadius:6}}>+ New</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {JOBS.map(j=>(
                <div key={j.title} style={{padding:"10px 12px",background:"#FAFAF8",border:"1px solid #F3F4F6",borderRadius:9}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:4,marginBottom:3}}>
                    <span style={{fontSize:".78rem",fontWeight:600,color:"#111110",lineHeight:1.3,flex:1}}>{j.title}</span>
                    {j.urgent && <span style={{fontSize:".6rem",fontWeight:600,background:"#FEF2F2",color:"#DC2626",padding:"2px 6px",borderRadius:99,flexShrink:0}}>Urgent</span>}
                  </div>
                  <div style={{fontSize:".68rem",color:"#9B9890",marginBottom:5}}>{j.dept}</div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:".67rem"}}>
                    <span style={{color:"#6B6860"}}>{j.applicants} applicants</span>
                    <span style={{fontWeight:600,color:"#0C444C"}}>{j.matched} AI-matched</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Innovation lab */}
          <div style={{background:"#fff",border:"1px solid #E8E5DF",borderRadius:14,padding:"16px 20px"}}>
            <span style={{fontSize:".85rem",fontWeight:700,color:"#111110",display:"block",marginBottom:14}}>Innovation Lab Projects</span>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {PROJECTS.map(p=>(
                <div key={p.name}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:".78rem",fontWeight:600,color:"#111110"}}>{p.name}</span>
                    <span style={{fontSize:".68rem",fontWeight:600,color:p.color}}>{p.budget}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                    <div style={{flex:1,height:4,background:"#F3F4F6",borderRadius:99,overflow:"hidden"}}>
                      <div style={{height:"100%",width:loaded?`${p.progress}%`:"0%",background:p.color,borderRadius:99,transition:"width .8s ease"}}/>
                    </div>
                    <span style={{fontSize:".65rem",fontWeight:600,color:p.color}}>{p.progress}%</span>
                  </div>
                  <div style={{fontSize:".65rem",color:"#9B9890"}}>{p.researchers} researcher{p.researchers>1?"s":""} linked</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI insight */}
          <div style={{background:"#0C444C",borderRadius:14,padding:"16px 20px"}}>
            <div style={{fontSize:".65rem",fontWeight:600,textTransform:"uppercase",letterSpacing:".08em",color:"rgba(255,255,255,.4)",marginBottom:6}}>💡 AI Scout Insight</div>
            <div style={{fontSize:".8rem",color:"rgba(255,255,255,.85)",lineHeight:1.6,marginBottom:12,fontWeight:300}}>Dr. Chen Wei (MIT) has 3 publications aligned to your drug discovery pipeline. 2 competitors have already reached out.</div>
            <button style={{width:"100%",background:"rgba(255,255,255,.12)",color:"#fff",border:"1px solid rgba(255,255,255,.2)",borderRadius:8,padding:"8px",fontSize:".78rem",fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Connect with Dr. Chen Wei →</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}