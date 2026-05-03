"use client";

import { useMemo, useState } from "react";

const USER_ROLES = [
  { id: "student", icon: "🎓", label: "Student", color: "#1A56DB", light: "#EEF3FF" },
  { id: "founder", icon: "🚀", label: "Founder", color: "#7C3AED", light: "#F5F3FF" },
  { id: "researcher", icon: "🔬", label: "Researcher", color: "#0E7A4E", light: "#ECFDF5" },
  { id: "investor", icon: "💼", label: "Investor", color: "#B45309", light: "#FFFBEB" },
  { id: "corporation", icon: "🏢", label: "Corporation", color: "#0C444C", light: "#F0FAFB" },
  { id: "government", icon: "🏛️", label: "Government", color: "#374151", light: "#F9FAFB" },
] as const;

const ROLE_INTERESTS: Record<string, string[]> = {
  student: ["Internships", "Competitions", "Scholarships", "Mentorship", "Startup jobs", "AI projects"],
  founder: ["Seed funding", "Angels/VCs", "Hiring talent", "Pilot customers", "Grant support", "Partnerships"],
  researcher: ["IP licensing", "Research grants", "Industry partnerships", "Publication visibility", "Lab talent", "Commercialization"],
  investor: ["AI startups", "BioTech", "CleanTech", "DeepTech", "Pre-seed", "Seed stage"],
  corporation: ["University talent", "R&D scouting", "Joint research", "Hiring pipelines", "Innovation partnerships", "IP acquisition"],
  government: ["Grant programs", "University ecosystem", "Regional growth", "Startup analytics", "Policy alignment", "Public-private partnerships"],
};

type Step = "role" | "interests" | "account";

