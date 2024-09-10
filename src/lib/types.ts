
export interface NodeData {
    id: string;
    name: string;
    label: "Skill" | "Interest";
  }

export interface BlogPost {
    author: string;
    title: string;
    description: string;
    content: string;
    img: string;
    slug: string;
  date: string;
}