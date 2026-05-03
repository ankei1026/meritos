const navIconMap: Record<string, string> = {
  Overview: "fa-grip",
  Thesis: "fa-book-open",
  Skills: "fa-award",
  Opportunities: "fa-bolt",
  "AI Mentor": "fa-robot",
  Readiness: "fa-crosshairs",
  Investors: "fa-handshake",
  "Pitch Vault": "fa-vault",
  "Talent Scout": "fa-users-gear",
  "IP Vault": "fa-shield-halved",
  Commercialization: "fa-chart-column",
  Industry: "fa-link",
  Grants: "fa-coins",
  "Deal Flow": "fa-arrows-split-up-and-left",
  Portfolio: "fa-briefcase",
  Heatmap: "fa-fire",
  Inquiries: "fa-inbox",
  Challenges: "fa-puzzle-piece",
  "ESG & CSR": "fa-leaf",
  Acquisitions: "fa-bullseye",
  Talent: "fa-user-graduate",
  Economic: "fa-chart-bar",
  Compliance: "fa-shield-halved",
  Stakeholders: "fa-users",
};

export function getNavIcon(name: string): string {
  return navIconMap[name] || "fa-circle";
}

export const CHAT_RESPONSES = [
  "That's a great question. For your crop yield model, I'd recommend trying XGBoost over Random Forest — it typically performs 5-10% better on tabular agricultural data.",
  "Have you considered using satellite imagery features like NDVI? Research shows this can improve accuracy by up to 15% for yield prediction tasks.",
  "For seasonal variation, try time-series cross-validation instead of random splits. This prevents data leakage between growing seasons.",
  "I can help you set up experiment tracking with MLflow. This makes it easier to compare model versions and share results with your advisor.",
  "Based on your timeline, you have roughly 6 weeks for the testing phase. Prioritize model interpretability using SHAP values — advisors love that.",
  "Your TensorFlow model might benefit from cosine annealing as a learning rate scheduler. It often converges to better minima on agricultural datasets.",
];