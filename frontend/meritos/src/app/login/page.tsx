"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your credentials.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate API Auth Call (1.5s delay for "Production" feel)
    await new Promise((r) => setTimeout(r, 1500));

    // DEMO LOGIC
    const isDemo = email === "admin@meritos.com" && password === "password123";

    if (isDemo) {
      // In production, the role would come from your database
      const detectedRole = "student"; 
      
      // Set cookies for Middleware
      document.cookie = `meritos_token=demo-token-123; path=/; max-age=3600; SameSite=Lax`;
      document.cookie = `meritos_role=${detectedRole}; path=/; max-age=3600; SameSite=Lax`;

      // Redirect
      window.location.href = `/dash/${detectedRole}`;
    } else {
      setLoading(false);
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=DM+Sans:wght@300;400;500&display=swap');
        
        :root {
          --bg: #FAFAF8; --surface: #ffffff; --border: #E8E5DF;
          --t1: #111110; --t2: #6B6860; --t3: #9B9890;
          --accent: #1A56DB; --accent-dk: #1344B8;
          --err: #DC2626; --err-lt: #FEF2F2;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--t1); }
        h1 { font-family: 'Bricolage Grotesque', sans-serif; letter-spacing: -0.02em; }

        .page { display: grid; grid-template-columns: 1.1fr 0.9fr; min-height: 100vh; }

        /* Left Branding Panel */
        .left { background: var(--t1); padding: 4rem; display: flex; flex-direction: column; justify-content: space-between; }
        .logo-area { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo-mark { width: 32px; height: 32px; background: var(--accent); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .logo-text { font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.5rem; color: #fff; font-weight: 700; }
        
        .left-content { max-width: 480px; }
        .left-headline { font-size: 3.2rem; color: #fff; line-height: 1.1; margin-bottom: 1.5rem; }
        .left-headline em { font-style: normal; color: var(--accent); }
        .left-text { color: rgba(255,255,255,0.5); line-height: 1.6; font-size: 1.1rem; font-weight: 300; }

        /* Right Form Panel */
        .right { display: flex; align-items: center; justify-content: center; padding: 2rem; background: var(--surface); }
        .form-container { width: 100%; max-width: 400px; }
        .form-header { margin-bottom: 2.5rem; }
        .form-title { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--t1); }
        .form-subtitle { color: var(--t2); font-size: 0.95rem; }

        /* Fields & Inputs */
        .field { margin-bottom: 1.5rem; }
        .label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.6rem; color: var(--t1); }
        .input-wrap { position: relative; }
        .input { width: 100%; padding: 0.85rem 1rem; border: 1.5px solid var(--border); border-radius: 10px; font-family: inherit; font-size: 1rem; transition: all 0.2s; background: #fff; }
        .input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 4px rgba(26,86,219,0.1); }
        
        .eye-btn { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: #F4F4F5; border: none; padding: 4px 8px; border-radius: 5px; cursor: pointer; color: var(--t2); font-size: 0.75rem; font-weight: 600; }

        .forgot-link { font-size: 0.8rem; color: var(--accent); text-decoration: none; font-weight: 500; }
        .forgot-link:hover { text-decoration: underline; }

        /* Action Buttons */
        .submit-btn { width: 100%; padding: 1rem; background: var(--t1); color: #fff; border: none; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 1rem; }
        .submit-btn:hover { background: #000; transform: translateY(-1px); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .sso-btn { width: 100%; padding: 0.85rem; background: #fff; border: 1.5px solid var(--border); border-radius: 10px; font-family: inherit; font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: all 0.2s; margin-top: 1rem; }
        .sso-btn:hover { background: var(--bg); border-color: #d1cfc9; }

        .divider { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0; color: var(--t3); font-size: 0.75rem; font-weight: 500; }
        .line { flex: 1; height: 1px; background: var(--border); }

        .error-box { background: var(--err-lt); color: var(--err); padding: 0.8rem 1rem; border-radius: 10px; border: 1px solid #FECACA; font-size: 0.85rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; }

        .footer-text { margin-top: 2rem; text-align: center; font-size: 0.9rem; color: var(--t2); }
        .footer-text a { color: var(--accent); text-decoration: none; font-weight: 600; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }

        @media (max-width: 900px) {
          .page { grid-template-columns: 1fr; }
          .left { display: none; }
        }
      `}</style>

      <div className="page">
        <aside className="left">
          <div className="logo-area">
            <div className="logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="logo-text">Meritos</span>
          </div>

          <div className="left-content">
            <h1 className="left-headline">The <em>Operating System</em> for Innovation.</h1>
            <p className="left-text">Connect with verified founders, researchers, and investors in a single, high-signal ecosystem.</p>
          </div>

          <div className="left-footer">
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
              © {new Date().getFullYear()} Meritos Labs. Secure by design.
            </p>
          </div>
        </aside>

        <main className="right">
          <div className="form-container">
            <header className="form-header">
              <h1 className="form-title">Welcome back</h1>
              <p className="form-subtitle">Enter your details to access your workspace.</p>
            </header>

            {error && (
              <div className="error-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Work Email</label>
                <input 
                  type="email" 
                  className="input" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <label className="label" style={{ marginBottom: 0 }}>Password</label>
                  <a href="/forgot" className="forgot-link">Forgot password?</a>
                </div>
                <div className="input-wrap">
                  <input 
                    type={showPass ? "text" : "password"} 
                    className="input" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <div className="spinner" /> : "Sign in to Dashboard"}
              </button>
            </form>

            <div className="divider">
              <div className="line" />
              <span>OR</span>
              <div className="line" />
            </div>

            <button type="button" className="sso-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="footer-text">
              Don&apos;t have an account? <a href="/signup">Create one for free</a>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}