export default function SignupPage() {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedRole = USER_ROLES.find((r) => r.id === role);
  const roleInterests = useMemo(() => (role ? ROLE_INTERESTS[role] ?? [] : []), [role]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please complete all account fields.");
      return;
    }
    if (!role) {
      setError("Please select a role.");
      return;
    }
    if (interests.length < 2) {
      setError("Please select at least 2 interests.");
      return;
    }

    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    document.cookie = `meritos_token=signup-token-123; path=/; max-age=3600`;
    document.cookie = `meritos_role=${role}; path=/; max-age=3600`;
    document.cookie = `meritos_interests=${encodeURIComponent(interests.join("|"))}; path=/; max-age=3600`;
    document.cookie = `meritos_name=${encodeURIComponent(name)}; path=/; max-age=3600`;
    window.location.href = `/dash/${role}`;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{--bg:#FAFAF8;--surface:#fff;--border:#E8E5DF;--t1:#111110;--t2:#6B6860;--t3:#9B9890;--accent:#1A56DB;}
        body{font-family:'DM Sans',sans-serif;background:var(--bg);}
        h1,h2,h3{font-family:'Bricolage Grotesque',sans-serif;letter-spacing:-0.02em;}
        .page{min-height:100vh;display:grid;place-items:center;padding:1.5rem;}
        .card{width:100%;max-width:760px;background:#fff;border:1px solid var(--border);border-radius:16px;padding:1.5rem;}
        .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;}
        .steps{display:flex;gap:6px;align-items:center;}
        .pip{width:28px;height:4px;border-radius:100px;background:var(--border);}
        .pip.on{background:var(--accent);}
        .title{font-size:1.6rem;color:var(--t1);margin-bottom:.4rem;}
        .sub{font-size:.9rem;color:var(--t2);margin-bottom:1.25rem;}
        .grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.6rem;}
        .role{border:1.5px solid var(--border);border-radius:11px;padding:.85rem;cursor:pointer;background:#fff;text-align:left;}
        .role.on{border-width:2px;}
        .role-label{font-size:.86rem;font-weight:600;color:var(--t1);}
        .role-icon{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;margin-bottom:.5rem;}
        .chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:.75rem;}
        .chip{border:1px solid var(--border);background:#fff;color:var(--t2);border-radius:100px;padding:.42rem .75rem;font-size:.8rem;cursor:pointer;}
        .chip.on{color:#fff;border-color:transparent;}
        .field{margin-bottom:.9rem;}
        .label{display:block;font-size:.78rem;font-weight:500;color:var(--t1);margin-bottom:.38rem;}
        .input{width:100%;border:1.5px solid var(--border);border-radius:10px;padding:.72rem .9rem;font-size:.93rem;}
        .input:focus{outline:none;border-color:#c6c2bb;}
        .actions{display:flex;gap:.6rem;margin-top:1rem;}
        .btn{border:none;border-radius:9px;padding:.62rem 1rem;font-size:.9rem;font-weight:500;cursor:pointer;}
        .btn-secondary{background:#fff;color:var(--t2);border:1px solid var(--border);}
        .btn-primary{background:var(--accent);color:#fff;}
        .btn:disabled{opacity:.65;cursor:not-allowed;}
        .err{background:#FEF2F2;border:1px solid #FECACA;color:#DC2626;border-radius:9px;padding:.65rem .8rem;font-size:.82rem;margin-bottom:.8rem;}
        @media(max-width:700px){.grid{grid-template-columns:1fr 1fr;}}
        @media(max-width:480px){.grid{grid-template-columns:1fr;}}
      `}</style>

      <div className="page">
        <div className="card">
          <div className="top">
            <a href="/" style={{ color: "#6B6860", textDecoration: "none", fontSize: ".84rem" }}>← Home</a>
            <div className="steps">
              <div className={`pip ${step === "role" || step === "interests" || step === "account" ? "on" : ""}`} />
              <div className={`pip ${step === "interests" || step === "account" ? "on" : ""}`} />
              <div className={`pip ${step === "account" ? "on" : ""}`} />
            </div>
          </div>

          {step === "role" && (
            <>
              <h1 className="title">Create your account</h1>
              <p className="sub">Step 1 of 3 — choose your primary role in the Meritos ecosystem.</p>
              {error && <div className="err">{error}</div>}
              <div className="grid">
                {USER_ROLES.map((r) => (
                  <button
                    key={r.id}
                    className={`role${role === r.id ? " on" : ""}`}
                    style={role === r.id ? { borderColor: r.color, boxShadow: `0 0 0 3px ${r.color}22` } : {}}
                    onClick={() => {
                      setRole(r.id);
                      setInterests([]);
                      setError("");
                    }}
                  >
                    <div className="role-icon" style={{ background: r.light }}>{r.icon}</div>
                    <div className="role-label">{r.label}</div>
                  </button>
                ))}
              </div>
              <div className="actions">
                <button
                  className="btn btn-primary"
                  style={{ background: selectedRole?.color ?? "#1A56DB" }}
                  onClick={() => {
                    if (!role) return setError("Please select a role to continue.");
                    setError("");
                    setStep("interests");
                  }}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === "interests" && (
            <>
              <h1 className="title">Select your interests</h1>
              <p className="sub">Step 2 of 3 — pick at least 2 interests to personalize your dashboard matches.</p>
              {error && <div className="err">{error}</div>}
              <div className="chips">
                {roleInterests.map((interest) => (
                  <button
                    key={interest}
                    className={`chip${interests.includes(interest) ? " on" : ""}`}
                    style={interests.includes(interest) ? { background: selectedRole?.color ?? "#1A56DB" } : {}}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: ".78rem", color: "#9B9890" }}>{interests.length} selected</p>
              <div className="actions">
                <button className="btn btn-secondary" onClick={() => setStep("role")}>Back</button>
                <button
                  className="btn btn-primary"
                  style={{ background: selectedRole?.color ?? "#1A56DB" }}
                  onClick={() => {
                    if (interests.length < 2) return setError("Choose at least 2 interests.");
                    setError("");
                    setStep("account");
                  }}
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === "account" && (
            <form onSubmit={handleCreateAccount} noValidate>
              <h1 className="title">Account details</h1>
              <p className="sub">Step 3 of 3 — finish creating your {selectedRole?.label} account.</p>
              {error && <div className="err">{error}</div>}
              <div className="field">
                <label className="label" htmlFor="name">Full name</label>
                <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
              </div>
              <div className="field">
                <label className="label" htmlFor="email">Email</label>
                <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="field">
                <label className="label" htmlFor="password">Password</label>
                <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" />
              </div>
              <div className="actions">
                <button type="button" className="btn btn-secondary" onClick={() => setStep("interests")}>Back</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: selectedRole?.color ?? "#1A56DB" }}
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
