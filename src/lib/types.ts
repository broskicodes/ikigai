export interface Message {
  content: string;
  role: "user" | "assistant";
}

export interface NodeData {
  id: string;
  name: string;
  label: "Skill" | "Interest";
}

export interface BlogPost {
  author: string;
  title: string;
  description: string | null;
  content: string;
  image_url: string | null;
  slug: string;
  date: string;
}

export enum GoalStatus {
  TO_DO = "to_do",
  IN_PROGRESS = "in_progress",
  COMPLETE = "complete",
  ARCHIVED = "archived",
}

export interface Goal {
  id: number;
  name: string;
  target: number;
  status: GoalStatus;
  start_date: string;
  duration: string;
  progress?: number[];
}

export interface GraphData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
  }[];
}
