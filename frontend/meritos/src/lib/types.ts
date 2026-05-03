export interface SkillBadge {
  name: string;
  icon: string;
  color: string;
  level: string;
}

export interface FeedItem {
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  time: string;
  btn: string;
}

export interface ChatMessage {
  role: "ai" | "user";
  text: string;
}

export interface ProgressData {
  current: number;
  steps: string[];
}

export interface StatItem {
  val: string | number;
  label: string;
  trend?: string;
  dir?: "up" | "down" | "";
}

export interface ScoreData {
  value: number;
  color: string;
  label: string;
}

export interface ListItem {
  icon: string;
  iconColor: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
}

export interface TrackerItem {
  name: string;
  status: string;
  statusColor: string;
  progress: number;
  meta: string;
}

export interface HeatmapData {
  regions: string[];
  industries: string[];
  values: number[][];
}

export interface PipelineStage {
  stage: string;
  items: { name: string; desc: string }[];
}

export interface ComplianceItem {
  title: string;
  desc: string;
  status: string;
  dotColor: string;
}

export interface ChallengeItem {
  title: string;
  desc: string;
  tags: string[];
  submissions: number;
  prize: string;
  deadline: string;
}

export interface Alert {
  type: "success" | "info" | "accent" | "warning" | "danger";
  icon: string;
  text: string;
  time: string;
  isNew: boolean;
}

export type CardType =
  | "progress" | "badges" | "stats" | "feed" | "chat" | "chart"
  | "score" | "list" | "tracker" | "heatmap" | "pipeline"
  | "compliance" | "challenges";

export interface ChartConfig {
  type: "radar" | "bar" | "doughnut";
  data: Record<string, unknown>;
  options?: Record<string, unknown>;
}

export interface DashCard {
  id: string;
  title: string;
  icon: string;
  span: 1 | 2 | 3;
  type: CardType;
  badge?: string;
  data: unknown;
  chart?: ChartConfig;
}

export interface RoleData {
  icon: string;
  label: string;
  initial: string;
  title: string;
  greeting: string;
  subtitle: string;
  action: string;
  actionIcon: string;
  nav: string[];
  cards: DashCard[];
  alerts: Alert[];
}

export type RoleKey = "student" | "founder" | "researcher" | "investor" | "corporation" | "government";