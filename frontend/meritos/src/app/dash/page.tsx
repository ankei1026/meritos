import Link from "next/link";
import DashboardLayout from "../../components/DashboardLayout";

const DASHBOARD_ROLES = [
  {
    href: "/dash/student",
    title: "Student Dashboard",
    description: "Track AI matches, events, and profile growth.",
    accent: "#1A56DB",
  },
  {
    href: "/dash/founder",
    title: "Founder Dashboard",
    description: "Manage investor pipeline, meetings, and fundraising.",
    accent: "#7C3AED",
  },
  {
    href: "/dash/investor",
    title: "Investor Dashboard",
    description: "Review mandate-fit deals and due diligence queue.",
    accent: "#B45309",
  },
  {
    href: "/dash/researcher",
    title: "Researcher Dashboard",
    description: "Monitor publication impact, IP pipeline, and grants.",
    accent: "#0E7A4E",
  },
  {
    href: "/dash/government",
    title: "Government Dashboard",
    description: "View ecosystem activity and grant program performance.",
    accent: "#374151",
  },
  {
    href: "/dash/corporation",
    title: "Corporation Dashboard",
    description: "Run talent scouting and innovation lab initiatives.",
    accent: "#0C444C",
  },
];

export default function DashIndexPage() {
  return (
    <DashboardLayout
      title="Dashboard Hub"
      subtitle="Choose a role-specific dashboard to continue."
    >
      <style>{`
        .dash-card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
        .dash-card {
          background: #fff;
          border: 1px solid #E8E5DF;
          border-radius: 14px;
          padding: 1.1rem;
          text-decoration: none;
          color: inherit;
          transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
        }
        .dash-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(17,17,16,.08);
          border-color: #D8D3CA;
        }
        @media (max-width: 820px) {
          .dash-card-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="dash-card-grid">
        {DASHBOARD_ROLES.map((role) => (
          <Link key={role.href} href={role.href} className="dash-card">
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: role.accent,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                marginBottom: ".7rem",
              }}
            >
              {role.title.charAt(0)}
            </div>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "1rem",
                letterSpacing: "-0.01em",
                color: "#111110",
                marginBottom: ".35rem",
              }}
            >
              {role.title}
            </h2>
            <p style={{ fontSize: ".83rem", color: "#6B6860", lineHeight: 1.45, marginBottom: ".7rem" }}>
              {role.description}
            </p>
            <span style={{ fontSize: ".8rem", color: role.accent, fontWeight: 600 }}>
              Open dashboard →
            </span>
          </Link>
        ))}
      </section>
    </DashboardLayout>
  );
}
