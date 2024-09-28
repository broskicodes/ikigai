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
