"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

const USER_ROLES = [
  { id: "student",     icon: "🎓", label: "Student",         color: "#1A56DB", light: "#EEF3FF" },
  { id: "founder",     icon: "🚀", label: "Founder",         color: "#7C3AED", light: "#F5F3FF" },
  { id: "researcher",  icon: "🔬", label: "Researcher",      color: "#0E7A4E", light: "#ECFDF5" },
  { id: "investor",    icon: "💼", label: "Investor",        color: "#B45309", light: "#FFFBEB" },
  { id: "corporation", icon: "🏢", label: "Corporation",     color: "#0C444C", light: "#F0FAFB" },
  { id: "government",  icon: "🏛️", label: "Government",      color: "#374151", light: "#F9FAFB" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [role, setRole]           = useState<string | null>(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [step, setStep]           = useState<"role" | "credentials">("role");

  const selected = USER_ROLES.find((r) => r.id === role);

  function handleRoleSelect(id: string) {
    setRole(id);
    setError("");
  }

  function handleNext() {
    if (!role) { setError("Please select your role to continue."); return; }
    setError("");
    setStep("credentials");
  }
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }
  
  setError("");
  setLoading(true);

  // Simulate API delay
  await new Promise((r) => setTimeout(r, 1400));
  
  setLoading(false);

 // 3. Logic to connect to your specific directory
    if (role === "student") {
      router.push("/dash/student"); // Redirects to src/app/dash/student/page.tsx
    } else {
      // Fallback for other roles during demo
      setError(`Demo: Redirection for ${role} is ready. Path: /dash/${role}`);
      // router.push(`/dash/${role}`); 
    }
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --bg:#FAFAF8;--surface:#fff;--border:#E8E5DF;
          --t1:#111110;--t2:#6B6860;--t3:#9B9890;
          --accent:#1A56DB;--accent-lt:#EEF3FF;--accent-dk:#1344B8;
          --err:#DC2626;--err-lt:#FEF2F2;
        }
        html,body{height:100%;}
        body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--t1);-webkit-font-smoothing:antialiased;}
        h1,h2,h3,h4{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em;}

        /* LAYOUT */
        .page{display:grid;grid-template-columns:1fr 1fr;min-height:100vh;}

        /* LEFT PANEL */
        .left{background:var(--t1);display:flex;flex-direction:column;justify-content:space-between;padding:3rem;}
        .left-logo{display:flex;align-items:center;gap:9px;text-decoration:none;}
        .logo-mark{width:30px;height:30px;background:var(--accent);border-radius:8px;display:flex;align-items:center;justify-content:center;}
        .logo-mark svg{width:16px;height:16px;}
        .logo-text{font-family:'Bricolage Grotesque',sans-serif;font-size:1.35rem;font-weight:700;color:#fff;}
        .left-body{flex:1;display:flex;flex-direction:column;justify-content:center;padding:2rem 0;}
        .left-eyebrow{font-size:.72rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.35);margin-bottom:1rem;}
        .left-headline{font-size:clamp(1.75rem,3vw,2.5rem);font-weight:700;color:#fff;line-height:1.15;margin-bottom:1.25rem;}
        .left-headline em{font-style:normal;color:var(--accent);}
        .left-body-text{font-size:.9375rem;color:rgba(255,255,255,.5);line-height:1.7;font-weight:300;max-width:380px;margin-bottom:2.5rem;}
        .ecosystem-cards{display:flex;flex-direction:column;gap:.625rem;}
        .eco-card{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:.75rem 1rem;}
        .eco-icon{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
        .eco-label{font-size:.8rem;font-weight:500;color:rgba(255,255,255,.8);}
        .eco-sub{font-size:.68rem;color:rgba(255,255,255,.35);font-weight:300;}
        .left-footer-text{font-size:.75rem;color:rgba(255,255,255,.25);line-height:1.6;}

        /* RIGHT PANEL */
        .right{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 2rem;}
        .right-inner{width:100%;max-width:440px;}
        .right-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:2.5rem;}
        .back-btn{display:flex;align-items:center;gap:6px;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.825rem;font-weight:500;color:var(--t2);padding:.375rem .75rem;border-radius:7px;transition:color .15s,background .15s;}
        .back-btn:hover{color:var(--t1);background:var(--border);}
        .signup-link{font-size:.825rem;color:var(--t2);}
        .signup-link a{color:var(--accent);text-decoration:none;font-weight:500;}
        .signup-link a:hover{text-decoration:underline;}
        .form-title{font-size:1.625rem;font-weight:700;color:var(--t1);margin-bottom:.375rem;}
        .form-subtitle{font-size:.9rem;color:var(--t2);font-weight:300;margin-bottom:2rem;line-height:1.5;}

        /* STEP INDICATOR */
        .steps-indicator{display:flex;align-items:center;gap:8px;margin-bottom:2rem;}
        .step-pip{width:28px;height:4px;border-radius:100px;transition:background .3s;}
        .step-pip.done{background:var(--accent);}
        .step-pip.pending{background:var(--border);}
        .step-text{font-size:.72rem;color:var(--t3);font-weight:500;margin-left:4px;}

        /* ROLE GRID */
        .role-grid{display:grid;grid-template-columns:1fr 1fr;gap:.625rem;margin-bottom:1.5rem;}
        .role-card{display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid var(--border);border-radius:11px;padding:.875rem 1rem;cursor:pointer;transition:all .18s;text-align:left;}
        .role-card:hover{border-color:#c0bcb5;box-shadow:0 2px 12px rgba(0,0,0,.06);}
        .role-card.selected{border-width:2px;}
        .role-card-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;transition:background .18s;}
        .role-card-label{font-size:.85rem;font-weight:600;color:var(--t1);}
        .role-card-check{width:16px;height:16px;border-radius:50%;border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;margin-left:auto;transition:all .18s;flex-shrink:0;}
        .role-card-check.checked{border-color:transparent;}
        .role-card-check.checked svg{display:block;}
        .role-card-check svg{display:none;width:9px;height:9px;}

        /* FORM */
        .field{margin-bottom:1.25rem;}
        .field-label{display:block;font-size:.8rem;font-weight:500;color:var(--t1);margin-bottom:.5rem;}
        .field-label span{color:var(--err);}
        .input-wrap{position:relative;}
        .input{width:100%;font-family:'DM Sans',sans-serif;font-size:.9375rem;color:var(--t1);background:#fff;border:1.5px solid var(--border);border-radius:10px;padding:.75rem 1rem;outline:none;transition:border-color .15s,box-shadow .15s;appearance:none;}
        .input::placeholder{color:var(--t3);}
        .input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(26,86,219,.12);}
        .input.has-icon{padding-right:2.75rem;}
        .input-icon-btn{position:absolute;right:.75rem;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--t3);display:flex;align-items:center;transition:color .15s;padding:4px;}
        .input-icon-btn:hover{color:var(--t2);}
        .forgot{display:block;text-align:right;font-size:.78rem;color:var(--accent);text-decoration:none;margin-top:.4rem;font-weight:500;}
        .forgot:hover{text-decoration:underline;}

        /* SELECTED ROLE CHIP */
        .role-chip{display:inline-flex;align-items:center;gap:7px;border-radius:100px;padding:5px 12px 5px 8px;margin-bottom:1.5rem;font-size:.8rem;font-weight:600;}
        .role-chip-icon{font-size:14px;}
        .role-chip-change{background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.75rem;font-weight:500;color:var(--t2);padding:2px 6px;border-radius:5px;transition:background .15s,color .15s;margin-left:4px;}
        .role-chip-change:hover{background:rgba(0,0,0,.06);color:var(--t1);}

        /* ERROR */
        .error-box{background:var(--err-lt);border:1px solid #FECACA;border-radius:9px;padding:.75rem 1rem;font-size:.825rem;color:var(--err);margin-bottom:1.25rem;display:flex;align-items:center;gap:8px;}
        .error-box svg{flex-shrink:0;}

        /* BTN */
        .submit-btn{width:100%;font-family:'DM Sans',sans-serif;font-size:1rem;font-weight:500;color:#fff;background:var(--accent);border:none;border-radius:10px;padding:.875rem;cursor:pointer;transition:background .15s,transform .1s,opacity .15s;display:flex;align-items:center;justify-content:center;gap:8px;}
        .submit-btn:hover:not(:disabled){background:var(--accent-dk);}
        .submit-btn:active:not(:disabled){transform:scale(.98);}
        .submit-btn:disabled{opacity:.65;cursor:not-allowed;}

        /* DIVIDER */
        .divider{display:flex;align-items:center;gap:.875rem;margin:1.5rem 0;}
        .divider-line{flex:1;height:1px;background:var(--border);}
        .divider-text{font-size:.75rem;color:var(--t3);white-space:nowrap;}

        /* SSO */
        .sso-btn{width:100%;font-family:'DM Sans',sans-serif;font-size:.875rem;font-weight:500;color:var(--t1);background:#fff;border:1.5px solid var(--border);border-radius:10px;padding:.75rem;cursor:pointer;transition:border-color .15s,box-shadow .15s;display:flex;align-items:center;justify-content:center;gap:10px;}
        .sso-btn:hover{border-color:#c0bcb5;box-shadow:0 2px 8px rgba(0,0,0,.05);}
        .sso-logo{width:18px;height:18px;}

        /* SPINNER */
        @keyframes spin{to{transform:rotate(360deg)}}
        .spinner{width:18px;height:18px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;}

        /* FOOTER */
        .right-footer{margin-top:2.5rem;text-align:center;font-size:.75rem;color:var(--t3);line-height:1.6;}
        .right-footer a{color:var(--t3);text-decoration:none;transition:color .15s;}
        .right-footer a:hover{color:var(--t2);}

        @media(max-width:900px){
          .page{grid-template-columns:1fr;}
          .left{display:none;}
          .right{min-height:100vh;padding:2rem 1.25rem;}
          .right-inner{max-width:100%;}
        }
        @media(max-width:480px){
          .role-grid{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="page">
        {/* ── LEFT PANEL ── */}
        <aside className="left">
          <a href="/" className="left-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M2 9l3.5 3.5L14 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">Meritos</span>
          </a>

          <div className="left-body">
            <div className="left-eyebrow">Ecosystem-as-a-Service</div>
            <h1 className="left-headline">
              One platform.<br/>
              <em>Six types</em> of opportunity.
            </h1>
            <p className="left-body-text">
              Meritos connects innovators with those who fund, hire, and commercialize them — powered by AI matching that cuts through the noise.
            </p>
            <div className="ecosystem-cards">
              {USER_ROLES.map((r) => (
                <div key={r.id} className="eco-card">
                  <div className="eco-icon" style={{ background: r.light }}>{r.icon}</div>
                  <div>
                    <div className="eco-label">{r.label}</div>
                    <div className="eco-sub">
                      {r.id === "student"     && "Emerging talent seeking opportunity"}
                      {r.id === "founder"     && "Startups seeking investors & partners"}
                      {r.id === "researcher"  && "Academics commercializing breakthroughs"}
                      {r.id === "investor"    && "VCs accessing AI-curated deal flow"}
                      {r.id === "corporation" && "Enterprise scouting talent & R&D"}
                      {r.id === "government"  && "Public sector driving national innovation"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="left-footer-text">
            © {new Date().getFullYear()} Meritos · Ecosystem-as-a-Service<br/>
            GDPR & CCPA compliant · Secure by design
          </p>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <main className="right">
          <div className="right-inner">
            <div className="right-top">
              {step === "credentials" ? (
                <button className="back-btn" onClick={() => { setStep("role"); setError(""); }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M13 8H3M3 8l4-4M3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back
                </button>
              ) : (
                <a href="/" className="back-btn" style={{ textDecoration: "none" }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M13 8H3M3 8l4-4M3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Home
                </a>
              )}
              <p className="signup-link">
                No account? <a href="/signup">Sign up free</a>
              </p>
            </div>

            {/* Step indicator */}
            <div className="steps-indicator">
              <div className="step-pip done"/>
              <div className={`step-pip ${step === "credentials" ? "done" : "pending"}`}/>
              <span className="step-text">Step {step === "role" ? "1" : "2"} of 2</span>
            </div>

            {step === "role" ? (
              <>
                <h1 className="form-title">Welcome back</h1>
                <p className="form-subtitle">Select your role to continue to your dashboard.</p>

                {error && (
                  <div className="error-box">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {error}
                  </div>
                )}

                <div className="role-grid">
                  {USER_ROLES.map((r) => (
                    <button
                      key={r.id}
                      className={`role-card${role === r.id ? " selected" : ""}`}
                      style={role === r.id ? { borderColor: r.color, boxShadow: `0 0 0 3px ${r.color}22` } : {}}
                      onClick={() => handleRoleSelect(r.id)}
                    >
                      <div className="role-card-icon" style={{ background: role === r.id ? r.light : "var(--bg)" }}>
                        {r.icon}
                      </div>
                      <span className="role-card-label">{r.label}</span>
                      <div className={`role-card-check${role === r.id ? " checked" : ""}`}
                        style={role === r.id ? { background: r.color } : {}}>
                        <svg viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  className="submit-btn"
                  style={selected ? { background: selected.color } : {}}
                  onClick={handleNext}
                >
                  Continue
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h1 className="form-title">Sign in</h1>
                <p className="form-subtitle">Enter your credentials to access your {selected?.label} dashboard.</p>

                {/* Selected role chip */}
                {selected && (
                  <div className="role-chip" style={{ background: selected.light, color: selected.color }}>
                    <span className="role-chip-icon">{selected.icon}</span>
                    {selected.label}
                    <button type="button" className="role-chip-change" onClick={() => { setStep("role"); setError(""); }}>
                      Change
                    </button>
                  </div>
                )}

                {error && (
                  <div className="error-box">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    {error}
                  </div>
                )}

                <div className="field">
                  <label className="field-label" htmlFor="email">
                    Email address <span>*</span>
                  </label>
                  <div className="input-wrap">
                    <input
                      id="email"
                      type="email"
                      className="input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="password">
                    Password <span>*</span>
                  </label>
                  <div className="input-wrap">
                    <input
                      id="password"
                      type={showPass ? "text" : "password"}
                      className="input has-icon"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button type="button" className="input-icon-btn" onClick={() => setShowPass(!showPass)} aria-label="Toggle password">
                      {showPass ? (
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <a href="/forgot-password" className="forgot">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                  style={selected && !loading ? { background: selected.color } : {}}
                >
                  {loading ? (
                    <><div className="spinner"/> Signing in…</>
                  ) : (
                    <>Sign in to Meritos →</>
                  )}
                </button>

                <div className="divider">
                  <div className="divider-line"/>
                  <span className="divider-text">or continue with</span>
                  <div className="divider-line"/>
                </div>

                <button type="button" className="sso-btn">
                  <svg className="sso-logo" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}

            <p className="right-footer">
              By continuing, you agree to Meritos'{" "}
              <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.<br/>
              Protected by GDPR &amp; CCPA compliance.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}