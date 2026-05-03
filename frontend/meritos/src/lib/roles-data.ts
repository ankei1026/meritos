import { RoleData, RoleKey } from "./types";

const roles: Record<RoleKey, RoleData> = {
  student: {
    icon: "fa-graduation-cap",
    label: "Student",
    initial: "M",
    title: "The Talent Launchpad",
    greeting: "Welcome back, Maria",
    subtitle: "Your bridge from academic research to real-world opportunity",
    action: "Submit Thesis Update",
    actionIcon: "fa-paper-plane",
    nav: ["Overview", "Thesis", "Skills", "Opportunities", "AI Mentor"],
    cards: [
      {
        id: "thesis-progress", title: "Thesis Progress Tracker", icon: "fa-route", span: 3, type: "progress",
        data: { current: 3, steps: ["Proposal Approved", "Literature Review", "Data Collection", "Model Development", "Testing & Validation", "Defense"] },
      },
      {
        id: "skill-badges", title: "Skill Badge Repository", icon: "fa-award", span: 2, type: "badges", badge: "AI Verified",
        data: [
          { name: "Python", icon: "fa-brands fa-python", color: "var(--info)", level: "Advanced" },
          { name: "Machine Learning", icon: "fa-brain", color: "var(--accent)", level: "Advanced" },
          { name: "TensorFlow", icon: "fa-fire", color: "var(--danger)", level: "Intermediate" },
          { name: "Data Analysis", icon: "fa-chart-bar", color: "var(--success)", level: "Advanced" },
          { name: "Research Methods", icon: "fa-flask", color: "var(--info)", level: "Advanced" },
          { name: "Statistical Modeling", icon: "fa-square-root-variable", color: "var(--warning)", level: "Intermediate" },
          { name: "Agricultural Tech", icon: "fa-seedling", color: "var(--success)", level: "Intermediate" },
          { name: "Git & Version Control", icon: "fa-brands fa-git-alt", color: "var(--danger)", level: "Advanced" },
        ],
      },
      {
        id: "quick-stats", title: "Profile Metrics", icon: "fa-chart-simple", span: 1, type: "stats",
        data: [
          { val: 12, label: "Badge Count", trend: "+3 this month", dir: "up" },
          { val: 87, label: "Profile Score", trend: "+5 pts", dir: "up" },
          { val: 4, label: "Applications", trend: "2 pending", dir: "up" },
          { val: "3.8", label: "GPA", trend: "", dir: "" },
        ],
      },
      {
        id: "opportunity-feed", title: "Opportunity Feed", icon: "fa-bolt", span: 2, type: "feed", badge: "5 New",
        data: [
          { tag: "Internship", tagColor: "var(--info)", title: "AgriTech ML Intern — CropSense", desc: "Build predictive models for crop yield optimization using satellite imagery data.", time: "2h ago", btn: "Apply" },
          { tag: "Co-Founder", tagColor: "var(--accent)", title: "Startup Team Finder — AquaVerify", desc: "Water quality monitoring startup seeking an ML engineer co-founder for sensor data pipeline.", time: "5h ago", btn: "Express Interest" },
          { tag: "Research Grant", tagColor: "var(--success)", title: "DOST PCIEERD Thesis Grant", desc: "Funding support for agricultural technology research with commercialization potential.", time: "1d ago", btn: "View Details" },
          { tag: "Hackathon", tagColor: "var(--warning)", title: "Smart Agriculture Hack 2025", desc: "48-hour hackathon building solutions for Philippine farming challenges. Cash prizes up to ₱200K.", time: "2d ago", btn: "Register" },
        ],
      },
      {
        id: "ai-mentor", title: "AI Mentor Chat", icon: "fa-robot", span: 1, type: "chat",
        data: {
          messages: [
            { role: "ai", text: "Hi Maria! I see you're on the Model Development phase of your thesis. How can I help today?" },
            { role: "user", text: "I'm getting low accuracy with my Random Forest model on the crop yield dataset." },
            { role: "ai", text: "A few things to check: 1) Try feature engineering with NDVI indices, 2) Consider gradient boosting (XGBoost) for better performance, 3) Ensure your train/test split accounts for seasonal variation. Want me to generate sample code?" },
          ],
        },
      },
    ],
    alerts: [
      { type: "success", icon: "fa-circle-check", text: 'Thesis milestone "Data Collection" approved by advisor', time: "12m ago", isNew: true },
      { type: "info", icon: "fa-eye", text: "CropSense viewed your profile and skill badges", time: "1h ago", isNew: true },
      { type: "accent", icon: "fa-trophy", text: 'New badge unlocked: "TensorFlow Practitioner"', time: "3h ago", isNew: false },
      { type: "info", icon: "fa-envelope", text: "AquaVerify sent a co-founder inquiry", time: "5h ago", isNew: false },
      { type: "warning", icon: "fa-clock", text: "DOST grant deadline in 14 days", time: "1d ago", isNew: false },
    ],
  },

  founder: {
    icon: "fa-rocket", label: "Founder", initial: "C", title: "The Growth Engine",
    greeting: "Good morning, Carlo", subtitle: "Secure funding, build your team, track your startup readiness",
    action: "Update Pitch Deck", actionIcon: "fa-file-powerpoint",
    nav: ["Overview", "Readiness", "Investors", "Pitch Vault", "Talent Scout"],
    cards: [
      {
        id: "readiness-radar", title: "Readiness Scorecard", icon: "fa-crosshairs", span: 2, type: "chart",
        chart: {
          type: "radar",
          data: {
            labels: ["Product", "Team", "Legal", "Market", "Tech", "Finance"],
            datasets: [
              { label: "Current", data: [85, 70, 60, 75, 90, 55], backgroundColor: "rgba(212,167,74,.15)", borderColor: "#D4A74A", pointBackgroundColor: "#D4A74A", pointRadius: 4, borderWidth: 2 },
              { label: "Target", data: [90, 85, 80, 85, 95, 80], backgroundColor: "rgba(52,211,153,.06)", borderColor: "rgba(52,211,153,.3)", pointRadius: 0, borderWidth: 1, borderDash: [4, 4] },
            ],
          },
          options: { scales: { r: { grid: { color: "rgba(255,255,255,.06)" }, angleLines: { color: "rgba(255,255,255,.06)" }, ticks: { display: false }, pointLabels: { color: "#9B99A1", font: { size: 11 } }, suggestedMin: 0, suggestedMax: 100 } }, plugins: { legend: { labels: { color: "#9B99A1", font: { size: 11 }, usePointStyle: true, pointStyle: "circle", padding: 16 } } } },
        },
      },
      { id: "overall-score", title: "Overall Score", icon: "fa-gauge-high", span: 1, type: "score", data: { value: 72, color: "var(--accent)", label: "Startup Readiness" } },
      {
        id: "investor-match", title: "Investor Matchmaker", icon: "fa-handshake", span: 2, type: "list", badge: "5 Matched",
        data: [
          { icon: "fa-building", iconColor: "var(--accent)", title: "AgriVenture Capital", desc: "Focus: AgriTech, Series A · Compatibility: 94%", tag: "High Match", tagColor: "var(--success)" },
          { icon: "fa-landmark", iconColor: "var(--info)", title: "DOST Venture Fund", desc: "Focus: Deep Tech, Government-backed · Compatibility: 88%", tag: "Grant", tagColor: "var(--info)" },
          { icon: "fa-chart-line", iconColor: "var(--warning)", title: "Kickstart Ventures", desc: "Focus: SaaS, AgriTech · Compatibility: 81%", tag: "Good Match", tagColor: "var(--accent)" },
          { icon: "fa-globe", iconColor: "var(--success)", title: "ASIAGRIFUND", desc: "Focus: Agriculture, Southeast Asia · Compatibility: 76%", tag: "Regional", tagColor: "var(--warning)" },
        ],
      },
      {
        id: "pitch-vault", title: "Pitch Vault", icon: "fa-vault", span: 1, type: "tracker",
        data: [
          { name: "CropSense Pitch v3.2", status: "Active", statusColor: "var(--success)", progress: 100, meta: "47 views · 12 downloads" },
          { name: "Financial Projections 2025", status: "Active", statusColor: "var(--success)", progress: 100, meta: "23 views · 8 downloads" },
          { name: "Technical Architecture Doc", status: "Draft", statusColor: "var(--warning)", progress: 65, meta: "Last edited 2d ago" },
          { name: "Market Analysis Report", status: "Review", statusColor: "var(--info)", progress: 90, meta: "Sent to advisor" },
        ],
      },
      {
        id: "talent-scout", title: "Talent Scout", icon: "fa-users-gear", span: 3, type: "feed", badge: "Top 1%",
        data: [
          { tag: "ML Engineer", tagColor: "var(--info)", title: "Maria Santos — UP Diliman", desc: "Thesis: AI-Driven Crop Yield Prediction. Skills: Python, TensorFlow, Statistical Modeling. GPA: 3.8.", time: "Top 0.5%", btn: "Invite" },
          { tag: "Full-Stack Dev", tagColor: "var(--accent)", title: "Juan Dela Cruz — DLSU", desc: "Built 3 production apps. Skills: React, Node.js, PostgreSQL. Won 2 hackathons.", time: "Top 1%", btn: "Invite" },
          { tag: "IoT Specialist", tagColor: "var(--success)", title: "Ana Reyes — Mapúa", desc: "Thesis: Low-cost soil sensors for precision farming. Skills: Arduino, IoT, Embedded C.", time: "Top 2%", btn: "Invite" },
        ],
      },
    ],
    alerts: [
      { type: "accent", icon: "fa-eye", text: "AgriVenture Capital downloaded your pitch deck", time: "8m ago", isNew: true },
      { type: "success", icon: "fa-user-plus", text: "Maria Santos accepted your talent scout invitation", time: "2h ago", isNew: true },
      { type: "info", icon: "fa-chart-line", text: "Readiness Score increased from 68 to 72", time: "1d ago", isNew: false },
      { type: "warning", icon: "fa-triangle-exclamation", text: "Legal compliance: Business registration expires in 30 days", time: "2d ago", isNew: false },
    ],
  },

  researcher: {
    icon: "fa-microscope", label: "Researcher", initial: "A", title: "The IP Commercializer",
    greeting: "Dr. Lim, welcome back", subtitle: "Transition your breakthroughs from the lab to the market",
    action: "File New Patent", actionIcon: "fa-file-shield",
    nav: ["Overview", "IP Vault", "Commercialization", "Industry", "Grants"],
    cards: [
      {
        id: "ip-vault", title: "IP Vault", icon: "fa-shield-halved", span: 2, type: "list", badge: "3 Patents",
        data: [
          { icon: "fa-certificate", iconColor: "var(--accent)", title: "Real-Time Soil Nutrient Analysis via Spectroscopy", desc: "Patent No. PH-2024-00891 · Status: Granted · Filed: Mar 2024", tag: "Granted", tagColor: "var(--success)" },
          { icon: "fa-certificate", iconColor: "var(--info)", title: "Automated Disease Detection in Rice Using Hyperspectral Imaging", desc: "Patent No. PH-2024-01102 · Status: Pending · Filed: Aug 2024", tag: "Pending", tagColor: "var(--warning)" },
          { icon: "fa-file-lines", iconColor: "var(--text-sec)", title: "Low-Cost IoT Framework for Precision Agriculture in Tropical Regions", desc: "Research Paper · Published: Nature Scientific Reports, Feb 2025", tag: "Published", tagColor: "var(--info)" },
        ],
      },
      { id: "comm-score", title: "Commercialization Score", icon: "fa-chart-column", span: 1, type: "score", data: { value: 82, color: "var(--success)", label: "Market Potential" } },
      {
        id: "industry-connections", title: "Industry Connection Portal", icon: "fa-link", span: 2, type: "list", badge: "3 Active",
        data: [
          { icon: "fa-building", iconColor: "var(--accent)", title: "SM Prime Holdings", desc: "Interested in soil analysis tech for mall rooftop gardens and urban farming initiatives.", tag: "In Discussion", tagColor: "var(--success)" },
          { icon: "fa-landmark", iconColor: "var(--info)", title: "Department of Agriculture", desc: "Potential licensing for nationwide soil health monitoring program — ₱50M budget.", tag: "Proposal Sent", tagColor: "var(--warning)" },
          { icon: "fa-industry", iconColor: "var(--success)", title: "Dole Philippines", desc: "Exploring spectroscopy-based quality control for banana plantations in Mindanao.", tag: "Initial Contact", tagColor: "var(--info)" },
        ],
      },
      {
        id: "grant-tracker", title: "Funding Grant Tracker", icon: "fa-coins", span: 1, type: "tracker",
        data: [
          { name: "DOST PCIEERD Research Grant", status: "Active", statusColor: "var(--success)", progress: 72, meta: "₱2.4M of ₱3.3M utilized" },
          { name: "CHED Zonal Research Center", status: "Active", statusColor: "var(--success)", progress: 45, meta: "₱800K of ₱1.8M utilized" },
          { name: "DA-BAR Funding Cycle 2025", status: "Upcoming", statusColor: "var(--warning)", progress: 0, meta: "Deadline: Apr 15, 2025" },
          { name: "NRCP Basic Research", status: "Completed", statusColor: "var(--info)", progress: 100, meta: "₱1.2M — Closed Dec 2024" },
        ],
      },
      {
        id: "comm-chart", title: "Commercialization Breakdown", icon: "fa-chart-pie", span: 3, type: "chart",
        chart: {
          type: "bar",
          data: {
            labels: ["Market Size", "Technical Feasibility", "IP Strength", "Team Readiness", "Regulatory Path", "Revenue Model"],
            datasets: [{ label: "Score", data: [88, 92, 95, 70, 65, 78], backgroundColor: ["rgba(212,167,74,.7)", "rgba(52,211,153,.7)", "rgba(96,165,250,.7)", "rgba(251,191,36,.7)", "rgba(239,83,80,.7)", "rgba(168,85,247,.7)"], borderRadius: 6, borderSkipped: false }],
          },
          options: { indexAxis: "y", scales: { x: { grid: { color: "rgba(255,255,255,.04)" }, ticks: { color: "#5E5D65", font: { size: 10 } }, max: 100 }, y: { grid: { display: false }, ticks: { color: "#9B99A1", font: { size: 11 } } } }, plugins: { legend: { display: false } } },
        },
      },
    ],
    alerts: [
      { type: "success", icon: "fa-stamp", text: "Patent PH-2024-00891 officially granted by IPOPHL", time: "2h ago", isNew: true },
      { type: "accent", icon: "fa-envelope", text: "SM Prime requested a technical demo for next week", time: "6h ago", isNew: true },
      { type: "warning", icon: "fa-clock", text: "DA-BAR grant deadline approaching — 28 days remaining", time: "1d ago", isNew: false },
      { type: "info", icon: "fa-chart-line", text: "Commercialization score updated: +4 pts (IP Strength)", time: "3d ago", isNew: false },
    ],
  },

  investor: {
    icon: "fa-chart-line", label: "Investor", initial: "T", title: "The Deal Flow Command",
    greeting: "Miguel, good evening", subtitle: "High-signal deal flow with minimal noise",
    action: "Review New Deals", actionIcon: "fa-magnifying-glass-chart",
    nav: ["Overview", "Deal Flow", "Portfolio", "Heatmap", "Inquiries"],
    cards: [
      {
        id: "deal-stats", title: "Deal Flow Metrics", icon: "fa-gauge", span: 3, type: "stats",
        data: [
          { val: 12, label: "New This Week", trend: "+4 vs last week", dir: "up" },
          { val: 3, label: "Due Diligence Ready", trend: "AI screened", dir: "up" },
          { val: 89, label: "Avg Legitimacy Score", trend: "Top 15%", dir: "up" },
          { val: 5, label: "Active Portfolio", trend: "2 raising next round", dir: "up" },
          { val: "₱47M", label: "Total Deployed", trend: "+₱8M this quarter", dir: "up" },
          { val: "2.3x", label: "Portfolio IRR", trend: "Above benchmark", dir: "up" },
        ],
      },
      {
        id: "legitimacy", title: "Legitimacy Screening", icon: "fa-shield-check", span: 2, type: "list", badge: "AI Verified",
        data: [
          { icon: "fa-circle-check", iconColor: "var(--success)", title: "CropSense — AgriTech AI Platform", desc: "Score: 94/100 · Team verified · Traction: 120 farmers, ₱2M ARR · Risk: Low", tag: "Pass", tagColor: "var(--success)" },
          { icon: "fa-circle-check", iconColor: "var(--success)", title: "InsureFlow — Insurance Automation", desc: "Score: 87/100 · Team verified · Traction: 3 pilot partners · Risk: Low-Med", tag: "Pass", tagColor: "var(--success)" },
          { icon: "fa-triangle-exclamation", iconColor: "var(--warning)", title: "BlockHarvest — Blockchain Supply Chain", desc: "Score: 62/100 · Unverified team claims · Traction: Limited · Risk: Medium", tag: "Review", tagColor: "var(--warning)" },
          { icon: "fa-circle-xmark", iconColor: "var(--danger)", title: "MetaLearn VR — EdTech Platform", desc: "Score: 38/100 · Inflated user metrics detected · No verifiable revenue · Risk: High", tag: "Flagged", tagColor: "var(--danger)" },
        ],
      },
      {
        id: "portfolio-health", title: "Portfolio Health", icon: "fa-heart-pulse", span: 1, type: "chart",
        chart: {
          type: "doughnut",
          data: { labels: ["Growing", "Stable", "At Risk"], datasets: [{ data: [3, 1, 1], backgroundColor: ["rgba(52,211,153,.7)", "rgba(96,165,250,.7)", "rgba(239,83,80,.7)"], borderWidth: 0, spacing: 3 }] },
          options: { cutout: "70%", plugins: { legend: { position: "bottom", labels: { color: "#9B99A1", font: { size: 10 }, usePointStyle: true, pointStyle: "circle", padding: 10 } } } },
        },
      },
      {
        id: "heatmap", title: "Industry Heatmap", icon: "fa-fire", span: 2, type: "heatmap",
        data: {
          regions: ["Metro Manila", "Cebu", "Davao", "Siargao", "Clark", "Iloilo"],
          industries: ["AgriTech", "FinTech", "InsurTech", "HealthTech", "EdTech", "Blockchain"],
          values: [[92, 78, 85, 42, 55, 30], [88, 82, 70, 60, 48, 25], [75, 65, 72, 55, 40, 20], [30, 25, 20, 88, 15, 75], [60, 55, 50, 35, 70, 18], [22, 18, 15, 78, 12, 82]],
        },
      },
      {
        id: "inquiries", title: "Direct Inquiry Queue", icon: "fa-inbox", span: 1, type: "list", badge: "3 Pending",
        data: [
          { icon: "fa-envelope", iconColor: "var(--accent)", title: "Carlo Reyes — CropSense", desc: "Requested follow-up meeting for Series A discussion", tag: "Urgent", tagColor: "var(--danger)" },
          { icon: "fa-envelope", iconColor: "var(--info)", title: "Maria Santos — InsureFlow", desc: "Sent technical documentation and pilot results", tag: "New", tagColor: "var(--info)" },
          { icon: "fa-envelope", iconColor: "var(--text-sec)", title: "Team BlockHarvest", desc: "Responding to due diligence clarification request", tag: "Pending", tagColor: "var(--warning)" },
        ],
      },
    ],
    alerts: [
      { type: "success", icon: "fa-circle-check", text: "CropSense due diligence completed — all checks passed", time: "15m ago", isNew: true },
      { type: "danger", icon: "fa-flag", text: "MetaLearn VR flagged for inflated metrics — review recommended", time: "2h ago", isNew: true },
      { type: "accent", icon: "fa-envelope", text: "Carlo Reyes sent an urgent meeting request", time: "4h ago", isNew: false },
      { type: "info", icon: "fa-chart-line", text: "Portfolio company AgriPay reached ₱5M monthly GMV", time: "1d ago", isNew: false },
    ],
  },

  corporation: {
    icon: "fa-building", label: "Corporation", initial: "A", title: "The Innovation Scout",
    greeting: "Ayala Innovation Team", subtitle: "Solve internal R&D challenges through external ecosystem talent",
    action: "Post New Challenge", actionIcon: "fa-plus",
    nav: ["Overview", "Challenges", "ESG & CSR", "Acquisitions", "Talent"],
    cards: [
      {
        id: "challenge-stats", title: "Innovation Challenges", icon: "fa-lightbulb", span: 1, type: "stats",
        data: [
          { val: 3, label: "Active", trend: "1 new this week", dir: "up" },
          { val: 47, label: "Submissions", trend: "+12 this week", dir: "up" },
          { val: "₱2.1M", label: "Prize Pool", trend: "Across all active", dir: "" },
          { val: 18, label: "Avg Days Open", trend: "Below target", dir: "down" },
        ],
      },
      { id: "esg-score", title: "ESG Impact Score", icon: "fa-leaf", span: 1, type: "score", data: { value: 78, color: "var(--success)", label: "ESG Rating" } },
      {
        id: "quick-stat2", title: "Ecosystem Reach", icon: "fa-network-wired", span: 1, type: "stats",
        data: [
          { val: 156, label: "Students Engaged", trend: "+34 this month", dir: "up" },
          { val: 12, label: "Researchers Paired", trend: "Active projects", dir: "up" },
          { val: 4, label: "Startups Tracked", trend: "M&A pipeline", dir: "up" },
          { val: "₱8.5M", label: "Total Invested", trend: "FY 2025", dir: "" },
        ],
      },
      {
        id: "active-challenges", title: "Active Innovation Challenges", icon: "fa-puzzle-piece", span: 2, type: "challenges",
        data: [
          { title: "Sustainable Packaging from Agricultural Waste", desc: "Develop a biodegradable packaging material using rice husk or sugarcane bagasse that meets food-grade standards.", tags: ["Materials Science", "Sustainability"], submissions: 23, prize: "₱800K", deadline: "Mar 30" },
          { title: "AI-Powered Energy Optimization for Malls", desc: "Create an ML model that reduces energy consumption in commercial buildings by 20%+ using IoT sensor data.", tags: ["AI/ML", "IoT", "Energy"], submissions: 15, prize: "₱700K", deadline: "Apr 15" },
          { title: "Digital Identity Verification for Rural Banking", desc: "Build an offline-capable identity verification system using biometrics for unbanked populations.", tags: ["FinTech", "Biometrics", "Inclusion"], submissions: 9, prize: "₱600K", deadline: "Apr 30" },
        ],
      },
      {
        id: "acquisition-pipeline", title: "Acquisition Pipeline", icon: "fa-bullseye", span: 1, type: "pipeline",
        data: [
          { stage: "Discovery", items: [{ name: "CropSense", desc: "AgriTech AI" }, { name: "FarmLink", desc: "Supply Chain" }] },
          { stage: "Evaluation", items: [{ name: "InsureFlow", desc: "InsurTech" }] },
          { stage: "Due Diligence", items: [] },
          { stage: "Closed", items: [] },
        ],
      },
    ],
    alerts: [
      { type: "success", icon: "fa-paper-plane", text: "New submission on Sustainable Packaging challenge", time: "20m ago", isNew: true },
      { type: "info", icon: "fa-eye", text: "Dr. Ana Lim viewed your Energy Optimization challenge", time: "3h ago", isNew: true },
      { type: "accent", icon: "fa-star", text: "Top student Maria Santos joined the talent pipeline", time: "1d ago", isNew: false },
      { type: "warning", icon: "fa-clock", text: "Rural Banking challenge deadline in 45 days", time: "2d ago", isNew: false },
    ],
  },

  government: {
    icon: "fa-landmark", label: "Government", initial: "D", title: "The Regulatory Oversight",
    greeting: "DOST Innovation Dashboard", subtitle: "Distribute grants and monitor national innovation health",
    action: "Process Grant Application", actionIcon: "fa-gavel",
    nav: ["Overview", "Grants", "Economic Impact", "Compliance", "Stakeholders"],
    cards: [
      {
        id: "grant-stats", title: "Grant Overview", icon: "fa-coins", span: 3, type: "stats",
        data: [
          { val: 24, label: "Active Grants", trend: "₱150M total", dir: "up" },
          { val: 89, label: "Registered Startups", trend: "+12 this quarter", dir: "up" },
          { val: "₱320M", label: "Total Disbursed", trend: "FY 2024-2025", dir: "" },
          { val: "1,240", label: "Jobs Created", trend: "+180 this quarter", dir: "up" },
          { val: 94, label: "Compliance Rate", trend: "+2% vs last audit", dir: "up" },
          { val: 6, label: "Pending Reviews", trend: "Avg 5 days to process", dir: "down" },
        ],
      },
      {
        id: "economic-chart", title: "Economic Impact by Region", icon: "fa-map-location-dot", span: 2, type: "chart",
        chart: {
          type: "bar",
          data: {
            labels: ["Metro Manila", "Cebu", "Davao", "Clark", "Iloilo", "Siargao", "CDO", "Baguio"],
            datasets: [
              { label: "Startups", data: [32, 18, 14, 8, 7, 5, 3, 2], backgroundColor: "rgba(212,167,74,.7)", borderRadius: 4, borderSkipped: false },
              { label: "Jobs Created", data: [480, 220, 180, 120, 95, 68, 42, 33], backgroundColor: "rgba(52,211,153,.5)", borderRadius: 4, borderSkipped: false },
            ],
          },
          options: { scales: { x: { grid: { display: false }, ticks: { color: "#5E5D65", font: { size: 10 } } }, y: { grid: { color: "rgba(255,255,255,.04)" }, ticks: { color: "#5E5D65", font: { size: 10 } } } }, plugins: { legend: { labels: { color: "#9B99A1", font: { size: 10 }, usePointStyle: true, pointStyle: "circle", padding: 14 } } } },
        },
      },
      {
        id: "compliance-monitor", title: "Compliance Monitor", icon: "fa-shield-halved", span: 1, type: "compliance",
        data: [
          { title: "CropSense Inc.", desc: "Business registration — expires in 30 days", status: "Warning", dotColor: "var(--warning)" },
          { title: "InsureFlow Corp.", desc: "Insurance regulatory filing — complete", status: "Compliant", dotColor: "var(--success)" },
          { title: "BlockHarvest DAO", desc: "Foreign ownership structure — under review", status: "Flagged", dotColor: "var(--danger)" },
          { title: "AgriPay Solutions", desc: "BSP licensing — in progress", status: "In Review", dotColor: "var(--info)" },
        ],
      },
      {
        id: "grant-mgmt", title: "Grant Management System", icon: "fa-list-check", span: 2, type: "tracker",
        data: [
          { name: "PCIEERD AgriTech Program — Batch 2025", status: "Open", statusColor: "var(--success)", progress: 35, meta: "42 applicants · 15 screened · Deadline: Mar 31" },
          { name: "CHED Higher Ed Innovation Fund", status: "Open", statusColor: "var(--success)", progress: 60, meta: "28 applicants · 22 screened · Deadline: Apr 15" },
          { name: "DOST Tuklas Lunas Development", status: "Review", statusColor: "var(--warning)", progress: 85, meta: "8 finalists · Panel review scheduled" },
          { name: "DA-BAR National Agriculture Program", status: "Closed", statusColor: "var(--info)", progress: 100, meta: "12 awarded · ₱45M disbursed" },
        ],
      },
      {
        id: "stakeholder-chart", title: "Stakeholder Distribution", icon: "fa-users", span: 1, type: "chart",
        chart: {
          type: "doughnut",
          data: { labels: ["Students", "Researchers", "Founders", "Investors", "Corporations"], datasets: [{ data: [340, 85, 89, 24, 12], backgroundColor: ["rgba(96,165,250,.7)", "rgba(168,85,247,.7)", "rgba(212,167,74,.7)", "rgba(52,211,153,.7)", "rgba(251,191,36,.7)"], borderWidth: 0, spacing: 2 }] },
          options: { cutout: "65%", plugins: { legend: { position: "bottom", labels: { color: "#9B99A1", font: { size: 9 }, usePointStyle: true, pointStyle: "circle", padding: 8 } } } },
        },
      },
    ],
    alerts: [
      { type: "success", icon: "fa-circle-check", text: "PCIEERD grant Batch 2025 — 15 applications auto-screened", time: "30m ago", isNew: true },
      { type: "danger", icon: "fa-circle-exclamation", text: "BlockHarvest DAO flagged for foreign ownership violation", time: "2h ago", isNew: true },
      { type: "warning", icon: "fa-clock", text: "PCIEERD application deadline in 18 days", time: "1d ago", isNew: false },
      { type: "info", icon: "fa-chart-line", text: "Monthly report: 12 new startups registered in Cebu", time: "3d ago", isNew: false },
    ],
  },
};

export const ROLE_KEYS: RoleKey[] = ["student", "founder", "researcher", "investor", "corporation", "government"];

export function getRoleData(role: RoleKey): RoleData {
  return roles[role];
}

export function getRoleDataOrNil(role: string): RoleData | undefined {
  return roles[role as RoleKey];
}